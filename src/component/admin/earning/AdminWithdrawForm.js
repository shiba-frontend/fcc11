import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const AdminWithdrawForm = () => {
    const [amount, setamount] = useState("")
    const [loading, setloading] = useState(false)

    let navigate = useNavigate()

    const ChangeAccount = () => {
        navigate("/admin/bank-change")
    }
    
    const WithdrawHandle = async () => {
        if(amount == ''){
            toast.error("Amount is required")
        } 
        else if(amount > fetchReducer?.user?.available_credit_amount){
            toast.error("Insufficient balance") 
        }else {
    
    
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                
                data.append('amount', amount);
                data.append('bankaccount_id', fetchReducer?.user?.default_bank?.id);
                const response = await ApiConnection.post("fund-withdraw", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
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


  return (
    <div>
            {loading && <Loader/>}
    <DashboardHeader title="Withdraw" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">
    
      <div className="withdraw-sec">
                    <h2>Current Wallet Balance: ${fetchReducer?.user?.available_credit_amount}</h2>
                    {/* <h5>Minimum Withdrawal Amount: $100</h5> */}
                    <div className="withdraw-amount-box">
                        <h4>Withdrawal Amount:</h4>
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
                    <h6>Bank Information: {'XXXX-XXXXX-X'+ fetchReducer?.user?.default_bank?.account_number.slice(-3) }
                         &nbsp; ----  {fetchReducer?.user?.default_bank?.bank_name} <button className="btn btn-info ml-3" onClick={ChangeAccount}>Change Account</button></h6>
                    <div className="text-center mt-5">
                        <button className='solid-btn' onClick={WithdrawHandle}>Withdraw</button>
                    </div>
                </div>
      </div>
      </div>
        
    </div>
  )
}

export default AdminWithdrawForm