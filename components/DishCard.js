export default function DishCard({ dish }) {
  return (
    <div className='rounded-lg shadow-md overflow-hidden bg-white'>
      <img
        src={dish.image}
        alt={dish.name}
        className='w-full h-40 object-cover'
      />
      <div className='p-4'>
        <h2 className='text-lg font-semibold'>{dish.name}</h2>
        <p className='text-gray-500 text-sm'>{dish.location}</p>
      </div>
    </div>
  );
}
