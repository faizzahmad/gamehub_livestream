
import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/UserAvatar";
import {  User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface ResultCardProps {
    data: {
        user : User,
        isLive : boolean,
        name : string,
        thumbnail : string | null,
    }
}

export const ResultCard = ({ data }: ResultCardProps) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="h-full w-full space-y-4 ">
                <Thumbnail
                    src={data.thumbnail}
                    fallback={data.user.imageUrl}
                    isLive={data.isLive}
                    username={data.user.username}
                />
               

                <div className="flex gap-x-3 ">
                    <UserAvatar
                        username={data.user.username}
                        imageUrl={data.user.imageUrl}
                        isLive={data.isLive}
                    />
                    <div className="flex flex-col text-sm overflow-hidden">
                        <p className="truncate font-semibold hover:text-blue-500 ">
                            {data.name}
                        </p>
                        <p className="text-muted-foreground">
                            {data.user.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}


export const ResultCardSkeleton = () => {
    return (
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton/>
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32"/>
                    <Skeleton className="h-3 w-32"/>
                </div>
            </div>
        </div>
    );
};
