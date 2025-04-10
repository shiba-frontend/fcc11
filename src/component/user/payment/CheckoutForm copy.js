import React from 'react'
import { CardElement, PaymentElement, ExpressCheckoutElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from 'react-toastify';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const clientSecret = 'sk_test_51HDloiEyvqDh0TGqK7OO1p0X6rPEy0S3bcVnGpu2Gti7SUqA2SOiyXooMaoyTITcUNvpCmbsRuLicke4qgpXQPsK00Lu7smiuX'
  
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();
      //setLoading(true);

      const paymentElement = elements?.getElement("payment-form");
paymentElement?.mount("#payment-form");
  
      const { error, paymentIntent  } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
      });
  
      //setLoading(false);
  
      if (error) {
        //setError(error.message);
      } else {
        // Handle successful payment
        console.log('PaymentMethod', paymentIntent );
      }
    };

    const onConfirm = async (event) => {
      if (!stripe) {
        // Stripe.js hasn't loaded yet.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const {error: submitError} = await elements.submit();
      if (submitError) {
       // setErrorMessage(submitError.message);
        return;
      }
  
      // Create the PaymentIntent and obtain clientSecret
      const res = await fetch('/create-intent', {
        method: 'POST',
      });
      const {client_secret: clientSecret} = await res.json();
  
      // Confirm the PaymentIntent using the details collected by the Express Checkout Element
      const {error} = await stripe.confirmPayment({
        // `elements` instance used to create the Express Checkout Element
        elements,
        // `clientSecret` from the created PaymentIntent
        clientSecret,
        confirmParams: {
          return_url: 'https://example.com/order/123/complete',
        },
      });
  
      if (error) {
        // This point is only reached if there's an immediate error when
        // confirming the payment. Show the error to your customer (for example, payment details incomplete)
       // setErrorMessage(error.message);
      } else {
        // The payment UI automatically closes with a success animation.
        // Your customer is redirected to your `return_url`.
      }
    };


  return (
    <>
     <div id="checkout-page">
      <ExpressCheckoutElement onConfirm={onConfirm} />
    </div>
    </>
  //   <form id="payment-form" onSubmit={handleSubmit}>
  //   <CardElement id="payment-element" />
  //   <button disabled={isProcessing || !stripe || !elements} id="submit">
  //     <span id="button-text">
  //       {isProcessing ? "Processing ... " : "Pay now"}
  //     </span>
  //   </button>
  //   {/* Show any error or success messages */}
  //   {message && <div id="payment-message">{message}</div>}
  // </form>
  )
}

export default CheckoutForm