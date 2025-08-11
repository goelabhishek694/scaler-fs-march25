const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use your secret key here

export const makePayment = async (req, res) => {
 try {
   const { token, amount } = req.body;

   // Step 1: Create a Stripe customer using the token
   const customer = await stripe.customers.create({
     email: token.email,
     source: token.id,
   });

   // Step 2: Create a PaymentIntent
   const paymentIntent = await stripe.paymentIntents.create({
     amount: amount, // Amount is in cents
     currency: "usd",
     customer: customer.id,
     payment_method_types: ["card"],
     receipt_email: token.email,
     description: "Booking movie tickets",
   });

   const transactionId = paymentIntent.id;
   // Step 3: Send a response to the client with the transaction ID
   res.send({
     success: true,
     message: "Payment processing. You will receive a confirmation once the payment is complete",
     data: transactionId,
   });
 } catch (err) {
   res.send({
     success: false,
     message: err.message,
   });
 }
}