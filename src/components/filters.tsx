'use client'
import { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSection {
  id: string;
  name: string;
  options: FilterOption[];
}

// Sample filter data for categories, price, color, and ratings
const filters: FilterSection[] = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { label: 'Sofas', value: 'sofas' },
      { label: 'Dining Tables', value: 'dining-tables' },
      { label: 'Chairs', value: 'chairs' },
      { label: 'Coffee Tables', value: 'coffee-tables' },
      { label: 'Beds', value: 'beds' },
    ],
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { label: '$0 - $500', value: '0-500' },
      { label: '$500 - $1000', value: '500-1000' },
      { label: '$1000 - $2000', value: '1000-2000' },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { label: 'Brown', value: 'brown' },
      { label: 'White', value: 'white' },
      { label: 'Black', value: 'black' },
      { label: 'Gray', value: 'gray' },
      { label: 'Blue', value: 'blue' },
    ],
  },
];

// Sample data for rating filter
const ratingOptions = [
  { stars: 5, count: 475 },
  { stars: 4, count: 12 },
  { stars: 3, count: 20 },
  { stars: 2, count: 11 },
  { stars: 1, count: 6 },
];

const Filters: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    if (openSections.includes(id)) {
      setOpenSections(openSections.filter((sectionId) => sectionId !== id));
    } else {
      setOpenSections([...openSections, id]);
    }
  };

  return (
    <div className="w-96 h-full p-1 bg-background rounded-md border-r-1 md:pr-10">
      {filters.map((filter) => (
        <div key={filter.id} className="mb-4">
          <button
            onClick={() => toggleSection(filter.id)}
            className="flex justify-between w-full py-3 text-left text-lg font-medium text-gray-500 focus:outline-none focus:text-gray-600"
          >
            <span>{filter.name}</span>
            {openSections.includes(filter.id) ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {openSections.includes(filter.id) && (
            <div className="mt-2">
              {filter.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    id={`${filter.id}-${index}`}
                    type="checkbox"
                    value={option.value}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${filter.id}-${index}`}
                    className="ml-3 text-sm text-gray-500"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Rating Filter */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex justify-between w-full py-3 text-left text-lg font-medium text-gray-500 focus:outline-none focus:text-gray-600"
        >
          <span>Rating</span>
          {openSections.includes('rating') ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {openSections.includes('rating') && (
          <div className="mt-2">
            {ratingOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  id={`rating-${index}`}
                  type="checkbox"
                  value={`${option.stars}-stars`}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`rating-${index}`} className="ml-3 flex items-center">
                  {Array(option.stars)
                    .fill(0)
                    .map((_, starIndex) => (
                      <Star key={starIndex} className="h-5 w-5 text-yellow-500" />
                    ))}
                  {Array(5 - option.stars)
                    .fill(0)
                    .map((_, starIndex) => (
                      <Star key={starIndex} className="h-5 w-5 text-gray-300" />
                    ))}
                  <span className="ml-2 text-sm text-gray-500">({option.count})</span>
                </label>
              </div>
            ))}
            <div className="mt-2">
              <a href="#" className="text-blue-500 text-sm">
                View all →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
