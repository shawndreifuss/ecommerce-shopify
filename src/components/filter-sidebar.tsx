"use client";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { X, ChevronDown, Filter } from "lucide-react";
import { sortOptions} from "@/dummy-data/filter-data";

  import  {ProductList}  from "@/components/product/product-list";
import Filters from "@/components/filters";
import { useParams } from "next/navigation";
import { capitalizeWords } from "@/utils/word-capitalize";
import { Product } from "@/types/shopify";

  
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const FilterSidebar = ({products}: { products: Product[]}) => {
  const  params  = useParams();
   const slug = Array.isArray(params.slug) ? params.slug.join('-') : params.slug;



  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-background mt-24 w-screen">
      <div>
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative mt-20 z-50 lg:hidden w-screen"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full  transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <X aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <div className="w-full px-4 sticky top-0 ">
             <Filters />
             </div>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto w-screen px-4 sm:px-6 lg:px-12 ">
            <div className="pt-24 md:pt-20 lg:pt-16">
     
      </div>
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6 z-50 bg-background ">
            
            <h1 className="text-2xl font-bold tracking-tight text-gray-500">
             All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDown
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <Filter aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
<div className="w-full flex ">
            
              {/* Filters */}
              <div className="hidden lg:block w-fit h-screen  ">
                <h3 className="sr-only">Categories</h3>
                 <Filters />
              </div>

              {/* Product grid */}
              <div className="flex flex-wrap justify-center align-center ">
                <ProductList products={products} />
              </div>
       
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FilterSidebar;
