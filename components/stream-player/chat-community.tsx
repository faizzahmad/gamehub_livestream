"use client";

import { useParticipants } from "@livekit/components-react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
    hostName : string;
    viewerName : string;
    isHidden : boolean;
};

export const ChatCommunity = ({hostName,viewerName,isHidden} : ChatCommunityProps) => {
    const [value, setValue] = useState("");
    const debouceValue = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const oncChange = (newValue : string) => {
        setValue(newValue)
    }

if(isHidden){
    return (
        <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-muted-foreground">    
                Community is disabled
            </p>
        </div>
    );
}

    return(
        <div className="p-4">
           <Input onChange={(e) => oncChange(e.target.value)} placeholder="Search community" className="border-white/10"/>
           <ScrollArea className=" gap-y-2 mt-4">
                <p className="text text-sm text-muted-foreground  hidden last:block p-2">
                    No results found
                </p>
                {
                    participants.map((participant) => (
                        <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant?.name || participant.identity}
                        participantIdentity={participant.identity}
                        />
                    ))
                }
           </ScrollArea>
        </div>
    )
}