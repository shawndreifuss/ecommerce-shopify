

import Link from "next/link"
import { CircleUser, Menu, Package2, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavLinks } from "@/components/nav-links"
import logo from '@/assets/images/logo.png'
import SearchModal from "@/components/search-modal"
import { auth, signOut } from '@/auth'

const MainNav = async () => {

  const session = await auth()
  const user = session?.user

  return (
    <header className="sticky top-0 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
       <Image src={logo} width={100} height={100} alt="Everything Home logo" />

       <span className="sr-only">Everything Home</span>
        </Link>
       <NavLinks />
      </nav>
      <Sheet>
      <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Everything Home</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="text-muted-foreground hover:text-foreground"
              >
                Collections
              </Link>
              <Link
                href="/orders"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="/my-account"
                className="text-muted-foreground hover:text-foreground"
              >
                My Account
              </Link>
              <Link href="/settings" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SearchModal />
{!user ? (
  <>
            <Link href={'/login'}>
            <Button className="bg-primary">Login</Button>
            </Link>
            <Link href={'/login'}>
            <Button className="bg-primary">Sign Up</Button>
            </Link>
              </>
            ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={'/settings'}>Settings</Link></DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator color="primary" />
              <form action={async () => {
        'use server';
        await signOut()
       }}>
        <button className="flex w-full h-full justify-start p-2 align-center " type='submit'> <span>Sign Out</span></button>
       </form>
            </DropdownMenuContent>
          </DropdownMenu>
        )}  
        </div>
      
      </header>

  )
}

export default MainNav