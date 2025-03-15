import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import * as motion from "motion/react-client"
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const router = useRouter();

  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
      setUsername(storedUsername || null);
    }
    fetchData();
  }, []);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px]   justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 10, -10, 5, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          className="items-center"
          src="/icon.png"
          alt="logo"
          width={180}
          height={38}
          priority
        />
      </motion.div>
      <br />
      <h1 className="text-6xl font-[family-name:var(--font-geist-mono)]">Oasis</h1>
      <ul className="list-inside  text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Like an{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            oasis
          </code>
          {" "}in a busy world, provides teenagers with the tools to stay healthy...
        </li>
      </ul>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        {username ?
          (<>
            <motion.div
              animate={{ scale: [1.1, 1, 1.1] }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.45, repeat: Infinity }}
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
                animate={{ scale: [1.1, 1, 1.1] }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.45, repeat: Infinity }}
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
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            onClick={() => { router.push('/about') }}
          >
            <Image
              className="mr-2 h-4 w-4"
              src="/Desert_Island.png"
              alt="start"
              width={20}
              height={20}
            />
            About Oasis
          </button>
        </motion.div>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
