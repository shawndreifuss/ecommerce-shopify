// components/YouMightAlsoLike.tsx
import Image from 'next/image';
import { products } from '@/dummy-data/example-products';

export function YouMightAlsoLike() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
      <div className="flex gap-4 overflow-x-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-64 p-4 bg-white rounded-lg shadow-lg flex-shrink-0"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              className="object-cover rounded-lg h-48"
              width={256}
              height={256}
            />
            <div className="mt-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-red-500 font-bold mt-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
