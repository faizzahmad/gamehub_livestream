import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function NotFoundPage() {
  return (
   <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h4 className="text-4xl">404</h4>
            <p>We couldn&apos;t find the user you were looking for</p>
            <Button variant={'secondary'}>
                <Link href={'/'}>Go back home</Link>
            </Button>
   </div>
  );
};
