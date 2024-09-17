// components/YouMightAlsoLike.tsx
import Image from 'next/image';
import { Product } from '@/types/shopify';
import { getProductRecommendations } from '@/lib/shopify';
import Link from 'next/link';
import { AddToCart } from './cart/add-to-cart';

export async function YouMightAlsoLike({ productId }: { productId: string }) {
  const products = await getProductRecommendations(productId);

  console.log(products)

  if (!products) return null;
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
      <div className="flex gap-4 overflow-x-auto">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.handle}`}>
          <div
            key={product.id}
            className="w-64 p-4 bg-white rounded-lg shadow-lg flex-shrink-0"
          >
            <Image
              src={product.featuredImage?.url}  
              alt={product.title}
              className="object-cover rounded-lg h-48"
              width={256}
              height={256}
            />
            <div className="mt-4">
            <h3 className="text-lg font-medium">
  {product.title.length > 24 ? `${product.title.slice(0, 20)}...` : product.title}
</h3>
<div className="flex justify-between">
              <PriceWithStyledDecimal price={product.priceRange.maxVariantPrice.amount} />
              <AddToCart product={product} />
              </div>
</div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};



export function PriceWithStyledDecimal({ price }: { price: string }) {
  // Split the price into whole and decimal parts
  const [whole, decimal] = price.split('.');

  return (
    <p className="text-gray-500 font-bold mt-2">
      {/* Render the whole part */}
      <span className="">$</span>
      <span>{whole}</span>
      {/* Render the decimal point with a different style */}
      <span className="text-red-900 text-xl">.</span>
      {/* Keep the decimal numbers in the same style as the whole part */}
      <span>{decimal || '00'}</span>
    </p>
  );
}
