import Bedroom from '@/assets/images/shop-by-room/bedroom.jpg';
import Chair from '@/assets/images/shop-by-room/living-room.jpg';
import { StaticImageData } from 'next/image';


export type Product = {
    name: string;
    price: number;
    colors?: string[]; // Color options
    image: StaticImageData | string;
  };
  
 export type Bundle = {
    title: string;
    description: string;
    products: Product[];
    total: number;
    discount: number;
    finalPrice: number;
  };
  
  export const bundle: Bundle = {
    title: 'The Stark Contrasts Dining Bundle',
    description:
      'Opposites attract, and together they make something beautiful. The Plumas table sets a beautiful foundation for your weekday dining needs, and extends for dinner parties, game nights, and other weekend activities. Paired with the Rus chairs, this set comes together to feel simple, easy, and elegant.',
    products: [
      {
        name: 'Plumas White Oak Dining Table',
        price: 999,
        colors: ['#FFFFFF', '#8B4513'],
        image: Bedroom,
      },
      {
        name: '4 x Rus Norfolk Green Dining Chair',
        price: 796,
        colors: ['#000000', '#B5651D', '#F5F5DC'],
        image: Chair,
      },
    ],
    total: 1795,
    discount: 107,
    finalPrice: 1688,
  };