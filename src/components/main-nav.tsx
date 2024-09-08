

import { User, UserCircle,  } from 'lucide-react'; 
import { ShoppingCart } from '@/components/shopping-cart';
import { NavLinks } from '@/components/nav-links'; 
import{ MobileNav}  from "@/components/mobile-nav";
import Image from 'next/image';
import { auth, signOut } from '@/auth'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { NotificationDropdown } from '@/components/notifications-dropdown';




interface User {
  name: string;
  email: string;
  image: string;
  id: string;
  role: string;
}

// Define the props interface for `MainNav`
interface MainNavProps {
  user: User | null; // or whatever type you expect from your auth provider
}

export async function MainNav() {

  const session = await auth(); 
  const user = session?.user;

 


  return (
    <header className="w-full sticky top-0 left-0 right-0 z-50 border-b border-gray-200 text-gray-500"> 
    <span className=" w-screen pt-4 text-center text-2xl font-bold text-gray-500 block md:hidden lg:hidden ">Everything Home<span className='text-red-900'>.</span></span>
      
      <div className=" mx-auto px-4 py-2 flex items-center justify-between">
       {/* Logo Section */}
        <div className="flex items-start space-x-4">
          {/* Hamburger Menu */}
          <div className="md:hidden lg:hidden block flex justify-center align-center items">  <MobileNav  /></div>
       

          {/* Logo */}
          <span className="text-2xl font-bold text-gray-500 hidden md:block">Everything Home<span className='text-red-900'>.</span></span>
        </div>

        {/* Search Bar for desktop */}
        <div className="hidden md:flex flex-grow mx-8">
          <input
            type="text"
            placeholder="Search products & help ..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Icons Section */}
        <div className="flex ">
        
         <NotificationDropdown />
          <ShoppingCart />
          {user ? ( <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src={user?.image ? user.image : "/avatar.png"}
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
        <DropdownMenuItem><button type='submit'>Logout</button></DropdownMenuItem>
    </form>
            

            </DropdownMenuContent>
          </DropdownMenu>) :(
          <>
          <Link href={'/login'}>
          <UserCircle className="w-6 h-6 text-gray-500" />
          </Link>
            </>
          )
}
        </div>
      </div>




      {/* Mobile Search Bar */}
      <div className="block md:hidden px-4 py-2">
        <input
          type="text"
          placeholder="Search products & help ..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Nav Links for Desktop */}
      <nav className="hidden md:flex justify-start w-screen space-x-10 py-2">
        <div className="p-2">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
}


