import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export const getSelf = async () => {
    const self = await currentUser();
    if(!self || !self.username){
        throw new Error('Unauthorized');
    }
    const user = await db.user.findUnique({
        where: {
           externalUserId : self.id
        },
    });
    if(!user){
        throw new Error('Not found');
    }
    return user;
}

export const getSlefByUsername = async (username: string) => {
    const self = await currentUser();
    if(!self || !self.username){
        throw new Error('Unauthorized');
    }
    const user = await db.user.findUnique({
        where: {
            username
        },
    });

    if(!user){
        throw new Error('User Not found');
    }

    if(self.username !== user.username){
        throw new Error('Unauthorized');
    }
    return user;
}