"use server";
import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (id: string) => {
   const self = await getSelf();
   let blockedUser;

    try{
        blockedUser = await blockUser(id);
    }catch{
    //  This means that the user is a guest
    }

    try{
    await roomService.removeParticipant(self.id, id);
    }catch{
        // This means that the user is not in the room
    }
    revalidatePath(`/u/${self.username}/community`);
    
    return blockedUser;
}

export const onUnblock = async (id: string) => {
    const self = await getSelf();
    const unBlockledUser = await unblockUser(id);
    revalidatePath(`/u/${self.username}/community`);
  
    return unBlockledUser;
}