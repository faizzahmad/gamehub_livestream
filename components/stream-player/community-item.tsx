"use client";
import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import { Hint } from "@/components/hint";
import { onBlock } from "@/actions/block";
import { cn,stringToColor } from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface CommunityItemProps {
    hostName : string;
    viewerName : string;
    participantName :  string;
    participantIdentity : string;
};

export const CommunityItem = ({hostName,viewerName,participantName,participantIdentity} : CommunityItemProps) => {
    return(
        <div>
            {participantName}
        </div>
    )
}