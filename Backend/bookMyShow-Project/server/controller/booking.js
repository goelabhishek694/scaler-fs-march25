const Booking = require('../models/bookingModel');
const Show = require('../models/showModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use your secret key here

exports.makePayment = async (req, res) => {
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
     description: "Token has been assigned to the movie!",
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

exports.bookShow = async (req, res) => {
  try{
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {bookedSeats: updatedBookedSeats});

    res.json({
      success: true,
      message: "New boking done !",
      data: newBooking
    })
  }catch(err){
    res.send({
     success: false,
     message: err.message,
   });
  }
}

exports.getAllBookings = async (req, res) => {
  try{
    const {userId} = req.params;
    const allBookings = await Booking.find({user: userId})
    .populate("user")
    .populate({
      path: "show",
      populate: {
        path: "movie",
        model: "movie"
      }
    })
    .populate({
      path: "show",
      populate: {
        path: "theatre",
        model: "theatre"
      }
    });

    res.json({
      success: true,
      message: "bokings fetched !",
      data: allBookings
    })
  }catch(err){
    res.send({
     success: false,
     message: err.message,
   });
  }
}