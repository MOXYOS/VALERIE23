'use server';

import { stripe } from '@/utils/stripe';
import { createClient } from '@/utils/supabase/server';

export async function createPaymentIntent(amount: number) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert dollars to cents
      currency: 'usd',
      metadata: {
        userId: user.id,
      },
      // Automatically confirm if possible, otherwise require action
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error: any) {
    console.error("Payment Intent Error:", error);
    return { error: error.message };
  }
}
