import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { SearchIcon } from "lucide-react";

const SearchModal = () => {
  return (

  <Dialog >
      <DialogTrigger asChild>
      <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
      </DialogTrigger>
      <DialogContent className=" w-vw">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 h-full w-full">
          <div className="grid gap-2 w-full ">
        <div className="relative flex align-center gap-5 min-w-max">
            <div className="absolute left-3 self-center"><SearchIcon/></div>
            <Input outline-none className=" p-6 ml-1  "/>
            <Button className="self-center">Search</Button>
        </div>
           
          </div>
         
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
};

export default SearchModal
