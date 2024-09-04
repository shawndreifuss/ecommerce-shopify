import MainNav from "@/components/main-nav";
import React from "react";

const SiteLayout =  ({ children }: { children: React.ReactNode }) => {


  
  return (
    <>
    <MainNav  />
    <div>hello </div>
    {children}
    </>

  )
  
  
  
};

export default SiteLayout;


