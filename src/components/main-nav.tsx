

import { User,  } from 'lucide-react'; 
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
    <header className="w-full sticky top-0 z-50 border-b border-gray-200 text-gray-500">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu */}
          <div className="md:hidden lg:hidden block">  <MobileNav  /></div>
       

          {/* Logo */}
          <span className="text-2xl font-bold text-gray-500">Everything Home<span className='text-red-900'>.</span></span>
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
        <div className="flex items-center space-x-1">
        
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
          <Button className="bg-primary">Login</Button>
          </Link>
          <Link href={'/register'}>
          <Button className="bg-primary">Sign Up</Button>
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


