import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

export const stripe =
  secretKey && secretKey.length > 0
    ? new Stripe(secretKey, {
        apiVersion: "2024-06-20"
      })
    : null;
