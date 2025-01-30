"use client";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import ToggleSkelton from "./ToggleSkelton";
import RecommendedSkelton from "./RecommendedSkelton";
interface WrapperProps {
    children: React.ReactNode;
}
export const Wrapper = ({children}: WrapperProps) => {
    const isClient = useIsClient();
     const {collapsed} = useSidebar((state) => state);
   

     if(!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#2a2c37] border-r border-[#2a2c37] z-50 transition-all duration-150">
              <ToggleSkelton/>
              <RecommendedSkelton/>
            </aside>  
           );
     }
    return (
        <aside className={cn("fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-[#2a2c37] border-r border-[#2a2c37] z-50 transition-all duration-150",
            collapsed && "w-[70px] lg:w-[70px]"
        )}>
        
            {children}
        </aside>
    );
}