import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { IMAGE } from '../../../utils/Theme';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import { useDispatch, useSelector } from 'react-redux';
import { GetprofileAction } from '../../../redux/reducer/fccDataflowreducer';
import Modal from 'react-bootstrap/Modal';
const LoginHeader = ({title}) => {
    const [logoutmodal, setlogoutmodal] = useState(false);
    const [Notification, setNotification] = useState([]);
    const [userdata, setuserdata] = useState('')

    const fetchReducer = useSelector((state) => state.fccDataflowreducer)
    let navigate = useNavigate()

    const LogoutHandle = async () => {
        setlogoutmodal(false)
        localStorage.clear()
        window.location.reload()

        // try{
        //     const response = await ApiConnection.post("logout")
        //     if(response.status === 200){
        //         localStorage.clear()
        //         window.location.reload()
        //     }


        // } catch(err){
        //     setlogoutmodal(false)
        // }
    }


    let dispatch = useDispatch()

    const GetProfile = async ()=>{
    
        try {
            const  response = await ApiConnection.get('get-profile')
            if(response?.status == 200){
             
                var editData = response.data?.data
                setuserdata(editData)
                dispatch(GetprofileAction(editData))

            } else{
              
            }  
        } catch(err){
            
        }
    }
    const GetNotification = async ()=>{
   
        try {
            const  response = await ApiConnection.get('get-user-notification')
            if(response?.status == 200){
                setNotification(response?.data?.data?.list)
            } else{
              
            }  
        } catch(err){
            
        }
    }

    useEffect(() => {
        setTimeout(()=>{
            GetProfile()
            GetNotification()
        },1000)
       
    },[])


  return (
    <div className='top-dashboard-header'>
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-lg-6 col-5 col-md-6'>
                <h2>{title}</h2>
            </div>
            <div className='col-lg-6 col-7 col-md-6'>
                <div className='dashboard-header-right'>
                <div className='dashboard-header-right-profile'>
                    <div className='dashboard-header-right-pic'>
                        <img src={BaseUrl.baseurl + fetchReducer?.user?.user?.image} alt='profile'/>
                    </div>
                    <div className='dashboard-header-right-info'>
                    <h3>{fetchReducer?.user?.user?.first_name}</h3>
                    </div>
                </div>
                <NavLink to="/notification" className="header-bell">
                {Notification.length > 0 &&
                <span>{Notification.length}</span>
}
                    <i className="far fa-bell"></i>
                </NavLink>
                <Dropdown>
                <Dropdown.Toggle className='header-dropdown'>
                <i className="fas fa-cog"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className='headerdrop_menu'>
                    <ul>
                      
                       
                        {/* <li>  
                            <NavLink to="/my-team">
                                My Team
                            </NavLink>
                        </li> */}
                       
                        <li>  
                            <NavLink to="/fantasy-point">
                                Fantasy Point System
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/refer-friend">
                            Refer a Friend
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/my-profile">
                            Update My Profile
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/change-password">
                            Change Password
                            </NavLink>
                        </li>
                       
                        <li>  
                            <NavLink to="/contact-us">
                            Contact Us
                            </NavLink>
                        </li>
                        {/* <li>  
                            <NavLink to="/settings">
                            Settings
                            </NavLink>
                        </li> */}
                        <li>  
                            <NavLink to="/about-us">
                            About Us
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/privacy-policy">
                            Privacy Policy
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/terms-conditions">
                            Terms & Conditions
                            </NavLink>
                        </li>
                    
                        <li className='logout-li'>  
                        <button className='logoutBtn btn btn-sm btn-outline-danger' onClick={()=>setlogoutmodal(true)}><i className="fa-solid fa-right-from-bracket"></i> Log out</button>

                        </li>
                    </ul>
                </Dropdown.Menu>
                </Dropdown>
            </div>
            </div>
        </div>
    </div>
    
 <Modal
        show={logoutmodal}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='text-center'>
            Are you sure you want to log out
            <ul className='d-flex mt-4 justify-content-center'>
                <li>
                    <button className='btn btn-success mr-2' onClick={LogoutHandle}>Yes</button>
                </li>
                <li>
                    <button className='btn btn-outline-danger ml-2' onClick={()=>setlogoutmodal(false)}>No</button>
                </li>
            </ul>
        </Modal.Body>
      
      </Modal>
</div>
  )
}

export default LoginHeader