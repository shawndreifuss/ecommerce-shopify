import React from 'react';
import Image from 'next/image';
import LivingRoom from '@/assets/images/shop-by-room/living-room.jpg';
import DiningRoom from '@/assets/images/shop-by-room/dining-room.jpg';
import Bedroom from '@/assets/images/shop-by-room/bedroom.jpg';
import HomeOffice from '@/assets/images/shop-by-room/home-office.jpg';
import Outdoor from '@/assets/images/shop-by-room/outdoor.jpg';
import Entryway from '@/assets/images/shop-by-room/entryway.jpg';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Room {
  id: number;
  name: string;
  image: StaticImageData;
  href: string;
}

const rooms: Room[] = [
  { id: 1, name: 'Living Room', image: LivingRoom, href: '/products/living-room' },
  { id: 2, name: 'Dining Room', image: DiningRoom, href: '/products/dining-room' },
  { id: 3, name: 'Bedroom', image: Bedroom,   href: '/products/bedroom' },
  { id: 4, name: 'Home Office', image: HomeOffice, href: '/products/home-office' },
  { id: 5, name: 'Outdoor', image: Outdoor, href: '/products/outdoor' },
  { id: 6, name: 'Entryway', image: Entryway,   href: '/products/entryway' },
];

const ShopByRoom: React.FC = () => {
  return (
    <div className="py-12 px-4 w-screen mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">Shop By Room</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {rooms.map((room) => (
          <Link href={room.href}
            key={room.id}
            className="relative text-center w-full cursor-pointer group"
          >
            {/* Image Wrapper */}
            <div className="relative w-full h-56 overflow-hidden rounded-lg">
              {/* Image */}
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover rounded-lg transition-all duration-300 ease-in-out group-hover:scale-105"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
            </div>
            <p className="mt-3 text-lg font-medium">{room.name}</p>
          </Link>

        ))}
      </div>
    </div>
  );
};

export default ShopByRoom;
