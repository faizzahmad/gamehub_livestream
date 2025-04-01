"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { onFollow,onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    isHost: boolean;
    hostIdentity: string;
}
export const Actions = ({isFollowing,isHost,hostIdentity} : ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const {userId} = useAuth();

    const handelFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => {
                    toast.success(`You are now following ${data.following.username}`);
                })
                .catch((error) => {
                    toast.error(`Failed to follow: ${error.message}`);
                });
        })
    }

    const handelUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
            .then((data) => {
                toast.success(`You have unfollowed ${data.following.username}`);
            }
            )
            .catch((error) => {
                toast.error(`Failed to unfollow: ${error.message}`);
            });
            })
    }

    const toggleFollow = () => {
        if(!userId){
           return router.push('/sign-in');
        };
        if(isHost) return;
        if(isFollowing){
            handelUnfollow();
        }else{
            handelFollow();
        }
        
    }
    return (
       <Button disabled={isPending || isHost} onClick={toggleFollow} variant={"primary"} size={'sm'} className=" w-full lg:w-auto">
       <Heart className={cn("h-4 w-4 mr-1", isFollowing ? "fill-white" : "fill-none")}/>
       {isFollowing ? "Unfollow" : "Follow"}
       </Button>
    );
}


export const ActionsSkelton = () => {
    return(
        <Skeleton className="h-10 w-full lg:w-24"/>
    )
}