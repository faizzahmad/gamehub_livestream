"use client";

import { toast } from "sonner";
import {  useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
interface ToggleCardProps {
    label: string;
    value: boolean;
    filed: FieldTypes;
}

export const ToggleCard = ({
    label,
    value = false,
    filed
} : ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();
    const onChange = () => {
        startTransition(() => {
            updateStream({[filed]: !value})
            .then(() => {
                toast.success("Chat settings updated");
            })
            .catch(() => toast.error("Something went wrong"));
        });
    }
    return (
        <div className="rounded-xl bg-[#252731] p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>

                <div className="space-y-2">
                    <Switch checked={value} onCheckedChange={onChange} disabled={isPending}>
                        {value ? "on" : "off"}
                    </Switch>
                </div>
            </div>
        </div>
    );
}


export const ToggleCardSkeleton = () => {
    return(
        <Skeleton className="rounded-xl p-10 w-full "/>
    );
};