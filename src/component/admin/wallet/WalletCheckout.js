import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';
import { useElements, PaymentElement,linkAuthenticationElement, CardElement, Elements} from '@stripe/react-stripe-js';
import Loader from '../../../utils/Loader';
import WalletCheckoutForm from './WalletCheckoutForm';
import { key } from '../../../utils/ApiConnection';

const WalletCheckout = () => {

    const [selectitem, setselectitem] = useState({})
    const [amount, setamount] = useState("")
    const [loading, setloading] = useState(false)
    const [creditList, setcreditList] = useState([])
    const [payble, setpayble] = useState('')
    const [stripemodal, setstripemodal] = useState(false);
    const  location  = useLocation();
    const [clientsecret, setclientsecret] = useState(location?.state?.secret)

    
    const stripePromise = loadStripe(key.STRIPE_KEY);


    let {id} = useParams()
    let navigate = useNavigate()

  return (
    <>
    {loading && <Loader/>}

    <div className="container">
         <div className="dashboard-panel p-5">

         {clientsecret &&
                     <Elements stripe={stripePromise} options={clientsecret}>
                          <WalletCheckoutForm  memberid={location?.state?.response?.primary_id} />
                     </Elements>
}
         </div>
      </div>
  
</>
  )
}

export default WalletCheckout