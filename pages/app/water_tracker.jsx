import { useState, useEffect } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import 'react-photo-view/dist/react-photo-view.css';
import oasisStorage from "@/lib/storage";
import BackBtn from "@/components/Home/backBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react";
import { Toaster, toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress";

export default function WaterTracker() {

    const [gender, setGender] = useState(null)
    const [waterIntakeRecord, setWaterIntakeRecord] = useState(null)
    const [suggestedWaterIntake, setSuggestedWaterIntake] = useState(3000)
    const [totalWaterIntake, setTotalWaterIntake] = useState(0)
    const [totalWaterIntakeInPercentage, setTotalWaterIntakeInPercentage] = useState(0)

    const [selectedAmount, setSelectedAmount] = useState(0)

    useEffect(() => {
        async function fetchData() {
            const gender = await oasisStorage.get("gender")
            //const waterIntakeRecord = await oasisStorage.get("waterIntakeRecord")
            const dbtotalWaterIntake = await oasisStorage.get("totalWaterIntake")

            //console.log("db: ", dbtotalWaterIntake)
            if (dbtotalWaterIntake) {
                setGender(gender)
                setTotalWaterIntake(dbtotalWaterIntake)
            }
        }

        fetchData()
    }, [oasisStorage])

    // Init: Select Categories or extra: custom target (/)
    useEffect(() => {
        if (gender == '') {
            setSuggestedWaterIntake(3000)
        } else if (gender == 'Boy') {
            setSuggestedWaterIntake(3300)
        } else if (gender == 'Girl') {
            setSuggestedWaterIntake(2400)
        } else {
            setSuggestedWaterIntake(3000)
        }

    }, [gender])

    // Init: progress bar （/)
    useEffect(() => {
        const calculation = (totalWaterIntake / suggestedWaterIntake) * 100

        //console.log(calculation)

        if ((calculation) > 100) {
            setTotalWaterIntakeInPercentage(100)
        } else {
            setTotalWaterIntakeInPercentage((totalWaterIntake / suggestedWaterIntake) * 100)
        }

    }, [suggestedWaterIntake, totalWaterIntake])

    // fx to excute
    const handleWaterIntake = () => {
        const newTotalWaterIntake = selectedAmount + totalWaterIntake

        if (totalWaterIntakeInPercentage > 100) {
            setTotalWaterIntakeInPercentage(100)
        } else {
            setTotalWaterIntakeInPercentage((newTotalWaterIntake / suggestedWaterIntake) * 100)
        }

        setTotalWaterIntake(newTotalWaterIntake)
        oasisStorage.set("totalWaterIntake", newTotalWaterIntake)
    }

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
                        <Image src={'.././Teacup_Without _Handle.png'} width={30} height={30} alt="tea"></Image>
                    </div>
                    <span className="ml-2">Water Tracker</span>
                    <Drawer>
                        <DrawerTrigger>
                            <HiQuestionMarkCircle className="h-4 w-4 ml-2" />
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle className="text-xl">
                                    What is <span className="text-lime-500 font-bold dark:text-lime-300">Water Tracker</span> ?
                                </DrawerTitle>
                                <DrawerDescription>
                                    <p className="text-base">
                                        Water Tracker is designed to <span className="text-lime-500 font-bold dark:text-lime-300">help busy teenagers stay hydrated</span> throughout the day. With their packed schedules and constant focus on studies, social media, or other activities, they often forget to drink enough water.
                                    </p>
                                    <br />
                                    <p className="text-base">
                                        So, The Water Tracker <span className="text-lime-500 font-bold dark:text-lime-300">serves as a recorder & reminder</span> to drink water regularly, ensuring users <span className="text-lime-500 font-bold dark:text-lime-300">maintain proper hydration</span>.
                                    </p>
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
                        Water Tracker can ensure that a teenager's daily water intake is sufficient.
                    </p>
                    <br />
                    <Tabs defaultValue="tracker" className="">
                        <TabsList className={'bg-[#F4F4F5] dark:bg-[#27272A]'}>
                            <TabsTrigger value="tracker">Tracker</TabsTrigger>
                            <TabsTrigger value="record">Record</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tracker">
                            <br />
                            <br />
                            <div className="text-center">
                                <h3 className="text-4xl text-lime-500 font-bold dark:text-lime-300">{totalWaterIntake} ml</h3>
                                <p className=" text-gray-500 dark:text-gray-400">of {suggestedWaterIntake} ml</p>
                            </div>
                            <br />
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span>{totalWaterIntake ? (((totalWaterIntake / suggestedWaterIntake) * 100).toFixed(2)) : (0)} %</span>
                                </div>
                                <Progress value={totalWaterIntake ? (totalWaterIntakeInPercentage) : (0)} className="h-3" />
                            </div>
                            <br />
                            <div className="space-y-4">
                                <div className="flex justify-center space-x-2">
                                    <Button
                                        onClick={() => setSelectedAmount(100)}
                                        className={`flex-1 justify-center rounded-[10px] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold ${selectedAmount === 100 ? 'bg-lime-200' : 'bg-[#bef264]'}`}
                                    >
                                        100 ml
                                    </Button>
                                    <Button
                                        onClick={() => setSelectedAmount(250)}
                                        className={`flex-1 justify-center rounded-[10px] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold ${selectedAmount === 250 ? 'bg-lime-200' : 'bg-[#bef264]'}`}
                                    >
                                        250 ml
                                    </Button>
                                    <Button
                                        onClick={() => setSelectedAmount(500)}
                                        className={`flex-1 justify-center rounded-[10px] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold ${selectedAmount === 500 ? 'bg-lime-200' : 'bg-[#bef264]'}`}
                                    >
                                        500 ml
                                    </Button>

                                </div>
                            </div>
                            <br />
                            <br />
                            <Button
                                onClick={() => handleWaterIntake()}
                                className="flex-1 w-full justify-center rounded-full bg-[#bef264] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold"
                            >
                                Add
                            </Button>
                        </TabsContent>
                        <TabsContent value="record">
                            <p className="text-xl font-bold">Your water intake history for today</p>
                            <br />
                            {waterIntakeRecord ? (
                                <>
                                    found !
                                </>
                            ) : (
                                <>
                                    <br />
                                    <div className="flex items-center justify-center">
                                        <Image src={'.././nothin.png'} width={80} height={80} alt="Nothin"></Image>
                                    </div>
                                    <p className="text-base text-center">
                                        No Drink Record Found !
                                    </p>
                                    <br />
                                </>
                            )}
                        </TabsContent>
                    </Tabs>
                    <br />
                    <footer className="flex items-center justify-center  p-4 text-xs text-gray-500 dark:text-gray-400">
                        <InfoIcon className="mr-2 h-4 w-4" />
                        <span>The water intake suggestion is just a reference.</span>
                    </footer>
                </div>
            </div>
        </>
    );
}
