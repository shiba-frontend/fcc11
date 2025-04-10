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

const TransactionHistory = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [pageloading, setpageloading] = useState(false)


  

    const GetData = async (fromdate, todate)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`fund-withdraw-process?status=approved&from_date=${fromdate}&to_date=${todate}`)
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
        GetData('','')
    },[])

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
            const  response = await ApiConnection.get(`transaction/export?from_date=${startDate == null ? '' : moment(startDate).format('YYYY-MM-DD')}&to_date=${endDate == null ? '' : moment(endDate).format('YYYY-MM-DD')}`)
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



  return (
    <div>
    <DashboardHeader title="Transaction History" />
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
            <th>User</th>
            <th>Date</th>
            <th>Transaction Amount</th>
            <th>Status</th>
            <th>Transaction id</th>
            </thead>
        <tbody>
            {FilterResult&&FilterResult.length > 0 ? 
           FilterResult&&FilterResult.map((list, index)=>{
            return (
                <tr key={index}>
                <td>{list?.first_name} {list?.last_name}</td>
         
                <td>{moment(list?.updated_at).format('MM-DD-YYYY')}</td>
                <td>{list?.approved_amount}</td>
                <td>{list?.status}</td>
                <td>{list?.trans_id}</td>
              
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

export default TransactionHistory