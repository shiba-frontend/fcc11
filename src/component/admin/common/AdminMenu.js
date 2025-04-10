import React from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE } from '../../../utils/Theme'
import { useSelector } from "react-redux";

const AdminMenu = () => {


    const fetchReducer = useSelector((state) => state.fccDataflowreducer)

    console.log('fetchReducer', fetchReducer?.
        user?.user?.role_id)


  return (
    <div className='container'>
    <div className='dashboard_menu'>
        <ul>
            {fetchReducer?.
        user?.user?.role_id == 1 &&
            <li>
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
            </li>
}
{fetchReducer?.
        user?.user?.role_id == 2 &&
            <li>
                <NavLink to="/club/dashboard">Dashboard</NavLink>
            </li>
}
{fetchReducer?.
        user?.user?.role_id == 3 &&
            <li>
                <NavLink to="/fantasy/dashboard">Dashboard</NavLink>
            </li>
}
       
            <li>
                <NavLink to="/admin/fantacy-games">Fantasy Games</NavLink>
            </li>

            <li>
                <NavLink to="/admin/withdray-history">Withdrawals</NavLink>
            </li>
            <li>
                <NavLink to="/admin/earning-history">Earning History</NavLink>
            </li>
          
            <li>
                <NavLink to="/admin/wallet-history">Wallet History</NavLink>
            </li>

            <li>
                <NavLink to="/admin/transaction-history">Transaction History</NavLink>
            </li>
            {fetchReducer?.
        user?.user?.role_id == 1 &&
            <li>
                <NavLink to="/admin/manage-commision">Manage Commision</NavLink>
            </li>
}
        </ul>
    </div>
    </div>
  )
}

export default AdminMenu