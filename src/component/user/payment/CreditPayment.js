import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Loader from "../../../utils/Loader";
import ApiConnection, { key } from "../../../utils/ApiConnection";
import Modal from 'react-bootstrap/Modal';
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';
import { useElements, PaymentElement,linkAuthenticationElement, CardElement, Elements} from '@stripe/react-stripe-js';
import PurchaseCreditForm from "./PurchaseCreditForm";

const CreditPayment = () => {

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
                          <PurchaseCreditForm  memberid={location?.state?.response?.primary_id} />
                     </Elements>
}
         </div>
      </div>
  
</>
  )
}

export default CreditPayment