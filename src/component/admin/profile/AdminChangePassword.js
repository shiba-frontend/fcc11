import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';

const AdminChangePassword = () => {
    const [loading, setloading] = useState(false)
    const [oldpassword, setoldpassword] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState( <i class="fa-solid fa-eye-slash"></i>);
    const [type1, setType1] = useState('password');
    const [icon1, setIcon1] = useState( <i class="fa-solid fa-eye-slash"></i>);
    const [type2, setType2] = useState('password');
    const [icon2, setIcon2] = useState( <i class="fa-solid fa-eye-slash"></i>);

    let navigate = useNavigate()

    const SubmitHandler = async () =>{
        if(oldpassword == ''){
            toast.error("Existing password is required");
          } else if(newpassword == ''){
            toast.error("New Password is required");
          } else if(newpassword !== confirmpassword){
            toast.error("Confirm Password does not match");
          } else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('existing_password', oldpassword);
                data.append('password', newpassword);
                data.append('c_password', confirmpassword);
                const response = await ApiConnection.post(`change-password`, data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                  
                } else {
                    setloading(false)
                }

            } catch(err){
                setloading(false)
                if(err.response.status === 500){
                      toast.error(err.response?.data?.message);   
                  
                }
        }
          }
    }

    const handleToggle = () => {
      if (type==='password'){
         setIcon(<i class="fa-solid fa-eye"></i>);
         setType('text')
      } else {
         setIcon(<i class="fa-solid fa-eye-slash"></i>)
         setType('password')
      }
   }
   const handleToggle1 = () => {
      if (type1==='password'){
         setIcon1(<i class="fa-solid fa-eye"></i>);
         setType1('text')
      } else {
         setIcon1(<i class="fa-solid fa-eye-slash"></i>)
         setType1('password')
      }
   }
   const handleToggle2 = () => {
      if (type2==='password'){
         setIcon2(<i class="fa-solid fa-eye"></i>);
         setType2('text')
      } else {
         setIcon2(<i class="fa-solid fa-eye-slash"></i>)
         setType2('password')
      }
   }


  return (
    <div>
          {loading && <Loader/>}
    <DashboardHeader title="Change Password" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Existing Password</label>
                        <input type={type} className="form-control" placeholder="XXXXX"
                          value={oldpassword}  
                          onChange={(e)=>setoldpassword(e.target.value)}
                        />
                            <span class="flex justify-around items-center" style={{    
                                                position: 'absolute',
                                            top: '41px',
                                            right: '29px'}} onClick={handleToggle}>
                                                                                {icon}
                                                                                    
                                                                                    </span>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>New Password</label>
                        <input type={type1} className="form-control" placeholder="XXXXX"
                        value={newpassword}  
                        onChange={(e)=>setnewpassword(e.target.value)}
                        />
                             <span class="flex justify-around items-center" style={{    
                                                position: 'absolute',
                                            top: '41px',
                                            right: '29px'}} onClick={handleToggle1}>
                                                                                {icon1}
                                                                                    
                                                                                    </span>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input type={type2} className="form-control"placeholder="XXXXX"
                        value={confirmpassword}  
                        onChange={(e)=>setconfirmpassword(e.target.value)}
                        />
                          <span class="flex justify-around items-center" style={{    
                                                position: 'absolute',
                                            top: '41px',
                                            right: '29px'}} onClick={handleToggle2}>
                                                                                {icon2}
                                                                                    
                                                                                    </span>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={SubmitHandler}>Change</button>
                    </div>
                </div>
           </div>
    
      </div>
      </div>
        
    </div>
  )
}

export default AdminChangePassword