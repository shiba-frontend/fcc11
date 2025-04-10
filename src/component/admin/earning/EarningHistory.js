import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import DataTable from 'react-data-table-component';
import { NavLink } from 'react-router-dom';
import { IMAGE } from '../../../utils/Theme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Accordion from 'react-bootstrap/Accordion';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import { toast } from 'react-toastify';
import moment from 'moment';


const EarningHistory = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [show, setshow] = useState();
    const [loading, setloading] = useState(false)
    const [listdata, setlistdata] = useState([])

    const ShowHideHandle = (i) => {
        setshow(i)
    }

    const GetData = async (fromdate, todate)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`earning-history?from_date=${fromdate}&to_date=${todate}`)
            if(response?.status == 200){
                setloading(false)
         
                setlistdata(response.data?.data?.list)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    useEffect(() => {
        GetData('', '')
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
            const  response = await ApiConnection.get(`earning-history/excel?from_date=${startDate == null ? '' : moment(startDate).format('YYYY-MM-DD')}&to_date=${endDate == null ? '' : moment(endDate).format('YYYY-MM-DD')}`)
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
           {loading && <Loader/>}
    <DashboardHeader title="Earning History" />
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
      

<div className='accordian-table-container ern-table-scroll'>

    <ul className='admin-ern-table'>
            <li><b>Fantasy Game</b></li>
            {/* <li><b>Match</b></li>
            <li><b>Match Date</b></li> */}
            <li><b>Teams Joined</b></li>
            <li><b>Winner Paid</b></li>
            <li><b>Commission Paid</b></li>
            <li><b>Earning</b></li>
    </ul>

    {listdata&&listdata.map((item, index) =>{
        return ( 
            <>
            <ul key={index} className={show == index ? 'admin-ern-table active' :'admin-ern-table' } onClick={()=>ShowHideHandle(index)}>
                <span className='toggleIcon'>{show == index ? <i className="fa-solid fa-circle-minus"></i> : <i className="fa-solid fa-circle-plus"></i>}</span>
                <li>{item?.game_name}</li>
                {/* <li>{item?.a_team_name} VS {item?.b_team_name}</li>
                <li>{moment(item?.match_date).format('LLL')}</li> */}
                <li>{item?.team_joined}</li>
                <li>{item?.winner_paid}</li>
                <li>{item?.commission}</li>
                <li>{item?.earning}</li>
            </ul>
            {show == index &&
            <>
            <h6>Winning Details</h6>
           { item.game_winning_details.length > 0 ?
           
          
            <table className='admin-ern-table-inner-table mb-3'>
               <thead>
                    <th></th>
                    <th>Username</th>
                    {item?.game_predict_option == 'full_fledged' &&   <th>Team</th> }
                  
                    <th>Credit</th>
               </thead>
               <tbody>
               {item.game_winning_details.map((row, i)=>{
        return (
                <tr>
                    <td><img src={BaseUrl.baseurl + row?.image} width="50" /></td>
                    <td>{row?.display_name}</td>
                    {item?.game_predict_option == 'full_fledged' &&    <td>{row?.team_unique_id}</td> }
                   
                    <td>{row?.credit}</td>
                </tr>
            )
        })}
               </tbody>
            </table>
            :
            <h5>No game winning details</h5>
    
    }
      <h6>Commission Details</h6>
           { item.
game_commission_details
.length > 0 ?
           
          
            <table className='admin-ern-table-inner-table'>
               <thead>
                    <th></th>
                    <th>Name</th>
                 
                  
                    <th>Earning</th>
               </thead>
               <tbody>
               {item.game_commission_details.map((row, i)=>{
        return (
                <tr>
                    <td><img src={BaseUrl.baseurl + row?.image} width="50" /></td>
                    <td>{row?.display_name}</td>
                   
                    <td>{row?.commission}</td>
                </tr>
            )
        })}
       
               </tbody>
            </table>
            :
            <h5>No commission details</h5>
    
    }
            </>
    }
    
            </>
        )
    })}

 
</div>


      </div>
      </div>
        
    </div>
  )
}

export default EarningHistory