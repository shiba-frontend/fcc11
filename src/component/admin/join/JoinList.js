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

const JoinList = () => {


    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState('');
    const [rowId, setrowId] = useState('');
    const [statusmodal, setstatusmodal] = useState(false);
    const [pageloading, setpageloading] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false);

    const GetData = async (text)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`request-to-join?search=${text}`)
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
        GetData('')
    },[])

    const SearchHandle = ()=>{
        if(search == ''){
            toast.error("Please enter a search kewword")
        } else {
            GetData(search)
        }
       

    }

    const ResetHandle = ()=>{  
        GetData('')
        setsearch('')
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

    const  DownLoadExcel = async () =>{
      
        setpageloading(true)

        try{
            const  response = await ApiConnection.get('request-to-join/excel')
            if(response?.status == 200){
                setpageloading(false)
                const link = document.getElementById("Download");
                link.setAttribute("href", response.data?.data?.path);
                link.click();
            } else{
                setpageloading(false)
                toast.error(response?.data?.message)
            } 

        } catch(err){
            setpageloading(false)
            toast.error(err?.response?.data?.message)
        }
    }




  return (
    <div>
        {pageloading && <Loader/>}
    <DashboardHeader title="Join List" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel">

      <div className='table-top'>
        <div className='form-group w-50 d-flex'>
                    <input type='text' className='form-control' placeholder='Enter  keyword'
                    value={search}
                    onChange={(e)=>setsearch(e.target.value)}
                    />
                    <button type='submit' onClick={SearchHandle} className='btn btn-primary ml-2'>Search</button>
                    <button onClick={ResetHandle} className='btn btn-info ml-2'>Reset</button>
                </div>
            <div className='form-group'>
                <ul>
                    
                    <li>
                        <button onClick={DownLoadExcel} className='btn btn-outline-info'><i className="fa-solid fa-file-excel"></i> Export </button>
                    </li>
                </ul>
                <a id="Download" download></a>
            </div>
        </div>
<div className='custom-table table-responsive'>
    {!loading ? 

    <table className='table'>
    <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Action</th>
            </thead>
        <tbody>
            {FilterResult&&FilterResult.length > 0 ? 
           FilterResult&&FilterResult.map((list, index)=>{
            return (
                <tr key={index}>
                <td>{list?.first_name + ' ' + list?.last_name}</td>
                <td>{list?.email}</td>
                <td>{list?.phone}</td>
                <td>{moment(list?.updated_at).format("MM-DD-YYYY")}</td>
                <td>
                    <button onClick={()=>StatusHandle(list?.id,1)} className='btn btn-sm btn-outline-success ml-2'>Accept</button>
                    <button onClick={()=>StatusHandle(list?.id,2)}  className=' btn btn-sm btn-outline-danger ml-2'>Reject</button>
                </td>
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

export default JoinList