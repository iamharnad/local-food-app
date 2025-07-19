// pages/add-dish.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addDishToFirestore } from '../data/dishStore';
import withAuth from '../utils/withAuth'; // adjust to '../util/withAuth' if you moved it

function AddDishPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDish = {
      name,
      location,
      image, // optional
    };

    try {
      await addDishToFirestore(newDish);
      router.push('/home');
    } catch (error) {
      console.error('❌ Error saving dish:', error.message);
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>🍲 Add a New Dish</h1>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-md'>
        <input
          type='text'
          placeholder='Dish Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border p-2 rounded'
          required
        />
        <input
          type='text'
          placeholder='Location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='w-full border p-2 rounded'
          required
        />
        <input
          type='text'
          placeholder='Image URL (optional)'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className='w-full border p-2 rounded'
        />
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default withAuth(AddDishPage);
