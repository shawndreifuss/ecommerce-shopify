import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {  Instagram, } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Social Links */}
          <div>
            <h2 className="text-2xl text-gray-500 font-bold mb-4">Everything Home<span className="text-red-600">.</span></h2>
            <div className="flex space-x-4 mb-4">
              <Link href="#">
                <Instagram className="text-gray-500 hover:text-gray-300 h-5 w-5 " />
              </Link>
              <Link href="#">
                <FaPinterest className="text-gray-500 hover:text-gray-300 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-500 ">Help</h3>
            <ul className="space-y-2 text-gray-500 ">
              <li ><Link href="#">Help Center</Link></li>
              <li><Link href="#">Shipping</Link></li>
              <li><Link href="#">Returns</Link></li>
              <li><Link href="#">Product Recalls</Link></li>
              <li><Link href="#">Contact Us</Link></li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-500 ">Explore</h3>
            <ul className="space-y-2 text-gray-500 ">
              <li><Link href="#">Design Resources</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Gift Cards</Link></li>
              <li><Link href="#">Financing</Link></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center lg:text-left text-gray-500 ">
            <h3 className="text-xl font-semibold mb-4">Get new products and promotions in your inbox.</h3>
            <form className="flex items-center space-x-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-2/3 px-4 py-2 text-gray-500 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-red-900 text-white px-6 py-2 rounded-lg">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p>© 2024 Everything Home. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#">Terms of Use</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
