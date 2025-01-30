import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function UseritemSkelton() {
  return (
   <li className='flex items-center gap-x-4 px-3 py-2'>
    <Skeleton className='min-h-[32px] min-w-[32px] rounded-full'/>
    <div className=' flex-1'>
        <Skeleton className='h-6'/>
    </div>
   </li>
  )
}
