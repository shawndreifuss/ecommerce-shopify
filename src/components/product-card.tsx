'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product, products } from '@/dummy-data/example-products';
import { Button } from './ui/button';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-sm bg-white shadow-md rounded-md overflow-hidden mb-6">
      <div className="relative">
        <Image
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-56 object-cover"
          width={500}
          height={500}
        />
        <div className="absolute inset-x-0 bottom-2 flex justify-center text-white">
          <button onClick={handlePrevImage} className="mx-2">
            ←
          </button>
          <span>
            {currentImageIndex + 1} of {product.images.length}
          </span>
          <button onClick={handleNextImage} className="mx-2">
            →
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="mt-2 text-gray-500">{product.description}</p>
        <p className="mt-1 text-sm text-blue-500">
          Buy in installments with Klarna Wallet
        </p>
      </div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">${product.price}</span>
          <div className="flex space-x-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button className="flex bg-white items-center justify-center w-full py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-background">
            <ShoppingCart className="mr-2 h-5 w-5" /> add to cart
          </Button>
          <Button className="ml-2 flex items-center justify-center w-full py-2 text-white rounded-lg">
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [productsPerPage, setProductsPerPage] = useState(25); // Default products per page

  // Calculate total pages based on productsPerPage and total products
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Determine the products to display on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleProductsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value)); // Update products per page
    setCurrentPage(1); // Reset to page 1 when products per page changes
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full">
    

      {/* Product Grid */}
      <div className="flex flex-wrap gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      
    </div>
  );
};

export default ProductList;
