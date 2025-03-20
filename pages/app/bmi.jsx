//import { useRouter } from "next/router";
import { useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import oasisStorage from "@/lib/storage";
import BackBtn from "@/components/Home/backBtn";

export default function Bmi() {

    //const router = useRouter();

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState(null);

    const [bodyStatus, setBodyStatus] = useState(null)

    const calculateBmi = () => {
        const bmiFormula = (weight / (height * height)).toFixed(2)

        if (bmiFormula != NaN) {
            setBmi(bmiFormula)

            if (bmiFormula < 18.5) {
                setBodyStatus("Underweight")
            } else if (bmiFormula >= 18.5 || bmiFormula <= 24.9) {
                setBodyStatus('Normal Weight')
            } else if (bmiFormula >= 25 || bmiFormula <= 29.9) {
                setBodyStatus('Overweight')
            } else if (bmiFormula >= 30 || bmiFormula <= 34.9) {
                setBodyStatus('Obesity')
            } else if (bmiFormula > 35) {
                setBodyStatus('Extreme Obese')
            }

            oasisStorage.set("bmi", bmiFormula)
        }
    }

    return (
        <>
            <div
                className={`grid grid-rows-[20px_1fr_20px]   2xl:justify-items-center  xl:justify-items-center sm:justify-items-center   md:justify-items-center lg:justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 `}
            >

                <h1 className="text-2xl font-bold flex items-center">
                    <div className="mr-8">
                        <BackBtn />
                    </div>
                    <div className="inline-block">
                        <Image src={'.././Balance.png'} width={30} height={30} alt="BMI"></Image>
                    </div>
                    <span className="ml-2">BMI Calculator</span>
                    <Drawer>
                        <DrawerTrigger>
                            <HiQuestionMarkCircle className="h-4 w-4 ml-2" />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle className="text-xl">
                                    What is <span className="text-lime-500 font-bold dark:text-lime-300">BMI</span> ?
                                </DrawerTitle>
                                <DrawerDescription>
                                    <p className="text-base">
                                        Body mass index (BMI) is a value <span className="text-lime-500 font-bold dark:text-lime-300">derived</span> from the <span className="text-lime-500 font-bold dark:text-lime-300">mass (weight)</span> and <span className="text-lime-500 font-bold dark:text-lime-300">height</span> of a person. The BMI is defined as the body mass divided by the square of the body height, and is expressed in units of <span className="text-lime-500 font-bold dark:text-lime-300">kg/m²</span>, resulting from mass in kilograms (kg) and height in metres (m).
                                    </p>
                                    <br />
                                    <p className="text-base">
                                        The BMI may be determined first by measuring its components by means of a weighing scale and a stadiometer. The multiplication and division may be carried out directly, by hand or using a calculator.
                                    </p>
                                    <i>Resources from: </i>
                                    <a href="https://en.wikipedia.org/wiki/Body_mass_index" target="_blank">
                                        <span className="text-lime-500 font-bold dark:text-lime-300">Wikipedia</span>
                                    </a>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose>
                                    <Button className="duration-350 w-full items-center justify-center rounded-full bg-[#bef264] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold">
                                        Understood
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </h1>
                <div className="w-full max-w-sm items-center gap-2">
                    {bmi && (
                        <>
                            {bmi}
                        </>
                    )}
                    <Label htmlFor="weight">Weight (Kg) :</Label>
                    <br />
                    <Input
                        type={'number'}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Your weight (kg) ?"
                        required
                        id="weight"
                        variant="secondary"
                    />
                    <br />
                    <Label htmlFor="height">Height (m) :</Label>
                    <br />
                    <Input
                        type={'number'}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Your height (m) ?"
                        required
                        id="height"
                        variant="secondary"
                    />
                    <br />
                    <Button
                        onClick={() => { calculateBmi() }}
                        className={'duration-350 w-full items-center justify-center rounded-full bg-[#bef264] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold'}
                    >
                        Calculate
                    </Button>
                    <br />
                    <br />
                    <PhotoProvider>
                        <PhotoView src={'./../obesity_graph.png'}>
                            <Image
                                alt="Obesity Graph"
                                className="w-full hidden h-auto rounded-lg "
                                height="200"
                                src={'./../obesity_graph.png'}
                                style={{
                                    objectFit: "cover",
                                }}
                                width="368"
                            />
                        </PhotoView>
                    </PhotoProvider>
                    <i className="text-sm hidden">
                        Image of the status of body based on BMI.
                    </i>
                </div>
            </div>
        </>
    );
}
