// components/AddOnBundle.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Product, bundle, Bundle } from '@/dummy-data/bundle';



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
            className="cover w-full h-full rounded-md"
            
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
                className="cover w-full h-full rounded-lg"
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
