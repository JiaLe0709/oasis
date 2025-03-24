import Image from "next/image";
import * as motion from "motion/react-client"
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';
//import ImageCarousel from "@/components/Home/imageCarousel";

export default function Home() {

  const images = [
    "icon.png",
    "summer.png",
    "autumn.png",
    "winter.png",
  ];

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState('');
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2650);
    return () => clearInterval(interval);
  }, [images.length])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {

    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
      const totalWaterIntake = await oasisStorage.get("totalWaterIntake")
      const waterIntakeRecord = await oasisStorage.get("waterIntakeRecord")

      if (totalWaterIntake == null && waterIntakeRecord == null) {
        oasisStorage.set("totalWaterIntake", 0)
        oasisStorage.set("waterIntakeRecord", [])
      }

      if (storedUsername) {
        setIsLoading(true);
        router.push('/app/home');
      } else {
        setUsername(storedUsername || null);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [router]);

  return (
    <>
      {isLoading ? (
        <>
        </>
      ) : (
        <>
          <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              {isMobile ? (
                <Image
                  src="/background.png"
                  alt="Background"
                  fill
                  priority
                  quality={100}
                  sizes="100vw"
                  className="object-cover"
                  style={{
                    objectPosition: "center center",
                    filter: "none",
                    WebkitFilter: "none",
                  }}
                />
              ) : (
                <Image
                  src="/background_desktop.png"
                  alt="Background"
                  fill
                  priority
                  quality={100}
                  sizes="100vw"
                  className="object-cover"
                  style={{
                    objectPosition: "center center",
                    filter: "none",
                    WebkitFilter: "none",
                  }}
                />
              )}
            </div>
            <div className="relative z-10 bg-[#fff5d9] rounded-3xl shadow-xl p-8 w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1.1, 1, 1.1, 1.1, 1],
                  rotate: [0, 0, 180, 180, 360, 360],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
              //animate={{ rotate: [0, 15, -15, 10, -10, 5, -5, 0] }}
              //transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  className="items-center w-30 h-30  border-2"
                  src={images[index]}
                  //src="/favicon.ico"
                  alt="logo"
                  width={160}
                  height={50}
                  priority
                />
              </motion.div>
              <h1 className="text-4xl text-black font-bold text-center">Oasis</h1>
              <p className="text-center text-gray-600">
                Like an{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  oasis
                </code>
                {" "}in a busy world, provides teenagers with the tools to stay healthy...
              </p>
              {username ?
                (<>
                  <motion.div
                  //animate={{ scale: [1.1, 1, 1.1] }}
                  //whileHover={{ scale: 1.2 }}
                  //whileTap={{ scale: 0.95 }}
                  //transition={{ duration: 0.45, repeat: Infinity }}
                  >
                    <button
                      className="rounded-full border   px-8 py-2 border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                      onClick={() => { router.push('/app/home') }}
                    >
                      <Image
                        //className="dark:invert"
                        src="/gift.gif"
                        alt="start"
                        width={20}
                        height={20}
                      />
                      Continue
                    </button>
                  </motion.div>
                </>)
                :
                (
                  <>
                    <motion.div
                    //animate={{ scale: [1.1, 1, 1.1] }}
                    //whileHover={{ scale: 1.2 }}
                    //whileTap={{ scale: 0.95 }}
                    //transition={{ duration: 0.45, repeat: Infinity }}
                    >
                      <button
                        className="rounded-full border  px-8 py-2 border-solid border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        onClick={() => { router.push('/app/init') }}
                      >
                        <Image
                          //className="dark:invert"
                          src="/gift.gif"
                          alt="start"
                          width={20}
                          height={20}
                        />
                        Get Started
                      </button>
                    </motion.div>
                  </>
                )}
            </div>
          </main>
        </>
      )}
    </>
  );
}
