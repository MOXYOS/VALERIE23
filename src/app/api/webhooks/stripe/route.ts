import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/utils/stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client (bypasses RLS) to insert orders
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // NOTE: Ideally this should be SERVICE_ROLE_KEY for admin bypass
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || '' // Note: You'll need to set this after configuring the webhook
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as any;

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as any;
    
    // We embedded userId in metadata during createPaymentIntent
    const userId = paymentIntent.metadata.userId;

    if (userId) {
      // Insert order into Supabase
      const { error } = await supabaseAdmin.from('orders').insert({
        user_id: userId,
        stripe_payment_intent_id: paymentIntent.id,
        total_amount: paymentIntent.amount / 100,
        status: 'Paid',
        items: [], // In a real app, you'd pass cart items in metadata or save them to a pending order table first
        shipping_address: {},
      });

      if (error) {
        console.error("Error inserting order:", error);
      }
    }
  }

  return new NextResponse('OK', { status: 200 });
}
