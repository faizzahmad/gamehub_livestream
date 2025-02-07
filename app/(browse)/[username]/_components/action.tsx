"use client";
import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
interface ActionsProps {
    isFollowing : boolean;
    userId : string
}

export const Actions = ({isFollowing,userId}: ActionsProps) => {
    const [isPending,startTransition] = useTransition();
    const handelFollow = () => {
       startTransition(() => {
        onFollow(userId)
        .then((data) => {
            toast.success(`You are now following ${data.following.username}!`)
        }).catch(() => {
            toast.error("failed to follow the user")
        })
       });
    }

    const handelUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
            .then((data) => {
                toast.success(`You have unfollowed ${data.following.username}!`)
            }).catch(() => {
                toast.error("failed to unfollow the user")
            })
           });
    }

    const onClick = () => {
        if(isFollowing){
            handelUnfollow();
        }else{
            handelFollow();
        }
    }
    return (
        <Button disabled={isPending} variant={'primary'} onClick={onClick}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}