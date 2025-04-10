import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Loader from "../../../utils/Loader";
import ApiConnection from "../../../utils/ApiConnection";
import Modal from 'react-bootstrap/Modal';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';
import { useElements, PaymentElement,linkAuthenticationElement, CardElement, Elements} from '@stripe/react-stripe-js';
import PurchaseCreditForm from "./PurchaseCreditForm";
import { useSelector } from "react-redux";



const PurchaseCredit = () => {

   
    const [selectitem, setselectitem] = useState({})
    const [amount, setamount] = useState("")
    const [loading, setloading] = useState(false)
    const [creditList, setcreditList] = useState([])
    const [payble, setpayble] = useState('')
   
    const option  =[
        {
            id:1,
            amount:100
        },
        {
            id:2,
            amount:150
        },
        {
            id:3,
            amount:250
        },
        {
            id:4,
            amount:500
        }
    ]


    let {id} = useParams()
    let navigate = useNavigate()
    const fetchReducer = useSelector((state) => state.fccDataflowreducer)
    // const Getdata = async ()=>{
    //     setloading(true)
    //     try {
    //         const  response = await ApiConnection.get(`credit-points`)
    //         if(response?.status == 200){
    //             setloading(false)
    //             setcreditList(response?.data?.data?.list)
    //         } else{
    //             setloading(false)
    //         }  
    //     } catch(err){
    //         setloading(false)
    //     }
    // }
    // useEffect(() => {
    //   Getdata()

    // },[])




    const CreatePaymentIntent = async ()=>{
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('credit_request',(amount * fetchReducer?.user?.withdrawable_matrix).toFixed(2));
            const response = await ApiConnection.post("credit-points/purchase", data);
            if(response.status === 200){
                setloading(false)
                
                if(response.data.success){
    
                let id = response.data?.data?.client_secret?.payment_intents?.id
    
                let _clientSecret = response.data?.data?.client_secret?.payment_intents?.client_secret

                console.log(response.data?.data)

             
    
               if(_clientSecret){
    
                let obj = {
                    clientSecret:_clientSecret
                }

                navigate("/purchase-credit/payment", {
                    state:{
                        response: response.data?.data,
                        secret: obj
                    }
                  })
   
               }
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
              
            } else if(err.response?.status === 500){
                toast.error(err.response?.data?.message);   
            
          }
    }
    }


  return (
    <>
       {loading && <Loader/>}
    <LoginHeader title="Purchase Credit" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-5">

                <ul className="purchase-c">
                    {option.map((item) =>{
                        return (
                            <li>
                            <button onClick={()=> {
                                setselectitem(item)
                                setamount(item.amount)
                            } }
                            style={{backgroundColor: item.id == selectitem.id ? '#1A237E':'#fff'}}
                            
                            >
                                <label style={{color:item.id == selectitem.id ? '#fff':'#606060'}}><b>Credit:</b> {item.amount}</label>
                                {/* <span style={{color:item.id == selectAmount.id ? '#fff':'#0F55BD'}}>{item.credits}</span> */}
                            </button>
                        </li>
                        )
                    })}
                   
                </ul>

                <div className="withdraw-amount-box purchase">
                        <h4>Enter Credit:</h4>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Credit</InputGroup.Text>
                            <Form.Control
                            placeholder="Credit"
                            aria-label="Username"
                            value={amount}
                            onChange={(e)=>setamount(e.target.value)}
                            />
                  <InputGroup.Text className="ml-2">${(amount * fetchReducer?.user?.withdrawable_matrix).toFixed(2)}</InputGroup.Text>

                        </InputGroup>
                    </div>
                    <div className="text-center">
                            <button className="solid-btn" onClick={CreatePaymentIntent}>Pay Now</button>
                    
                    </div>
            </div>
         </div>
     
   </>
  )
}

export default PurchaseCredit