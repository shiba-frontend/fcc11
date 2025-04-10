import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import Accordion from 'react-bootstrap/Accordion';
import { IMAGE } from "../../../utils/Theme";
import Loader from "../../../utils/Loader";
import ApiConnection, { key } from "../../../utils/ApiConnection";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';
import { useElements, PaymentElement,linkAuthenticationElement, CardElement, Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import CheckoutCard from "./CheckoutCard";
import Modal from 'react-bootstrap/Modal';

const Payment = () => {
    const [loading, setloading] = useState(false)
    const [couponcode, setcouponcode] = useState('')
    const [planamount, setplanamount] = useState('')
    const [discount, setdiscount] = useState('')
    const [payble, setpayble] = useState('')
    const [stripemodal, setstripemodal] = useState(false);
 
    const [clientsecret, setclientsecret] = useState('')

    
    const stripePromise = loadStripe(key.STRIPE_KEY);


    let {id} = useParams()
    let navigate = useNavigate()


    const Getdata = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`subscription/${id}`)
            if(response?.status == 200){
                setloading(false)
                setplanamount(response.data?.data?.plan_price)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    useEffect(() => {
      Getdata()

    },[])


const ApplyCoupon = async () => {
    if(couponcode == ''){
        toast.error("Coupon code is required")
    }    else {
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('coupon', couponcode);
            data.append('subscription_id',id);
     
            const response = await ApiConnection.post("member-subscription/apply-coupon", data);
            if(response.status === 200){
                setloading(false)
                if(response.data.status){
                    toast.success(response?.data?.message);
                    setdiscount(response.data?.discount)
                    setpayble(response.data?.payable_amount)
                } else {
                    toast.info(response?.data?.message);
                }
              
                
            } else {
                setloading(false)
            }

        } catch(err){
            setloading(false)
            if(err.response?.status === 422){
                  toast.error(err.response?.data?.message);   
              
            }
    }
        

    }
}

const makepayment = async ()=>{
    setloading(true)
    try{
        var FormData = require('form-data');
        var data = new FormData();
        data.append('coupon', couponcode );
        data.append('subscription_id',id);
        data.append('payable_amount',couponcode == '' ? planamount :  payble);
        data.append('discount',discount);
        const response = await ApiConnection.post("member-subscription", data);
        if(response.status === 200){
            setloading(false)
            
           if(response.data.data?.client_secret !== ''){

          

            let id = response.data?.data?.client_secret?.payment_intents?.id

            let _clientSecret = response.data?.data?.client_secret?.payment_intents?.client_secret

           if(_clientSecret){

            let obj = {
                clientSecret:_clientSecret
            }


            navigate("/payment/subscription", {
                state:{
                    response: response.data?.data,
                    secret: obj
                }
              })
            } else {
                toast.success(response?.data?.message);
                navigate("/subscription")
            }
           }

        } else {
            setloading(false)
        }

    } catch(err){
        setloading(false)
        if(err.response?.status === 422){
              toast.error(err.response?.data?.message);   
          
        }
}
}

const appearance = {
    theme:'stripe'
}

const options = {
    clientsecret,
    appearance
}

//const clientSecret = 'pi_1Ox7e8EyvqDh0TGqV6z4yHaJ_secret_Z3nndxKobSpPObhTZkFt9Olkr'

// const makepayment = async () => {

//     const stripe = await loadStripe('pk_test_51HDloiEyvqDh0TGqrA2pKiwasfrVV1r3zXuVCXkHQSIoOmzLD9772aCpD1BZg3D75MxZFGrrbjLW8cZ2QQjYxq4f00ADUTodhX');


// const sessionId = 'cs_test_8l6LSFDpAXXXXXXX'

// const result = stripe.redirectToCheckout({
//     sessionId: sessionId
// })

// }

// const clientSecret = 'pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH'

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





  return (
    <>
         {loading && <Loader/>}
    <LoginHeader title="Payment" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-2 payment-page">
                    <h2>Total Payment: $ {planamount}</h2>
                    {discount !== '' &&
                    <>
                    <h5>Total Discount: $ {discount}</h5>
                    <h6>Total payble amaount:$ {payble}</h6>
                    </>
                     }
                    <div className="cupon-code-container">
                        <label>Enter Coupon Code:</label>
                        <div className="cupon-field">
                            <input type="text" className="form-control" placeholder="Enter Coupon Code"
                            value={couponcode}
                            onChange={(e)=>setcouponcode(e.target.value)}
                            
                            />
                            <button onClick={ApplyCoupon}>Apply</button>
                        </div>
                    </div>
                    {/* <h2>Enter Card Details</h2>

                        <div className="row">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label>Card name</label>
                                    <input type="text" className="form-control" placeholder="Holder Card Name"/>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label>Card number</label>
                                    <input type="text" className="form-control" placeholder="Card number"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="form-group">
                                    <label>Expiry date</label>
                                    <input type="text" className="form-control" placeholder="Expiry date"/>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input type="text" className="form-control" placeholder="XXX"/>
                                </div>
                            </div>
                        </div> */}

                    <div className="text-left mt-4">

                  {/* <button onClick={makepayment}>make payment</button> */}

                        <NavLink to="/existing-card" className="outline-btn">Add Another Card</NavLink>
                        <button id="payButton" className="solid-btn ml-2" onClick={makepayment}>Pay Now</button>
                    </div>
            </div>
         </div>

   
   </>
  )
}

export default Payment