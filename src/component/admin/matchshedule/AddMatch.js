import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';

const AddMatch = () => {

    const [loading, setloading] = useState(false)
    const [TournamentList, setTournamentList] = useState([])
    const [TeamList, setTeamList] = useState([])
    const [tournament, settournament] = useState({})
    const [teamone, setteamone] = useState("")
    const [teamtwo, setteamtwo] = useState("")
    const [mdate, setmdate] = useState(new Date())
    const [mtime, setmtime] = useState(new Date())
    
    console.log(TeamList)
    

    let navigate = useNavigate()

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

    // const GetTeamList = async ()=>{
    //     setloading(true)
    //     try {
    //         const  response = await ApiConnection.get('teams/list')
    //         if(response?.status == 200){
    //             setTeamList(response?.data?.data?.list)
    //             setloading(false)
    //         } else{
    //             setloading(false)
    //         }  
    //     } catch(err){
    //         setloading(false)
    //     }
    // }

    useEffect(()=>{
        GetTournamentList()
        // GetTeamList()
    },[])

const TournamentHandle = (value) =>{
    settournament(value) 
  var newData =  TournamentList?.[TournamentList.findIndex(item => item?.id == value)]?.teams;

    setTeamList(newData)
}
   

    const AddHandler = async () => {

        if(tournament == ''){
            toast.error("Tournament name is required")
        }else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('tournament_id', tournament);
                data.append('team1_id', teamone);
                data.append('team2_id', teamtwo);
                data.append('match_date', mdate);
                data.append('match_start_time', moment(mtime).format('LT'));
                data.append('is_active', '1');
                const response = await ApiConnection.post("match", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/match-schedule")
                } else {
                    setloading(false)
                }

            } catch(err){
                setloading(false)
                if(err.response.status === 422){
                      toast.error(err.response?.data?.message);   
                  
                }
        }
            

        }


    }

    console.log(mdate)

  return (
    <div>
         {loading && <Loader/>}
    <DashboardHeader title="Add a match" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
           <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Select Tournament</label>
                        <select className="form-control"
                            value={tournament}
                            onChange={(e)=>TournamentHandle(e.target.value)}
                            >
                                <option>--Select--</option>
                                {TournamentList&&TournamentList.map((result,i)=>{
                                    return (
                                        <option key={i} value={result.id}>{result?.tournament_name}</option>
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
                            >
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
                            >
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
                        <input type='date' className='form-control' value={mdate} onChange={(e)=>setmdate(e.target.value)} />
                        {/* <DatePicker minDate={new Date()} selected={mdate} onChange={(date) => setmdate(date)} className="form-control" /> */}

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
                        className="form-control" />

                    </div>
                </div>
               
                
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg'  onClick={AddHandler}>Add</button>
                    </div>
                </div>
           </div>
    
      </div>
      </div>
        
    </div>
  )
}

export default AddMatch