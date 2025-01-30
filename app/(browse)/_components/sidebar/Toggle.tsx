"use client"
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/use-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import React from 'react';
import { Hint } from '@/components/hint';

export default function Toggle() {
   const {collapsed,onCollapse,onExpand} = useSidebar((state) => state);
   const lable = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
    {
        collapsed && (
            <div className='w-full hidden lg:flex items-center justify-center pt-4 mb-4'>
               <Hint label={lable} side='right' asChild>
               <Button variant={'ghost'} className='h-auto p-2' onClick={onExpand}>
                    <ArrowRightFromLine className='h-4 w-4'/>
                </Button>
               </Hint>
            </div>
        )
    }
    {!collapsed && (
        <div className='p-3 pl-6 mb-2 flex items-center w-full'>
            <p className='font-semibold text-primary'>For You</p>
            <Hint label={lable} side='right' asChild>
            <Button className=' h-auto p-2 ml-auto' variant={'ghost'} onClick={onCollapse}>
                <ArrowLeftFromLine className='h-4 w-4'/>
            </Button>
            </Hint>
        </div>
    )}
    </>
  )
}
