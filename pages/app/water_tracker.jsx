import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Toaster, toast } from "sonner";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress";
import { InfoIcon } from "lucide-react";
import BackBtn from "@/components/Home/backBtn";
import Image from "next/image";
import oasisStorage from "@/lib/storage";
import { useState, useEffect } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Switch } from "@/components/ui/switch"

export default function WaterTracker() {

    const [gender, setGender] = useState(null)
    const [waterIntakeRecord, setWaterIntakeRecord] = useState([])
    const [suggestedWaterIntake, setSuggestedWaterIntake] = useState(3000)
    const [totalWaterIntake, setTotalWaterIntake] = useState(0)
    const [totalWaterIntakeInPercentage, setTotalWaterIntakeInPercentage] = useState(0)

    const [selectedAmount, setSelectedAmount] = useState(0)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        const fetchScheduledNotifications = async () => {
            try {
                const pending = await LocalNotifications.getPending();
                console.log(pending)
            } catch (error) {
                console.error("Error fetching scheduled notifications:", error);
            }
        };

        fetchScheduledNotifications();
    }, []);

    useEffect(() => {
        async function fetchData() {

            // Obtain Data
            const gender = await oasisStorage.get("gender")
            const waterIntakeRecord = await oasisStorage.get("waterIntakeRecord")
            const dbtotalWaterIntake = await oasisStorage.get("totalWaterIntake")
            const waterIntakeDate = await oasisStorage.get("WaterIntakeDate")
            const waterIntakeAlert = await oasisStorage.get("notification")

            // Constant Data is set [no matters is latest or not]
            setGender(gender)
            setTotalWaterIntake(dbtotalWaterIntake)
            setWaterIntakeRecord(waterIntakeRecord)
            setChecked(waterIntakeAlert)

            // Data Found 
            if (waterIntakeDate) {
                // Handle Date
                const [day, month, year] = waterIntakeDate.split("-").map(Number);
                const storedDate = new Date(year, month - 1, day);
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                // Handle Update based on Date
                if (storedDate.getTime() === currentDate.getTime()) {
                    console.log("The stored date is today.");
                } else {
                    // Init Date format (latest)
                    const currentDayOfMonth = currentDate.getDate();
                    const currentMonth = currentDate.getMonth();
                    const currentYear = currentDate.getFullYear();
                    const date = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

                    // remove(set) old data (update to latest....)
                    await oasisStorage.set("WaterIntakeDate", date)
                    await oasisStorage.set("totalWaterIntake", 0)
                    await oasisStorage.set("waterIntakeRecord", [])

                    // Update State (latest)
                    setWaterIntakeRecord([])
                    setTotalWaterIntake(0)
                }
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

    // Init: progress bar - wont affect data （/)
    // const : sWI, variable: tWI
    useEffect(() => {
        const calculation = (totalWaterIntake / suggestedWaterIntake) * 100

        //console.log(calculation)

        if ((calculation) > 100) {
            setTotalWaterIntakeInPercentage(100)
        } else {
            setTotalWaterIntakeInPercentage((totalWaterIntake / suggestedWaterIntake) * 100)
        }

    }, [suggestedWaterIntake, totalWaterIntake])

    // fx to excute (user click)
    const handleWaterIntake = async () => {

        // Date Init
        const currentDate = new Date();
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const date = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

        // Total Amount of water intake
        const newTotalWaterIntake = selectedAmount + totalWaterIntake

        // Update State for progression bar
        if (totalWaterIntakeInPercentage > 100) {
            setTotalWaterIntakeInPercentage(100)
        } else {
            setTotalWaterIntakeInPercentage((newTotalWaterIntake / suggestedWaterIntake) * 100)
        }

        // Generate Timestamp
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        // get Array & set Array
        const waterIntakeRecord = (await oasisStorage.get("waterIntakeRecord")) || [];
        const newWaterRecord =
        {
            'timestamp': `${hours}:${minutes}:${seconds}`,
            'amount': selectedAmount,
        }

        // Update Data & State
        oasisStorage.set("waterIntakeRecord", [...waterIntakeRecord, newWaterRecord])
        oasisStorage.set("WaterIntakeDate", date)
        oasisStorage.set("totalWaterIntake", newTotalWaterIntake)

        const allowNotification = await oasisStorage.get('notification')
        if (allowNotification) {
            const nextNotificationTime = addOneHour(`${hours}:${minutes}:${seconds}`)
            console.log(nextNotificationTime)
            scheduleDrinkWaterNotification(nextNotificationTime)
        }

        setSelectedAmount(0)
        setTotalWaterIntake(newTotalWaterIntake)
        setWaterIntakeRecord([...waterIntakeRecord, newWaterRecord])
    }

    const TestNotification = async () => {
        try {
            // Request permission
            const permission = await LocalNotifications.requestPermissions();
            if (permission.display !== "granted") {
                oasisStorage.set("notification", false)
                toast.error("Permission denied for notifications.");
                setChecked(false)
                return;
            }

            // Schedule notification using config values
            await LocalNotifications.schedule({
                notifications: [
                    {
                        id: 1,
                        title: "Hello from Oasis !",
                        body: "This notification uses for test !",
                        sound: null,
                        smallIcon: "res://drawable/icon",
                        largeIcon: "res://drawable/icon",
                    },
                ],
            });

            toast.success("Notification Tested !");
        } catch (error) {
            toast.error("Error while sending notification !");
        }
    };

    const scheduleDrinkWaterNotification = async (nextTime) => {
        await LocalNotifications.schedule({
            notifications: [
                {
                    id: Date.now(),
                    title: "Drink Water Reminder 💧",
                    body: "It's time to drink some water!",
                    schedule: { at: nextTime },
                    sound: null,
                    smallIcon: "res://drawable/icon",
                    largeIcon: "res://drawable/icon"
                },
            ],
        });

    };

    function addOneHour(timeStr) {
        let [hours, minutes, seconds] = timeStr.split(":").map(Number);
        let now = new Date();
        now.setHours(hours, minutes, seconds, 0);
        now.setHours(now.getHours() + 1);
        return now;
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
                            <TabsTrigger value="reminder">Reminder</TabsTrigger>
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
                            <div className="space-y-2">
                                <p className="text-sm">Select the cup size of water you drink in.</p>
                                <div className="space-y-4">
                                    <div className="flex justify-center space-x-2">
                                        <Button
                                            onClick={() => setSelectedAmount(100)}
                                            className={`flex-1 justify-center rounded-[10px] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold ${selectedAmount === 100 ? 'bg-lime-200' : 'bg-[#bef264]'}`}
                                        >
                                            <Image src={'./../Cup_with_Straw.png'} width={20} height={20} alt="cup"></Image>100 ml
                                        </Button>
                                        <Button
                                            onClick={() => setSelectedAmount(250)}
                                            className={`flex-1 justify-center rounded-[10px] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold ${selectedAmount === 250 ? 'bg-lime-200' : 'bg-[#bef264]'}`}
                                        >
                                            <Image src={'./../Cup_with_Straw.png'} width={25} height={25} alt="cup"></Image>250 ml
                                        </Button>
                                        <Button
                                            onClick={() => setSelectedAmount(500)}
                                            className={`flex-1 justify-center rounded-[10px] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold ${selectedAmount === 500 ? 'bg-lime-200' : 'bg-[#bef264]'}`}
                                        >
                                            <Image src={'./../Cup_with_Straw.png'} width={28} height={28} alt="cup"></Image>500 ml
                                        </Button>

                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <Button
                                disabled={selectedAmount == 0}
                                onClick={() => handleWaterIntake()}
                                className="flex-1 w-full justify-center rounded-full bg-[#bef264] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold"
                            >
                                <Plus />
                                Add
                            </Button>
                        </TabsContent>
                        <TabsContent value="record">
                            <p className="text-xl font-bold">Your water intake history for today</p>
                            <br />
                            <div className="space-y-4">
                                {(waterIntakeRecord?.length > 0) ? (
                                    waterIntakeRecord.map((record, index) => (
                                        <div
                                            key={index}
                                            className="w-full rounded-lg p-4 bg-[#F4F4F5] dark:bg-[#101112] dark:hover:bg-[#1F2123] hover:bg-[#f2f4f7] text-black dark:text-white transition-transform hover:scale-105 cursor-pointer"
                                        >
                                            <div className="flex justify-between text-sm">
                                                <span>
                                                    {(record?.amount == 100) && (<Image src={'./../Cup_with_Straw.png'} className="inline-block mr-2" width={20} height={20} alt="cup"></Image>)}
                                                    {(record?.amount == 250) && (<Image src={'./../Cup_with_Straw.png'} className="inline-block mr-2" width={25} height={25} alt="cup"></Image>)}
                                                    {(record?.amount == 500) && (<Image src={'./../Cup_with_Straw.png'} className="inline-block mr-2" width={28} height={28} alt="cup"></Image>)}
                                                    {record?.amount} ml
                                                </span>
                                                <span>{record?.timestamp}</span>
                                            </div>
                                        </div>
                                    ))
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
                                )}</div>
                        </TabsContent>
                        <TabsContent value="reminder">
                            <p className="text-xl font-bold">Reminder</p>
                            <br />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="reminder-toggle font-bold">Hourly Reminders</Label>
                                    <p className="text-sm text-muted-foreground">Receive notifications to drink water</p>
                                </div>
                                <Switch id="reminder-toggle"
                                    checked={checked}
                                    onCheckedChange={async () => {
                                        setChecked((checked == true) ? (false) : (true))
                                        await oasisStorage.set("notification", (checked == true) ? (false) : (true))
                                        const waterRecordlength = waterIntakeRecord.length
                                        if ((waterRecordlength != 0) && await oasisStorage.get('notification')) {
                                            const lastTimeDrinkWater = waterIntakeRecord[(waterRecordlength - 1)].timestamp
                                            const nextNotificationTime = addOneHour(lastTimeDrinkWater)
                                            console.log(nextNotificationTime)
                                            scheduleDrinkWaterNotification(nextNotificationTime)
                                        }
                                    }}
                                />
                            </div>
                            <br />
                            <Alert>
                                <AlertTitle className={'font-bold'}>
                                    <InfoIcon className="w-4 h-4 mr-2 inline-block" />
                                    Note !
                                </AlertTitle>
                                <AlertDescription>
                                    - The notification will reset everyday
                                    <br />
                                    - It only will alrt until 10PM
                                </AlertDescription>
                            </Alert>
                            <br />
                            <Button
                                disabled={!checked}
                                onClick={() => TestNotification()}
                                className="flex-1 w-full justify-center rounded-full bg-[#bef264] py-1.5 px-3.5 font-medium tracking-tight text-black transition font-bold"
                            >
                                Test
                            </Button>
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
