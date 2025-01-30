
import React from 'react';
import { Wrapper } from './wrappersidebar';
import Toggle from './Toggle';
import Recommended from './Recommended';
import { getRecommended } from '@/lib/recommended-service';

export default async function Sidebar() {
const recommended = await getRecommended();
  return (
    <Wrapper>
       <Toggle/>
       <div className='space-y-4 pt-4 lg:pt-0'>
        <Recommended data={recommended}/>
       </div>
    </Wrapper>
  )
}
