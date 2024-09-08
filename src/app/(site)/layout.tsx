import React from 'react';
import { MainNav } from '@/components/main-nav';
import { ScrollDetector } from '@/components/scroll-detector'; // Client-side component for scroll detection

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ScrollDetector />
      <MainNav />

      {children}
    </>
  );
};

export default SiteLayout;
