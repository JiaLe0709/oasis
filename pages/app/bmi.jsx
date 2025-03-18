import { useRouter } from "next/router";
import { useState } from "react";
import { InfoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


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
                    {" "}BMI Calculator
                </h1>
                <Drawer>
                    <DrawerTrigger>Open</DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>This action cannot be undone.</DrawerDescription>
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
            </div>
        </>
    );
}
