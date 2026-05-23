import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { paymentIntentId, items } = await req.json();

    if (!paymentIntentId) {
      return new NextResponse('Missing payment intent ID', { status: 400 });
    }

    // 1. Verify the payment intent with Stripe directly to prevent spoofing
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return new NextResponse('Payment not successful', { status: 400 });
    }

    const userId = paymentIntent.metadata.userId;

    if (!userId) {
      return new NextResponse('Missing user ID in metadata', { status: 400 });
    }

    // Initialize Supabase client using server cookies so it acts as the authenticated user
    const supabase = await createClient();

    // 2. Check if order already exists (to prevent duplicate inserts)
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_payment_intent_id', paymentIntent.id)
      .single();

    if (existingOrder) {
      return NextResponse.json({ success: true, message: 'Order already recorded' });
    }

    // 3. Insert order into Supabase
    const { error } = await supabase.from('orders').insert({
      user_id: userId,
      stripe_payment_intent_id: paymentIntent.id,
      total_amount: paymentIntent.amount / 100, // Convert from cents
      status: 'Paid',
      items: items || [], 
      shipping_address: {},
    });

    if (error) {
      console.error("Error inserting order:", error);
      return new NextResponse('Database Error', { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Order Confirmation Error:", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
