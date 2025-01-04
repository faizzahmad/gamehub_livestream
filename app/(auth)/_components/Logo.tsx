
import React from 'react';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { GiOlive } from "react-icons/gi";


const font = Poppins({
    subsets: ['latin'],
    weight : ["200","300","400","500","600","700","800","900"]
})

export default function Logo() {
  return (
    <div className=' flex flex-col items-center  gap-y-4 '>
        <div className=' bg-white rounded-full border p-2'>
         <span className=' text-[3rem] text-black'><GiOlive /></span>
        </div>

        <div className={cn("flex flex-col items-center",font.className)}>
            <p className="text-xl font-semibold">Gamehub</p>
            <p className="text-sm text-muted-foreground">Let's Play</p>
        </div>
    </div>
  )
}
