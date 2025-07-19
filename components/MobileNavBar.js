// components/MobileNavBar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillHome, AiOutlinePlusCircle, AiOutlineUser } from 'react-icons/ai';
import { MdRestaurantMenu } from 'react-icons/md';

const navItems = [
  { href: '/home', icon: <AiFillHome size={24} />, label: 'Home' },
  { href: '/add-dish', icon: <AiOutlinePlusCircle size={24} />, label: 'Add' },
  {
    href: '/my-dishes',
    icon: <MdRestaurantMenu size={24} />,
    label: 'My Dishes',
  },
  { href: '/profile', icon: <AiOutlineUser size={24} />, label: 'Profile' },
];

export default function MobileNavBar() {
  const router = useRouter();

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around items-center py-2 sm:hidden z-50'>
      {navItems.map(({ href, icon, label }) => {
        const isActive = router.pathname === href;

        return (
          <Link key={href} href={href} passHref>
            <div className='flex flex-col items-center text-xs text-gray-600'>
              <div
                className={`${isActive ? 'text-green-600' : 'text-gray-500'}`}
              >
                {icon}
              </div>
              <span
                className={`${isActive ? 'text-green-600 font-medium' : ''}`}
              >
                {label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
