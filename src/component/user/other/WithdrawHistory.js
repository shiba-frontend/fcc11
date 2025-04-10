import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import moment from "moment";

function WithdrawHistory() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [loading, setloading] = useState(false)
    const [rowsData, setrowsData] = useState([]) 

    const GetList = async (fromdate, todate)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`fund-withdraw?from_date=${fromdate}&to_date=${todate}`)
            if(response?.status == 200){
                setloading(false)
                setrowsData(response.data?.data?.data)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }


    useEffect(() => {
        GetList('','')
    },[])

    function SearchHandle(){
        if(startDate == null){
            toast.error("Start date is must")
        } else if(endDate == null){
            toast.error("End date is must")
        } else

        GetList(moment(startDate).format('YYYY-MM-DD'), moment(endDate).format('YYYY-MM-DD'))
    }

    function ClearHandle(){
        GetList('', '')
        setStartDate(null)
        setendDate(null)
    }

    const  DownLoadExcel = async () =>{
      
        setloading(true)

        try{
            const  response = await ApiConnection.get(`fund-withdraw/excel?from_date=${startDate == null ? '' : moment(startDate).format('YYYY-MM-DD')}&to_date=${endDate == null ? '' : moment(endDate).format('YYYY-MM-DD')}`)
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
    <>
      {loading && <Loader/>}
    <LoginHeader title="Withdrawal History" />
     <DashboardMenu />

       <div className="container">
            <div className="dashboard-panel p-3 px-2">
                <div className="withdraw-history">
                    <div className="form-group text-right mb-3">
                        <NavLink to="/withdraw" className="outline-btn">Withdraw Fund</NavLink>
                    </div>
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
                    <div className="table-responsive">
                        <table className="history-table">
                            <thead>
                                <th>Request Date</th>
                                <th>Request Credit</th>
                                <th>Approved Credit</th>
                                <th>equivalent amount</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                {rowsData&&rowsData.map((item, i)=>{
                                    return (
                                        <tr key={i}>
                                    <td>{moment(item?.updated_at).format('MM-DD-YYYY')}</td>
                                    <td>{item?.request_amount} </td>
                                    <td>{item?.approved_amount} </td>
                                    <td>{item?.equivalent_amount}</td>
                                    <td>{item?.trans_id}</td>
                                    <td>{item?.status}</td>
                                </tr>
                                    )
                                })}
                                
                            
                            </tbody>
                        </table>
                    </div>
                </div>
        
            </div>
         </div>
   </>
  )
}

export default WithdrawHistory