import React, { useState, useRef, useEffect } from 'react'
import { IMAGE } from '../../utils/Theme'
import { NavLink, useNavigate } from 'react-router-dom'
import ApiConnection from '../../utils/ApiConnection'
import Loader from '../../utils/Loader'
import { toast } from 'react-toastify';



const Login = ()=>{
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState( <i class="fa-solid fa-eye-slash"></i>);

    const navigate = useNavigate()

    const getExactTimeDifference = () => {
        const now = new Date();
        const offsetInMinutes = now.getTimezoneOffset();
        const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
        const offsetMinutes = Math.abs(offsetInMinutes) % 60;
        const sign = offsetInMinutes > 0 ? '-' : '+';
        return `${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
      };

      const timeDifference = getExactTimeDifference();



      console.log(`UTC offset: ${timeDifference}`);

    const handleLogin = async ()=>{
    
        const date = new Date();
   

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(email) === false) {

            toast.error('Email should be proper!');
        } else if(password == ""){
            toast.error('Password should be must');
        } else {
            setloading(true)
            var FormData = require('form-data');
            var data = new FormData();
            data.append('email', email);
            data.append('password', password);
            // data.append('logged_in_at', date.toISOString());
            data.append('logged_in_at', timeDifference);
            try{
                const response = await ApiConnection.post('login', data)
                setloading(false)
                if(response?.status === 200) {

                    if(response?.data?.success){
                         
                    if(response?.data?.data?.token !== ""){
                        localStorage.setItem('fcc_access_token', response?.data?.data?.token)
                        localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
                        navigate(response?.data?.data?.user?.role_id === 1 ? '/admin/dashboard' : response?.data?.data?.user?.role_id === 2 ? '/club/dashboard' : response?.data?.data?.user?.role_id === 3 ?  '/fantasy/dashboard' : '/dashboard')
                        window.location.reload()
                    } 
                    } else {
                        toast.error(response?.data?.message)
                    }

                  
                 
            } else {
                       
            }
            } catch(err){
                setloading(false)
                if(err.response?.status === 401){
                toast.error(err.response?.data?.message);   
            }
        }
    }

        

        //navigate("/dashboard")
    }

 
    const handleToggle = () => {
        if (type==='password'){
           setIcon(<i className="fa-solid fa-eye"></i>);
           setType('text')
        } else {
           setIcon(<i className="fa-solid fa-eye-slash"></i>)
           setType('password')
        }
     }

  
   

    return (
        <div className='common-auth'>

            {loading && <Loader/>}

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
                                <h2>Member Login</h2>
                                <div className='row'>
                                    
                                    <div className='col-lg-10'>
                                        <div className='form-group'>
                                            <label>Email</label>
                                            <input type="email" className="form-control" placeholder="Email"
                                            value={email}
                                            onChange={(e)=>setemail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                
                                    <div className='col-lg-10'>
                                        <div className='form-group'>
                                            <label>Password</label>
                                            <input  type={type} className="form-control" placeholder="XXXXX"
                                            value={password}
                                            onChange={(e)=>setpassword(e.target.value)}
                                            />
                                            <span class="flex justify-around items-center" style={{    
                                                position: 'absolute',
    top: '41px',
    right: '29px'}} onClick={handleToggle}>
                                           {icon}
                                              
                                            </span>
                                        </div>
                                    </div>
                                
                                    <div className='col-lg-12'>
                                        <div className='form-group'>
                                        <h5 className='text-left'> <input type='checkbox'/> Keep me logged in </h5>
                                        </div>
                                    </div>
                                    <div className='col-lg-12'>
                                        <div className='form-group text-left'>
                                            <button type='button' className='submitBtn' onClick={handleLogin}>Login</button>
                                        </div>
                                    </div>
                                    <div className='col-lg-12 my-3'>
                                        <div className='form-group text-left'>
                                            <h6> Forgot Password? <NavLink to="/forgot-password">Click Here</NavLink> </h6>
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


export default Login;