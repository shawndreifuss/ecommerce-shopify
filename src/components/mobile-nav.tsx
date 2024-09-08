"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  UserCircle,
  MessageCircle,
  ShoppingCart,
  Heart,
  Menu,
  PlusIcon,
  Minus,
  HelpCircle,
} from "lucide-react";
import {
  exampleProducts,
  roomCategories,
  bundlesItems,
  bestSellersItems,
  getInspiredItems,
  sofaCollections,
} from "@/dummy-data/nav-data";
import { Button } from "./ui/button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]); // Keep track of expanded sections
  const [expandedSubSections, setExpandedSubSections] = useState<{
    [key: string]: boolean;
  }>({}); // Track sub-dropdowns

  // Toggle main sections like Products, Rooms, etc.
  const toggleSection = (section: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((sec) => sec !== section)
        : [...prevSections, section]
    );
  };

  const isSectionExpanded = (section: string) =>
    expandedSections.includes(section);

  // Toggle sub-sections like Furniture, Storage, etc.
  const toggleSubSection = (section: string) => {
    setExpandedSubSections((prevSubSections) => ({
      ...prevSubSections,
      [section]: !prevSubSections[section],
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-screen">
        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4 py-4">
          <TooltipProvider>
            <div className="flex w-full gap-4 justify-end p-3">
              {/* Message Icon Button with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <MessageCircle className="w-6 h-6 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-gray-500">Messages</p>
                </TooltipContent>
              </Tooltip>

              {/* Heart Icon Button with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <Heart className="w-6 h-6 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-gray-500">Favorites</p>
                </TooltipContent>
              </Tooltip>

              {/* Shopping Cart Icon Button with Tooltip */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="p-2">
                    <ShoppingCart className="w-6 h-6 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-gray-500">Cart</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
          {/* Products Dropdown */}
          <div>
            <button
              onClick={() => toggleSection("products")}
              className="flex justify-between items-center text-lg font-bold text-gray-500 w-full"
            >
              Products
              {isSectionExpanded("products") ? (
                <Minus className="text-gray-400" />
              ) : (
                <PlusIcon className="text-gray-400" />
              )}
            </button>
            {isSectionExpanded("products") && (
              <div className="pl-4 mt-2">
                {exampleProducts.map((category) => (
                  <div key={category.title}>
                    <button
                      className="flex justify-between w-full items-center py-1 text-gray-600 hover:bg-gray-200 px-2"
                      onClick={() => toggleSubSection(category.title)}
                    >
                      {category.title}{" "}
                      {expandedSubSections[category.title] ? (
                        <Minus className="text-gray-400" />
                      ) : (
                        <PlusIcon className="text-gray-400" />
                      )}
                    </button>
                    {/* Sub-dropdown for each category */}
                    {expandedSubSections[category.title] && (
                      <ul className="pl-4 mt-1">
                        {category.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-gray-500 py-1 p-2 hover:bg-gray-200"
                          >
                            <button>{item}</button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rooms Dropdown */}
          <div>
            <button
              onClick={() => toggleSection("rooms")}
              className="flex justify-between items-center text-lg font-bold text-gray-500 w-full"
            >
              Rooms
              {isSectionExpanded("rooms") ? (
                <Minus className="text-gray-400" />
              ) : (
                <PlusIcon className="text-gray-400" />
              )}
            </button>
            {isSectionExpanded("rooms") && (
              <div className="pl-4 mt-2">
                {roomCategories.map((category) => (
                  <div key={category.title}>
                    <button
                      className="flex justify-between w-full items-center py-1 text-gray-600 px-5 pl-4 text-gray-700 hover:bg-gray-200 rounded-md "
                      onClick={() => toggleSubSection(category.title)}
                    >
                      {category.title}{" "}
                      {expandedSubSections[category.title] ? (
                        <Minus className="text-gray-400" />
                      ) : (
                        <PlusIcon className="text-gray-400" />
                      )}
                    </button>
                    {/* Sub-dropdown for each category */}
                    {expandedSubSections[category.title] && (
                      <div className="pl-4 mt-1 flex flex-col align-center">
                        {category.items.map((item, idx) => (
                          <button
                            key={idx}
                            className="text-gray-500 py-1 p-2 hover:bg-gray-200 text-left"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bundles Dropdown */}
          <div>
            <button
              onClick={() => toggleSection("bundles")}
              className="flex justify-between items-center text-lg font-bold text-gray-500 w-full"
            >
              Bundles
              {isSectionExpanded("bundles") ? (
                <Minus className="text-gray-400" />
              ) : (
                <PlusIcon className="text-gray-400" />
              )}
            </button>
            {isSectionExpanded("bundles") && (
              <div className="pl-4 mt-2">
                {bundlesItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block py-1 px-5  text-gray-500 hover:bg-gray-200 rounded-md "
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Best Sellers Dropdown */}
          <div>
            <button
              onClick={() => toggleSection("bestSellers")}
              className="flex justify-between items-center text-lg font-bold text-gray-500 w-full"
            >
              Best Sellers
              {isSectionExpanded("bestSellers") ? (
                <Minus className="text-gray-400" />
              ) : (
                <PlusIcon className="text-gray-400" />
              )}
            </button>
            {isSectionExpanded("bestSellers") && (
              <div className="pl-4 mt-2">
                {bestSellersItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block py-1 px-5 pl-4 text-gray-500 hover:bg-gray-200 rounded-md "
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Get Inspired Dropdown */}
          <div>
            <button
              onClick={() => toggleSection("getInspired")}
              className="flex justify-between items-center text-lg font-bold text-gray-500 w-full"
            >
              Get Inspired
              {isSectionExpanded("getInspired") ? (
                <Minus className="text-gray-400" />
              ) : (
                <PlusIcon className="text-gray-400" />
              )}
            </button>
            {isSectionExpanded("getInspired") && (
              <div className="pl-4 mt-2">
                {getInspiredItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block py-1 text-gray-500 px-5 pl-4  hover:bg-gray-200 rounded-md  "
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sofa Collections Dropdown */}
          <div>
            <button
              onClick={() => toggleSection("sofaCollections")}
              className="flex justify-between items-center text-lg font-bold text-gray-500 w-full"
            >
              Sofa Collections
              {isSectionExpanded("sofaCollections") ? (
                <Minus className="text-gray-400" />
              ) : (
                <PlusIcon className="text-gray-400" />
              )}
            </button>
            {isSectionExpanded("sofaCollections") && (
              <div className="pl-4 mt-2">
                {sofaCollections.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block py-1 px-5 pl-4 text-gray-500 hover:bg-gray-200 rounded-md "
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <button className="flex justify-between items-center text-lg text-gray-500 w-full">
              New Arrivals
            </button>
          </div>
          <div>
            <button className="flex justify-between items-center text-lg text-gray-500 w-full">
              Sale
            </button>
          </div>
        </nav>

        {/* Account Section */}
        <div className="absolute bottom-0 ">
          <div className="flex flex-col mb-4 space-y-4 text-gray-500 py-4 ">
            <button className="flex items-center space-x-2">
              <UserCircle className="w-5 h-5" />{" "}
              <span>My Account & Orders</span>
            </button>
            <button className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />{" "}
              <span>Interior Design Services</span>
            </button>
            <button className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5" /> <span>Help Center</span>
            </button>
            <button className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />{" "}
              <span>Live chat with us</span>
            </button>

            <button className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" /> <span>About Us</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
