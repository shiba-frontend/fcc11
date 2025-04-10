import React, { useState, useRef, useEffect } from 'react'
import { IMAGE } from '../../utils/Theme'
import { NavLink, useNavigate } from 'react-router-dom'
import ApiConnection from '../../utils/ApiConnection'
import Loader from '../../utils/Loader'
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';

const ClubAssociationRegistration = () => {

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [pnumber, setpnumber] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [show, setShow] = useState(false);
    const [otp1, setotp1] = useState('')
    const [otp2, setotp2] = useState('')
    const [otp3, setotp3] = useState('')
    const [otp4, setotp4] = useState('')
    const [loading, setloading] = useState(false)
    const [counter, setCounter] = useState(59);
    const [inputotp, setinputotp] = useState(null)
    const textInput1 = useRef(null);
    const textInput2 = useRef(null);
    const textInput3 = useRef(null);
    const textInput4 = useRef(null);
    const [FilterResult, setFilterResult] = useState([])
    const [club, setclub] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const SubmitHandle = async ()=>{
    

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

      if (reg.test(email) === false) {

          toast.error('Email should be proper!');
      } else if(fname == ""){
          toast.error('First name should be must');
      } else if(fname == ""){
        toast.error('Last name should be must');
    } else if(password == ""){
      toast.error('Password should be must');
  }else if(password !== cpassword){
    toast.error('Conform password does not match');
  }else {
          setloading(true)
          var FormData = require('form-data');
          var data = new FormData();
          data.append('first_name', fname);
          data.append('last_name', lname);
          data.append('email', email);
          data.append('phone', pnumber);
          data.append('password', password);
          data.append('c_password', cpassword);
          data.append('club_id', club);
          
          try{
              const response = await ApiConnection.post('registration/clubassociate-admin-request', data)
              if(response?.status === 200) {
                setloading(false)
                if(response?.data?.success){
                 
                    setShow(true)
                  //  toast.info(response?.data?.data?.otp)
                    console.log(response.data)
                    setinputotp(response?.data?.data?.otp)
                    setCounter(60)

                } else {
                    toast.error(response?.data?.message)
                }
                
          }
          } catch(err){
            setloading(false)
            if(err.response?.status === 401){
            toast.error(err.response?.data?.message);   
        } else if(err.response?.status === 422){
          toast.error(err.response?.data?.message);   
       } else if(err.response?.status === 500){
        toast.error(err.response?.data?.message);   
     }
    }
  }

      

      //navigate("/dashboard")
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
        const response = await ApiConnection.post("registration/otp-verification", data)
        if(response?.status === 200) {
          setloading(false);
          toast.success(response?.data?.message);
          setShow(false)
          navigate("/uder-process");
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

  const ResendHandler = async ()=>{
    setloading(true);

    try{
      var FormData = require('form-data');
      var data = new FormData();
      data.append('email', email);
      const response = await ApiConnection.post('registration/resend-otp', data)
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


const GetData = async ()=>{
    setloading(true)
    try {
        const  response = await ApiConnection.get('clubs/list?request_for=all')
        if(response?.status == 200){
            console.log(response.data)
            setFilterResult(response?.data?.data?.list)
            setloading(false)
        } else{
            setloading(false)
        }  
    } catch(err){
        setloading(false)
    }
}

useEffect(()=>{
GetData()
},[])


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
                      <h2>Signup as a League admin</h2>
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
                          <div className='col-lg-12'>
                        <div className='form-group'>
                            <label>Club/Association</label>
                            <select className="form-control"
                            value={club}
                            onChange={(e)=>setclub(e.target.value)}
                            >
                                <option>--Select--</option>
                                {FilterResult&&FilterResult.map((result,i)=>{
                                    return (
                                        <option key={i} value={result?.id}>{result?.club_name}</option>
                                    )
                                })}
                              
                            </select>
                            <span style={{color:'red', fontSize:'12px'}}>If you do not find your Association/League in the above list, then <NavLink to="/contact-us"><b><u>contact us</u></b></NavLink> here with the association name.</span>

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
                                  <label>Phone Number</label>
                                  <input type="text" className="form-control" placeholder="Phone Number"
                                  value={pnumber}
                                  onChange={(e)=>setpnumber(e.target.value)}
                                  onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  }}
                                  maxLength="10"
                                  />
                              </div>
                          </div>
                          <div className='col-lg-6'>
                              <div className='form-group'>
                                  <label>Password</label>
                                  <input type="password" className="form-control" placeholder="XXXXX"
                                    value={password}
                                    onChange={(e)=>setpassword(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className='col-lg-6'>
                              <div className='form-group'>
                                  <label>Confirm Password</label>
                                  <input type="password" className="form-control" placeholder="XXXXX"
                                   value={cpassword}
                                   onChange={(e)=>setcpassword(e.target.value)}
                                  />
                              </div>
                          </div>
                          <div className='col-lg-12'>
                              <div className='form-group'>
                                 <h5> <input type='checkbox'/> By clicking this, I agree to the <NavLink>Terms & Conditions.</NavLink></h5>
                              </div>
                          </div>
                          <div className='col-lg-12'>
                              <div className='form-group text-center'>
                                  <button type='button' className='submitBtn' onClick={SubmitHandle}>Signup</button>
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

export default ClubAssociationRegistration