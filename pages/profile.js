import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p className='p-6 text-center'>Loading...</p>;

  if (!profile) {
    return (
      <div className='p-6'>
        <h2 className='text-xl font-bold mb-2'>Profile not found</h2>
        <p className='text-gray-600'>
          Please{' '}
          <span
            className='text-blue-500 underline cursor-pointer'
            onClick={() => router.push('/profile-setup')}
          >
            set up your profile
          </span>
          .
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };
  return (
    <div className='min-h-screen p-6 bg-gray-50'>
      <h1 className='text-2xl font-bold mb-4'>👤 Your Profile</h1>
      <div className='bg-white p-4 rounded shadow-md'>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Location:</strong> {profile.location}
        </p>
        <p>
          <strong>Bio:</strong> {profile.bio || 'No bio yet'}
        </p>
      </div>
      <footer className='bg-white border-t p-4 text-center text-gray-600'>
        <Link href='/home' className='underline mr-4'>
          👤 Home
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
