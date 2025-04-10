import React from 'react'
import { NavLink } from 'react-router-dom'
import { COLORS } from '../../utils/Theme'
import { BaseUrl } from '../../utils/ApiConnection';
import { useSelector } from 'react-redux';

const Header = () => {

    const token = localStorage.getItem('fcc_access_token');
    var user = JSON.parse(localStorage.getItem('user'))
    const fetchReducer = useSelector((state) => state.fccDataflowreducer)


    console.log(fetchReducer)

  return (
    <div className='header'>
        <div className='container'>
            <div className='inner-header'>
                <div className='inner-header-lft'>
                    <h3>FCC <span style={{color:COLORS.thirdColor}}>11</span></h3>
                </div>
                <div className='inner-header-rht'>
                    {token ?  
                    <div className='after-l'>

                        {fetchReducer?.user?.user?.role_id == 1 ?
                     
                        <NavLink to="/admin/dashboard" className='dashboard-header-right-profile'>
                            <div className='dashboard-header-right-pic'>
                                <img src={BaseUrl.baseurl + fetchReducer?.user?.user?.image} alt='profile'/>
                            </div>
                            <div className='dashboard-header-right-info'>
                            <span>Welcome !</span>
                            <h3>{fetchReducer?.user?.user?.first_name}</h3>
                            </div>
                        </NavLink>
                        :

                        fetchReducer?.user?.user?.role_id == 2 ?

                        <NavLink to="/club/dashboard" className='dashboard-header-right-profile'>
                        <div className='dashboard-header-right-pic'>
                            <img src={BaseUrl.baseurl + fetchReducer?.user?.user?.image} alt='profile'/>
                        </div>
                        <div className='dashboard-header-right-info'>
                        <span>Welcome !</span>
                        <h3>{fetchReducer?.user?.user?.first_name}</h3>
                        </div>
                    </NavLink>

                    :
                    fetchReducer?.user?.user?.role_id == 3 ?

                    <NavLink to="/fantasy/dashboard" className='dashboard-header-right-profile'>
                    <div className='dashboard-header-right-pic'>
                        <img src={BaseUrl.baseurl + fetchReducer?.user?.user?.image} alt='profile'/>
                    </div>
                    <div className='dashboard-header-right-info'>
                    <span>Welcome !</span>
                    <h3>{fetchReducer?.user?.user?.first_name}</h3>
                    </div>
                </NavLink>

                :
                <NavLink to="/dashboard" className='dashboard-header-right-profile'>
                <div className='dashboard-header-right-pic'>
                    <img src={BaseUrl.baseurl + fetchReducer?.user?.user?.image} alt='profile'/>
                </div>
                <div className='dashboard-header-right-info'>
                <span>Welcome !</span>
                <h3>{fetchReducer?.user?.user?.first_name}</h3>
                
                </div>
                <span className='btn btn-sm btn-primary'> Go to dashboard</span>
            </NavLink>

                    }
                       
                        </div>
                    
                    :
                    <>
                     <h4>Not a Member Yet? </h4>
                    <NavLink to="/signup" className="rbtn" style={{color:COLORS.thirdColor}}> Register Now </NavLink>
                    <NavLink to="/login" className='themeBtn' style={{background:COLORS.primaryColor}}>Sign In</NavLink>
                    </>
                }
                   
                </div>
            </div>
            
            
        </div>
    </div>
  )
}

export default Header