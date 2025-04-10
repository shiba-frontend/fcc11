import React, { useEffect, useRef, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';

const AddAdminUser = () => {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [logo, setlogo] = useState("")
    const [loading, setloading] = useState(false)
    let navigate = useNavigate()



    const AddHandler = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(fname == ''){
            toast.error("First name is required")
        } else if(lname == ''){
            toast.error("Last name is required") 
        } else  if (reg.test(email) === false) {
            toast.error("Email is required") 
        } else if(phone == null){
            toast.error("Phone is required") 
        } else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('first_name', fname);
                data.append('last_name', lname);
                data.append('email', email);
                data.append('phone', phone);

                
                const response = await ApiConnection.post("subadmin", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/user")
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




  return (
    <div>
          {loading && <Loader/>}
    <DashboardHeader title="Add Admin Sub-User" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
           
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First Name"
                         value={fname}
                         onChange={(e)=>setfname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name"
                          value={lname}
                          onChange={(e)=>setlname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email"
                          value={email}
                          onChange={(e)=>setemail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Phone</label>
                        <input type="text" className="form-control" placeholder="Phone"
                         value={phone}
                         onChange={(e)=>setphone(e.target.value)}
                         onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        maxLength="10"
                        />
                    </div>
                </div>
                
               
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={AddHandler}>Add</button>
                    </div>
                </div>
           </div>
    
      </div>
      </div>
        
    </div>
  )
}

export default AddAdminUser