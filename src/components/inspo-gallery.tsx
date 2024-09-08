import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Inspo1 from '@/assets/images/inspo-1.webp';
import Inspo2 from '@/assets/images/inspo-2.webp';
import Inspo3 from '@/assets/images/inspo-3.webp';

interface Product {
  id: number;
  name: string;
  price: string;
  image: StaticImageData; 
  photographer: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Almelo Hale Rust Queen Headboard',
    price: '$699',
    image: Inspo1, 
    photographer: '@mara.paints',
  },
  {
    id: 2,
    name: 'Almelo Hale Rust Queen Headboard',
    price: '$699',
    image: Inspo2, 
    photographer: '@dipalua',
  },
  {
    id: 3,
    name: 'Seno Oak Dining Table for 6',
    price: '$799',
    image: Inspo3, 
    photographer: '@twinoakssolvang',
  },
];

const InspoGallery: React.FC = () => {
  return (
    <div className="py-12 px-6">
      <h2 className="text-4xl font-bold mb-6">Great style in the wild.</h2>
      <p className="text-lg mb-8">
        Looking for inspo? Check out how our customers have styled their own Article furniture.{' '}
        <span className="text-red-600 cursor-pointer">See more.</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            <div className="relative w-full h-96">
              <Image
                src={product.image} // Now it's a StaticImageData
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              {/* Product Label */}
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                <p className="font-bold">{product.name}</p>
                <p className="text-red-600">{product.price}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Photo by {product.photographer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspoGallery;
