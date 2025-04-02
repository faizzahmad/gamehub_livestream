"use cient";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
    userId : string;
};

export const UnblockButton = async({userId} : UnblockButtonProps) => {
    const [ispending,startTransition] = useTransition();
    const onClick = () => {
        startTransition(() => {
            onUnblock(userId)
            .then((res) => {
                toast.success(`user ${res.blocked.username} unblocked`);
            }).catch((err) => {
                toast.error("Something went wrong");
            }
            );
        })
    }
    return(
        <Button 
        disabled={ispending}
        onClick={onClick}
        variant={'link'}
        size={'sm'}
        className="text-blue-500 w-full"
        >
            Unblock
        </Button>
    );
};