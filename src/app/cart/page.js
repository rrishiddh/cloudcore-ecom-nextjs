'use client';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

export default function Cart() {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [orderForm, setOrderForm] = useState({
    c_name: '',
    c_phone: '',
    address: '',
    courier: 'steadfast',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const deliveryCharge = 80;
  const total = getTotalPrice();
  const grandTotal = total + deliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!orderForm.c_name.trim()) errors.c_name = 'Name is required';
    if (!orderForm.c_phone.trim()) errors.c_phone = 'Phone number is required';
    if (!/^01\d{9}$/.test(orderForm.c_phone)) errors.c_phone = 'Please enter a valid phone number';
    if (!orderForm.address.trim()) errors.address = 'Address is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty. Please add products before placing an order.');
      return;
    }

    setIsSubmitting(true);
    setOrderError(null);

    try {
      const productIds = cartItems.map(item => item.id).join(',');
      const productQty = cartItems.map(item => item.quantity).join(',');

      const orderData = {
        product_ids: productIds,
        s_product_qty: productQty,
        c_name: orderForm.c_name,
        c_phone: orderForm.c_phone,
        address: orderForm.address,
        courier: orderForm.courier,
        advance: null,
        cod_amount: grandTotal.toString(),
        discount_amount: null,
        delivery_charge: deliveryCharge.toString()
      };

      const response = await axios.post('https://admin.refabry.com/api/public/order/create', orderData);
       alert("Your Order is Successfully Placed!");
       console.log("Your Order is Successfully Placed!")
      clearCart();
    } catch (error) {
      console.error('Error submitting order:', error);
      setOrderError('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="container mx-auto w-[95%] py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl mb-6">Your cart is empty</p>
          <Link href="/">
            <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="md:flex md:gap-8">
          <div className="md:w-2/3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md mb-4 p-4">
                <div className="sm:w-1/4 mb-4 sm:mb-0">
                  <Image
                    src={`https://admin.refabry.com/storage/product/${item.image}`} 
                    alt={item.name}
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
              className="w-full h-full rounded-xl object-cover"
                  />
                </div>
                <div className="sm:w-2/4 md:text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">৳{item.price} × {item.quantity}</p>
                  <p className="font-medium">Total: ৳{item.price * item.quantity}</p>
                </div>
                <div className="sm:w-1/4 text-center sm:text-right">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>৳{total}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Delivery Charge</span>
                <span>৳{deliveryCharge}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>৳{grandTotal}</span>
              </div>
            </div>
            
          </div>
          
          <div className="md:w-1/3 mt-8 md:mt-0">
            
            <form onSubmit={handleSubmitOrder} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              {orderError && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                  {orderError}
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="c_name">
                  Full Name
                </label>
                <input
                  type="text"
                  id="c_name"
                  name="c_name"
                  value={orderForm.c_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded ${formErrors.c_name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your full name"
                />
                {formErrors.c_name && <p className="text-red-500 mt-1 text-sm">{formErrors.c_name}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="c_phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="c_phone"
                  name="c_phone"
                  value={orderForm.c_phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded ${formErrors.c_phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your phone number"
                />
                {formErrors.c_phone && <p className="text-red-500 mt-1 text-sm">{formErrors.c_phone}</p>}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={orderForm.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your full address"
                  rows="2"
                ></textarea>
                {formErrors.address && <p className="text-red-500 mt-1 text-sm">{formErrors.address}</p>}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="courier">
                  Courier Service
                </label>
                <select
                  id="courier"
                  name="courier"
                  value={orderForm.courier}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="steadfast">Steadfast</option>
                  <option value="pathao">Pathao</option>
                  <option value="sundorban">Sundorban</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'
                } transition-colors`}
              >
                {isSubmitting ? 'Processing...' : 'Order Now'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}