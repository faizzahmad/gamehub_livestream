import { getRecommended } from '@/lib/recommended-service';
import { getFollowedUsers } from '@/lib/follow-service';
import React from 'react';
import { Wrapper } from './wrappersidebar';
import { Following } from './Following';
import Toggle from './Toggle';
import Recommended from './Recommended';

export default async function Sidebar() {
const recommended = await getRecommended();
const following = await getFollowedUsers();
  return (
    <Wrapper>
       <Toggle/>
       <div className='space-y-4 pt-4 lg:pt-0'>
       <Following data={following}/>
        <Recommended data={recommended}/>
       </div>
    </Wrapper>
  )
}
