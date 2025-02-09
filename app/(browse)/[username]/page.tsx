import { isFollowingUser } from '@/lib/follow-service';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import React from 'react'
import { Actions } from './_components/action';

interface UserPageProps {
    params : {
        username : string;
    }
}
export default async function UserPage({params} : UserPageProps) {
  const user = await getUserByUsername(params.username);
  if(!user){
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  return (
    <div className=' flex flex-col gap-y-4'>
      <p>User {user.username}</p>
      <p>User Id {user.id}</p>
      <p>Is followinf {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} userId={user.id}/>
     
    </div>
  )
}
