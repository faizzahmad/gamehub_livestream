"use client";
import {Dialog,DialogClose,DialogContent,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useTransition ,useRef,ElementRef} from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
    initialName : string;
    initialThumbnailUrl : string | null;
}

export const InfoModal = ({initialName,initialThumbnailUrl} : InfoModalProps) => {
    const router = useRouter();
    const [name,setName] = useState(initialName);
    const [thumbnailUrl,setThumbnailUrl] = useState(initialThumbnailUrl);
    const [isPending,startTransition] = useTransition();
    const closeRef = useRef<ElementRef<"button">>(null);
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateStream({
                name : name
            }).then(() => {
                toast.success('Stream updated successfully');
                closeRef?.current?.click();
            }).catch((error) => {
                toast.error(`Failed to update stream: ${error.message}`);
            }
            )
        });

    }

    const onRemove = () => {
        startTransition(() => {
            updateStream({
                thumbnail : null
            }).then(() => {
                toast.success('Thumbnail removed successfully');
                setThumbnailUrl("");
                closeRef?.current?.click();
            }).catch((error) => {
                toast.error(`Failed to remove thumbnail: ${error.message}`);
            })
        })
    }
    return(
       <Dialog>
        <DialogTrigger asChild>
            <Button variant={'link'} size={'sm'} className="ml-auto">
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit stream info
                </DialogTitle>
            </DialogHeader>
            <form className="space-y-14" onSubmit={onSubmit}>
                <div className="space-y-2">
                    <Label>
                        Name
                    </Label>
                    <Input placeholder="Steram name" onChange={onChange} value={name} disabled={isPending}></Input>
                </div>
                <div className="space-y-2">
                    <Label>
                        Thumbnail
                    </Label>
                    {
                        thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint label="Remove thumbnail" asChild side="left">
                                        <Button
                                        type="button"
                                        disabled={isPending}
                                        onClick={onRemove}
                                        className="h-auto w-auto p-1.5"
                                        >
                                            <Trash className="h-4 w-4"/>
                                        </Button>
                                    </Hint>
                                </div>
                                <Image alt="thumbnail" src={thumbnailUrl} fill className="object-cover"/>
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                        <UploadDropzone endpoint={"thumbnailUploader"} appearance={{
                            label : {
                                color : "#FFFFFF"
                            },
                            allowedContent : {
                                color : "#FFFFFF"
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            setThumbnailUrl(res?.[0]?.ufsUrl);
                            router.refresh();
                            closeRef?.current?.click();
                        }}
                        />
                    </div>
                        )
                    }
                    
                </div>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button type="button" variant={'ghost'}>Cancel</Button>
                    </DialogClose>
                    <Button variant={'primary'} type="submit" disabled={false}>
                    Save
                </Button>
                </div>
                
            </form>
        </DialogContent>
       </Dialog>
    )
}