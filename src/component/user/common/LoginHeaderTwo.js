import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { IMAGE } from '../../../utils/Theme';
import { NavLink } from 'react-router-dom';
import { BaseUrl } from '../../../utils/ApiConnection';
import { useSelector } from 'react-redux';

const LoginHeaderTwo = ({heading, subheading}) => {

    const fetchReducer = useSelector((state) => state.fccDataflowreducer)


  return (
    <div className='top-dashboard-header headerTwo'>
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-lg-6 col-8'>
                <h2>{heading}</h2>
                <h5>{subheading}</h5>
            </div>
            <div className='col-lg-6 col-4'>
                <div className='dashboard-header-right'>
                <div className='dashboard-header-right-profile'>
                    <div className='dashboard-header-right-pic'>
                    <img src={BaseUrl.baseurl + fetchReducer?.user?.user?.image} alt='profile'/>
                    </div>
                    <div className='dashboard-header-right-info'>
                    <h3>{fetchReducer?.user?.user?.first_name}</h3>
                    </div>
                </div>
             
            </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default LoginHeaderTwo