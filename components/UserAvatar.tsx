import { cva,type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import LiveBadge from "@/components/LiveBadge";
const avatarSizes = cva("",{
  variants: {
    size : {
      default: "h-8 w-8",
      lg : "h-14 w-14",
    },
    defaultVariants : {
      size : "default"
    },
  },
})
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    imageUrl: string;
    username: string;
    isLive?: boolean;
    showBadge?: boolean;
};

export const UserAvatar = ({username,imageUrl,isLive,showBadge,size} : UserAvatarProps) => {
  const canShowBadge = isLive && showBadge;
  return(
    <div className="relative">
      <Avatar className={cn(isLive && "ring-2 ring-red-500 border border-background", avatarSizes({size}))} >
        <AvatarImage src={imageUrl} className="object-cover"/>
        <AvatarFallback>
          {username[0].toUpperCase()}
          {username[username.length - 1].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {
        canShowBadge && (
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
            <LiveBadge/>
          </div>
        )
      }
    </div>
  )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {
}
 
export const UserAvatarSkeleton = ({size} : UserAvatarSkeletonProps) => {
  return(
    <Skeleton className={cn("rounded-full",avatarSizes({size}))}/>
  )
}