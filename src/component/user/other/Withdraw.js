import React, { useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ApiConnection from "../../../utils/ApiConnection";
import Loader from "../../../utils/Loader";



const Withdraw = () => {

    const [amount, setamount] = useState("")
    const [loading, setloading] = useState(false)


    let navigate = useNavigate()

const ChangeAccount = () => {
    navigate("/bank-change")
}

const WithdrawHandle = async () => {
    if(amount == ''){
        toast.error("Credit is required")
    } 
    else if(amount > fetchReducer?.user?.withdrawable_credit_points){
        toast.error("Insufficient balance") 
    }else {


        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            
            data.append('amount', amount);
            data.append('equivalent_amount', (amount * fetchReducer?.user?.withdrawable_matrix).toFixed(2));
            data.append('bankaccount_id', fetchReducer?.user?.default_bank?.id);
            const response = await ApiConnection.post("fund-withdraw", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                navigate("/dashboard")
            } else {
                setloading(false)
            }

        } catch(err){
            setloading(false)
            if(err.response.status === 422){
                  toast.error(err.response?.data?.message);   
              
            }
    }
        

    }
}

const fetchReducer = useSelector((state) => state.fccDataflowreducer)

console.log("upcoming", fetchReducer)

  return (
    <>
        {loading && <Loader/>}
    <LoginHeader title="Withdrawals" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-2">
                <div className="withdraw-sec">
                    <h2>Current Wallet Balance: {fetchReducer?.user?.available_credit_amount}</h2>
                    <h4>Withdraw credits: {fetchReducer?.user?.withdrawable_credit_points}</h4>
                    
                    <h5>All withdrawals are subject to deduction of platform fees and service charges</h5>
                    <div className="withdraw-amount-box">
                        <h4>Withdrawal Credit:</h4>
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
                    <h6>Bank Information: {'XXXX-XXXXX-X'+ fetchReducer?.user?.default_bank?.account_number.slice(-3) }
                         &nbsp; ----  {fetchReducer?.user?.default_bank?.bank_name} <button className="btn btn-info ml-3" onClick={ChangeAccount}>Change Account</button></h6>
                    <div className="text-center mt-5">
                        <button className='solid-btn' onClick={WithdrawHandle}>Withdraw</button>
                    </div>
                </div>
        
            </div>
         </div>
   </>
  )
}

export default Withdraw