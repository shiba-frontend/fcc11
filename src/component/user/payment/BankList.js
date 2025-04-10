import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import Accordion from 'react-bootstrap/Accordion';
import { IMAGE } from "../../../utils/Theme";
import Loader from "../../../utils/Loader";
import ApiConnection from "../../../utils/ApiConnection";
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";

const BankList = () => {
    const [loading, setloading] = useState(false)
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [banklist, setbanklist] = useState([]);
    const [payeename, setpayeename] = useState("")
    const [ac, setac] = useState("")
    const [bankname, setbankname] = useState("")
    const [routingnumber, setroutingnumber] = useState("")

    const [payeename1, setpayeename1] = useState("")
    const [ac1, setac1] = useState("")
    const [bankname1, setbankname1] = useState("")
    const [routingnumber1, setroutingnumber1] = useState("")

    const [statusmodal, setstatusmodal] = useState(false);
    const [deletemodal, setdeletemodal] = useState(false);
    const [rowId, setrowId] = useState('');


    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);

    const GetBank = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('member-bankaccount')
            if(response?.status == 200){
                setloading(false)
                console.log(response.data?.data?.data)
                setbanklist(response.data?.data?.data)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    useEffect(() => {
        GetBank()
    },[])

    const AddHandler = async () => {
  
        if(payeename == ''){
            toast.error("Payee name is required")
        } else if(ac == ''){
            toast.error("Account number is required") 
        } else if(ac.length < 13){
            toast.error("Given valid account number") 
        }   else if(bankname == ''){
            toast.error("Bank name is required") 
        } else if(routingnumber == ''){
            toast.error("Routing number is required") 
        }
       else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('payee_name', payeename);
                data.append('account_number', ac);
                data.append('bank_name', bankname);
                data.append('routing_number', routingnumber);
                
                const response = await ApiConnection.post("member-bankaccount", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    setShow(false)
                    setpayeename('')
                    setac('')
                    setbankname('')
                    setroutingnumber('')
                    GetBank()
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

    const StatusHandler = async () =>{
        setloading(true)
        setstatusmodal(false)
        try {

            let data = new FormData();
            data.append('bankaccount_id', rowId);
    
            const  response = await ApiConnection.post(`member-bankaccount/change-default`, data)
            if(response?.status == 200){
                GetBank()
                setloading(false)
                setstatusmodal(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)
                setstatusmodal(false)
            }  
        } catch(err){
            setloading(false)
            setstatusmodal(false)
        }
    }

    
    const StatusModal = (id) =>{
        setstatusmodal(true)
        setrowId(id)
    }
    const deleteModal = (rid) =>{
        setdeletemodal(true)
        setrowId(rid)
    }

    const DeleteHandler = async () =>{
        setloading(true)
        setdeletemodal(false)
        try {

            const  response = await ApiConnection.delete(`member-bankaccount/${rowId}`)
            if(response?.status == 200){
                GetBank()
                setloading(false)
                setdeletemodal(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)
                setdeletemodal(false)
                toast.error(response?.data?.message)
            }  
        } catch(err){
            setloading(false)
            setdeletemodal(false)
            toast.error(err.response?.data?.message)
        }
    }

    const EditModal = async (id) => {
        setloading(true)  
        setrowId(id)
        try{
            const response = await ApiConnection.get(`member-bankaccount/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setpayeename1(editdata?.payee_name)
                setac1(editdata?.account_number)
                setbankname1(editdata?.bank_name)
                setroutingnumber1(editdata?.routing_number)
                setShow1(true)
            }
          

        } catch(e){
            setloading(false)  
        }
    }

    const UpdateHandler = async () => {
  
        if(payeename1 == ''){
            toast.error("Payee name is required")
        } else if(ac1 == ''){
            toast.error("Account number is required") 
        } else if(ac1.length < 13){
            toast.error("Given valid account number") 
        }   else if(bankname1 == ''){
            toast.error("Bank name is required") 
        } else if(routingnumber1 == ''){
            toast.error("Routing number is required") 
        }
       else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('payee_name', payeename1);
                data.append('account_number', ac1);
                data.append('bank_name', bankname1);
                data.append('routing_number', routingnumber1);
                data.append('_method', 'PUT');
                const response = await ApiConnection.post(`member-bankaccount/${rowId}`, data);
                if(response.status === 200){
                    setloading(false)
                    setShow1(false);
                    toast.success(response?.data?.message);
                    GetBank()
                } else {
                    setloading(false)
                }
    
            } catch(err){
                setloading(false)
                if(err?.response?.status === 422){
                      toast.error(err.response?.data?.message);   
                  
                }
        }
            
    
        }
    
    }

    




  return (
    <>
      {loading && <Loader/>}
    <LoginHeader title="Bank Account" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-2 payment-page">
                <div className="d-flex justify-content-between mb-5">
                     <h2>Existing Bank Account</h2>
                    <button  className="solid-btn" onClick={()=>setShow(true)}>Add New Bank Account</button>
                </div>
                
                 
                 <h5>Account Info</h5>
                 {banklist&&banklist.map((item,index)=>{
                    return (
                        <ul className="card-list" key={index}>
                          
                        <li>
                            { 'XXXX-XXXXX-X'+ item?.account_number.slice(-3) }
                         &nbsp; ----  {item?.bank_name}
                           
                        </li>
                        <li>
                            <button onClick={()=>StatusModal(item?.id)} className={item?.is_default == 1 ? 'btn btn-success ml-2 mb-1': 'btn btn-dark ml-2 mb-1'} style={{pointerEvents:item?.is_default == 1 ? 'none': 'auto'}}> {item?.is_default == 1 ? 'Default': 'Make as default'}</button>
                            <button className="btn btn-dark ml-2 mb-1" onClick={()=>EditModal(item?.id)}>Edit</button>
                            <button className="btn btn-dark ml-2 mb-1" onClick={()=>deleteModal(item?.id)}>Delete</button>
                        </li>
                     </ul>
                    )
                 })}
                
                
            </div>
         </div>

         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >

        <Modal.Body className='contest-modal text-left'>
            <h3>Add New Bank Account</h3>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Payee Name</label>
                        <input type="text" className="form-control" placeholder="Name"
                        value={payeename}
                        onChange={(e)=>setpayeename(e.target.value)}
                        
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Account Number</label>
                        <input type="text" className="form-control" placeholder="Account Number"
                          value={ac}
                          onChange={(e)=>setac(e.target.value)}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength="13"
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Bank Name</label>
                        <input type="text" className="form-control" placeholder="Bank Name"
                          value={bankname}
                          onChange={(e)=>setbankname(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Routing Number</label>
                        <input type="text" className="form-control" placeholder="Routing Number"
                          value={routingnumber}
                          onChange={(e)=>setroutingnumber(e.target.value)}
                       
                    
                        />
                    </div>
                </div>
            </div>
            <div className="form-group mt-4">
              <button onClick={handleClose} className="outline-btn mr-2">Cancel</button>
                <button className="solid-btn" onClick={AddHandler}>Submit</button>
            </div> 
        </Modal.Body>
 
      </Modal>
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >

        <Modal.Body className='contest-modal text-left'>
            <h3>Add New Bank Account</h3>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Payee Name</label>
                        <input type="text" className="form-control" placeholder="Name"
                        value={payeename1}
                        onChange={(e)=>setpayeename1(e.target.value)}
                        
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Account Number</label>
                        <input type="text" className="form-control" placeholder="Account Number"
                          value={ac1}
                          onChange={(e)=>setac1(e.target.value)}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength="13"
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Bank Name</label>
                        <input type="text" className="form-control" placeholder="Bank Name"
                          value={bankname1}
                          onChange={(e)=>setbankname1(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Routing Number</label>
                        <input type="text" className="form-control" placeholder="Routing Number"
                          value={routingnumber1}
                          onChange={(e)=>setroutingnumber1(e.target.value)}
                       
                    
                        />
                    </div>
                </div>
            </div>
            <div className="form-group mt-4">
              <button onClick={handleClose1} className="outline-btn mr-2">Cancel</button>
                <button className="solid-btn" onClick={UpdateHandler}>Update</button>
            </div> 
        </Modal.Body>
 
      </Modal>
      <Modal
        show={statusmodal}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='text-center'>
            Are you sure you want to default account
            <ul className='d-flex mt-4 justify-content-center'>
                <li>
                    <button className='btn btn-success mr-2' onClick={StatusHandler}>Yes</button>
                </li>
                <li>
                    <button className='btn btn-outline-danger ml-2' onClick={()=>setstatusmodal(false)}>Cancel</button>
                </li>
            </ul>
        </Modal.Body>
      
      </Modal> 
      <Modal
        show={deletemodal}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='text-center'>
            Are you sure you want to delete
            <ul className='d-flex mt-4 justify-content-center'>
                <li>
                    <button className='btn btn-success mr-2' onClick={DeleteHandler}>Yes</button>
                </li>
                <li>
                    <button className='btn btn-outline-danger ml-2' onClick={()=>setdeletemodal(false)}>Cancel</button>
                </li>
            </ul>
        </Modal.Body>
      
      </Modal>
   </>
  )
}

export default BankList