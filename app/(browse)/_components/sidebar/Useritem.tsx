"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/use-sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { UserAvatar } from '@/components/UserAvatar';
import LiveBadge from '@/components/LiveBadge';
interface UseritemProps {
    username : string;
    imageUrl : string;
    isLive? : boolean;
}

export default function Useritem({
    username,
    imageUrl,
    isLive
} : UseritemProps) {
    const pathname = usePathname();
    const {collapsed} = useSidebar((state) => state);
    const href = `/${username}`;
    const isActive = pathname === href;
  return (
    <Button asChild variant={'ghost'} className={cn("w-full h-12", collapsed ? " justify-center" : "justify-start", isActive && "bg-accent")}>
        <Link href={href}>
        <div className={cn("flex items-center w-full gap-x-4",collapsed && "justify-center")}>
            <UserAvatar
            imageUrl={imageUrl}
            username={username}
            isLive={false}
            />
            {!collapsed && (
                <p className="truncate">
                    {username}
                </p>
            )}

            {
                !collapsed && isLive && (
                    <LiveBadge className='ml-auto'/>
                )
            }
        </div>
        </Link>
    </Button>
  )
}
