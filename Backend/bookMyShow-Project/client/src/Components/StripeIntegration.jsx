import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout'; // Import Stripe Checkout
import { Button } from 'antd';
import axios from 'axios';


function StripeIntegration() {
 const [selectedSeats, setSelectedSeats] = useState([1, 2]); // Example selected seats
 const ticketPrice = 300; // Assume each ticket costs $10


 // Callback function when Stripe sends the payment token
 const onToken = async (token) => {
   console.log('Received Token:', token); // This token will be sent to the server
   try {
     // Call your backend to process the payment
     const response = await axios.post('http://localhost:5000/api/make-payment', {
       token,
       amount: selectedSeats.length * ticketPrice * 100, // Amount in cents
     });
    
     // Handle payment success response
     if (response.data.success) {
       alert('Payment successful! Transaction ID: ' + response.data.data);
     } else {
       alert('Payment failed: ' + response.data.message);
     }
   } catch (error) {
     alert('Payment error: ' + error.message);
   }
 };


 return (
   <div className="payment-container">
     <h3>Book Your Seats</h3>
     <p>Selected Seats: {selectedSeats.join(', ')}</p>
     <p>Total Amount: INR {selectedSeats.length * ticketPrice}</p>


     {selectedSeats.length > 0 && (
       <StripeCheckout
         token={onToken}
         billingAddress
         currency="INR"
         amount={selectedSeats.length * ticketPrice * 100} // Amount in cents
         stripeKey="pk_test_51PY5CiRteLJygSvEwi4Zd4R5ZKaKdY8VktV02VTgbK0KA7ATkaEpsK33AmpNQvIYJIZBnbpJuKUO3QG78eFkTH9B00Wyjxc4NL" // Publishable key
       >
         <Button type="primary" shape="round" size="large">
           Pay Now
         </Button>
       </StripeCheckout>
     )}
   </div>
 );
}

export default StripeIntegration;