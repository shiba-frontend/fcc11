import React, { useEffect, useState } from 'react'
import DashboardHeader from "../admin/common/DashboardHeader";
import AdminMenu from "../admin/common/AdminMenu";
import { NavLink } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from 'moment';
import ApiConnection from '../../utils/ApiConnection';
import Loader from '../../utils/Loader';

const ClubNotification = () => {
    const [search, setsearch] = useState("")
    const [Notification, setNotification] = useState([]);
    const [loading, setloading] = useState(false)
    const [pageloading, setpageloading] = useState(false)

    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-user-notification')
            if(response?.status == 200){
                setNotification(response?.data?.data?.list)
                setloading(false)
            } else{
              
            }  
        } catch(err){
            
        }
    }

    useEffect(()=>{
        GetData()
    },[])

    const ReadHandle = async (id)=>{
      setloading(true)
      try {

          const  response = await ApiConnection.get(`read-user-notification?id=${id}`)
          if(response?.status == 200){
            toast(response?.data?.message)
            GetData()
              setloading(false)
          } else{
            
          }  
      } catch(err){
          
      }

    }


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="Notification" />
<AdminMenu />
<div className="container">
  <div className="dashboard-panel p-5">

{Notification.length > 0 ?
      
  <div className="noti-sec">
    <ul>
      {Notification.map((notification, i) =>{
        return (
          <li style={{position:'relative'}} key={i}>
            <h5>{notification?.name}</h5>
            <h6>{notification?.subject}</h6>
            <p>{notification?.content}</p>
            <span>{moment(notification?.updated_at).format('MM-DD-YYYY')}</span>
            <button onClick={()=>ReadHandle(notification.id)} className='btn btn-primary' style={{position:'absolute', right:'15px',bottom:'15px'}}>Mark as read</button>
            </li>
        )
      })}
       
    </ul>
   </div>
:
<h5>No notification list</h5>

}

  </div>
  </div>
 

</div>
  )
}

export default ClubNotification