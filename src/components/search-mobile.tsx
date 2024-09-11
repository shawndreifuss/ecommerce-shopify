'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';

export default function SearchMobile() {
  const searchParams = useSearchParams();

  return (
    <form
      action="/search"
      method="GET"
>

<div className="block md:hidden px-4 py-2">
        <input
           key={searchParams?.get('q')}
           type="text"
           name="q"
           placeholder="Search for products..."
           autoComplete="off"
           defaultValue={searchParams?.get('q') || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </form>
  );
}


