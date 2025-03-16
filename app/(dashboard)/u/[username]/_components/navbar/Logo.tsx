
import React from 'react';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { GiOlive } from "react-icons/gi";
import Link from 'next/link';


const font = Poppins({
    subsets: ['latin'],
    weight : ["200","300","400","500","600","700","800","900"]
})

export default function Logo() {
  return (
<Link href={'/'}>
<div className='flex items-center gap-x-4 hover:opacity-75 transition lg:pr-0 pr-2'>
<div className=' bg-white rounded-full border p-2'>
         <span className=' lg:text-[2.6rem] text-[1.5rem] text-black'><GiOlive /></span>
        </div>

        <div className={cn("hidden lg:block",font.className)}>
          <p className='text-lg font-semibold'>Game Hub</p>
          <p className='text-xs text-muted-foreground'>Creator Dashboard</p> 
        </div>
</div>
</Link>
  )
}
