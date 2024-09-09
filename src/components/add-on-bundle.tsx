// components/AddOnBundle.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Product = {
  name: string;
  price: number;
  colors?: string[]; // Color options
  image: string;
};

type Bundle = {
  title: string;
  description: string;
  products: Product[];
  total: number;
  discount: number;
  finalPrice: number;
};

const bundle: Bundle = {
  title: 'The Stark Contrasts Dining Bundle',
  description:
    'Opposites attract, and together they make something beautiful. The Plumas table sets a beautiful foundation for your weekday dining needs, and extends for dinner parties, game nights, and other weekend activities. Paired with the Rus chairs, this set comes together to feel simple, easy, and elegant.',
  products: [
    {
      name: 'Plumas White Oak Dining Table',
      price: 999,
      colors: ['#FFFFFF', '#8B4513'],
      image: '/table-image.png',
    },
    {
      name: '4 x Rus Norfolk Green Dining Chair',
      price: 796,
      colors: ['#000000', '#B5651D', '#F5F5DC'],
      image: '/chair-image.png',
    },
  ],
  total: 1795,
  discount: 107,
  finalPrice: 1688,
};

export default function AddOnBundle() {
  return (
    <div className="container mx-auto grid lg:grid-cols-2 gap-8 p-8">
      {/* Left Section - Image */}
      <div className="space-y-4">
        <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
          <Image
            src={bundle.products[0].image}
            alt="Bundle Image"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
        <div className="flex gap-4">
          {/* Carousel of images */}
          {bundle.products.map((product, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <Image
                src={product.image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Product Info */}
      <div className="space-y-6">
        {/* Bundle Title and Description */}
        <h1 className="text-3xl font-semibold">{bundle.title}</h1>
        <p className="text-gray-600">{bundle.description}</p>
        <a href="#" className="text-primary underline">
          Shop all dining room bundles
        </a>

        {/* Products */}
        {bundle.products.map((product, index) => (
          <div key={index} className="flex justify-between items-center border-b py-4">
            <div>
              <p className="font-medium">{product.name}</p>
              {product.colors && (
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            <p className="font-bold text-gray-700">${product.price}</p>
          </div>
        ))}

        {/* Financing and Bundle Pricing */}
        <div className="text-sm text-gray-600">
          <p>
            <a href="#" className="underline">
              Affirm financing
            </a>{' '}
            as low as <strong>$141/month</strong>.
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <p>Bundle Discount</p>
            <p className="text-red-500">-${bundle.discount}</p>
          </div>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-bold">${bundle.finalPrice}</p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full bg-red-500 text-white">Add Bundle to Cart</Button>
      </div>
    </div>
  );
}
