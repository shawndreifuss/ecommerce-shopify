'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, ScanEye, Heart } from 'lucide-react';
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
  const [ isFavorited, setIsFavorited ] = useState(false)

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
    <div className="rounded-lg border max-w-96 border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-56 w-full">
        <a href="#">
          <Image
            className=" h-full w-full "
            src={`${product.featuredImage.url}`}
            alt="Product Image Light"
            width={400}
            height={400}
          />
         
        </a>
      </div>

      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            {product.tags}
          </span>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Quick look</span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Add to Favorites</span>
              <Heart className='w-5 h-5 ' color='red' fill='red' />
            </button>
          </div>
        </div>

        <a
          href="#"
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          Apple iPhone 15 Pro Max, 256GB, Blue Titanium
        </a>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 text-yellow-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
              </svg>
            ))}
          </div>

          <p className="text-sm font-medium text-gray-900 dark:text-white">4.9</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">(1,233)</p>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Best Seller
            </p>
          </li>
        </ul>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
            $1,199
          </p>

          <Button
            type="button"
            className="inline-flex items-center rounded-lg  px-5 py-2.5 "
          >
            <svg
              className="-ms-2 me-2 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};


//   return (
//     <div className="max-w-sm bg-white shadow-md rounded-md overflow-hidden mb-6 flex flex-col">
//       <div className="relative">
//         <Image
//           src={allImages[currentImageIndex].url}
//           alt={allImages[currentImageIndex].altText || product.title}
//           className="w-full h-full object-cover max-h-64"
//           width={500}
//           height={500}
//       />
//       </div>
//       <Link href={`/product/${product.handle}`}>
//         <div className="p-4">
//           <h3 className="text-xl font-semibold">{product.title}</h3>
//         </div>
//         <div className="px-4 pb-4">
//           <div className="flex items-center justify-between">
//             <span className="text-2xl font-bold">${product.priceRange.maxVariantPrice.amount}</span>
//             {/* Render product colors */}
//             <div className="flex space-x-2">
//               {displayedColors.map((colorHex, index) => (
//                 <button
//                   key={index}
//                   className="w-6 h-6 rounded-full border border-gray-300"
//                   style={{ backgroundColor: colorHex }}
//                 ></button>
//               ))}
//               {hasMoreColors && <span className="text-gray-500">More...</span>}
//             </div>
//           </div>
//           <div className="mt-4 flex justify-between">
//             <Button className="flex bg-white items-center justify-center w-full py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-background">
//               <ShoppingCart className="mr-2 h-5 w-5" /> Add to cart
//             </Button>
//             <Button className="ml-2 flex items-center justify-center w-full py-2 text-white rounded-lg">
//               Buy now
//             </Button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }
