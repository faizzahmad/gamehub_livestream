import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({
        image:
            { maxFileSize: "4MB",
             maxFileCount: 1
            }
         })
         .middleware(async () => {
            const self = await getSelf();
            return {user : self}
         })
         .onUploadComplete(async({metadata,file}) => {
            await db.stream.update({
                where : {
                    userId : metadata.user.id
                },
                data : {
                    thumbnail : file.ufsUrl
                }
            });
            return {fileUrl : file.ufsUrl}
         })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
