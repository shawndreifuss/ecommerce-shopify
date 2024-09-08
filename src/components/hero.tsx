import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Example Video URL - Replace this with your video URL
const videoUrl = '/videos/hero-video.mp4';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">It’s <span className='font-bold underline'>Everything</span> season.</h1>
          <p className="mt-4 text-lg">
            Shop ournew Fall Collections and find your Everything Home.
          </p>

          <Button className="mt-6 px-8 py-6 text-lg font-medium bg-background text-gray-900 rounded-full hover:bg-gray-200">
            Shop Now
          </Button>
        </div>
      </div>

      {/* Overlay to darken the video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
    </div>
  );
};

export default Hero;
