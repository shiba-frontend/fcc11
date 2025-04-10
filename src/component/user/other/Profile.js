import React, { useEffect, useState, useRef } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import Modal from 'react-bootstrap/Modal';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import { toast } from 'react-toastify';
import Loader from "../../../utils/Loader";
import { useNavigate } from "react-router-dom";
import { GetprofileAction } from "../../../redux/reducer/fccDataflowreducer";
import { useDispatch } from "react-redux";

const Profile = () => {


    const [loading, setloading] = useState(false)
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [phone, setphone] = useState("")
    const [email, setemail] = useState("")
    const [existingemail, setexistingemail] = useState("")
    const [display, setdisplay] = useState("")
    const [display1, setdisplay1] = useState("")
    const [image, setimage] = useState("")
    const [profileImage, setprofileImage] = useState("")
    const [userId, setuserId] = useState(null)
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [modal, setmodal] = useState(false);

    const [otp1, setotp1] = useState('')
    const [otp2, setotp2] = useState('')
    const [otp3, setotp3] = useState('')
    const [otp4, setotp4] = useState('')
    const [inputotp, setinputotp] = useState(null)
    const [counter, setCounter] = useState(59);

    const navigate = useNavigate()

    const textInput1 = useRef(null);
    const textInput2 = useRef(null);
    const textInput3 = useRef(null);
    const textInput4 = useRef(null);

    let dispatch = useDispatch()

    const GetProfile = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-profile')
            if(response?.status == 200){
                setloading(false)
                console.log(response.data?.data?.user)
                var editData = response.data?.data?.user
                setfname(editData?.first_name)
                setlname(editData?.last_name)
                setemail(editData?.email)
                setphone(editData?.phone)
                setdisplay(editData?.display_name)
                setuserId(editData?.id)
                setprofileImage(BaseUrl.baseurl + editData?.image)
               // dispatch(GetprofileAction(editData))
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    useEffect(() => {
        GetProfile()
    },[])


    const HandleImage = (e) => {
        var file = e.target.files[0];
        setimage(file);
        var reader = new FileReader();
        //var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          const fsize = file.size;
          const fileSize = Math.round(fsize / 1024);
          if (fileSize >= 800) {
            toast.error('file size is too large');
          } else {
            setprofileImage(reader.result)
            // var editImg = document.getElementById("editImg");
            // editImg.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      };

      const UpdateHandler = async () => {

        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('first_name', fname);
            data.append('last_name', lname);
            data.append('email', email);
            data.append('phone', phone);
            data.append('image', image);
            const response = await ApiConnection.post(`update-profile`, data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                GetProfile()
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

const UpdatemailHandler = async () => {
    setotp1('')
    setotp2('')
    setotp3('')
    setotp4('')
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if((reg.test(existingemail) === false)){
        toast.error('Please enter a display name')
    } else {

    setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append("email", existingemail);
                const response = await ApiConnection.post(`members/change-email`, data);
                if(response.status === 200){
                    setloading(false)
                    setShow(false)
                    setShow1(true)
                    toast.success(response?.data?.message);
                    toast.info('OTP is ' + response?.data?.data?.otp);
                    var OTP = response?.data?.data?.otp
                    setinputotp(OTP)
                    setCounter(59)
                    
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

const ResendHandler = async ()=>{
    setloading(true);
    setotp1('')
    setotp2('')
    setotp3('')
    setotp4('')
    try{
      var FormData = require('form-data');
      var data = new FormData();
      data.append('email', email);
      const response = await ApiConnection.post('members/change-email', data)
      if(response?.status === 200) {
        setloading(false);
        toast.success(response?.data?.message);
        toast.info('OTP is ' + response?.data?.data?.otp);
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
        const response = await ApiConnection.post("members/otp-verification", data)
        if(response?.status === 200) {
          setloading(false);
          toast.success(response?.data?.message);
          setShow1(false)
          GetProfile()
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

  const UpdateDisplayHandler = async () => {

    if(display1 == ''){
        toast.error('Please enter a display name')
    } else {

    setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('display_name', display1);
                const response = await ApiConnection.post(`update-display-name`, data);
                if(response.status === 200){
                    setloading(false)
                    setmodal(false)
                    toast.success(response?.data?.message);
                    GetProfile()
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

  useEffect(() => {
    const timer =
    counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    
    return () => clearInterval(timer);
  }, [counter]);


  return (
    <>
       {loading && <Loader/>}
    <LoginHeader title="My Profile" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-5">
                <div className="profile-panel">
                   
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                        <div className="upload-profile">
                        <img src={profileImage}/>
                        <button>
                            <input type="file"  accept="image/png, image/jpeg"
                        onChange={HandleImage}  />
                            <i className="fas fa-edit"></i>
                        </button>
                    </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                                <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" placeholder="First Name"
                                          value={fname}
                                          onChange={(e)=>setfname(e.target.value)}
                                        />
                                    </div>
                                
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" placeholder="Last Name"
                                        value={lname}
                                        onChange={(e)=>setlname(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone No</label>
                                        <input type="text" className="form-control" placeholder="Phone no"
                                            value={phone}
                                            onChange={(e)=>setphone(e.target.value)}
                                            maxLength="10"
                                        minLength="10"
                                        onKeyPress={(event) => {
                                                  if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                  }
                                                }}
                                        />
                                    </div>
                                </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" placeholder="Email"
                                            value={email}
                                            onChange={(e)=>setemail(e.target.value)}
                                            readOnly
                                            />
                                        </div>
                                    </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="d-block">&nbsp;</label>
                                        <button className="changeBtn" onClick={()=>setShow(true)}>Change</button>
                                    </div>
                                </div>
                               
                                <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Display Name</label>
                                    <input type="text" className="form-control" placeholder="Display Name"
                                     value={display}
                                     onChange={(e)=>setdisplay(e.target.value)}
                                    readOnly
                                    />
                                </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="d-block">&nbsp;</label>
                                        <button className="changeBtn"  onClick={()=>setmodal(true)}>Change</button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                <button className="solid-btn" onClick={UpdateHandler}>Update</button>
                        </div>
                                </div>
                            </div>
                       
                      
                    </div>
                </div>
        
            </div>
         </div>
         <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='gamerule-modal'>


            <button className='clodeBtn' onClick={()=>setShow(false)}><i class="fas fa-window-close"></i></button>

            <div className="form-group">
                <label>Existing Email</label>
                <input type="email" className="form-control" placeholder="Enter your existing Email"
                   value={existingemail}
                   onChange={(e)=>setexistingemail(e.target.value)}
                />
            </div>
            <button className="solid-btn" onClick={UpdatemailHandler}>Get OTP</button>
               
        </Modal.Body>
 
      </Modal>
      <Modal
        show={show1}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='otp-modal'>
            <button className='clodeBtn' onClick={()=>setShow1(false)}><i class="fas fa-window-close"></i></button>

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
      <Modal
  show={modal}
  backdrop="static"
  keyboard={false}
  centered
>

  <Modal.Body className='text-center'>
      <div className='form-group'>
        <label>Display Name</label>
            <input type='text' className='form-control' placeholder='display name'
             value={display1}
             onChange={(e)=>setdisplay1(e.target.value)}
            />
      </div>
      <ul className='d-flex mt-4 justify-content-center'>
          <li>
              <button className='btn btn-success mr-2' onClick={UpdateDisplayHandler}>Update</button>
          </li>
          <li>
              <button className='btn btn-outline-danger ml-2' onClick={()=>setmodal(false)}>Cancel</button>
          </li>
      </ul>
  </Modal.Body>

</Modal>
   </>
  )
}

export default Profile