// src/app/actions/stripe.ts
"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(formData: FormData) {
  let sessionUrl: string | null = null;

  try {
    const price = Number(formData.get("price"));
    const name = formData.get("name") as string;

    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: name },
          unit_amount: price * 100,
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    });

    sessionUrl = session.url;
  } catch (error) {
    console.error("Stripe Session Error:", error);
    // You could redirect to a custom error page here
    throw new Error("Could not initialize checkout. Please try again.");
  }

  // Redirect must happen OUTSIDE the try/catch block in Next.js
  if (sessionUrl) redirect(sessionUrl);
}