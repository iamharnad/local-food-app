import { signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔍 Check if user profile already exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // ✅ Profile exists → redirect to home or intended page
        router.push(router.query.redirect || '/home');
      } else {
        // ❌ Profile missing → redirect to profile setup
        router.push('/profile-setup');
      }
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-200 flex items-center justify-center p-4'>
      <div className='bg-white shadow-xl rounded-lg p-8 max-w-xl w-full text-center space-y-6'>
        <h1 className='text-3xl font-extrabold text-gray-800'>
          🍲 Welcome to Local Food Connect
        </h1>
        <p className='text-gray-600'>
          Discover and share authentic dishes from your hometown with foodies
          across the world. Connect through flavors, memories, and stories — one
          dish at a time.
        </p>

        <img
          src='https://food.annapurnaderoyal.com/wp-content/uploads/2021/07/pesaratu-1.jpg'
          alt='Food illustration'
          className='rounded-md w-full h-48 object-cover'
        />

        <button
          onClick={handleGoogleSignIn}
          className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md text-lg transition'
        >
          Sign in with Google 🍽️
        </button>

        <p className='text-sm text-gray-500'>
          Your foodie passport to every corner of India 🍛
        </p>
      </div>
    </div>
  );
}
