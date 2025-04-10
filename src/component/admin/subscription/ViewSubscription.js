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

const ViewSubscription = () => {

    const [loading, setloading] = useState(false)
    const [creditList, setcreditList] = useState([])
    const [matchValidList, setmatchValidList] = useState([])
    const [tournamentValidList, settournamentValidList] = useState([])
    const [planTypeList, setplanTypeList] = useState([])
    const [creditId, setcreditId] = useState("")
    const [matchId, setmatchId] = useState("")
    const [tournamentId, settournamentId] = useState("")
    const [planId, setplanId] = useState("")
    const [pname, setpname] = useState("")
    const [price, setprice] = useState("")
    const [duration, setduration] = useState("")
    const [addcredit, setaddcredit] = useState("")
    const [caseprize, setcaseprize] = useState("")
    const [leaderboard, setleaderboard] = useState("")
    const [benefits, setbenefits] = useState("")
    const [additionalcrdit, setadditionalcrdit] = useState("")
    
    let navigate = useNavigate()
    let {id} = useParams()

    const GetCredit = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-subscription-credit')
            if(response?.status == 200){
                setcreditList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetMatchValid = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-subscription-match-valid')
            if(response?.status == 200){
                setmatchValidList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetTournamentValid = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-subscription-tournament-valid')
            if(response?.status == 200){
                settournamentValidList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetPlanTypeValid = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-subscription-plan-type')
            if(response?.status == 200){
                setplanTypeList(response?.data?.data?.list)
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
            const response = await ApiConnection.get(`subscription/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setpname(editdata?.plan_name)
                setprice(editdata?.plan_price)
                setduration(editdata?.plan_duration)
                setplanId(editdata?.plan_type?.id)
                setcreditId(editdata?.credit?.id)
                setaddcredit(editdata?.additional_credit_price)
                settournamentId(editdata?.tournament_valid?.id)
                setmatchId(editdata?.match_valid?.id)
                setcaseprize(editdata?.cash_prize)
                setleaderboard(editdata?.leaderboard)
                setbenefits(editdata?.other_benefits)
                setadditionalcrdit(editdata?.additional_credit)
            }
        


        } catch(e){
            setloading(false)  
        }
    }

    useEffect(()=>{
        fetchdata()
        GetCredit()
        GetMatchValid()
        GetTournamentValid()
        GetPlanTypeValid()
      
    },[])






  return (
    <div>
    {loading && <Loader/>}
 <DashboardHeader title="View Subscription" />
 <AdminMenu />
 <div className="container">
   <div className="dashboard-panel custom-table">

        <div className='row'>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Plan Name</label>
                     <input type="text" className="form-control" placeholder="Plan Name"
                        value={pname}
                        onChange={(e)=>setpname(e.target.value)}
                    readOnly />
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Plan Price</label>
                     <input type="text" className="form-control" placeholder="Plan Price"
                        value={price}
                        onChange={(e)=>setprice(e.target.value)}
                      onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                         }
                       }}
                    readOnly />
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Duration (Days)</label>
                     <input type="text" className="form-control" placeholder="Duration (Days)"
                        value={duration}
                        onChange={(e)=>setduration(e.target.value)}
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
                     <label>Plan Type</label>
                     <select className="form-control"
                     value={planId}
                     onChange={(e)=>setplanId(e.target.value)}
                    disabled >
                         <option>--Select--</option>
                         {planTypeList&&planTypeList.map((list, i) =>{
                             return <option key={i} value={list.id}>{list?.plan_type}</option>
                         })}
                     </select>
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Credits Given</label>
                     <select className="form-control"
                     value={creditId}
                     onChange={(e)=>setcreditId(e.target.value)}
                     disabled>
                         <option>--Select--</option>
                         {creditList&&creditList.map((list, i) =>{
                             return <option key={i} value={list.id}>{list?.credit}</option>
                         })}
                     </select>
                 </div>
             </div>
             <div className='col-lg-6'>
                        <div className='form-group'>
                            <label>Additional Credit</label>
                            <select className="form-control"
                               value={additionalcrdit}
                               onChange={(e)=>setadditionalcrdit(e.target.value)}
                            disabled>
                            <option value="">--Select--</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Price For Additional Credits</label>
                     <input type="text" className="form-control" placeholder="Additional Credits"
                        value={addcredit}
                        onChange={(e)=>setaddcredit(e.target.value)}
                     onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                         }
                       }}
                    readOnly />
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Tournaments Valid</label>
                     <select className="form-control"
                     value={tournamentId}
                     onChange={(e)=>settournamentId(e.target.value)}
                     disabled>
                         <option>--Select--</option>
                         {tournamentValidList&&tournamentValidList.map((list, i) =>{
                             return <option key={i} value={list.id}>{list?.valid}</option>
                         })}
                     </select>
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Matches Valid</label>
                     <select className="form-control"
                     value={matchId}
                     onChange={(e)=>setmatchId(e.target.value)}
                     disabled>
                         <option>--Select--</option>
                         {matchValidList&&matchValidList.map((list, i) =>{
                             return <option key={i} value={list.id}>{list?.valid}</option>
                         })}
                     </select>
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Cash Prize</label>
                     <select className="form-control"
                        value={caseprize}
                        onChange={(e)=>setcaseprize(e.target.value)}
                     disabled>
                     <option value="">--Select--</option>
                         <option value="yes">Yes</option>
                         <option value="no">No</option>
                     </select>
                 </div>
             </div>
             <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Leaderboard</label>
                     <select className="form-control"
                        value={leaderboard}
                        onChange={(e)=>setleaderboard(e.target.value)}
                     disabled>
                     <option value="">--Select--</option>
                         <option value="yes">Yes</option>
                         <option value="no">No</option>
                     </select>
                 </div>
             </div>
             
             <div className='col-lg-12'>
                 <div className='form-group'>
                     <label>Other Benefits</label>
                     <textarea className="form-control" placeholder='Message'
                        value={benefits}
                        onChange={(e)=>setbenefits(e.target.value)}
                     readOnly></textarea>
                 </div>
             </div>
            
        </div>
 
   </div>
   </div>
     
 </div>
  )
}

export default ViewSubscription