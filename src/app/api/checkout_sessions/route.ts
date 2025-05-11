import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/_lib/stripe";
import { auth } from "@/app/_lib/Auth";
// temporary define prices
const priceMap: Record<number, number> = {
  25: 50,
  50: 100,
  75: 150,
  200: 200,
};
export async function POST(req: Request) {
  const formData = await req.formData();
  const points = Number(formData.get("points"));
  if (!priceMap[points]) {
    return NextResponse.json(
      { error: "Invalid point selection" },
      { status: 400 },
    );
  }
  const userSession = await auth();
  if (!userSession?.user?.email) throw new Error("You need to login first ");
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params. test version
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${origin}?alert='success'`,
      cancel_url: `${origin}`,
      customer_email: userSession?.user?.email,
      client_reference_id: userSession?.user?.id,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "inr",
            unit_amount: priceMap[points] * 100,
            product_data: {
              name: `${points} points `,
              description: "This points can be used for generating AI recipe",
            },
          },
        },
      ],
    });
    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    const error = err as { message: string; statusCode?: number };
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 },
    );
  }
}
