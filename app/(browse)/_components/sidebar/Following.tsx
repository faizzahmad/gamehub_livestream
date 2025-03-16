"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import Useritem from "./Useritem";
import UseritemSkelton from "./UseritemSkelton";

interface FollowingProps {
    data: (Follow & { following: User })[];
}
export const Following = ({ data }: FollowingProps) => {
    const { collapsed } = useSidebar((state) => state);

    if (!data.length) {
        return null;
    }
    return (
        <div>
            {
                !collapsed && (
                    <div className="pl-6 mb-4">
                        <p className="text-sm text-muted-foreground">
                            Following
                        </p>
                    </div>
                )
            }

            <ul className="space-y-2 px-2">
                {
                    data.map((follow) => (
                        <Useritem key={follow.following.id} username={follow.following.username} imageUrl={follow.following.imageUrl} />
                    ))
                }
            </ul>
        </div>
    )
}


export const FollowingSkelton = () => {
    return (
        <ul className="px-2 pt-0 lg:pt-0">
            {Array.from({ length: 3 }, (_, index) => (
                <UseritemSkelton key={index} />
            ))}

        </ul>
    )
}