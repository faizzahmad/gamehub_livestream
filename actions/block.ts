"use server";
import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    //TODO : Adapt to disconnect form live stream
    //TODO : Allow ability to kick the guest
    const blockedUser = await blockUser(id);
    revalidatePath("/");
    if(blockedUser){
        revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
}

export const onUnblock = async (id: string) => {
    const unBlockledUser = await unblockUser(id);
    revalidatePath("/");
    if(unBlockledUser){
        revalidatePath(`/${unBlockledUser.blocked.username}`);
    }
    return unBlockledUser;
}