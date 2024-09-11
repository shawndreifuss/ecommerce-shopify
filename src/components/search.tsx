'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <form
      action="/products/search"
      method="GET"
      className='w-full'
    >
      {/* Search Bar for desktop */}
      <div className="hidden md:flex flex-grow mx-8">
          <input
          key={searchParams?.get('q')}
            type="text"
            name='q'
            autoComplete="off"
            defaultValue={searchParams?.get('q') || ''}
            placeholder="Search products & help ..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
    </form>
  );
}


