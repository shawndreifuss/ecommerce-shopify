import BestSellerImage from '@/assets/images/best-seller-sofa.jpg'; 
import SideTableImage from '@/assets/images/side-table.jpg';
import HomeOfficeImage from '@/assets/images/home-office.jpg';
import BedroomSet from '@/assets/images/shop-by-room/bedroom.jpg';

import { StaticImageData } from 'next/image';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    colors: string[];
    images: StaticImageData[]; // Static images for Next.js Image component
  }

export const products: Product[] = [
    {
      id: 1,
      name: 'Wooden Dining Table',
      description: 'Solid oak dining table with a natural finish, perfect for any dining room.',
      price: 799,
      colors: ['#B5651D', '#F5F5DC', '#6B4226', '#A0522D'], // Brown, Beige, Dark Brown, Saddle Brown
      images: [HomeOfficeImage,BestSellerImage, SideTableImage, ], // Static images
    },
    {
      id: 2,
      name: 'Velvet Sofa',
      description: 'Luxurious velvet sofa, perfect for a modern or classic living room.',
      price: 1099,
      colors: ['#4B0082', '#708090', '#B03060', '#483D8B'], // Indigo, Slate Gray, Maroon, Dark Slate Blue
      images: [ SideTableImage, BestSellerImage, HomeOfficeImage], // Static images
    },
    {
      id: 3,
      name: 'Leather Recliner Chair',
      description: 'Comfortable leather recliner chair, ideal for relaxation and reading.',
      price: 649,
      colors: ['#8B4513', '#A52A2A', '#556B2F', '#000000'], // Saddle Brown, Brown, Olive, Black
      images: [BestSellerImage, SideTableImage, HomeOfficeImage], // Static images
    },
    {
      id: 4,
      name: 'Modern Coffee Table',
      description: 'Minimalist glass and steel coffee table, perfect for a contemporary living space.',
      price: 299,
      colors: ['#C0C0C0', '#FFFFFF', '#808080', '#000000'], // Silver, White, Gray, Black
      images: [BedroomSet, BestSellerImage, SideTableImage, HomeOfficeImage], // Static images
    },
    {
      id: 1,
      name: 'Wooden Dining Table',
      description: 'Solid oak dining table with a natural finish, perfect for any dining room.',
      price: 799,
      colors: ['#B5651D', '#F5F5DC', '#6B4226', '#A0522D'], // Brown, Beige, Dark Brown, Saddle Brown
      images: [HomeOfficeImage,BestSellerImage, SideTableImage, ], // Static images
    },
    {
      id: 2,
      name: 'Velvet Sofa',
      description: 'Luxurious velvet sofa, perfect for a modern or classic living room.',
      price: 1099,
      colors: ['#4B0082', '#708090', '#B03060', '#483D8B'], // Indigo, Slate Gray, Maroon, Dark Slate Blue
      images: [ SideTableImage, BestSellerImage, HomeOfficeImage], // Static images
    },
    {
      id: 3,
      name: 'Leather Recliner Chair',
      description: 'Comfortable leather recliner chair, ideal for relaxation and reading.',
      price: 649,
      colors: ['#8B4513', '#A52A2A', '#556B2F', '#000000'], // Saddle Brown, Brown, Olive, Black
      images: [BestSellerImage, SideTableImage, HomeOfficeImage], // Static images
    },
    {
      id: 4,
      name: 'Modern Coffee Table',
      description: 'Minimalist glass and steel coffee table, perfect for a contemporary living space.',
      price: 299,
      colors: ['#C0C0C0', '#FFFFFF', '#808080', '#000000'], // Silver, White, Gray, Black
      images: [BedroomSet, BestSellerImage, SideTableImage, HomeOfficeImage], // Static images
    },
    {
      id: 1,
      name: 'Wooden Dining Table',
      description: 'Solid oak dining table with a natural finish, perfect for any dining room.',
      price: 799,
      colors: ['#B5651D', '#F5F5DC', '#6B4226', '#A0522D'], // Brown, Beige, Dark Brown, Saddle Brown
      images: [HomeOfficeImage,BestSellerImage, SideTableImage, ], // Static images
    },
    {
      id: 2,
      name: 'Velvet Sofa',
      description: 'Luxurious velvet sofa, perfect for a modern or classic living room.',
      price: 1099,
      colors: ['#4B0082', '#708090', '#B03060', '#483D8B'], // Indigo, Slate Gray, Maroon, Dark Slate Blue
      images: [ SideTableImage, BestSellerImage, HomeOfficeImage], // Static images
    },
    {
      id: 3,
      name: 'Leather Recliner Chair',
      description: 'Comfortable leather recliner chair, ideal for relaxation and reading.',
      price: 649,
      colors: ['#8B4513', '#A52A2A', '#556B2F', '#000000'], // Saddle Brown, Brown, Olive, Black
      images: [BestSellerImage, SideTableImage, HomeOfficeImage], // Static images
    },
    {
      id: 4,
      name: 'Modern Coffee Table',
      description: 'Minimalist glass and steel coffee table, perfect for a contemporary living space.',
      price: 299,
      colors: ['#C0C0C0', '#FFFFFF', '#808080', '#000000'], // Silver, White, Gray, Black
      images: [BedroomSet, BestSellerImage, SideTableImage, HomeOfficeImage], // Static images
    },
  ];