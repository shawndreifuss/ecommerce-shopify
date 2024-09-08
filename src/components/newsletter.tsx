import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import LampImage from '@/assets/images/newsletter.jpg'; // Replace with actual image path

const NewsletterSubscription: React.FC = () => {
  return (
    <div className="relative w-full h-64 bg-gray-900 flex items-center justify-between px-6 py-8">
      {/* Background Image */}
      <div className="absolute inset-0 w-screen h-full">
        <Image
          src={LampImage} // Replace with actual image path
          alt="Lamp"
          layout="fill"
          objectFit="cover"
          className="object-cover w-screen h-full"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Subscription Content */}
      <div className="relative z-10 w-full flex justify-between
      flex-col items-center ml-8 gap-12">
        <div className="text-white">
          <h2 className="text-2xl sm:text-md font-bold">Get new products and promotions in your inbox.</h2>
        </div>

        {/* Subscription Input */}
        <div className="flex space-x-4 items-center">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button className="bg-red-600 text-white px-6 py-2 rounded-lg">Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
