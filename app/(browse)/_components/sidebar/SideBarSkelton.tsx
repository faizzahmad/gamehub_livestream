import React from 'react'
import RecommendedSkelton from './RecommendedSkelton'
import ToggleSkelton from './ToggleSkelton'
import { FollowingSkelton } from './Following'

export default function SideBarSkelton() {
  return (
   <aside className=' fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#2a2c37] border-r border-[#2a2c37] z-50'>
        <ToggleSkelton/>
        <FollowingSkelton/>
        <RecommendedSkelton/>
   </aside>
  )
}
