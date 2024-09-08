import {
    DropdownMenu,
    DropdownMenuContent,
 
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { Bell } from "lucide-react"; 
  
import Image from "next/image";
import { notification } from "@/dummy-data/notifications";
  
  export function NotificationDropdown() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative">
            <Bell className="w-5 h-5 text-gray-500" />
            {/* Notification Indicator */}
            <div className="absolute top-2 right-4 w-2 h-2 bg-red-500 border border-white rounded-full"></div>
          </Button>
        </DropdownMenuTrigger>
  
        <DropdownMenuContent className="w-full max-w-sm p-0 shadow-lg rounded-lg">
          {/* Header */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-t-lg text-center text-gray-700 dark:text-white">
            <DropdownMenuLabel className="text-lg font-semibold">Notifications</DropdownMenuLabel>
          </div>
  
          <DropdownMenuSeparator />
  
          {/* Notification Items */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {notification.map((notification) => (
            <a
              href="#"
              key={notification.id}
              className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex-shrink-0">
                <Image
                  className="cover w-24 h-20"
                  src={notification.image}
                  alt={`${notification.title} image`}
                  width={100}
                  height={100}
                />
                <div
                  className={`absolute flex items-center justify-center w-5 h-5 -ms-2 -mt-24 ${notification.badgeColor} border border-white rounded-full dark:border-gray-800`}
                >
                  <svg
                    className="w-2 h-2 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                    <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                  </svg>
                </div>
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  {notification.message}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500">{notification.time}</div>
              </div>
            </a>
          ))}
   
  </div>
  <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
    <div className="inline-flex items-center ">
      <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
      </svg>
        View all
    </div>
    </a>

    </DropdownMenuContent>

      </DropdownMenu>
    );
  }
  


