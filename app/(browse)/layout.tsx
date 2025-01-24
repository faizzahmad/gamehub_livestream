import React from 'react';
import Navbar from './_components/navbar/Navbar';
import Sidebar from './_components/sidebar/Sidebar';

export default function BrowseLayout({children} :  {children: React.ReactNode}) {
  return (
<>
<Navbar/>
<div className=' flex h-full pt-20'>
    <Sidebar/>
        {children}
    </div>
    </>
  )
}
