import React, { useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../utils/Loader";
import ApiConnection from "../../../utils/ApiConnection";

const ReferEarn = () => {
    const [loading, setloading] = useState(false)
    const [reffield, setreffield] = useState([{
        'friend':'',
        'email':'',
    }])

    const AddMoreHandle = () =>{
        const rawinput = {
            friend: '',
            email: '',
        }

        setreffield([...reffield, rawinput])
    }

    const DeleteHandle = (index) => {
        var newValue = [...reffield];
        newValue.splice(index, 1);
        setreffield(newValue);
    }

    const InputHandle = (value, key, index) => {
        var newValue = [...reffield];
        newValue[index][key] = value;
        setreffield(newValue);
    }

    const AddHandler = async () => {

        if(reffield.length < 1){
            toast.error("Name and email is required") 
        }  else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
        
                reffield.map((ref, i) =>{
                    return   data.append('referrer_name[]', ref.friend);
                })
                reffield.map((ref, i) =>{
                    return   data.append('referrer_email[]', ref.email);
                })
            
                const response = await ApiConnection.post("referrer", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    setreffield([{
                        'friend':'',
                        'email':'',
                    }

                    ])
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
    <div>
          {loading && <Loader/>}
      <LoginHeader title="Refer a friend" />
      <DashboardMenu />
      <div className="container">
        <div className="dashboard-panel">
            {reffield.map((field,index)=>{
                return (
                    <div className="row">
                    <div className="col-lg-5">
                        <div className="form-group">
                            <label>Friend 's Name</label>
                            <input type="text" className="form-control" placeholder="Enter Name"
                            value={field.friend}
                            onChange={(e)=>InputHandle(e.target.value, 'friend', index)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email"
                            value={field.email}
                            onChange={(e)=>InputHandle(e.target.value, 'email', index)}
                            />
                        </div>
                    </div>
                    {index > 0  &&
                    <div className="col-lg-2">
                        <label className="d-block">&nbsp;</label>
                        <button className='btn brn-sm btn-danger' onClick={()=>DeleteHandle(index)}><i className="fa-solid fa-trash-can"></i></button>
                    </div>
            }
                </div>
                )
            })}
            <div className="row">
               
                
                <div className="col-lg-12">
                    <div className="form-group">
                       <h5>Invite your friends, you earn rewards</h5>
                    </div>
                </div>
                <div className="col-lg-12 mt-4">
                    <div className="form-group text-center">
                       <button className="solid-btn mr-4" onClick={AddHandler}>Invite</button>
                       <button className="outline-btn" onClick={AddMoreHandle}>Add More</button>
                    </div>
                </div>
            </div>
        

        
        </div>
      </div>



    </div>
  )
}

export default ReferEarn