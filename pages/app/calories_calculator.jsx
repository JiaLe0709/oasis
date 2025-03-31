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
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";

export default function CaloriesCalculator() {

    const [gender, setGender] = useState(null)
    const [suggestedCaloriesIntake, setSuggestedCaloriesIntake] = useState(0)

    const [calorieIntakeInMorning, setCalorieIntakeInMorning] = useState(0)
    const [calorieIntakeInAfternoon, setCalorieIntakeInAfternoon] = useState(0)
    const [calorieIntakeInNight, setCalorieIntakeInNight] = useState(0)
    const [calorieIntakeInTotal, setCalorieIntakeInTotal] = useState(0)
    const [calorieIntakeInRecord, setCalorieIntakeInRecord] = useState([])

    const [searchItem, setSearchItem] = useState('')

    useEffect(() => {
        async function fetchData() {

            // Obtain Data
            const gender = await oasisStorage.get("gender")
            const totalCaloriesIntake = await oasisStorage.get("totalCaloriesIntake")
            const caloriesIntakeRecord = await oasisStorage.get("caloriesIntakeRecord")
            const mon = await oasisStorage.get("caloriesIntakeInMorning")
            const aft = await oasisStorage.get("caloriesIntakeInAfternoon")
            const nit = await oasisStorage.get("caloriesIntakeInNight")

            // Constant Data is set [no matters is latest or not]
            setGender(gender)
            setCalorieIntakeInTotal(totalCaloriesIntake)
            setCalorieIntakeInRecord(caloriesIntakeRecord)
            setCalorieIntakeInMorning(mon || 0)
            setCalorieIntakeInAfternoon(aft || 0)
            setCalorieIntakeInNight(nit || 0)

        }

        //console.log(CaloriesList.fruits.map((item) => item.name).join(", "))
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

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const currentDate = `${day}/${month}/${year}`

    const handleAddCaloriesRecord = async (name, calories, imageUrl, cats) => {

        // Init Date
        const currentDate = new Date();
        console.log(cats)

        // Generate Timestamp
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();

        const dayCondition = (hours >= 6 && hours < 12) ? 'Morning' : (hours >= 12 && hours < 18) ? 'Afternoon' : 'Night'

        // get Array & set Array
        const caloriesIntakeRecord = (await oasisStorage.get("caloriesIntakeRecord")) || [];

        const newCaloriesRecord =
        {
            'timestamp': `${hours}:${minutes}:${seconds}`,
            'foodName': name,
            'amountIntake': calories,
            'day': dayCondition,
            'img': imageUrl,
            'types': cats
        }

        // Update Data
        oasisStorage.set("caloriesIntakeRecord", [...caloriesIntakeRecord, newCaloriesRecord])
        oasisStorage.set("caloriesIntakeDate", `${day}-${month}-${year}`)
        oasisStorage.set("totalCaloriesIntake", Number(calories + calorieIntakeInTotal))

        if (hours >= 6 && hours < 12) {
            setCalorieIntakeInMorning(calories + calorieIntakeInMorning)
            oasisStorage.set("caloriesIntakeInMorning", calories + calorieIntakeInMorning)
        } else if (hours >= 12 && hours < 18) {
            setCalorieIntakeInAfternoon(calories + calorieIntakeInAfternoon)
            oasisStorage.set("caloriesIntakeInAfternoon", calories + calorieIntakeInAfternoon)
        } else {
            setCalorieIntakeInNight(calories + calorieIntakeInNight)
            oasisStorage.set("caloriesIntakeInNight", calories + calorieIntakeInNight)
        }

        // Update State
        setCalorieIntakeInTotal(calories + calorieIntakeInTotal)
        setCalorieIntakeInRecord([...caloriesIntakeRecord, newCaloriesRecord])

        toast.success('Reacord Added Successfully !')
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
                            <TabsTrigger value="record">Record</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <br />
                            <div className="text-center">
                                <h3 className={`text-4xl font-bold ${(calorieIntakeInTotal > suggestedCaloriesIntake) ? ('text-red-600') : ('text-lime-500 dark:text-lime-300')}`}>{Number(calorieIntakeInTotal).toFixed(2)} kcal</h3>
                                <p className=" text-gray-500 dark:text-gray-400">of {suggestedCaloriesIntake} kcal</p>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-bold"> </span>
                                <Popover side="top">
                                    <PopoverTrigger>
                                        <div className="dark:bg-[#1C1C1C] bg-[#F9FBF8] backdrop-blur-[10px] p-2 rounded-lg justify-center flex items-center gap-2">
                                            <Image src={'.././Cookie.png'} width={28.5} height={28.5} alt="cookie" /><span className="font-bold">x {Math.round(Number(calorieIntakeInTotal / 150))}</span>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent side="top">
                                        {"1 🍪 ≈ 150 kcal"}
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <br />
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-bold">Calories Intake ({currentDate})</span>
                                    <span>{(calorieIntakeInTotal / suggestedCaloriesIntake * 100) >= 100 ? (100) : (Number(calorieIntakeInTotal / suggestedCaloriesIntake * 100).toFixed(2))} %</span>
                                </div>
                                <Progress value={(calorieIntakeInTotal / suggestedCaloriesIntake * 100) >= 100 ? (100) : ((calorieIntakeInTotal / suggestedCaloriesIntake * 100))} className="h-3" />
                            </div>
                            <br />
                            <div className="grid backdrop-blur-xs grid-cols-3 gap-2 text-center text-sm bg-cover bg-no-repeat bg-center  bg-[url('/DAN.png')] bg-[length:100%_100%] rounded-md p-1">
                                <div className="rounded-md bg-muted p-2">
                                    <div className="font-bold text-black">Morning</div>
                                    <div className="font-bold text-black">{calorieIntakeInMorning.toFixed(2)} kcal</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                    <div className="font-bold text-black">Afternoon</div>
                                    <div className="font-bold text-black">{calorieIntakeInAfternoon.toFixed(2)} kcal</div>
                                </div>
                                <div className="rounded-md bg-muted p-2">
                                    <div className="font-bold">Night</div>
                                    <div className="font-bold">{calorieIntakeInNight.toFixed(2)} kcal</div>
                                </div>
                            </div>
                            <br />
                            <Input
                                value={searchItem}
                                className={'dark:border-lime-300 border-lime-500'}
                                placeholder="Item you want to find"
                                required
                                id="water"
                                variant="secondary"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearchItem(value);
                                }}
                            />
                            <br />
                            <ScrollArea className="h-[500px] rounded-md p-4">
                                {Object.entries(CaloriesList.type)
                                    .map(([category, items]) => {
                                        const filteredItems = items.filter(item =>
                                            item.name.toLowerCase().includes(searchItem.toLowerCase())
                                        );

                                        if (filteredItems.length === 0) return null;

                                        let types = ''
                                        if (category == '🍋‍🟩 Fruits') {
                                            types = 'Fruits'
                                        } else if (category == '🥬 Vegetables') {
                                            types = 'Vegetables'
                                        } else if (category == '🥩 Meat & Protein') {
                                            types = 'Meat'
                                        } else if (category == '🍚 Grains & Cereals') {
                                            types = 'Grains'
                                        }

                                        return (
                                            <div key={category} className="mb-4">
                                                <h2 className="text-2xl font-bold capitalize mb-2">{category}</h2>
                                                <br />
                                                <div className="space-y-2">
                                                    {filteredItems.map((item, key) => (
                                                        <div key={key} className={`flex items-center space-y-2 justify-between`}>
                                                            <div className="flex items-center space-x-2">
                                                                <Image
                                                                    alt={item.name}
                                                                    className="h-15 w-15 rounded-md"
                                                                    height="60"
                                                                    src={`https://cdn.jsdelivr.net/gh/timeless-projects/cdn@latest/Oasis/${types}/${item.image}`}
                                                                    style={{
                                                                        aspectRatio: "60/60",
                                                                        objectFit: "cover",
                                                                    }}
                                                                    width="60"
                                                                />
                                                                <div>
                                                                    <div className="text-lg font-bold">{item.name}</div>
                                                                    <div className="text-sm">{item.calories} kcal / 100g</div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Button
                                                                    className={'dark:bg-[#1C1C1C] bg-[#F9FBF8] backdrop-blur-[10px] p-2 rounded-lg'}
                                                                    onClick={
                                                                        () => {
                                                                            handleAddCaloriesRecord(item.name, item.calories, item.image, types)
                                                                        }
                                                                    }
                                                                >
                                                                    <Plus className=" h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="record">
                            <br />
                            <p className="text-xl font-bold">Your calories intake history for today</p>
                            <br />
                            <ScrollArea className="h-[450px] rounded-md p-4">
                                <div className="space-y-4">
                                    {(calorieIntakeInRecord?.length > 0) ? (
                                        calorieIntakeInRecord
                                            .map((record, index) => (
                                                <div
                                                    key={index}
                                                    className="w-full rounded-lg p-4 bg-[#F4F4F5] dark:bg-[#101112] dark:hover:bg-[#1F2123] hover:bg-[#f2f4f7] text-black dark:text-white transition-transform hover:scale-105 cursor-pointer"
                                                >
                                                    <div className="flex justify-between text-sm">
                                                        <span className="font-bold">
                                                            <Image
                                                                alt={record?.foodName}
                                                                className="h-12 w-12 rounded-md inline-block mr-2"
                                                                height="60"
                                                                src={`https://cdn.jsdelivr.net/gh/timeless-projects/cdn@latest/Oasis/${record?.types}/${record?.img}`}
                                                                style={{
                                                                    aspectRatio: "60/60",
                                                                    objectFit: "cover",
                                                                }}
                                                                width="60"
                                                            />
                                                            {record?.foodName} ({record?.amountIntake} kcal / 100g)
                                                        </span>
                                                        <span className="text-center justify-center flex inline-block">{record?.timestamp}</span>
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
                                                No Record Found !
                                            </p>
                                            <br />
                                        </>
                                    )}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                    <br />
                    <footer className="flex items-center justify-center  p-4 text-xs text-gray-500 dark:text-gray-400">
                        <InfoIcon className="mr-2 h-4 w-4" />
                        <span>The calories intake suggestion is just a reference.</span>
                    </footer>
                </div>
            </div >
        </>
    );
}
