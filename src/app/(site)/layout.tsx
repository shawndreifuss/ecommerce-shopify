// /layouts/site-layout.tsx
import React from "react";
import { MainNav } from "@/components/main-nav";




const SiteLayout = async ({ children }: { children: React.ReactNode }) => {


  return (
    <>
      <MainNav />
      <div>hello</div>
      {children}
    </>
  );
};

export default SiteLayout;
