import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';
import AppGridLayout from '@/components/Home/functionList';
import Avatar from 'boring-avatars';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';
import { Scale, ChevronRight } from "lucide-react"
import Image from 'next/image';
import { Tips } from '@/lib/tips';

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');
  const [bmi, setBmi] = useState(null)
  const [bodyStatus, setBodyStatus] = useState(null)
  const [waterIntake, setWaterIntake] = useState(null)
  const [caloriesIntake, setCaloriesIntake] = useState(null)
  const [gender, setGender] = useState(null)
  const [suggestedWaterIntake, setSuggestedWaterIntake] = useState(0)
  const [suggestedCaloriesIntake, setSuggestedCaloriesIntake] = useState(0)

  const [routerEvent, setRouterEvent] = useState('')

  const [tips, setTips] = useState("Laughter is the best medicine 😂")

  // Confetti animation
  const duration = 3.2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const [intervalId, setIntervalId] = useState(null);

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Handle condition activate confetti animation
  useEffect(() => {
    if (routerEvent == 'success') {
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(intervalId);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      setIntervalId(interval);

      return () => {
        clearInterval(interval);
      };
    }
  }, [routerEvent])

  useEffect(() => {
    const { event } = router.query;
    if (event !== undefined) {
      setRouterEvent(event)
    }
  }, [router])

  useEffect(() => {
    let index = 0;

    const loop = setInterval(() => {
      setTips(Tips[index]);
      index = (index + 1) % Tips.length;
    }, 3500);

    return () => clearInterval(loop);
  }, [])

  // Init Data
  useEffect(() => {
    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
      const bmiValue = await oasisStorage.get('bmi');
      const dbtotalWaterIntake = await oasisStorage.get("totalWaterIntake")
      const gender = await oasisStorage.get("gender")
      const waterIntakeDate = await oasisStorage.get("WaterIntakeDate")
      const totalCaloriesIntake = await oasisStorage.get("totalCaloriesIntake")
      const caloriesIntakeDate = await oasisStorage.get("caloriesIntakeDate")

      if (waterIntakeDate) {
        // Handle Date
        const [day, month, year] = waterIntakeDate.split("-").map(Number);
        const storedDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Handle Update based on Date
        if (storedDate.getTime() === currentDate.getTime()) {
          setWaterIntake(dbtotalWaterIntake || null)
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
          setWaterIntake(0)
        }
      }

      if (caloriesIntakeDate) {
        // Handle Date
        const [day, month, year] = caloriesIntakeDate.split("-").map(Number);
        const storedDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Handle Update based on Date

        if (storedDate.getTime() === currentDate.getTime()) {
          if (totalCaloriesIntake) { setCaloriesIntake(totalCaloriesIntake.toFixed(2) || null) }

        } else {
          // Init Date format (latest)
          const currentDayOfMonth = currentDate.getDate();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();
          const date = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

          // remove(set) old data (update to latest....)
          await oasisStorage.set("caloriesIntakeDate", date)
          await oasisStorage.set("totalCaloriesIntake", 0)
          await oasisStorage.set("caloriesIntakeRecord", [])
          await oasisStorage.set("caloriesIntakeInMorning", 0)
          await oasisStorage.set("caloriesIntakeInAfternoon", 0)
          await oasisStorage.set("caloriesIntakeInNight", 0)

          // Update State (latest)
          setCaloriesIntake(0)
        }
      }

      setUsername(storedUsername || null)
      setBmi(bmiValue || null)
      setGender(gender || null)
    }

    if (bmi < 18.5) {
      setBodyStatus("Underweight")
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBodyStatus('Normal Weight')
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBodyStatus('Overweight')
    } else if (bmi >= 30 && bmi <= 34.9) {
      setBodyStatus('Obesity')
    } else if (bmi > 35) {
      setBodyStatus('Extreme Obese')
    }

    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    if (gender == '') {
      setSuggestedWaterIntake(3000)
      setSuggestedCaloriesIntake(2600)
    } else if (gender == 'Boy') {
      setSuggestedCaloriesIntake(2800)
      setSuggestedWaterIntake(3300)
    } else if (gender == 'Girl') {
      setSuggestedCaloriesIntake(2400)
      setSuggestedWaterIntake(2400)
    } else {
      setSuggestedCaloriesIntake(2600)
      setSuggestedWaterIntake(3000)
    }

    fetchData();
  }, [oasisStorage, bmi, gender]);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center gap-4 mt-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ">
              <Avatar
                name={username || ''}
                //colors={["#d2fae2", "#e6f8b1", "#f6d5ad", "#f6b794", "#e59da0"]}
                //colors={["#D2D996", "#BFC772", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
                colors={["#e6f8b1", "#BBF451", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
                variant="beam"
                size={64} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{greeting}, {username} !</h1>
              <p className="text-sm dark:text-lime-300 text-lime-500 font-bold">{tips}</p>
            </div>
          </div>
          <div className="space-y-6 border-lg border-gray-800  p-2 ">
            <div className="grid grid-cols-3 gap-4">
              <div
                className="flex flex-col"
                onClick={() => { router.push('/app/bmi') }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-bold">BMI</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-semibold">{bmi && ((bmi.toString()).length > 7) ? (`${(bmi.toString()).slice(0, 7) + "..."}`) : (bmi) || '-'}</div>
                  <div className="text-sm  text-stone-800 dark:text-gray-400">{bmi ? bodyStatus : "Measure now !"}</div>
                </div>
              </div>
              <div
                className="flex flex-col"
                onClick={() => { router.push('/app/water_tracker') }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="./../Droplet.png" className='h-5 w-5' height={35} width={35} alt="profile" />
                    <span className="text-sm font-bold">Hydration</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-semibold">
                    {waterIntake ? (
                      ((waterIntake.toString()).length > 7) ? (`${(waterIntake.toString()).slice(0, 7) + "..."}`) : (waterIntake)

                    ) : (
                      0
                    )
                    }
                  </div>
                  <div className="text-sm  text-stone-800 dark:text-gray-400">
                    {waterIntake ? (`of ${suggestedWaterIntake} ml`) || null : "Drink Now !"}
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col"
                onClick={() => { router.push('/app/calories_calculator') }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image src="./../Fire.png" className='h-5 w-5' height={35} width={35} alt="profile" />
                    <span className="text-sm font-bold">Calories</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-semibold">
                    {caloriesIntake ? (
                      ((caloriesIntake.toString()).length > 7) ? (`${(caloriesIntake.toString()).slice(0, 7) + "..."}`) : (caloriesIntake)

                    ) : (
                      0
                    )
                    }
                  </div>
                  <div className="text-sm  text-stone-800 dark:text-gray-400">{caloriesIntake ? (`of ${suggestedCaloriesIntake} kcal`) || null : "Measure now !"}</div>
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-between"
              onClick={() => { router.push('/app/profile') }}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <Image src="./../Beating_Heart.png" height={35} width={35} alt="profile" />
                </div>
                <span>Health Profile</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          {/*<div className=" bg-gradient-to-r from-lime-300 via-lime-200 to-emerald-50  dark:bg-gradient-to-l dark:from-lime-400 dark:via-lime-300 dark:to-lime-200 dark:text-black  rounded-lg p-4 flex justify-between">
            <div
              onClick={() => { router.push('/app/bmi') }}
              className="flex  flex-col items-center">
              <span className="font-bold">
                {bmi ?
                  (bmi) :
                  (
                    <>
                      <span className='text-sm font-bold'>Get Now !</span>
                    </>
                  )}
              </span>
              {bmi ?
                (
                  <>
                    <span className='text-xs font-bold'>{bodyStatus || null}</span>
                  </>
                ) :
                (
                  <>
                    <span className='text-xs font-bold'>BMI</span>
                  </>
                )}
            </div>
            <div
              onClick={() => { router.push('/app/water_tracker') }}
              className="flex flex-col items-center"
            >
              <span className="font-bold">{waterIntake ? (`${waterIntake} ml`) : (<span className='text-sm font-bold'>Drink Now !</span>)}</span>
              <span className="text-xs ">
                {waterIntake ? (
                  <>
                    <span className='text-xs font-bold text-gray-900 dark:text-gray-800'>{(`of ${suggestedWaterIntake} ml`) || null}</span>
                  </>
                ) : (
                  <>
                    <span className='text-xs font-bold'>Water Tracker</span>
                  </>
                )
                }
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">832342234</span>
              <span className="text-xs text-gray-400">L</span>
            </div>
          </div>*/}
          <AppGridLayout />
          <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />
          <footer className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
            <Image alt='Jia Le' height={80} width={150} className='invert dark:invert-0' src='./../jiale.png' />
          </footer>
          <br />
          <div className="flex items-center justify-center gap-2 -mt-8 relative">
            <div className="-mt-4 ">
              <Image alt='Jia Mun' height={30} width={100} className='invert dark:invert-0' src='./../jiamun.png' />
            </div>
            <div className="-mt-4 ">
              <Image alt='Ruiqi' height={30} width={100} className='invert dark:invert-0' src='./../ruiqi.png' />
            </div>
          </div>

        </div>
      </div>

    </>

  );
}