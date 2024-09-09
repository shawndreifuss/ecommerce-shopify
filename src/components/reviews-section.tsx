'use client'
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Review = {
  id: number;
  user: string;
  rating: number;
  text: string;
  images: string[];
  location: string;
  date: string;
};

const reviews: Review[] = [
  {
    id: 1,
    user: 'Aubrey H.',
    rating: 5,
    text: "These chairs are perfect! We needed something that would be kid friendly and easy to clean, and these have been great! They’re a great size, sturdy and they’re beautiful!",
    images: ['/chair1.jpg', '/chair2.jpg', '/chair3.jpg', '/chair4.jpg'],
    location: 'Fredericksburg, VA',
    date: '2 weeks ago',
  },
  {
    id: 2,
    user: 'Amy F.',
    rating: 5,
    text: "These are beautifully made, sturdy little chairs. The back is pretty rounded so if you have a larger person then they might not be comfortable.",
    images: ['/table1.jpg'],
    location: 'Spokane, WA',
    date: '2 months ago',
  },
  {
    id: 3,
    user: 'Maya K.',
    rating: 5,
    text: "The quality of these chairs exceeded expectations. They are very well made. They look beautiful, they have a good weight to them, and the whole shopping/delivery process was seamless.",
    images: ['/dining1.jpg'],
    location: 'Apex, NC',
    date: '3 months ago',
  },
];

export default function ReviewsSection() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container mx-auto p-8">
      {/* Header Section */}
      <div className="flex items-center space-x-2 mb-8">
        <h2 className="text-3xl font-semibold">529 Reviews</h2>
        <div className="flex items-center space-x-1">
          <span className="text-red-500">★★★★★</span>
          <span className="text-red-500">4.4</span>
        </div>
        <span className="text-gray-500">|</span>
        <a href="#" className="text-primary underline">Log in to review</a>
        <span className="text-gray-500">|</span>
        <a href="#" className="text-primary underline">Review Policy</a>
      </div>

      {/* Reviews List */}
      <div className="grid lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col space-y-4">
            <div className="flex items-center space-x-1">
              <span className="text-red-500">★★★★★</span>
              <span className="text-gray-500">{review.rating} stars</span>
            </div>
            <p className="text-gray-700">
              {showMore ? review.text : `${review.text.substring(0, 100)}...`}
              {review.text.length > 100 && (
                <a
                  href="#"
                  onClick={() => setShowMore(!showMore)}
                  className="text-primary underline"
                >
                  {showMore ? 'Less' : 'More'}
                </a>
              )}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {review.images.map((image, index) => (
                <div key={index} className="w-full h-32 bg-gray-100 rounded-lg">
                  <Image
                    src={image}
                    alt={`Review Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <p>{review.user} &bull; {review.date}</p>
              <p>{review.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Read More Reviews Button */}
      <div className="flex justify-center mt-8">
        <Button className="bg-red-500 text-white px-6 py-3 rounded-full">Read More Reviews</Button>
      </div>
    </div>
  );
}
