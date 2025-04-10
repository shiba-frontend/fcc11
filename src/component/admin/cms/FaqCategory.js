import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import ApiConnection from '../../../utils/ApiConnection';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';

const FaqCategory = () => {

  const [search, setsearch] = useState("")
  const [FilterResult, setFilterResult] = useState([])
  const [loading, setloading] = useState(false)
  const [pageloading, setpageloading] = useState(false)
  const [statusmodal, setstatusmodal] = useState(false);
  const [deletemodal, setdeletemodal] = useState(false);
  const [status, setstatus] = useState('');
  const [rowId, setrowId] = useState('');
  const [numberpagination, setnumberpagination] = useState([])
  const [active, setactive] = useState(0)
  const [Totallength, setTotallength] = useState(0)

  const GetData = async (pagenumber, text)=>{

    let endpoint = ''
    if(text !== ''){
        endpoint = `faq-category?search=${text}`
    } else endpoint = `faq-category?page=${pagenumber}`

    setloading(true)
    try {
        const  response = await ApiConnection.get(endpoint)
        if(response?.status == 200){
            console.log(response.data)
            setFilterResult(response?.data?.data?.data)
            setTotallength(response.data?.data?.total)
            var count = response.data?.data?.total / response.data?.data?.per_page
            var roundof = Math.ceil(count)
            let pagArr = []
        
            for(let i=0; i<roundof; i++){
              pagArr.push(i)
            }
            setnumberpagination(pagArr)
            setloading(false)
        } else{
            setloading(false)
        }  
    } catch(err){
        setloading(false)
    }
}

useEffect(()=>{
    GetData(1, '')
},[])

const SearchHandle = ()=>{
    if(search == ''){
        toast.error("Please enter a search kewword")
    } else {
        GetData(active, search)
    }
   

}

const ResetHandle = ()=>{  
    GetData(1, '')
    setsearch('')
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

        const  response = await ApiConnection.post(`faq-category/change-status/${rowId}`, data)
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

        const  response = await ApiConnection.delete(`faq-category/${rowId}`)
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
        const  response = await ApiConnection.get('faq-category/excel')
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

const paginateHandle = (number) =>{
    setactive(number - 1)
    GetData(number)
  }


  return (
    <div>
    {pageloading && <Loader/>}
<DashboardHeader title="FAQ category list" />
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
                      <NavLink to="/admin/faq-category/add" className='btn  btn-success' ><i className="fa-solid fa-plus"></i> Add Category</NavLink>
                  </li>
                  <li>
                      <button className='btn btn-outline-info' onClick={DownLoadExcel}><i className="fa-solid fa-file-excel"></i> Export </button>
                  </li>
              </ul>
              <a id="Download" download></a>
          </div>
      </div>

<div className='custom-table table-responsive'>
{!loading ? 

<table className='table'>
<thead>
      <th>FAQ category name</th>
      <th>Action</th>
      </thead>
  <tbody>
      {FilterResult&&FilterResult.length > 0 ? 
     FilterResult&&FilterResult.map((list, index)=>{
      return (
          <tr key={index}>
          <td>{list?.category_name}</td>
          <td>
              <NavLink to={`/admin/faq-category/view/${list?.id}`} className="btn btn-sm btn-outline-primary"><i className="fa-solid fa-eye"></i></NavLink>
              <NavLink to={`/admin/faq-category/edit/${list?.id}`} className="btn btn-sm btn-outline-warning ml-2"><i className="fa-solid fa-pen-to-square"></i></NavLink>
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
<div className='d-flex justify-content-end'>
{Totallength > 20 &&
<ul className='pagination'>
  {numberpagination&&numberpagination.map((number, i)=>{
    return (
      <li key={i}><button className={active == number ? 'active':null} onClick={()=>paginateHandle(number + 1)}>{number + 1}</button></li>
    )
  })}
 
</ul>
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

export default FaqCategory