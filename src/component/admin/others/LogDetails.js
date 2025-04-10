import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';

const LogDetails = () => {
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState({})

    let {id} = useParams()

    const Fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`get-server-request-log/details/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data?.details?.log
                setdata(editdata)
                console.log(editdata)
            }
          
        } catch(e){
            setloading(false)  
        }
    }

    useEffect(()=>{
        Fetchdata()
    },[])



  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View a log" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

    <p><b>Time:</b> {moment(data?.timestamp).format("MM-DD-YYYY ,hh:mm:ss")}</p>
    <p><b>IP:</b> {data?.ip}</p>   
    <p><b>Path:</b> {data?.path}</p>   
    <p><b>Response:</b> {data?.response?.message}</p> 
    </div>

</div>
</div>
 

  )
}

export default LogDetails