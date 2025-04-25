'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Navbar() {
  const { getCartCount } = useCart();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center ">
        <Link href="/" className="text-xl font-bold">
        CloudCore Store
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-blue-200 transition-colors">
            Home
          </Link>
          <Link href="/cart" className="relative hover:text-blue-200 transition-colors">
            Cart
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}