import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  try {
    console.log("[Checkout API] Request received");
    const { productId, quantity = 1, title } = await req.json();
    console.log("[Checkout API] Parsed body:", { productId, quantity, title });

    if (!productId) {
      console.error("[Checkout API] Missing productId");
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("[Checkout API] STRIPE_SECRET_KEY not set");
      return NextResponse.json(
        { error: "Stripe secret key not configured. Contact support." },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    console.log("[Checkout API] Creating Stripe session for:", title);
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
    } as any);

    console.log("[Checkout API] Session created successfully:", session.id);
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[Checkout API] Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Checkout session creation failed. Check server logs." },
      { status: 500 }
    );
  }
}
