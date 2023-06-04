const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: req.body.price,
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}&order_id=${req.body.orderId}`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  });
  res.status(200).json({ session });
}
