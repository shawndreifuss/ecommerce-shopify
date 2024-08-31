import React from 'react'

const DashboardLayout = ({ children }:{ children: React.ReactNode }) => {
  return (
   <div className="flex flex-col gap-y-4">
    <nav className="bg-black">hellooooooo</nav>
    {children}
   </div>
  )
}

export default DashboardLayout