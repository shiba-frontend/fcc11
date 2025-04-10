import React, { useEffect, useState } from "react";

import Loader from "../../../utils/Loader";
import ApiConnection, { key } from "../../../utils/ApiConnection";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';
import { useElements, PaymentElement,linkAuthenticationElement, CardElement, Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";


const SubscriptionPayment = () => {
    const [loading, setloading] = useState(false)
    const [couponcode, setcouponcode] = useState('')
    const [planamount, setplanamount] = useState('')
    const [discount, setdiscount] = useState('')
    const [payble, setpayble] = useState('')
    const [stripemodal, setstripemodal] = useState(false);
    const  location  = useLocation();

    const [clientsecret, setclientsecret] = useState(location?.state?.secret)

  

    console.log(location?.state?.response)

    
    const stripePromise = loadStripe(key.STRIPE_KEY);


    let {id} = useParams()
    let navigate = useNavigate()





  return (
    <>
    {loading && <Loader/>}
{/* <LoginHeader title="Payment" />
<DashboardMenu /> */}
  <div className="container">
       <div className="dashboard-panel p-2 payment-page">
       {clientsecret &&
                   <Elements stripe={stripePromise} options={clientsecret}>
                       <CheckoutForm  memberid={location?.state?.response?.primary_id} />
        </Elements>
}
       </div>
    </div>


</>
  )
}

export default SubscriptionPayment