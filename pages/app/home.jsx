import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';
import AppGridLayout from '@/components/Home/functionList';
import ShinyText from '@/components/biteui/ShinnyText';
import Avatar from 'boring-avatars';

export default function Home() {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
      setUsername(storedUsername || null);
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
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border">


              <Avatar name={username} colors={["#D2D996", "#BFC772", "#FF5F71", "#FF8BA6", "#FF8AA5"]} variant="beam" size={64} />

            </div>
            <div>
              <h1 className="text-xl font-bold">{greeting}, {username} !</h1>

              <p className="text-sm text-lime-300">The sky is not the limit.</p>
            </div>
          </div>
          <AppGridLayout />
        </div>
      </div>

    </>

  );
}