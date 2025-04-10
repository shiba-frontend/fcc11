import React from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE } from '../../../utils/Theme'

const DashboardMenu = () => {
  return (
    <div className='container'>
    <div className='dashboard_menu'>
        <ul>
            <li>
                <NavLink to="/dashboard"><img src={IMAGE.darhboard_alt} alt='icon'/> Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/withdraw-history"><img src={IMAGE.Chat_plus_light} alt='icon'/> Withdrawal</NavLink>
            </li>
            <li>
                <NavLink to="/earning-history"><img src={IMAGE.Calendar_add_light} alt='icon'/> Winning History</NavLink>
            </li>
            <li>
                <NavLink to="/credit-history"><img src={IMAGE.File_dock_light} alt='icon'/> Credit History</NavLink>
            </li>
            <li>
                <NavLink to="/wallet"><img src={IMAGE.File_dock_light} alt='icon'/> Wallet</NavLink>
            </li>
            <li>  
                            <NavLink to="/subscription"><img src={IMAGE.Calendar_add_light} alt='icon'/> Membership Plan
                            </NavLink>
                        </li>
        </ul>
    </div>
    </div>
  )
}

export default DashboardMenu