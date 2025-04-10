import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';

const ViewMatch = () => {
    const [loading, setloading] = useState(false)
    const [TournamentList, setTournamentList] = useState([])
    const [TeamList, setTeamList] = useState([])
    const [tournament, settournament] = useState("")
    const [teamone, setteamone] = useState("")
    const [teamtwo, setteamtwo] = useState("")
    const [mdate, setmdate] = useState(new Date())
    const [mtime, setmtime] = useState(new Date())
    
    
    console.log(mtime)
    

    let navigate = useNavigate()
    let {id} = useParams()

    const GetTournamentList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('tournament/get-tournament-list')
            if(response?.status == 200){
                console.log(response.data)
                setTournamentList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetTeamList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('teams/list')
            if(response?.status == 200){
                setTeamList(response?.data?.data?.list)
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
            const response = await ApiConnection.get(`match/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                settournament(editdata?.tournament?.id)
                setteamone(editdata?.team_1?.id)
                setteamtwo(editdata?.team_2?.id)
                setmdate(new Date(editdata?.match_date))
                setmtime(new Date('2024-01-30' + ' ' + editdata?.match_start_time))
                
            }
          


        } catch(e){
            setloading(false)  
        }
    }

    useEffect(()=>{
        GetTournamentList()
        GetTeamList()
        fetchdata()
    },[])


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View a match" />
<AdminMenu />
<div className="container">
 <div className="dashboard-panel custom-table">

      <div className='row'>
      <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Select Tournament</label>
                   <select className="form-control"
                       value={tournament}
                       onChange={(e)=>settournament(e.target.value)}
                      disabled >
                           <option>--Select--</option>
                           {TournamentList&&TournamentList.map((result,i)=>{
                               return (
                                   <option key={i} value={result?.id}>{result?.tournament_name}</option>
                               )
                           })}
                           
                       </select>
               </div>
           </div>
           
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Team 1</label>
                   <select className="form-control"
                       value={teamone}
                       onChange={(e)=>setteamone(e.target.value)}
                       disabled>
                           <option>--Select--</option>
                           {TeamList&&TeamList.map((result,i)=>{
                               return (
                                   <option key={i} value={result?.id}>{result?.team_name}</option>
                               )
                           })}
                           
                       </select>
               </div>
           </div>
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Team 2</label>
                   <select className="form-control"
                       value={teamtwo}
                       onChange={(e)=>setteamtwo(e.target.value)}
                       disabled >
                           <option>--Select--</option>
                           {TeamList&&TeamList.map((result,i)=>{
                               return (
                                   <option key={i} value={result?.id}>{result?.team_name}</option>
                               )
                           })}
                           
                       </select>
               </div>
           </div>
          
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Select Match Date</label>
                   <DatePicker minDate={new Date()} selected={mdate} onChange={(date) => setmdate(date)} className="form-control" readOnly/>

               </div>
           </div>
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Select Match Time</label>
                   <DatePicker 
                   minDate={new Date()}
                   selected={mtime} 
                   onChange={(date) => setmtime(date)}
                   showTimeSelect
                   showTimeSelectOnly
                   timeIntervals={5}
                   timeCaption="Time"
                   dateFormat="h:mm aa"
                   className="form-control"
                   readOnly
                   />

               </div>
           </div>
         
      </div>

 </div>
 </div>
   
</div>
  )
}

export default ViewMatch