"use client";
import React from 'react';
import qs from 'query-string';
import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Search() {
    const router = useRouter();
    const [value, setValue] = useState('');
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) return;
        const url = qs.stringifyUrl({
            url: '/search',
            query: { term: value }
        }, { skipEmptyString: true });
        router.push(url);
    }
    return (
        <form
            onSubmit={onSubmit}
            className='relative w-full lg:w-[400px] flex items-center'>
            <Input placeholder='Search' className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {
                value && <X className='absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer  hover:opacity-75 transition' onClick={() => setValue("")} />
            }
            <Button
                type='submit'
                size='sm'
                className='rounded-l-none bg-white'
            >
                <SearchIcon className='h-5 w-5 text-muted-foreground text-black' />
            </Button>
        </form>
    )
}
