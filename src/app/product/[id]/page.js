'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import Image from 'next/image';

export default function ProductDetail({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get('https://admin.refabry.com/api/all/product/get');
        const products = response.data.data;
        const selectedProduct = products.data?.find(product => product.id.toString() === id);
        console.log(products,selectedProduct)

        if (selectedProduct) {
          setProduct(selectedProduct);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
        console.error('Error fetching product details:', err);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading product details...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[90%] mx-auto">
        <div className="md:flex">
          <div className="md:w-1/2 py-2">
            <Image
              src={`https://admin.refabry.com/storage/product/${product.image}`} 
              alt={product.name}
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
              className="mx-auto rounded-xl object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 items-center  flex-col flex my-auto">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-4">৳{product.price}</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className=" font-light text-justify">{product.short_desc || 'No description available'}</p>
            </div>
            <a href="/cart">
            <button 
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
            >
              Add to Cart
            </button>
            </a>
           
          </div>
        </div>
      </div>
    </div>
  );
}