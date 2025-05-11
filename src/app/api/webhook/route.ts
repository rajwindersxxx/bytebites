import { stripe } from "@/app/_lib/stripe";
import { updateUserPointsDB } from "@/app/_servers/supabase/users";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req: Request) {
  const rawBody = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature!, webhookSecret!);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const {amount_total, customer_email} = event.data.object
    const amount = Number(amount_total) / 100;
    updateUserPointsDB(amount/2 ,customer_email)
  }
  return NextResponse.json({ received: true });
}
