import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import DataTable from 'react-data-table-component';
import { IMAGE } from '../../../utils/Theme';
import ApiConnection from "../../../utils/ApiConnection";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Loader from "../../../utils/Loader";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const AddWallet = () => {

   

    const [selectitem, setselectitem] = useState({})
    const [amount, setamount] = useState("")
    const [loading, setloading] = useState(false)
    let {id} = useParams()
    let navigate = useNavigate()

    const CreatePaymentIntent = async ()=>{
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('credit_amount',amount);
            const response = await ApiConnection.post("wallet-credit", data);
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

                navigate("/admin/add-wallet/payment", {
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
    <div>
         {loading && <Loader/>}
    <DashboardHeader title="Add Wallet" />
    <AdminMenu />
    <div className="container">
        <div className="dashboard-panel custom-table">

        <div className="withdraw-amount-box purchase">
                        <h4>Enter Amount:</h4>
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                            <Form.Control
                            placeholder="Amount"
                            aria-label="Username"
                            value={amount}
                            onChange={(e)=>setamount(e.target.value)}
                            />
                        </InputGroup>
                    </div>
                    <div className="text-center">
                            <button className="solid-btn" onClick={CreatePaymentIntent}>Pay Now</button>
                    
                    </div>
        </div>
    </div>
        
    </div>
  )
}

export default AddWallet