import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { InfoIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function Bmi() {

    const router = useRouter();

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBmi] = useState(0);

    const calculateBmi = () => {
        setBmi((weight / (height * height)).toFixed(2));
    }

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px]   justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
            <h1 className="text-6xl font-[family-name:var(--font-geist-mono)]">BMI</h1>
            <ul className="list-inside  text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2">
                    <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                        Body Mass Index (BMI)
                    </code>
                    {" "}is commonly used as a screening tool to categorize individuals into different weight ranges, such as underweight, normal weight, overweight, and obesity.
                </li>
            </ul>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
            <div>
            <Label htmlFor='name'>Name</Label>
            <Input required id='name' name='name' type="text" placeholder="Name" />
          </div>
          <div>
            <Label htmlFor='mail'>Email</Label>
            <Input id='mail' required name='email' type="email" placeholder="Email" />
          </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
            </div>
            <footer className="flex items-center justify-center  p-4 text-xs text-gray-500 dark:text-gray-400">
                <InfoIcon className="mr-2 h-4 w-4" />
                <span>BMI is a screening tool, not a diagnostic of body fatness or health.</span>
            </footer>
        </div>
    );
}
