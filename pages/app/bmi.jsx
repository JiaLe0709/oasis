//import { useRouter } from "next/router";
import { useState, useEffect } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function Bmi() {

    //const router = useRouter();

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);

    const [bodyStatus, setBodyStatus] = useState(null)
    const [typeOfAlert, setTypeOfAlert] = useState('hidden');
    const [advice, setAdvice] = useState('')

    const [lastRecord, setLastRecord] = useState(null)

    const calculateBmi = () => {
        const bmiFormula = (weight / (height * height)).toFixed(2)

        if (weight != '' && height != '') {
            if (weight != 0 || height != 0) {
                setLastRecord(null)
                setBmi(bmiFormula)

                if (bmiFormula < 18.5) {
                    setBodyStatus("Underweight");
                    setTypeOfAlert("bg-emerald-300 border-emerald-300 text-black");
                    setAdvice("Eat a balanced diet with more calories to reach a healthier weight.");
                } else if (bmiFormula >= 18.5 && bmiFormula <= 24.9) {
                    setBodyStatus("Normal Weight");
                    setTypeOfAlert("bg-lime-400 border-lime-400 text-black");
                    setAdvice("Well done! Maintain a balanced diet and stay active for good health.");
                } else if (bmiFormula >= 25 && bmiFormula <= 29.9) {
                    setBodyStatus("Overweight");
                    setTypeOfAlert("bg-yellow-500 border-yellow-500 text-black");
                    setAdvice("Exercise regularly and eat healthy foods to manage your weight effectively.");
                } else if (bmiFormula >= 30 && bmiFormula <= 34.9) {
                    setBodyStatus("Obesity");
                    setTypeOfAlert("bg-orange-500 border-orange-500 text-white");
                    setAdvice("Focus on healthy eating and physical activity to improve your well-being.");
                } else if (bmiFormula > 35) {
                    setBodyStatus("Extreme Obese");
                    setTypeOfAlert("bg-red-500 border-red-500 text-white");
                    setAdvice("Seek medical advice and adopt a healthier lifestyle for better long-term health.");
                }

                // Date
                const currentDate = new Date();
                const currentDayOfMonth = currentDate.getDate();
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();
                const date = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

                oasisStorage.set("bmiRecordDate", date)
                oasisStorage.set("weight", parseFloat(weight).toFixed(2))
                oasisStorage.set("height", parseFloat(height).toFixed(2))
                oasisStorage.set("bmi", bmiFormula)
            } else {
                toast.error('Invalid Input Entered !')
            }
        } else {
            toast.error('Invalid Input Entered !')
        }
    }

    useEffect(() => {
        async function fetchData() {
            const lastRecordDate = await oasisStorage.get('bmiRecordDate');
            if (lastRecordDate) {
                const bmiValue = await oasisStorage.get('bmi');
                const weight = await oasisStorage.get('weight');
                const height = await oasisStorage.get('height');

                setLastRecord({
                    'lastRecordDate': lastRecordDate,
                    'bmiValue': bmiValue,
                    'weight': weight,
                    'height': height
                } || null)
            } else {
                setLastRecord(null)
            }
        }

        fetchData()
    }, [oasisStorage])

    return (
        <>
            <Toaster richColors position="top-center" />
            <div
                className={`grid grid-rows-[20px_1fr_20px]   2xl:justify-items-center  xl:justify-items-center sm:justify-items-center   md:justify-items-center lg:justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20 `}
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
                                    <p className="text-base w-full  items-center justify-center ">
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
                    <p className="text-sm">
                        Body Mass Index (BMI) is commonly used as a screening tool to categorize individuals into different weight ranges, such as underweight, normal weight, overweight, and obesity.
                    </p>
                    {lastRecord && (
                        <>
                            <br />
                            <Alert className={'bg-green-200 border-green-200 text-black'}>
                                <AlertTitle className={'font-bold'}>Last BMI Record Found !</AlertTitle>
                                <AlertDescription>
                                    {`Record Date: ${lastRecord?.lastRecordDate}`}
                                    <br />
                                    {`Weight: ${lastRecord?.weight} kg`}
                                    <br />
                                    {`Height: ${lastRecord?.height} m`}
                                    <br />
                                    {`BMI: ${lastRecord?.bmiValue}`}
                                </AlertDescription>
                            </Alert>
                        </>
                    )
                    }
                    {typeOfAlert && (
                        <>
                            <br />
                            <Alert className={typeOfAlert}>
                                <AlertTitle className={'font-bold'}>{bodyStatus} ! ({bmi})</AlertTitle>
                                <AlertDescription>
                                    {advice}
                                </AlertDescription>
                            </Alert>
                            <br />
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
                    <footer className="flex items-center justify-center  p-4 text-xs text-gray-500 dark:text-gray-400">
                        <InfoIcon className="mr-2 h-4 w-4" />
                        <span>BMI is a screening tool, not a diagnostic of body fatness or health.</span>
                    </footer>
                </div>
            </div>
        </>
    );
}
