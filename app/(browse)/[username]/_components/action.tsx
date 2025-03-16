"use client";
import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock , onUnblock} from "@/actions/block";
interface ActionsProps {
    isFollowing: boolean;
    userId: string;
    isBlocked: boolean;
}

export const Actions = ({ isFollowing, userId,isBlocked }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
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
        if (isFollowing) {
            handelUnfollow();
        } else {
            handelFollow();
        }
    }


    const handelBlock = () => {
        startTransition(() => {
            onBlock(userId)
            .then((data) => {
                toast.success(`User ${data.blocked.username} has been blocked!`)
            })
            .catch((err) => {
                toast.error(err.message)
                })
        })
    }


    const handelUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
            .then((data) => {
                toast.success(`User ${data.blocked.username} has been Unblocked!`)
            })
            .catch((err) => {
                toast.error(err.message)
                })
        })
    }

    
    return (
        <>
            <Button disabled={isPending} variant={'primary'} onClick={onClick}>
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button onClick={isBlocked ? handelUnblock : handelBlock} disabled={isPending}>
                {isBlocked ? "Unblock" : "Block"}
            </Button>
        </>
    )
}