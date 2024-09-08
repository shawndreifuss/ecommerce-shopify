import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import BestSellerImage from '@/assets/images/best-seller-sofa.jpg'; 
import SideTableImage from '@/assets/images/side-table.jpg';
import HomeOfficeImage from '@/assets/images/home-office.jpg';

const BestSellers: React.FC = () => {
  return (
    <>
    <div className="relative w-full h-[75vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={BestSellerImage} // replace with the actual image path
          alt="Best Sellers"
          layout="fill"
          objectFit="cover"
          priority={true}
          className="object-cover w-full h-full"
        />
        {/* Overlay to darken the image slightly */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Text and Button Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Play favorites.</h1>
          <p className="text-lg mb-6">
            These pieces are on everyone’s wish list.
          </p>

          {/* ShadCN Button */}
          <Button className="px-8 py-4 bg-white text-gray-900 rounded-full shadow-lg">
            Shop Best Sellers
          </Button>
        </div>
      </div>
    </div>
     <div className="py-12 px-4  w-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
     {/* Side Table Section */}
     <div className="relative w-full h-[50vh] overflow-hidden rounded-lg">
       {/* Image */}
       <div className="absolute inset-0 w-full h-full">
         <Image
           src={SideTableImage} // replace with the actual image path
           alt="Shop Side Tables"
           layout="fill"
           objectFit="cover"
           priority={true}
           className="object-cover w-full h-full rounded-lg"
         />
         {/* Dark Overlay */}
         <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
       </div>

       {/* Text and Button */}
       <div className="relative z-10 flex items-center justify-center h-full">
         <div className="text-center text-white px-4">
           <h1 className="text-4xl font-bold mb-4">Always by your side.</h1>
           <p className="text-lg mb-6">Keep the essentials close.</p>
           <Button className="px-8 py-4 bg-white text-gray-900 rounded-full shadow-lg">
             Shop Side Tables
           </Button>
         </div>
       </div>
     </div>

     {/* Home Office Section */}
     <div className="relative w-full h-[50vh] overflow-hidden rounded-lg">
       {/* Image */}
       <div className="absolute inset-0 w-full h-full">
         <Image
           src={HomeOfficeImage} // replace with the actual image path
           alt="Shop Home Office"
           layout="fill"
           objectFit="cover"
           priority={true}
           className="object-cover w-full h-full rounded-lg"
         />
         {/* Dark Overlay */}
         <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
       </div>

       {/* Text and Button */}
       <div className="relative z-10 flex items-center justify-center h-full">
         <div className="text-center text-white px-4">
           <h1 className="text-4xl font-bold mb-4">Work smarter.</h1>
           <p className="text-lg mb-6">Prioritize comfort and productivity.</p>
           <Button className="px-8 py-4 bg-white text-gray-900 rounded-full shadow-lg">
             Shop Home Office
           </Button>
         </div>
       </div>
     </div>
   </div>
   </>
  );
};

export default BestSellers;
