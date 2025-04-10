import React from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';


const CheckoutCard = () => {

    const stripe = useStripe()
    const elements = useElements()

    const CARD_OPTIONS = {
        iconStyle:'solid',
        style: {
            base: {
              iconColor: '#c4f0ff',
              color: '#000',
              fontWeight: '500',
              fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
              fontSize: '16px',
              fontSmoothing: 'antialiased',
              ':-webkit-autofill': {
                color: 'red',
              },
              '::placeholder': {
                color: '#000',
              },
            },
            invalid: {
              iconColor: '#FFC7EE',
              color: '#FFC7EE',
            },
          },
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })
        if(!error){

            console.log(paymentMethod)

        } else {
            console.log(error)
        }

    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button >Pay now</button>
        </form>
    </div>
  )
}

export default CheckoutCard