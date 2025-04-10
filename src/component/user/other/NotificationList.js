import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import ApiConnection from "../../../utils/ApiConnection";
import moment from "moment";
import Loader from "../../../utils/Loader";
import { toast } from "react-toastify";

const NotificationList = () => {

  const [Notification, setNotification] = useState([]);
  const [loading, setloading] = useState(false)

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
    <>
    <LoginHeader title="Notification" />
    {loading && <Loader/>}
     <DashboardMenu />
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
   </>
  )
}

export default NotificationList