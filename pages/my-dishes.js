// pages/my-dishes.js
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import DishCard from '../components/DishCard';
import withAuth from '../utils/withAuth';

function MyDishesPage() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async (userId) => {
      const q = query(collection(db, 'dishes'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const userDishes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDishes(userDishes);
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchDishes(user.uid);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'dishes', id));
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>🍽️ My Dishes</h1>
      {loading ? (
        <p>Loading your dishes...</p>
      ) : dishes.length === 0 ? (
        <p>No dishes added yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {dishes.map((dish) => (
            <div key={dish.id} className='relative'>
              <DishCard dish={dish} />
              <div className='mt-2 flex justify-between'>
                <button
                  onClick={() => handleDelete(dish.id)}
                  className='text-red-500 hover:underline'
                >
                  Delete
                </button>
                <button
                  onClick={() => alert('Edit page coming soon')}
                  className='text-blue-500 hover:underline'
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default withAuth(MyDishesPage); // 👈 wrap with protection
