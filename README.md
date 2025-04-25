# Next.js E-commerce App with Cart Functionality

An e-commerce application built with Next.js featuring product listing, cart functionality and order placement capabilities.

## Technologies Used

- Next.js 15
- Context API for state management
- Axios for API calls
- TailwindCSS for styling
- LocalStorage for cart persistence

## Features

- Responsive product listing page
- Dynamic product detail pages with routing
- Add to cart functionality
- Cart management (add, remove items)
- Order form with validation
- Checkout process with shipping information
- Mobile-first responsive design

## Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/rrishiddh/cloudcore-ecom-nextjs.git
cd cloudcore-ecom-nextjs
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Integration

This project integrates with the following APIs:

- Product API: `https://admin.refabry.com/api/all/product/get`
- Order API: `https://admin.refabry.com/api/public/order/create`

## Key Functionalities

### Product Listing
- Fetches products from API using Axios
- Displays products in a responsive grid
- Shows product image, name, and price
- Provides a "Details" button for each product

### Product Details
- Dynamic routing based on product ID
- Displays comprehensive product information
- "Add to Cart" button redirects to cart

### Cart Management
- Add products to cart
- Remove products from cart
- Calculate subtotal and total prices
- Persist cart data using localStorage

### Checkout Process
- Form validation for required fields
- Order placement with shipping details
- Success confirmation page

## Live Link: [https://cloudcore-ecom-nextjs.vercel.app/](https://cloudcore-ecom-nextjs.vercel.app/)

## GitHub Repo Link: [https://github.com/rrishiddh/cloudcore-ecom-nextjs.git](https://github.com/rrishiddh/cloudcore-ecom-nextjs.git)