"use client";
interface ContainerProps {
    children: React.ReactNode
    }
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React from 'react';
import { useEffect } from 'react';
import {useMediaQuery} from 'usehooks-ts';

export default function Container({children}: ContainerProps) {
    const matches = useMediaQuery('(max-width: 1024px)');
    const {collapsed,onCollapse,onExpand} = useSidebar((state) => state);

    useEffect(() => {
        if(matches){
            onCollapse();
        }else{
            onExpand();
        }
    },[matches,onCollapse,onExpand]);
   return (
    <div className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>
        {children}
    </div>
  )
}
