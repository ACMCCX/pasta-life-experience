import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1, title } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title || "Art Piece",
              metadata: {
                productId,
              },
            },
            unit_amount: 30000, // $300.00 in cents
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pastalifeexperience.com"}/#art?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://pastalifeexperience.com"}/#art?canceled=true`,
      metadata: {
        productId,
        title,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Checkout session creation failed" },
      { status: 500 }
    );
  }
}
