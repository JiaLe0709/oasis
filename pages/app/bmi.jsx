import { useRouter } from "next/router";
import { useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"


export default function Bmi() {

    const router = useRouter();

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState(0);

    const calculateBmi = () => {
        setBmi((weight / (height * height)).toFixed(2));
    }

    return (
        <>
            <div
                className={`grid grid-rows-[20px_1fr_20px]   justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 `}
            >
                <h1 className="text-2xl font-bold">
                    <div className="inline-block">
                        <Image src={'.././Balance.png'} width={30} height={30} alt="Tools"></Image>
                    </div>
                    {" "}BMI Calculator                 <Drawer>
                        <DrawerTrigger><HiQuestionMarkCircle className="h-4 w-4" /></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle className={'text-xl'}>What is BMI ?</DrawerTitle>
                                <DrawerDescription>
                                    <p className="text-base">
                                        Body mass index (BMI) is a value derived from the mass (weight) and height of a person. The BMI is defined as the body mass divided by the square of the body height, and is expressed in units of kg/m2, resulting from mass in kilograms (kg) and height in metres (m).
                                    </p>
                                    <br />
                                    <p className="text-base">
                                        The BMI may be determined first by measuring its components by means of a weighing scale and a stadiometer. The multiplication and division may be carried out directly, by hand or using a calculator.
                                    </p>
                                    <i>Resources from: </i><a href="https://en.wikipedia.org/wiki/Body_mass_index" target="_blank"><span className="text-lime-500 font-bold dark:text-lime-300">Wikipedia</span></a>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose>
                                    <Button className={'duration-350 w-full items-center justify-center rounded-full bg-[#bef264] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold'}>
                                        Understood
                                    </Button>
                                </DrawerClose>
                                <br />
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </h1>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="weight">Weight (Kg) :</Label>
                    <Input
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Your weight (kg) ?"
                        required
                        id="weight"
                        variant="secondary"
                    /></div>
            </div>
        </>
    );
}
