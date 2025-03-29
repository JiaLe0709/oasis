import { InfoIcon } from "lucide-react";
import BackBtn from "@/components/Home/backBtn";
import Image from "next/image";
import oasisStorage from "@/lib/storage";
import { useState, useEffect } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { CaloriesList } from "@/lib/calories";

export default function CaloriesCalculator() {

    const [gender, setGender] = useState(null)
    const [suggestedCaloriesIntake, setSuggestedCaloriesIntake] = useState(0)

    useEffect(() => {
        async function fetchData() {

            // Obtain Data
            const gender = await oasisStorage.get("gender")

            // Constant Data is set [no matters is latest or not]
            setGender(gender)

        }

        fetchData()
    }, [oasisStorage])

    // Init: Select Categories or extra: custom target (/)
    useEffect(() => {
        if (gender == '') {
            setSuggestedCaloriesIntake(2600)
        } else if (gender == 'Boy') {
            setSuggestedCaloriesIntake(2800)
        } else if (gender == 'Girl') {
            setSuggestedCaloriesIntake(2400)
        } else {
            setSuggestedCaloriesIntake(2600)
        }

    }, [gender])

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
                        <Image src={'.././Sandwich.png'} width={30} height={30} alt="sandwich"></Image>
                    </div>
                    <span className="ml-2">Calories Calculator</span>
                    <Drawer>
                        <DrawerTrigger>
                            <span className="text-sky-600 font-bold dark:text-cyan-400">
                                <HiQuestionMarkCircle className="h-4 w-4 ml-2" />
                            </span>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle className="text-xl">
                                    What is <span className="text-lime-500 font-bold dark:text-lime-300">Calories Calculator</span> ?
                                </DrawerTitle>
                                <DrawerDescription>
                                    <p className="text-base">
                                        Calories Calculator is a tool that helps teenagers <span className="text-lime-500 font-bold dark:text-lime-300">track calories intake</span> in thier daily.
                                    </p>
                                    <br />
                                    <p className="text-base">
                                        So, they can <span className="text-lime-500 font-bold dark:text-lime-300">monitor their calorie consumption</span> and make correct food choices, and <span className="text-lime-500 font-bold dark:text-lime-300">prevent disease</span> like overwight and obesity. </p>
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
                    <Tabs defaultValue="all">
                        <TabsList className={'bg-[#F4F4F5] dark:bg-[#27272A] w-full'}>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="morning">Morning</TabsTrigger>
                            <TabsTrigger value="after">Afternoon</TabsTrigger>
                            <TabsTrigger value="night">Night</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                        </TabsContent>
                        <TabsContent value="morning">
                        </TabsContent>
                        <TabsContent value="afternoon">
                        </TabsContent>
                        <TabsContent value="night">
                        </TabsContent>
                    </Tabs>
                    <br />
                    <footer className="flex items-center justify-center  p-4 text-xs text-gray-500 dark:text-gray-400">
                        <InfoIcon className="mr-2 h-4 w-4" />
                        <span>The calories intake suggestion is just a reference.</span>
                    </footer>
                </div>
            </div>
        </>
    );
}
