import React from 'react'
import UseritemSkelton from './UseritemSkelton'

export default function RecommendedSkelton() {
  return (
   <ul className='px-2'>
        {[...Array(3)].map((_,index) => (
            <UseritemSkelton key={index}/>
        ))}
   </ul>
  )
}
