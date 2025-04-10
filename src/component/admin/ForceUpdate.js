import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
import Loader from '../../utils/Loader';
import DashboardHeader from './common/DashboardHeader';
import AdminMenu from './common/AdminMenu';
import ApiConnection from '../../utils/ApiConnection';

const ForceUpdate = () => {
    const [loading, setloading] = useState(false)

    const ForceHandle = async (url)=>{

        setloading(true)
    
        try {
            const  response = await ApiConnection.get(url)
            if(response?.status == 200){
             
                setloading(false)
                toast('Update Success')
            } else{
                
                setloading(false)
                toast.error('Something went wrong')
            }  
        } catch(err){
            setloading(false)
            toast.error('Something went wrong')
        }
    
    
    }


  return (
    <div>
<DashboardHeader title="Force Update" />
<AdminMenu />
<div className="container">
  <div className="dashboard-panel">

    
  {loading && <h3>Processing.....</h3>}

<div className='custom-table table-responsive'>






<table className='table'>
<thead>
      <tr>
      <th>Name</th>
  
        <th>Particular</th>
        <th>Action</th>
      </tr>
        </thead>
    <tr>
        <td>Tounaments</td>
        <td>Fetch tournament list for current year
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-tournaments')}>Update</button>
        </td>
    </tr>
    <tr>
        <td>Tounaments/Teams</td>
        <td>Fetch tournament team list
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-tournaments/teams')}>Update</button>
        </td>
    </tr>
    <tr>
        <td>Tounaments/Upcoming Match</td>
        <td>Fetch upcoming match for tournament
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-tournaments/upcoming-match')}>Update</button>
        </td>
    </tr>
    <tr>
        <td>Tounaments/Teams/Players</td>
        <td>Fetch tournament team players list
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-tournaments/teams/players')}>Update</button>
        </td>
    </tr>
    <tr>
        <td>Tounaments/Match</td>
        <td>Fetch runing match for tournament
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-tournaments/match')}>Update</button>
        </td>
    </tr>
    <tr>
        <td>Tounaments/Match/Score</td>
        <td>Fetch runing match score card
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-tournaments/match/score')}>Update</button>
        </td>
    </tr>
    <tr>
        <td>Tounaments/Match/ball-by-ball</td>
        <td>Fetch runing match ball by ball information
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-tournaments/match/ball-by-ball')}>Update</button>
        </td>
    </tr>
    <tr>
        <td>Tounaments/Player Stats</td>
        <td>Fetch players stats for live matchs
        </td>
        <td>
            <button className='btn btn-primary' onClick={()=>ForceHandle('ccapi-get-player-stats')}>Update</button>
        </td>
    </tr>
</table>

</div>

  </div>
  </div>


</div>
  )
}

export default ForceUpdate