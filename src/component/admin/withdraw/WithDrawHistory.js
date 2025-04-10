import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';



const WithDrawHistory = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [pageloading, setpageloading] = useState(false)
    
    const [deletemodal, setdeletemodal] = useState(false);
    const [status, setstatus] = useState('');
    const [rowId, setrowId] = useState('');
    const [numberpagination, setnumberpagination] = useState([])
    const [active, setactive] = useState(0)
    const [reason, setreason] = useState("")
    const [ramount, setramount] = useState("");
    

   

    const GetData = async (fromdate, todate)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`fund-withdraw-process?from_date=${fromdate}&to_date=${todate}`)
            if(response?.status == 200){
                setloading(false)
                setFilterResult(response?.data?.data?.data)
              

            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(()=>{
        GetData('', '')
    },[])



 const ApproveHandle = async (id,amount) =>{
    setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('approved_amount', amount);
            data.append('status', 'approved');
            data.append('_method', 'PUT');
            const response = await ApiConnection.post(`fund-withdraw-process/${id}`, data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                GetData()
            } else {
                setloading(false)
                toast.error(response?.data?.message);
            }

        } catch(err){
            setloading(false)
            if(err.response.status === 422){
                  toast.error(err.response?.data?.message);   
              
            }
    }
   
 }

 const RejectHandle = async () =>{
    setloading(true)
    try{
        var FormData = require('form-data');
        var data = new FormData();
        data.append('approved_amount', ramount);
        data.append('status', 'rejected');
        data.append('reason', reason);
        data.append('_method', 'PUT');
        const response = await ApiConnection.post(`fund-withdraw-process/${rowId}`, data);
        if(response.status === 200){
            setdeletemodal(false)
            setloading(false)
            toast.success(response?.data?.message);
            GetData()
        } else {
            setdeletemodal(false)
            setloading(false)
        }

    } catch(err){
        setloading(false)
        if(err.response.status === 422){
              toast.error(err.response?.data?.message);   
          
        }
}

}

const deleteModal = (rid, amaount) =>{
    setdeletemodal(true)
    setrowId(rid)
    setramount(amaount)
}

function SearchHandle(){
    if(startDate == null){
        toast.error("Start date is must")
    } else if(endDate == null){
        toast.error("End date is must")
    } else

    GetData(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'))
}

function ClearHandle(){
    GetData('', '')
    setStartDate(null)
    setendDate(null)
}

const  DownLoadExcel = async () =>{
  
    setloading(true)

    try{
        const  response = await ApiConnection.get(`fund-withdraw-process/excel?from_date=${startDate == null ? '' : moment(startDate).format('YYYY-MM-DD')}&to_date=${endDate == null ? '' : moment(endDate).format('YYYY-MM-DD')}`)
        if(response?.status == 200){
            setloading(false)
            const link = document.getElementById("Download");
            link.setAttribute("href", response.data?.data?.path);
            link.click();
        } else{
            setloading(false)
            toast.error(response?.data?.message)
        } 

    } catch(err){
        setloading(false)
        toast.error(err?.response?.data?.message)
    }
}
 


    const paginateHandle = (number) =>{
        setactive(number - 1)
        console.log(number)
        GetData(number)
      }



  return (
    <div>
    <DashboardHeader title="Withdrawal History" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

      <div className="withdraw-history-form row align-items-center mb-4">
                        <div className="col-auto">
                            <label>From Date:</label>
                        </div>
                        <div className="col-lg-2">
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" maxDate={new Date()}  placeholderText="From Date" />
                        </div>
                        <div className="col-auto">
                            <label>To Date:</label>
                        </div>
                        <div className="col-lg-2">
                            <DatePicker selected={endDate} onChange={(date) => setendDate(date)} className="form-control" maxDate={new Date()} minDate={startDate}
                                  placeholderText="To Date"
                            />
                        </div>
                        <div className="col-lg-2">
                            <button className="btn btn-sm btn-primary mr-1" onClick={SearchHandle}>Search</button>
                            <button className="btn btn-sm btn-danger" onClick={ClearHandle}>Clear</button>
                        </div>
                        <div className="col-lg-3">
                            <button className="csvBtn" onClick={DownLoadExcel}><i className="fas fa-download"></i>  Download Excel</button>
                        </div>
                    </div>
                    <a id="Download" download></a>
                    <div className='custom-table table-responsive'>
    {!loading ? 

    <table className='table'>
    <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Request Amount</th>
            <th>Status</th>
            <th>Action</th>
            </thead>
        <tbody>
            {FilterResult&&FilterResult.length > 0 ? 
           FilterResult&&FilterResult.map((list, index)=>{
            return (
                <tr key={index}>
                <td>{list?.first_name} {list?.last_name}</td>
                <td>{list?.email}</td>
                <td>{moment(list?.updated_at).format('MM-DD-YYYY')}</td>
                <td>{list?.request_amount}</td>
                <td>{list?.status}</td>
                <td>
                    {list?.status == 'rejected' || list?.status == 'approved' ? 
                    list?.status
                    :
                    <>
                    <button onClick={()=>ApproveHandle(list?.id,list?.request_amount)} style={{pointerEvents:list?.status == 'approved' ? 'none' : 'auto'}}  className='btn btn-sm btn-outline-success ml-2'>{list?.status == 'approved' ? 'Approved' : 'Approve'} </button>
                    <button onClick={()=>deleteModal(list?.id, list?.request_amount)} style={{pointerEvents:list?.status == 'rejected' ? 'none' : 'auto'}}   className='btn btn-sm btn-outline-danger ml-2'>{list?.status == 'rejected' ? 'Rejected' : 'Reject'}   </button>
                    </>
           
            }
              
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
        show={deletemodal}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='text-center'>
            <div className='form-group'>
                <input type="text"
                value={reason}
                onChange={(e)=>setreason(e.target.value)}
                className="form-control" placeholder="Reason for rejected"/>
            </div>
            <ul className='d-flex mt-4 justify-content-center'>
                <li>
                    <button className='btn btn-success mr-2' onClick={RejectHandle}>Reject</button>
                </li>
               
            </ul>
        </Modal.Body>
      
      </Modal>
    </div>
  )
}

export default WithDrawHistory