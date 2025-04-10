import React, { useState, useRef, useEffect } from 'react'
import { IMAGE } from '../../utils/Theme'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Loader from '../../utils/Loader';
import { toast } from 'react-toastify';
import ApiConnection from '../../utils/ApiConnection';

const ForgotPassword = () => {
    const [email, setemail] = useState("")
    const [show, setShow] = useState(false);
    const [otp1, setotp1] = useState('')
    const [otp2, setotp2] = useState('')
    const [otp3, setotp3] = useState('')
    const [otp4, setotp4] = useState('')
    const [loading, setloading] = useState(false);
    const [inputotp, setinputotp] = useState(null)
    const [counter, setCounter] = useState(59);

    const textInput1 = useRef(null);
    const textInput2 = useRef(null);
    const textInput3 = useRef(null);
    const textInput4 = useRef(null);

    const handleClose = () => setShow(false);
    const navigate = useNavigate()

    const handleShow = async () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        toast.error('Email should be proper!');
      } else{

        setloading(true);

          try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('email', email);
            const response = await ApiConnection.post('forgot-password', data)
            if(response?.status === 200) {
              setloading(false);
              toast.success(response?.data?.message);
            //  toast.info('OTP is ' + response?.data?.data?.otp);
              var OTP = response?.data?.data?.otp
              setinputotp(OTP)
            //  var result = Array.from(OTP.toString()).map(Number);
            //   setotp1(result?.[0])
            //   setotp2(result?.[1])
            //   setotp3(result?.[2])
            //   setotp4(result?.[3])
              setShow(true)
              setCounter(59)
              
            }
          } catch(err){
            setloading(false)
            if(err.response?.status === 401){
            toast.error(err.response?.data?.message);   
          }
      }
    }
    };

    const ResendHandler = async ()=>{
      setloading(true);

      try{
        var FormData = require('form-data');
        var data = new FormData();
        data.append('email', email);
        const response = await ApiConnection.post('forgot-password', data)
        if(response?.status === 200) {
          setloading(false);
          toast.success(response?.data?.message);
         // toast.info('OTP is ' + response?.data?.data?.otp);
          var OTP = response?.data?.data?.otp
          setinputotp(OTP)
          setCounter(59)
          
        }
      } catch(err){
        setloading(false)
        if(err.response?.status === 401){
        toast.error(err.response?.data?.message);   
      }
    }
  }
  

    const VerifyHandle = async ()=>{
      var otp = otp1 + otp2 + otp3 + otp4

      if(inputotp !== Number(otp)){
        toast.error("otp does not match")
      }
      else {
        try{
          setloading(true);
          var FormData = require('form-data');
          var data = new FormData();
          data.append('email', email);
          data.append('otp', otp);
          const response = await ApiConnection.post("/otp-verification", data)
          if(response?.status === 200) {
            setloading(false);
            toast.success(response?.data?.message);
            setShow(false)
            navigate("/reset-password", {state:{email:email,hash:response?.data?.data?.reset_password_hash
            }});
          }
        } catch(err){
          setloading(false)
            if(err.response?.status === 401){
            toast.error(err.response?.data?.message);   
          }
        }
      }
    
        //navigate("/reset-password")
    }

    useEffect(() => {
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      
      return () => clearInterval(timer);
    }, [counter]);

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
                            <h2>Forgot Password </h2>
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
                                <div className='col-lg-12'>
                                    <div className='form-group text-left'>
                                        <button type='button' className='submitBtn' onClick={handleShow}>Submit</button>
                                     </div>
                                </div>
                                <div className='col-lg-12 my-3'>
                                    <div className='form-group text-left'>
                                        <h6> Back to login? <NavLink to="/login">Click Here</NavLink> </h6>
                                     </div>
                                </div>
                              
                            </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='otp-modal'>
            <button className='clodeBtn' onClick={handleClose}><i class="fas fa-window-close"></i></button>

            <h3>OTP Verification</h3>
            <h6>Enter the code from the sms we sent to <b>{email}</b></h6>
            <ul className="otp-l">
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput1}
                  onKeyUp={(e) => {
                    if (otp1 !== "") {
                      textInput2.current.focus();
                    } else if (otp1 === "") {
                      textInput1.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp1}
                  onChange={(e) => {
                    setotp1(e.target.value);
                }}
                /> 
                    </li>
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput2}
                  onKeyUp={(e) => {
                    if (otp2 !== "") {
                      textInput3.current.focus();
                    } else if (otp2 === "") {
                      textInput1.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp2}
                  onChange={(e) => {
                    setotp2(e.target.value);
                    
                }}
                /> 
                    </li>
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput3}
                  onKeyUp={(e) => {
                    if (otp3 !== "") {
                      textInput4.current.focus();
                    } else if (otp3 === "") {
                      textInput2.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp3}
                  onChange={(e) => {
                    setotp3(e.target.value);
                   
                }}
                /> 
                    </li>
                    <li>
                    <input
                  type="text"
                  maxLength="1"
                  ref={textInput4}
                  onKeyUp={(e) => {
                    if (otp4 !== "") {
                      textInput4.current.focus();
                    } else if (otp4 === "") {
                      textInput3.current.focus();
                    }
                  }}
                  className="form-control input-style"
                  placeholder="-"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={otp4}
                  onChange={(e) => {
                    setotp4(e.target.value);
                    
                }}
                /> 
                    </li>
                </ul>
                <div className='form-group text-center'>
                  <b>OTP expire in {counter}</b>
                <h5>  Did not receive the code? {counter === 0 && <button onClick={ResendHandler} className='resendBtn'>Resend OTP.</button>} </h5>

               
                </div>
                <div className='text-center'>
                  <button type='button' className='submitBtn' onClick={VerifyHandle}>Verify</button>
                </div>
               
        </Modal.Body>
 
      </Modal>
    </div>
    )


}

export default ForgotPassword