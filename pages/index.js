import Image from "next/image";
import * as motion from "motion/react-client"
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';
import ImageCarousel from "@/components/Home/imageCarousel";

export default function Home() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState('');

  useEffect(() => {

    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
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
          <ImageCarousel />
          <div
            className={`justify-items-center  sm:p-2`}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 10, -10, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                className="items-center  border-2"
                src="/icon.png"
                alt="logo"
                width={200}
                height={42}
                priority
              />
            </motion.div>
            <br />
            <h1 className="text-5xl font-bold ">Oasis</h1>
            <ul className="list-inside  text-sm text-center sm:text-left">
              <li className="mb-2 p-8">
                Like an{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  oasis
                </code>
                {" "}in a busy world, provides teenagers with the tools to stay healthy...
              </li>
            </ul>
            {username ?
            (<>
              <motion.div
              //animate={{ scale: [1.1, 1, 1.1] }}
              //whileHover={{ scale: 1.2 }}
              //whileTap={{ scale: 0.95 }}
              //transition={{ duration: 0.45, repeat: Infinity }}
              >
                <button
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
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
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
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
        </>
      )}
    </>
  );
}
