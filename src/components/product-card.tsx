'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Product } from '@/types/shopify';

const colorMap: { [key: string]: string } = {
  white: '#FFFFFF',
  beige: '#fff0db',
  blue: '#0000FF',
  navy: '#000080',
  green: '#008000',
  orange: '#FFA500',
  red: '#FF0000',
  yellow: '#FFFF00',
  black: '#000000',
  brown: '#A52A2A',
  purple: '#800080',
  pink: '#FFC0CB',
  grey: '#808080',
  // Add more colors if needed
};

export default function ProductGridItems({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine featured image and other images in a single array
  const allImages = [
    product.featuredImage,
    ...product.images.filter((image) => image.url !== product.featuredImage.url),
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getColorAndSizes = (product: Product) => {
    let colors: string[] = [];
    let sizes: string[] = [];

    product.variants.forEach((variant) => {
      variant.selectedOptions.forEach((option) => {
      

        if (option.name.toLowerCase() === 'color') {
          const colorHex = colorMap[option.value.toLowerCase()];
          if (colorHex && !colors.includes(colorHex)) {
            colors.push(colorHex); // Add color if it's not already in the array
          }
        }

        if (option.name.toLowerCase() === 'size' && !sizes.includes(option.value)) {
          sizes.push(option.value); // Add size if it's not already in the array
        }
      });
    });

    return { colors, sizes };
  };

  const { colors, sizes } = getColorAndSizes(product);


  const displayedColors = colors.slice(0, 5); // Limit to 5 colors
  const hasMoreColors = colors.length > 5;

  return (
    <div className="max-w-sm bg-white shadow-md rounded-md overflow-hidden mb-6 flex flex-col">
      <div className="relative">
        <Image
          src={allImages[currentImageIndex].url}
          alt={allImages[currentImageIndex].altText || product.title}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
        <div className="absolute inset-x-0 bottom-2 flex justify-center text-white">
          <button onClick={handlePrevImage} className="mx-2 z-50">
            ←
          </button>
          <span>
            {currentImageIndex + 1} of {allImages.length}
          </span>
          <button onClick={handleNextImage} className="mx-2 z-50">
            →
          </button>
        </div>
      </div>
      <Link href={`/product/${product.handle}`}>
        <div className="p-4">
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="mt-1 text-sm text-blue-500">Buy in installments with Klarna Wallet</p>
        </div>
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${product.priceRange.maxVariantPrice.amount}</span>
            {/* Render product colors */}
            <div className="flex space-x-2">
              {displayedColors.map((colorHex, index) => (
                <button
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: colorHex }}
                ></button>
              ))}
              {hasMoreColors && <span className="text-gray-500">More...</span>}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button className="flex bg-white items-center justify-center w-full py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-background">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
            </Button>
            <Button className="ml-2 flex items-center justify-center w-full py-2 text-white rounded-lg">
              Buy now
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
