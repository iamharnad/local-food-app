import { useEffect, useState } from 'react';
import dummyDishes from '../data/dummyDishes';
import DishCard from '../components/DishCard';
import Link from 'next/link';
import { getUserProfile } from '../data/userStore';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import withAuth from '@/utils/withAuth';
import { MdLocationOn } from 'react-icons/md';

function HomePage() {
  const [allDishes, setAllDishes] = useState([]);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  // 🔥 Load Firebase + Dummy dishes
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'dishes'));
        const firebaseDishes = snapshot.docs.map((doc) => doc.data());
        const updated = [...dummyDishes, ...firebaseDishes];
        setAllDishes(updated);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  // 🧍 Load user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const username = profile?.name || 'Guest';
  const hometown = profile?.hometown || 'hometown';

  return (
    <div className='min-h-screen flex flex-col justify-between bg-gray-100'>
      <main className='p-6'>
        {/* 💬 Enhanced Heading */}
        <div className='mb-4'>
          <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight'>
            Hi {username} 👋
          </h1>
          <div className='flex items-center text-sm sm:text-base text-gray-500 mt-1 gap-1'>
            <MdLocationOn className='text-red-500' />
            <span>{hometown}</span>
          </div>
        </div>

        <p className='mb-6 text-base sm:text-lg text-gray-700'>
          Ready to share something delicious today?
        </p>

        <Link href='/add-dish'>
          <button className='mb-8 px-5 py-2 bg-green-600 text-white text-sm sm:text-base rounded hover:bg-green-700 transition shadow'>
            + Add Your Dish
          </button>
        </Link>

        <h2 className='text-xl font-semibold mb-3 text-gray-800'>
          🍛 Featured Dishes
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {allDishes.map((dish, index) => (
            <DishCard key={index} dish={dish} />
          ))}
        </div>
      </main>

      <footer className='bg-white border-t p-4 text-center text-gray-600 text-sm'>
        <Link href='/profile' className='underline mr-4 hover:text-green-700'>
          👤 Profile
        </Link>
        <Link href='/my-dishes' className='underline mr-4 hover:text-green-700'>
          📋 My Dishes
        </Link>
        <button
          onClick={handleLogout}
          className='text-red-500 hover:text-red-600 underline'
        >
          🚪 Logout
        </button>
      </footer>
    </div>
  );
}

export default withAuth(HomePage);
