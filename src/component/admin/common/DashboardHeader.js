import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { IMAGE } from '../../../utils/Theme';
import { NavLink } from 'react-router-dom';
import DashboardFooter from './DashboardFooter';
import Modal from 'react-bootstrap/Modal';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import { useDispatch, useSelector } from 'react-redux';
import { GetprofileAction } from '../../../redux/reducer/fccDataflowreducer';

const DashboardHeader = ({title}) => {
    const [logoutmodal, setlogoutmodal] = useState(false);
    const [userdata, setuserdata] = useState("");
    const [Notification, setNotification] = useState([]);

    var user = JSON.parse(localStorage.getItem('user'))

    let dispatch = useDispatch()

  

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
        GetProfile()
        GetNotification()
       
    },[])




  return (
    <>
    <div className='top-dashboard-header'>
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-lg-7'>
                <div className='dashboard-header-logo'>
                <img src={IMAGE.main_logo} alt="logo"/>
                <h2>{title}</h2>
                </div>
                
            </div>
            <div className='col-lg-5'>
                <div className='dashboard-header-right'>
                    <NavLink className='logoutBtn btn btn-sm btn-danger' to='/admin/add-wallet'>Wallet Balance ${userdata?.available_credit_amount}</NavLink>
                <div className='dashboard-header-right-profile'>
                    <div className='dashboard-header-right-pic'>
                        <img src={BaseUrl.baseurl+userdata?.user?.image} alt='profile'/>
                    </div>
                    <div className='dashboard-header-right-info'>
                        <h3>{user?.first_name}</h3>
                    </div>
                </div>
                <NavLink to={userdata?.user?.role_id == 1 ? '/admin/notification':userdata?.user?.role_id == 2 ? '/club/notification' : userdata?.user?.role_id == 3 ? '/fantasy/notification' : '/notification'} className="header-bell">
                {Notification.length > 0 &&
                <span>{Notification.length}</span>
}
                    <i className="far fa-bell"></i>
                </NavLink>
                <Dropdown>
                <Dropdown.Toggle className='header-dropdown'>
                <i className="fas fa-cog"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu className='headerdrop_menu admin-list-menu'>
                    <ul>
                        {/* Super admin */}
                    {userdata?.user?.role_id == 1 &&
                    <>
                   
                    <li>  
                       
                       <NavLink to="/admin/force-update">
                          Force Update
                       </NavLink>
                   </li>
                    <li>  
                       
                            <NavLink to="/admin/association">
                               League
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/association-admin">
                            League admin 
                            </NavLink>
                        </li>
                      
                        <li>  
                            <NavLink to="/admin/subscription">
                               Subscription 
                            </NavLink>
                        </li>
                     
                        <li>  
                            <NavLink to="/admin/subscription-user">
                               Subscription user list
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/member">
                               Member user  
                            </NavLink>
                        </li>

                        <li>  
                                <NavLink to="/admin/fantacy-games">
                                    Fantasy game
                                </NavLink>
                            </li>
                       
                        <li>  
                                <NavLink to="/admin/fantacy-game-admin">
                                    Fantasy game admin
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/admin-player-credits">
                                    Admin player credits
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/request-join">
                                    Request join list
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/point-management">
                                   Point system management
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/team-list">
                                   Team list
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/tournament-list">
                                   Tournament list
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/player-list">
                                   Player list
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/match-schedule">
                                   Match schedule
                                </NavLink>
                            </li>
                            <li>  
                                <NavLink to="/admin/transaction-history">
                                   Transaction History
                                </NavLink>
                            </li>
                            <li>  
                            <NavLink to="/admin/faq-category">
                            FAQ Category
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/faq">
                            FAQ
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/cms">
                            CMS
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/banner">
                            Banner Management
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/testimonial">
                            Testimonial Management
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/howtoplay">
                            How to play Management
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/enquery">
                            Enquery List
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/subscriber">
                            Subscriber List
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/newsletter">
                            Newsletter List
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/notification-list">
                            Notification List
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/coupon">
                            Coupon List
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/user">
                            User role permissions
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/profile">
                            Update Profile
                            </NavLink>
                        </li>
                      
                        <li>  
                            <NavLink to="/admin/change-password">
                            Change Password
                            </NavLink>
                        </li>
                        
                        <li>  
                            <NavLink to="/admin/settings">
                            Settings
                            </NavLink>
                        </li>
                        <li>  
                            <NavLink to="/admin/log">
                            Log
                            </NavLink>
                        </li>
                        </>
}
{/* Club */}
{
  userdata?.user?.role_id == 2 &&   
<>

<li>  
<NavLink to="/admin/team-list">
   Team list
</NavLink>
</li>
<li>  
<NavLink to="/admin/tournament-list">
   Tournament list
</NavLink>
</li>
<li>  
<NavLink to="/admin/player-list">
   Player list
</NavLink>
</li>
<li>  
<NavLink to="/admin/match-schedule">
   Match schedule
</NavLink>
</li>


<li>  
<NavLink to="/admin/profile">
Update Profile
</NavLink>
</li>

<li>  
<NavLink to="/admin/change-password">
Change Password
</NavLink>
</li>
<li>  
                            <NavLink to="/admin/notification-list">
                            Notification List
                            </NavLink>
                        </li>
<li>  
<NavLink to="/admin/log">
Log
</NavLink>
</li>
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
                            <li>  
                            <NavLink to="/contact-us">
                            Contact Us
                            </NavLink>
                        </li>
                        <li>
                                <NavLink to="/help-support">Help & Support</NavLink>
                            </li>

</>
}
{/* Fantasy */}
{
  userdata?.user?.role_id == 3 &&   
<>
<li>  
    <NavLink to="/admin/coupon">
    Coupon List
    </NavLink>
</li>

<li>  
    <NavLink to="/admin/bank-change">
    Bank Account
    </NavLink>
</li>

                      
<li>  
<NavLink to="/admin/profile">
Update Profile
</NavLink>
</li>
 

<li>  
<NavLink to="/admin/change-password">
Change Password
</NavLink>
</li>
<li>  
                            <NavLink to="/admin/notification-list">
                            Notification List
                            </NavLink>
                        </li>
<li>  
<NavLink to="/admin/log">
Log
</NavLink>
</li>
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
                            <li>  
                            <NavLink to="/contact-us">
                            Contact Us
                            </NavLink>
                        </li>
                        <li>
                                <NavLink to="/help-support">Help & Support</NavLink>
                            </li>

</>
}
<li>
<li>  
                            <NavLink to="/admin/login-log">
                            Login log
                            </NavLink>
                        </li>
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
</div>
 <DashboardFooter/>

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
 </>
  )
}

export default DashboardHeader