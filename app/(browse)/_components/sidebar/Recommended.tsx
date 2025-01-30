"use client";
import { useSidebar } from '@/store/use-sidebar';
import { User } from '@prisma/client';
import React from 'react';
import Useritem from './Useritem';

interface RecommendedProps {
    data: User[];
}

export default function Recommended({ data }: RecommendedProps) {
    const { collapsed } = useSidebar((state) => state);
    const showlable = !collapsed && data.length > 0;

    return (
        <div>
            {
                showlable && (
                    <div className='pl-6 mb-4'>
                        <p className='text-sm text-muted-foreground'>
                            Recommended
                        </p>
                    </div>
                )
            }

            <ul className=' space-y-2 px-2'>
                {
                    data.map((user) => (
                        <Useritem
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl}
                        isLive={false}
                        />
                    ))
                }
            </ul>
        </div>
    )
}
