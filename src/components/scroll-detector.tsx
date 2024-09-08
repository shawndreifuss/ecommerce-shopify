'use client'; // Client Component

import { useEffect, useState } from 'react';

export const ScrollDetector = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <style>
      {`
        header {
          transform: ${scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(0)'};
          transition: transform 0.3s ease;
        }
      `}
    </style>
  );
};
