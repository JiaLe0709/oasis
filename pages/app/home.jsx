import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';
import AppGridLayout from '@/components/Home/functionList';
import Avatar from 'boring-avatars';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/router';
import * as motion from "motion/react-client"

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');
  const [bmi, setBmi] = useState(null)
  const [bodyStatus, setBodyStatus] = useState(null)

  const [routerEvent, setRouterEvent] = useState('')

  // Confetti animation
  const duration = 3.2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const [intervalId, setIntervalId] = useState(null);

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

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
    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
      const bmiValue = await oasisStorage.get('bmi');

      setUsername(storedUsername || null)
      setBmi(bmiValue || null)
    }

    if (bmi < 18.5) {
      setBodyStatus("Underweight")
    } else if (bmi >= 18.5 || bmi <= 24.9) {
      setBodyStatus('Normal Weight')
    } else if (bmi >= 25 || bmi <= 29.9) {
      setBodyStatus('Overweight')
    } else if (bmi >= 30 || bmi <= 34.9) {
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

    fetchData();
  }, [oasisStorage, bmi]);

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
              <p className="text-sm dark:text-lime-300 text-lime-500 font-bold">The sky is not the limit.</p>
            </div>
          </div>
          <div className=" bg-gradient-to-r from-lime-300 via-lime-200 to-emerald-50  dark:bg-gradient-to-l dark:from-lime-400 dark:via-lime-300 dark:to-lime-200 dark:text-black  rounded-lg p-4 flex justify-between">
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
            <div className="flex flex-col items-center">
              <span className="font-bold">298232</span>
              <span className="text-xs text-gray-400">Value</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">832342234</span>
              <span className="text-xs text-gray-400">L</span>
            </div>
          </div>
          <AppGridLayout />
        </div>
      </div>

    </>

  );
}