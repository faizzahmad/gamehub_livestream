import React from 'react';
import Logo from './_components/Logo';

export default function Authlayout({children} :  {children: React.ReactNode}) {
  return (
    <div className=' h-full flex items-center justify-center flex-col space-y-6'>
        <Logo/>
        {children}
    </div>
  )
}
