import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const statesAndCities = {
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad'],
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Hubli'],
  TamilNadu: ['Chennai', 'Coimbatore', 'Madurai'],
  AndhraPradesh: ['Vijayawada', 'Visakhapatnam', 'Guntur'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
};

export default function ProfileSetup() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');

  const cities = state ? statesAndCities[state] || [] : [];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        router.replace('/login');
        return;
      }

      setUser(firebaseUser);
      setName(firebaseUser.displayName || '');
      setLoading(false);

      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        router.replace('/home');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userProfile = {
      name,
      state,
      city,
      bio,
      email: user.email,
      photoURL: user.photoURL || '',
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'users', user.uid), userProfile);
      router.push('/home');
    } catch (error) {
      console.error('❌ Error saving profile:', error.message);
    }
  };

  if (loading) return <p className='p-6'>Loading...</p>;

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded shadow-md w-full max-w-md space-y-4'
      >
        <h2 className='text-xl font-bold'>👤 Set up your Profile</h2>

        <input
          type='text'
          placeholder='Full Name'
          className='w-full p-2 border rounded'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setCity('');
          }}
          required
          className='w-full p-2 border rounded'
        >
          <option value=''>Select State</option>
          {Object.keys(statesAndCities).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={!state}
          className='w-full p-2 border rounded'
        >
          <option value=''>Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <textarea
          placeholder='Short bio or food memory'
          className='w-full p-2 border rounded'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
        />

        <button
          type='submit'
          className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700'
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
