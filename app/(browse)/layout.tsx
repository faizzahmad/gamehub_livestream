import React, { Suspense } from 'react';
import Navbar from './_components/navbar/Navbar';
import Sidebar from './_components/sidebar/Sidebar';
import Container from './_components/Container';
import SideBarSkelton from './_components/sidebar/SideBarSkelton';

export default function BrowseLayout({children} :  {children: React.ReactNode}) {
  return (
<>
<Navbar/>
<div className=' flex h-full pt-20'>
  <Suspense fallback={<SideBarSkelton/>}>
  <Sidebar/>
  </Suspense>
   <Container>
   {children}
   </Container>
     
    </div>
    </>
  )
}
