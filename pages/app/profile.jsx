import Avatar from 'boring-avatars';
import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';
import { useRouter } from 'next/router';
import BackBtn from '@/components/Home/backBtn';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const Profile = () => {

    const router = useRouter()

    // Profile
    const [username, setUsername] = useState('')
    const [gender, setGender] = useState('')
    const [weight, setWeight] = useState('')
    const [height, setHeight] = useState('')
    const [bloodType, setBloodType] = useState('')
    const [dob, setDob] = useState('')
    const [YearOfDOB, setYearofDOB] = useState('')
    const [od, setOD] = useState('No')

    // BMI
    const [bmi, setBmi] = useState('')
    const [bodyStatus, setBodyStatus] = useState('')
    const [advice, setAdvice] = useState('')

    useEffect(() => {
        async function fetchData() {
            const username = await oasisStorage.get('username')
            const weight = await oasisStorage.get('weight')
            const height = await oasisStorage.get('height')
            const gender = await oasisStorage.get('gender')
            const bloodType = await oasisStorage.get('bloodType')
            const dob = await oasisStorage.get('dob')
            const od = await oasisStorage.get('organDonor')

            const bmi = await oasisStorage.get('bmi')

            setUsername(username)
            setGender(gender)
            setHeight(height)
            setWeight(weight)
            setBloodType(bloodType)
            setDob(dob)
            setOD(od)

            setBmi(bmi)
        }

        fetchData()

    }, [oasisStorage])

    useEffect(() => {

        if (bmi < 18.5) {
            setBodyStatus("Underweight");
            setAdvice("Eat a balanced diet with more calories to reach a healthier weight.");
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            setBodyStatus("Normal Weight");
            setAdvice("Well done! Maintain a balanced diet and stay active for good health.");
        } else if (bmi >= 25 && bmi <= 29.9) {
            setBodyStatus("Overweight");
            setAdvice("Exercise regularly and eat healthy foods to manage your weight effectively.");
        } else if (bmi >= 30 && bmi <= 34.9) {
            setBodyStatus("Obesity");
            setAdvice("Focus on healthy eating and physical activity to improve your well-being.");
        } else if (bmi > 35) {
            setBodyStatus("Extreme Obese");
            setAdvice("Seek medical advice and adopt a healthier lifestyle for better long-term health.");
        }
    }, [bmi])

    useEffect(() => {
        setBmi((weight / (height * height)).toFixed(2))
    }, [weight, height])

    useEffect(() => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (regex.test(dob)) {
            const DOB = new Date(dob)
            const YearOfDOB = DOB.getFullYear()
            setYearofDOB(YearOfDOB)
        } else {
            setYearofDOB('')
        }
    }, [dob])

    const d = new Date();
    const year = d.getFullYear();

    return (
        <>
            <div className="container max-w-md mx-auto px-4 py-4">
                <div className="mr-8 flex">
                    <BackBtn />
                </div>
                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-full">
                        <Avatar
                            name={username || ''}
                            //colors={["#d2fae2", "#e6f8b1", "#f6d5ad", "#f6b794", "#e59da0"]}
                            //colors={["#D2D996", "#BFC772", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
                            colors={["#e6f8b1", "#BBF451", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
                            variant="beam"
                            size={128} />
                    </div>
                    <br />
                </div>
                {<h1 className='text-2xl font-bold text-center'>{username || null}</h1>}
                <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />
                <Tabs defaultValue="hd" className="">
                    <TabsList className={'bg-[#F4F4F5] dark:bg-[#27272A] w-full'}>
                        <TabsTrigger value="hd">Health Details</TabsTrigger>
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                    </TabsList>
                    <TabsContent value="hd">
                        <br />
                        <h2 className='text-xl font-bold'>Health Details</h2>
                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                            </div>
                            <div className="flex items-center">
                                {username || '-'}
                            </div>

                        </div>
                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="name" className="text-right">
                                    Gender
                                </Label>
                            </div>
                            <div className="flex items-center">
                                {gender || '-'}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="dob" className="text-right">
                                    Date of Birth (MM/DD/YYYY)
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <span className='mr-2'>{dob || '-'}</span>
                                {YearOfDOB && (<span>({year - YearOfDOB})</span>)}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="bt" className="text-right">
                                    Blood Type
                                </Label>
                            </div>
                            <div className="flex items-center">
                                {bloodType || '-'}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="wt" className="text-right">
                                    Weight (kg)
                                </Label>
                            </div>
                            <div className="flex items-center">
                                {weight || '-'}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="ht" className="text-right">
                                    Height (m)
                                </Label>
                            </div>
                            <div className="flex items-center">
                                {height || '-'}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="name" className="text-right">
                                    Organ Donar
                                </Label>
                            </div>
                            <div className="flex items-center">
                                {od ? (od == 'No' ? (<span className='font-bold text-red-500'>No</span>) : (<span className='font-bold dark:text-lime-300 text-lime-500 '>Yes</span>)) : '-'}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="edit">
                        <br />
                        <h2 className='text-xl font-bold'>Health Details</h2>
                        <p className='text-sm'>The details will be auto saved.</p>
                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    type={'text'}
                                    id="name"
                                    value={username}
                                    autoComplete="off"
                                    placeholder="Enter your name"
                                    onChange={(e) => {
                                        oasisStorage.set('username', e.target.value)
                                        setUsername(e.target.value)
                                    }}
                                    className="col-span-3"
                                />
                            </div>

                        </div>
                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="name" className="text-right">
                                    Gender
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <div className="flex h-5 items-center space-x-4 text-sm">
                                    <div
                                        className={`${gender == "Boy" && ('dark:text-lime-300 text-lime-500 font-bold')}`}
                                        onClick={() => {
                                            setGender('Boy')
                                            oasisStorage.set("gender", 'Boy')
                                        }}
                                    >
                                        Boy
                                    </div>
                                    <Separator orientation="vertical" />
                                    <div
                                        className={`${gender == "Girl" && ('dark:text-lime-300 text-lime-500 font-bold')}`}
                                        onClick={() => {
                                            setGender('Girl')
                                            oasisStorage.set("gender", 'Girl')
                                        }}
                                    >
                                        Girl
                                    </div>
                                    <Separator orientation="vertical" />
                                    <div
                                        className={`${gender == "" && ('dark:text-lime-300 text-lime-500 font-bold')}`}
                                        onClick={() => {
                                            setGender('')
                                            oasisStorage.set("gender", '')
                                        }}
                                    >
                                        -
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="dob" className="text-right">
                                    Date of Birth (M/D/Y)
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    id="dob"
                                    type={'date'}
                                    defaultValue={dob}
                                    autoComplete="off"
                                    placeholder="mm/dd/yyyy"
                                    onChange={(e) => {
                                        oasisStorage.set('dob', e.target.value)
                                        setDob(e.target.value)
                                    }}
                                    className="col-span-3 mr-2"
                                />
                                {YearOfDOB && (<span>({year - YearOfDOB})</span>)}
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="bt" className="text-right">
                                    Blood Type
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    type={'text'}
                                    id="bt"
                                    defaultValue={bloodType}
                                    autoComplete="off"
                                    placeholder="Your blood type"
                                    onChange={(e) => {
                                        oasisStorage.set('bloodType', e.target.value)
                                        setBloodType(e.target.value)
                                    }}
                                    className="col-span-3"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="wt" className="text-right">
                                    Weight (kg)
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    type={'number'}
                                    id="wt"
                                    step="0.01"
                                    defaultValue={weight}
                                    autoComplete="off"
                                    placeholder="...kg"
                                    onChange={(e) => {
                                        oasisStorage.set('weight', e.target.value)
                                        setWeight(e.target.value)
                                    }}
                                    className="col-span-3"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="ht" className="text-right">
                                    Height (m)
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    id="ht"
                                    type={'number'}
                                    step="0.01"
                                    defaultValue={height}
                                    autoComplete="off"
                                    placeholder="...m"
                                    onChange={(e) => {
                                        oasisStorage.set('height', e.target.value)
                                        setHeight(e.target.value)
                                    }}
                                    onBlur={(e) => {
                                        if (e.target.value) {
                                            setHeight(parseFloat(e.target.value).toFixed(2));
                                        }
                                    }}
                                    className="col-span-3"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="text-sm font-medium">
                                <Label htmlFor="name" className="text-right">
                                    Organ Donar
                                </Label>
                            </div>
                            <div className="flex items-center">
                                <div className="flex h-5 items-center space-x-4 text-sm">
                                    <div
                                        className={`${od == "Yes" && ('dark:text-lime-300 text-lime-500 font-bold')}`}
                                        onClick={() => {
                                            setOD('Yes')
                                            oasisStorage.set("organDonor", 'Yes')
                                        }}
                                    >
                                        Yes
                                    </div>
                                    <Separator orientation="vertical" />
                                    <div
                                        className={`${od == "No" && ('text-red-500 font-bold')}`}
                                        onClick={() => {
                                            setOD('No')
                                            oasisStorage.set("organDonor", 'No')
                                        }}
                                    >
                                        No
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />
                <h2 className='text-xl font-bold'>💡 Info</h2>
                <PhotoProvider>
                    <PhotoView src="./../hp.png">
                        <div className="flex justify-center items-center">
                            <Image
                                alt="HealthProfile"
                                className="rounded-lg"
                                height="85"
                                src="./../hp.png"
                                width="250"
                            />
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <br />
                <p className='text-sm font-bold'>
                    If the patient has an existing health profile, it <span className="text-lime-500 font-bold dark:text-lime-300">allowing the rescue team to operate immediately</span> with essential medical information.
                </p>

                {/* bmi && (
                    <>
                        <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />
                        <div className="space-y-4" onClick={() => router.push('/app/bmi')}>
                            <Card>
                                <CardContent className="">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium">BMI Status</h3>
                                            <p className="text-sm text-muted-foreground mt-1">Body Mass Index</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-3xl font-bold text-primary">{bmi}</span>
                                            <p className="text-sm font-medium text-green-600">{bodyStatus}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm mt-3 ">
                                        {advice}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )*/}
            </div>
        </>
    )
}

export default Profile