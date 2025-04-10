import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { COLORS, IMAGE } from '../../utils/Theme'
import Header from '../common/Header'
import Footer from '../common/Footer'
import ApiConnection from '../../utils/ApiConnection'
import { toast } from 'react-toastify';
import Loader from '../../utils/Loader'


const ContactUs = () => {
    const [loading, setloading] = useState(false)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [subject, setsubject] = useState("")
    const [message, setmessage] = useState("")

    var user = JSON.parse(localStorage.getItem('user'))

    console.log("user", user)


    const HandleSubmit = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(email) === false) {

            toast.error('Email should be proper!');
        } else if(name == ""){
            toast.error('Name should be must');
        } else {
            setloading(true)
            var FormData = require('form-data');
            var data = new FormData();
            data.append("name", name);
            data.append("email", email);
            data.append("subject", subject);
            data.append("message", message);
    
            try{
                const response = await ApiConnection.post('contact-request', data)
                if(response?.status === 200) {
                    setloading(false)
                    toast.success(response?.data?.message);  
                    setsubject('')
                    setmessage('')
                    if(user != null)
                        {
                        setname(user?.first_name +' ' + user?.last_name)
                        setemail(user?.email)
                        } else {
                            setname('')
                            setemail('')
                        }
                } else {
                    setloading(false)
                }
            
            } catch(err){
                setloading(false)
                if(err.response?.status === 401){
                toast.error(err.response?.data?.message);   
            }
        }
    }

    }


    useEffect(()=>{
        if(user != null)
        {
        setname(user?.first_name +' ' + user?.last_name)
        setemail(user?.email)
        } else {
            setname('')
            setemail('')
        }
        window.scrollTo(0, 0)
    },[])



  return (
    <>
    {loading && <Loader/>}
    <Header/>
 
    <div className='inner-banner'>
        <h3>Contact Us</h3>
    </div>
<div className='cms-sec py-5'>
        <div className='container'>
            <div className='card'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-lg-4 col-md-6'>
                        <div className='form-group'>
                            <label>Name</label>
                            <input type='text' className='form-control' placeholder='Enter Name'
                            value={name}
                            onChange={(e)=>setname(e.target.value)}
                            />
                        </div>
                    </div>
                   
                    <div className='col-lg-4 col-md-6'>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type='email' className='form-control' placeholder='Email'
                            value={email}
                            onChange={(e)=>setemail(e.target.value)}
                            />
                         
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-12'>
                        <div className='form-group'>
                            <label>Subject</label>
                            <input type='text' className='form-control' placeholder='Subject'
                            value={subject}
                            onChange={(e)=>setsubject(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group'>
                            <label>Message</label>
                            <textarea className='form-control' placeholder='Message'
                            value={message}
                            onChange={(e)=>setmessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        <div className='form-group text-center mt-4'>
                                <button className='solid-btn' onClick={HandleSubmit}>Submit</button>
                        </div>
                        </div>
                </div>
                </div>
                </div>
        </div>
    </div>
<Footer/>
</>
  )
}

export default ContactUs