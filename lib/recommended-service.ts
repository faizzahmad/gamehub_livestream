import { getSelf } from "./auth-service";
import { db } from "./db";
export const getRecommended = async () => {
    let userId;
    try{
        const self = await getSelf();
        userId = self.id;
    }catch{
       userId = null;
    }

    let users = [];
    if(userId){
        users = await db.user.findMany({
            where: {
                NOT: {
                    id: userId
                },
            },
            orderBy: {
                createdAt: 'desc'
            },
        })
    }else{
        users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })
    }

  
    return users;
}