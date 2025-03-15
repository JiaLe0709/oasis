import { useEffect, useState } from 'react';
import oasisStorage from '@/lib/storage';

export default function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function fetchData() {
      const storedUsername = await oasisStorage.get('username');
      setUsername(storedUsername || null);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Stored Username: {username}</h2>
    </div>
  );
}