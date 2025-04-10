import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { useSelector } from 'react-redux';



const FantacyGameList = () => {

    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState('');
    const [rowId, setrowId] = useState('');
    const [statusmodal, setstatusmodal] = useState(false);
    const [pageloading, setpageloading] = useState(false)
    const [deletemodal, setdeletemodal] = useState(false);
    const [approvemodal, setapprovemodal] = useState(false);
    const [approvestatus, setapprovestatus] = useState('');

    const [numberpagination, setnumberpagination] = useState([])
    const [active, setactive] = useState(0)
    const [Totallength, setTotallength] = useState(0)
    const [loginmemberId, setloginmemberId] = useState(null);
    const fetchReducer = useSelector((state) => state.fccDataflowreducer)

    console.log(fetchReducer?.user?.user?.role_id)

    const GetData = async (number, text)=>{

        let endpoint = ''
        if(text !== ''){
            endpoint = `fantasy-game?search=${text}`
        } else endpoint = `fantasy-game?page=${number}`

        setloading(true)
        try {
            const  response = await ApiConnection.get(endpoint)
            if(response?.status == 200){
                setloginmemberId(response.data?.data?.login_member_id)
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
            GetData(1, search)
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

    const ApproveModal = (status, rid) =>{
        setapprovestatus(status)
        setapprovemodal(true)
        setrowId(rid)
    }

    

    const StatusHandler = async () =>{
        setloading(true)
        setstatusmodal(false)
        try {

            let data = new FormData();
           data.append('status', status == 1 ? 0 : 1);
            data.append('_method', 'PUT');

            const  response = await ApiConnection.post(`fantasy-game/change-active-status/${rowId}`, data)
            if(response?.status == 200){
                GetData(1, '')
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

    const ApproveHandler = async (id) =>{
        setloading(true)
        setstatusmodal(false)
        try {

            let data = new FormData();
           data.append('status', 1);
            data.append('_method', 'PUT');

            const  response = await ApiConnection.post(`fantasy-game/change-status/${id}`, data)
            if(response?.status == 200){
                GetData()
                setloading(false)
              //  setapprovemodal(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)
                //setapprovemodal(false)
            }  
        } catch(err){
            setloading(false)
           // setapprovemodal(false)
        }
    }

    const RejectHandler = async (id) =>{
        setloading(true)
        setstatusmodal(false)
        try {

            let data = new FormData();
           data.append('status', 2);
            data.append('_method', 'PUT');

            const  response = await ApiConnection.post(`fantasy-game/change-status/${id}`, data)
            if(response?.status == 200){
                GetData()
                setloading(false)
              //  setapprovemodal(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)
                //setapprovemodal(false)
            }  
        } catch(err){
            setloading(false)
           // setapprovemodal(false)
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

            const  response = await ApiConnection.delete(`fantasy-game/${rowId}`)
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
            const  response = await ApiConnection.get('fantasy-game/excel')
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
        GetData(number, '')
      }

  return (
    <div>
    {pageloading && <Loader/>}
<DashboardHeader title="Fantasy game list" />
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
                        <NavLink to="/admin/fantacy-games/add" className='btn  btn-success' ><i className="fa-solid fa-plus"></i> Add fantasy</NavLink>
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
      <tr>
      <th>Game Name</th>
  
        <th>Match Date</th>
        <th>Match Time</th>
        <th>Game for</th>
        <th>Game Type</th>
        <th>Total Match</th>
        <th>Contest Type</th>
        <th>Action</th>
      </tr>
        </thead>
    <tbody>
        {FilterResult&&FilterResult.length > 0 ? 
       FilterResult&&FilterResult.map((list, index)=>{
    //     var status = ''
    //     if(new Date(list.match?.match_date) <= new Date())
    //         status = 'Completed' 2
    //      else if(new Date(list.match?.match_date) >= new Date())
    //     status = 'Upcoming' 0
    //   else if( new Date(list.match?.match_date) == new Date())
    //      status = 'Live' 1
    
        return (
            <tr key={index}>
             <td>{list?.game_name}</td>
           
            <td>{moment(list?.match[0]?.match_date).format("MM-DD-YYYY")}</td>
            <td>{moment(`12-03-24 ${list?.match[0]?.match_start_time}`).format("LT")}</td>
            <td>{list?.applicable_for}</td>
            <td>{list?.game_type}</td>
            <td>{list?.match?.length}</td>
            {/* <td>{list?.applicable_for == 'Match' ? <>{list?.match?.match_status == 2 ? "Completed" : list?.match?.match_status == 0 ? 'Upcoming' : 'Live'}</> : 'Tournament'  }</td> */}
            {/* <td style={{whiteSpace: 'nowrap'}}>
                {fetchReducer?.user?.user?.role_id !== 3  ?
                list?.is_active == 1 || list?.is_active == 2 ? 
                
                list?.is_active == 1 ? <span className='text-success'>Approved</span> : <span className='text-danger'>Rejected</span>
                    
                :
                <>
                 <button onClick={()=>ApproveHandler(list?.id)} className='btn btn-sm btn-outline-success'>Approve</button>
                 <button onClick={()=>RejectHandler(list?.id)} className='btn btn-sm btn-outline-danger ml-2'>Reject</button>
                </>
                    :
                    list?.is_active == 1 ? <span className='text-success'>Approved</span> :list?.is_active == 0 ? <span className='text-warning'>Pending</span> : <span className='text-danger'>Rejected</span>
            }
                
            
            </td> */}
            <td>{list?.game_predict_option == 'full_fledged' ? 'Fantasy Game' : 'Prediction'}</td>
            <td>
            <NavLink to={`/admin/fantacy-games/creditscore/${list?.id}`} className="btn btn-sm btn-outline-primary mr-2">Credit Score</NavLink>
           
                <NavLink to={`/admin/fantacy-games/view/${list?.id}`} className="btn btn-sm btn-outline-primary"><i className="fa-solid fa-eye"></i></NavLink>
                {list?.status != 2 && 
                <>
                <NavLink to={`/admin/fantacy-games/edit/${list?.id}`} className="btn btn-sm btn-outline-warning ml-2"><i className="fa-solid fa-pen-to-square"></i></NavLink>
                <button onClick={()=>deleteModal(list?.id)} className='btn btn-sm btn-outline-danger ml-2'><i className="fa-solid fa-trash"></i></button>
                
                <button onClick={()=>StatusModal(list?.is_active, list?.id)} className={list?.is_active == 1 ? 'btn btn-sm btn-outline-success ml-2' : 'btn btn-sm btn-outline-danger ml-2'}>{list?.is_active == 1 ? "Active" : "Inactive"}</button>
                </>
       }
        {list?.status == 2 && 
                <NavLink to={`/admin/fantacy-games/view-standing/${list?.id}`} className="btn btn-sm btn-outline-primary ml-2">View Standing</NavLink>

       }
                {/* <button  className="btn btn-sm btn-success ml-2">Winner</button> */}
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
  {/* <Modal
    show={approvemodal}
    backdrop="static"
    keyboard={false}
    centered
  >

    <Modal.Body className='text-center'>
        Are you sure you want to {approvestatus == 1 ? "Reject" : "Approve"}
        <ul className='d-flex mt-4 justify-content-center'>
            <li>
                <button className='btn btn-success mr-2' onClick={ApproveStatusHandler}>Yes</button>
            </li>
            <li>
                <button className='btn btn-outline-danger ml-2' onClick={()=>setapprovemodal(false)}>Cancel</button>
            </li>
        </ul>
    </Modal.Body>
  
  </Modal> */}
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

export default FantacyGameList