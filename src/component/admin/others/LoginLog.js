import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from 'moment';

const LoginLog = () => {
    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState('');
    const [rowId, setrowId] = useState('');
    const [statusmodal, setstatusmodal] = useState(false);
    const [pageloading, setpageloading] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false);

    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('login-logs')
            if(response?.status == 200){
                console.log(response.data)
                setFilterResult(response?.data?.data?.data)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(()=>{
        GetData()
    },[])

    const SearchHandle = (value)=>{
        setsearch(value)  

        // const result = FilterResult && FilterResult.filter(data =>{
        //     return data?.club_name.toLowerCase().match(value.toLowerCase())
        //   })
        //   setFilterResult(result)
    }

    const StatusHandle = async (id, status) =>{
        setloading(true)
        setstatusmodal(false)
        try {

            let data = new FormData();
           data.append('status', status);
            data.append('_method', 'PUT');

            const  response = await ApiConnection.post(`request-to-join/${id}`, data)
            if(response?.status == 200){
                GetData()
                setloading(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)

            }  
        } catch(err){
            setloading(false)
        }
    }



  return (
    <div>
    {pageloading && <Loader/>}
<DashboardHeader title="Join List" />
<AdminMenu />
<div className="container">
  <div className="dashboard-panel">

        

<div className='custom-table table-responsive'>
{!loading ? 

<table className='table'>
<thead>
        <th>Name</th>
        <th>Email</th>
        <th>User type</th>
        <th>log</th>
        <th>ip</th>
        <th>Date</th>
        </thead>
    <tbody>
        {FilterResult&&FilterResult.length > 0 ? 
       FilterResult&&FilterResult.map((list, index)=>{
        return (
            <tr key={index}>
            <td>{list?.name}</td>
            <td>{list?.email}</td>
            <td>{list?.user_type}</td>
            <td>{list?.log}</td>
            <td>{list?.ip}</td>
            <td>{moment(list?.updated_at).format("MM-DD-YYYY")}</td>
            
        </tr>
        )
       })

       :

       <tr>
        <td colSpan="4" className='text-center'>No record data</td>
       </tr>

    }
     
    </tbody>
</table>
  :
<TableLoader/>

}
</div>

  </div>
  </div>
 

</div>
  )
}

export default LoginLog