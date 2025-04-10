import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';

const ViewCoupon = () => {

    
    const [loading, setloading] = useState(false)
   
    const [cname, setcname] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [toDate, settoDate] = useState(null)
    const [dtype, setdtype] = useState("percentage")
    const [amount, setamount] = useState("")
    const [user, setuser] = useState("")
    const [applicablefor, setapplicablefor] = useState("match")
    const [match, setmatch] = useState("")
    const [tournament, settournament] = useState("")

    const [matchList, setmatchList] = useState([])
    const [tournamentList, settournamentList] = useState([])

    let {id} = useParams()

    let navigate = useNavigate()


    const GetTournament = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('tournament/get-tournament-list')
            if(response?.status == 200){
                settournamentList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetMatch = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('match/get-match-list')
            if(response?.status == 200){
                setmatchList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`coupon/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setcname(editdata?.coupon_name)
                setStartDate(new Date(editdata?.valid_from))
                settoDate(new Date(editdata?.valid_to))
                setdtype(editdata?.discount_type == 1 ? 'flat' : 'percentage')
                setamount(editdata?.amount)
                setuser(editdata?.valid_users)
                // setapplicablefor(editdata?.applicable_for)
                // setmatch(editdata?.applicable_for_id)
                // settournament(editdata?.applicable_for_id)
            }
     


        } catch(e){
            setloading(false)  
        }
    }

useEffect(()=>{
    GetMatch()
    GetTournament()
    fetchdata()
},[])





  return (
    <div>
    {loading && <Loader/>}
 <DashboardHeader title="View Coupon" />
 <AdminMenu />
 <div className="container">
   <div className="dashboard-panel custom-table">

        <div className='row'>
        
             <div className='col-lg-12'>
                 <div className='form-group'>
                     <label>Coupon Name</label>
                     <input type="text" className="form-control" placeholder="Coupon Name"
                     value={cname}
                     onChange={(e)=>setcname(e.target.value)}
                     readOnly/>
                 </div>
             </div>
            
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Valid From</label>
                     <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" readOnly/>
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Valid To</label>
                     <DatePicker minDate={startDate} selected={toDate} onChange={(date) => settoDate(date)} className="form-control" readOnly/>
                 </div>
             </div>
            
             <div className='col-lg-12'>
                 <div className='form-group'>
                     <label>Type of Discount</label>
                     <br></br>
                     <input type="radio" name="type" value="percentage" checked={dtype === "percentage"} onChange={(e)=>setdtype(e.target.value)} disabled/> Percentage &nbsp; &nbsp; &nbsp;
                     <input type="radio" name="type" value="flat" checked={dtype === "flat"} onChange={(e)=>setdtype(e.target.value)} disabled/> Flat
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Amount</label>
                     <input type="text" className="form-control" placeholder="Amount"
                         value={amount}
                         onChange={(e)=>setamount(e.target.value)}
                     onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                         }
                       }}
                       readOnly  />
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Valid Users</label>
                     <input type="text" className="form-control" placeholder="Valid Users"
                     value={user}
                     onChange={(e)=>setuser(e.target.value)}
                     onKeyPress={(event) => {
                     if (!/[0-9]/.test(event.key)) {
                       event.preventDefault();
                     }
                   }}
                   readOnly  />
                 </div>
             </div>
             {/* <div className='col-lg-12'>
                 <div className='form-group'>
                     <label>Applicable for</label>
                     <br></br>
                     <input type="radio" name="applicable" value="match" onChange={(e)=>setapplicablefor(e.target.value)} checked={applicablefor === "match"} disabled/> A Specific Match &nbsp; &nbsp; &nbsp;
                     <input type="radio" name="applicable" value="tournament" onChange={(e)=>setapplicablefor(e.target.value)} checked={applicablefor === "tournament"} disabled/> A Specific Tournament
                 </div>
             </div>
             {applicablefor === 'match' ?
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Select Match</label>
                     <select className="form-control"
                       value={match}
                       onChange={(e)=>setmatch(e.target.value)}
                     disabled>
                         
                         <option>--Select--</option>
                         {matchList&&matchList.map((list,i)=>{
                         return <option key={i} value={list.id}>{list?.match_name}</option>
                     })}
                     </select>
                 </div>
             </div>
             :
             <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Select Tournament</label>
                 <select className="form-control"
                  value={tournament}
                  onChange={(e)=>settournament(e.target.value)}
                 disabled>
                     <option>--Select--</option>
                     {tournamentList&&tournamentList.map((list,i)=>{
                         return <option key={i} value={list.id}>{list?.tournament_name}</option>
                     })}
                     
                 </select>
             </div>
         </div>        
         } */}
              
        </div>
 
   </div>
   </div>
     
 </div>
  )
}

export default ViewCoupon