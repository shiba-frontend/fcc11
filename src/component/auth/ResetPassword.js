import React, { useState, useRef } from 'react'
import { IMAGE } from '../../utils/Theme'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApiConnection from '../../utils/ApiConnection'
import Loader from '../../utils/Loader'

const ResetPassword = () => {
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()
    const userName = useLocation();
    var Email = userName?.state?.email
    var reset_password_hash = userName?.state?.hash

    console.log(Email)
    
const SubmitHandle = async () => {

    if(newpassword == ""){
        toast.error("password field is required")
    } else if(newpassword !== confirmpassword){
        toast.error("password does not match")
    } else {
        setloading(true);
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('email', Email);
            data.append('reset_password_hash', reset_password_hash);
            data.append('password', newpassword);
            data.append('c_password', confirmpassword);
            const response = await ApiConnection.post("reset-password", data)
            if(response?.status === 200) {
                setloading(false);
                toast.success(response?.data?.message);
                navigate("/login")
            }

        } catch(err){
            setloading(false)
            if(err.response?.status === 401){
            toast.error(err.response?.data?.message);   
          }
      }
    }
}

    return (
        <div className='common-auth'>
              {loading &&   <Loader/>}
        <div className='container'>
            <div className='auth-bg'>
            <div className='row no-gutter'>
                <div className='col-lg-5'>
                    <div className='auth-lft'>
                        <img src={IMAGE.auth_vector} alt="vector" />
                    </div>
                </div>
                <div className='col-lg-7'>
                        <div className='auth-form'>
                            <h2>Reset Password</h2>
                            <div className='row'>
                                
                              
                               
                                <div className='col-lg-10'>
                                    <div className='form-group'>
                                        <label>New Password</label>
                                        <input type="password" className="form-control" placeholder="XXXXX"
                                          value={newpassword}
                                          onChange={(e)=>setnewpassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-10'>
                                    <div className='form-group'>
                                        <label>Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="XXXXX"
                                          value={confirmpassword}
                                          onChange={(e)=>setconfirmpassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className='form-group text-left'>
                                        <button type='button' className='submitBtn' onClick={SubmitHandle}>Reset</button>
                                     </div>
                                </div>
                              
                              
                            </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
   
    </div>
    )

}

export default ResetPassword