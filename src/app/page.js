'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://admin.refabry.com/api/all/product/get');
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading products...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.data?.map((product) => (
          <div key={product.id} product={product} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105">
          <div className="h-48 overflow-hidden">
            <Image
              src={`https://admin.refabry.com/storage/product/${product.image}`} 
              alt={product.name}
              width={600}
              height={600}
              style={{ objectFit: "cover" }}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2 truncate">{product.name}</h2>
            <p className="text-gray-700 font-medium mb-2">৳{product.price}</p>
            <Link href={`/product/${product.id}`}>
              <button className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors">
                Details
              </button>
            </Link>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}