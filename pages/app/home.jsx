import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';
import AppGridLayout from '@/components/Home/functionList';
import Avatar from 'boring-avatars';

export default function Home() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
      if (storedUsername) {
        setUsername(storedUsername || null);
      }
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
  }, []);

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
              <p className="text-sm dark:text-lime-300 text-lime-600 font-bold">The sky is not the limit.</p>
            </div>
          </div>
          <div className=" bg-lime-300 dark:text-black  rounded-lg p-4 flex justify-between">
            <div className="flex  flex-col items-center">
              <span className="font-bold">34h23m</span>
              <span className="text-xs text-gray-400">Time</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">298</span>
              <span className="text-xs text-gray-400">Value</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">832</span>
              <span className="text-xs text-gray-400">L</span>
            </div>
          </div>
          <AppGridLayout />
        </div>
      </div>

    </>

  );
}