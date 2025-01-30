"use client";
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'

export default function ToggleSkelton() {
  return (
    <div className='p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full'>
        <Skeleton className="h-6 w-[100px]"/>
        <Skeleton className="h-6 w-6"/>
    </div>
  )
}
