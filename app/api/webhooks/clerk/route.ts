import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { resetIngress } from '@/actions/ingress';

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }


    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        });
    };



    if(evt.type === 'user.created') {
        await db.user.create({
            data : {
                externalUserId: payload.data.id,
                username : payload.data.username,
                imageUrl : payload.data.image_url,
                stream : {
                    create : {
                        name : `${payload.data.username}'s stream`,
                    }
                },

            },
        });
    }

    if(evt.type === 'user.updated') {
        const currentUser = await db.user.findUnique({
            where : {
                externalUserId : payload.data.id
            }
        });

        if(!currentUser){
            return new Response("user not found", {status : 404});
        }else{
            await db.user.update({
                where : {
                    externalUserId : payload.data.id
                },
                data : {
                    username : payload.data.username,
                    imageUrl : payload.data.image_url  
                }
            });
        };
    };

    if(evt.type === "user.deleted"){
        await resetIngress(payload.data.id);
        await db.user.delete({
            where : {
                externalUserId : payload.data.id
            }
        })
        

    }

    // Do something with payload
    // For this guide, log payload to console

    const eventType = evt.type;
    


    return new Response('Webhook received', { status: 200 });

}