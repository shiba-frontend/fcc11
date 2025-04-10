import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import DataTable from 'react-data-table-component';
import { NavLink } from 'react-router-dom';
import { IMAGE } from '../../../utils/Theme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Modal from 'react-bootstrap/Modal';
import TableLoader from '../../../utils/TableLoader';
import { toast } from 'react-toastify';

const AdminUserList = () => {

    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState('');
    const [rowId, setrowId] = useState('');
    const [statusmodal, setstatusmodal] = useState(false);
    const [pageloading, setpageloading] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false);
    const [startDate, setStartDate] = useState(new Date())

    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('subadmin')
            if(response?.status == 200){
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

    const StatusModal = (status, rid) =>{
        setstatus(status)
        setstatusmodal(true)
        setrowId(rid)
    }

    const StatusHandler = async () =>{
        setloading(true)
        setstatusmodal(false)
        try {

            let data = new FormData();
           data.append('status', status == 1 ? 0 : 1);
            data.append('_method', 'PUT');

            const  response = await ApiConnection.post(`subadmin/change-status/${rowId}`, data)
            if(response?.status == 200){
                GetData()
                setloading(false)
                setstatusmodal(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)
                setstatusmodal(false)
            }  
        } catch(err){
            setloading(false)
            setstatusmodal(false)
        }
    }

    const deleteModal = (rid) =>{
        setdeletemodal(true)
        setrowId(rid)
    }

    const DeleteHandler = async () =>{
        setloading(true)
        setdeletemodal(false)
        try {

            const  response = await ApiConnection.delete(`subadmin/${rowId}`)
            if(response?.status == 200){
                GetData()
                setloading(false)
                setdeletemodal(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)
                setdeletemodal(false)
                toast.error(response?.data?.message)
            }  
        } catch(err){
            setloading(false)
            setdeletemodal(false)
            toast.error(err.response?.data?.message)
        }
    }

    const  DownLoadExcel = async () =>{
      
        setpageloading(true)

        try{
            const  response = await ApiConnection.get('subadmin/excel')
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
    <DashboardHeader title="Admin Sub-User List" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">
      <div className='table-top'>
             <div className='form-group w-25'>
               
            </div>
            <div className='form-group'>
                <ul>
                    <li>
                        <NavLink to="/admin/user/add" className='btn  btn-success' ><i className="fa-solid fa-plus"></i> Add User</NavLink>
                    </li>
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
            
            <td>
                <NavLink to={`/admin/user/role-permission/${list?.id}`} className="btn btn-sm btn-outline-primary">Manage role permission</NavLink>
                <NavLink to={`/admin/user/edit/${list?.id}`} className="btn btn-sm btn-outline-warning ml-2"><i className="fa-solid fa-pen-to-square"></i></NavLink>
                <button onClick={()=>deleteModal(list?.id)} className='btn btn-sm btn-outline-danger ml-2'><i className="fa-solid fa-trash"></i></button>
                <button onClick={()=>StatusModal(list?.is_active, list?.id)} className={list?.is_active == 1 ? 'btn btn-sm btn-outline-success ml-2' : 'btn btn-sm btn-outline-danger ml-2'}>{list?.is_active == 1 ? "Active" : "Inactive"}</button>
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
      <Modal
    show={statusmodal}
    backdrop="static"
    keyboard={false}
    centered
  >

    <Modal.Body className='text-center'>
        Are you sure you want to {status == 1 ? "Inactive" : "Active"}
        <ul className='d-flex mt-4 justify-content-center'>
            <li>
                <button className='btn btn-success mr-2' onClick={StatusHandler}>Yes</button>
            </li>
            <li>
                <button className='btn btn-outline-danger ml-2' onClick={()=>setstatusmodal(false)}>Cancel</button>
            </li>
        </ul>
    </Modal.Body>
  
  </Modal>
  <Modal
    show={deletemodal}
    backdrop="static"
    keyboard={false}
    centered
  >

    <Modal.Body className='text-center'>
        Are you sure you want to delete
        <ul className='d-flex mt-4 justify-content-center'>
            <li>
                <button className='btn btn-success mr-2' onClick={DeleteHandler}>Yes</button>
            </li>
            <li>
                <button className='btn btn-outline-danger ml-2' onClick={()=>setdeletemodal(false)}>Cancel</button>
            </li>
        </ul>
    </Modal.Body>
  
  </Modal>
    </div>
  )
}

export default AdminUserList