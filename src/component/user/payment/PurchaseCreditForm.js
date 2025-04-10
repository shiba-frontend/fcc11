import React, { useEffect } from 'react'
import { useState } from "react";
import {LinkAuthenticationElement, PaymentElement, PaymentRequestButtonElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import ApiConnection from '../../../utils/ApiConnection';

const PurchaseCreditForm = ({memberid}) => {
    const stripe = useStripe();
    const elements = useElements();

          
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [isloading, setIsLoading] = useState(false);

    console.log(memberid)

    // const PaymentHandle = () => {
    //   var paymentRequest = stripe.paymentRequest({
    //     country: 'US',
    //     currency: 'usd',
    //     total: {
    //       label: 'Total',
    //       amount: 1000,
    //     },
       
    //   });
    
    //   paymentRequest.on('paymentmethod', function(ev) {
    //     // Handle the payment method event
    //     // Confirm the payment and process it with Stripe
    //     stripe.confirmCardPayment(clientSecret, {
    //       payment_method: ev.paymentMethod.id,
    //     }).then(function(result) {
    //       if (result.error) {
    //         // Handle errors
    //       } else {
    //         // Payment successful
    //       }
    //     });
    //   });
    
    //   // Show the Payment Request UI
    //   paymentRequest.show();
    // }

    useEffect(() => {
      if (!stripe) {
        return
      } 

      // const clientSecret = 'pi_1OyH0DEyvqDh0TGqD0Dyy8Ho_secret_8oGrhTtxfn9gZorZj8ytvjsRs'

      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      )

      if(!clientSecret){
        return
      }

      stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
          switch(paymentIntent.status){
            case "succeeded":
              setMessage("payment success")

              break;
              case "processing":
                setMessage("Your payment is processing")
                break;

                case "requires_payment_method":
                  setMessage("Your payment was not successfully, please try again")

                  break;

                  default:

                  setMessage("something went wrong")
                  break;
          }
      })


    }, [stripe]);
   
    const HandleSubmit = async (e) => {

      e.preventDefault()

        if(!stripe || !elements){
          return
        }

        setIsLoading(true)

        const {error} = await stripe.confirmPayment({
          elements,
          confirmParams:{
            return_url: `${window.location.origin}/purchase-credit/payment/success/${memberid}`,
          },

        })


        if(error.type === "card_error" || error.type === "validation_error"){
          setMessage(error.message)
        } else {
          setMessage("An unexpected error occured")
        }

        setIsLoading(false)

    }

    const PaymentElementOptions = {
      layout:"tabs"
    }


  return (
    <form id="payment-form" onSubmit={HandleSubmit}>
  
    <PaymentElement id="payment-element" options={PaymentElementOptions}  />

    <button disabled={isloading || !stripe || !elements} className='solid-btn mt-3'>Pay Now</button>
    {message && <p className='text-danger mt-2'>{message}</p>}
  </form>
  )
}

export default PurchaseCreditForm