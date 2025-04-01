import { UserAvatar } from "@/components/UserAvatar";
import Image from "next/image";

interface ThumbnailProps {
    src : string | null;
    fallback : string;
    isLive : boolean;
    username : string;
}

export const Thumbnail = ({src,fallback,isLive,username} : ThumbnailProps) => {
    let content;
    if(!src){
        content = (
            <div className="bg-[#2a2c37] flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:translate-y-1 rounded-md border">
                <UserAvatar size={'lg'} 
                showBadge
                username={username}
                imageUrl={fallback}
                isLive={isLive}
                />
            </div>
        )
    }else{
       content = (
        <Image src={src} fill alt="Thumbnail" className="object-cover transition-transform group-hover:translate-x-2 group-hover:translate-y-1 rounded-md border"/>
       )
    }
    return(
<div className="group aspect-video relative rounded-md cursor-pointer">
    <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center"/>
    {content}
</div>
    );
};