import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


const AdminPlayerCredit = () => {

    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [team, setteam] = useState('');
    const [pageloading, setpageloading] = useState(false)
    const [TeamList, setTeamList] = useState([])
    const [TournamentList, setTournamentList] = useState([])
    const [tournament, settournament] = useState('');


    let navigate = useNavigate()

    let {id} = useParams()

   
    const GetTournament = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`tournament/get-tournament-list`)
            if(response?.status == 200){
                console.log(response?.data?.data)
                setTournamentList(response?.data?.data?.list)
                settournament(response?.data?.data?.list[0]?.id)
                GetTeam(response?.data?.data?.list[0]?.id)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetTeam = async (value)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`tournament/${value}`)
            if(response?.status == 200){
                setTeamList(response?.data?.teams)

                setteam(response?.data?.teams[0]?.id)
                GetPlayer(response?.data?.teams[0]?.id, value)

                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetPlayer = async (fid, value)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`admin-player-credit?team_id=${fid}&tournament_id=${value}`)
            if(response?.status == 200){
                console.log(response.data)
                setFilterResult(response?.data?.data?.data)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const TeamHandle =(value)=>{
        setteam(value)
        GetPlayer(value, tournament)
    }

    const TournamentHandle =(value)=>{
        settournament(value)
        GetTeam(value)
    }

    

    useEffect(()=>{
        GetTournament()
       // GetTeam()
    },[])


    const InputHandle = (value, key, index)=>{

        var raw = [...FilterResult]

        raw[index][key] = value

        setFilterResult(raw) 

    }


    const UpdateHandle = async () => {

 
        setpageloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();

            data.append('team_id', team);
            data.append('tournament_id', tournament);
            FilterResult.map((item)=>{
                return  data.append("player_id[]", item.id);
            })
            FilterResult.map((item)=>{
                return  data.append("credit[]", item.credit_score);
            })
            data.append('_method', 'PUT');
           
            const response = await ApiConnection.post(`admin-player-credit/update-player-credit`, data);
            
            if(response.status === 200){
                setpageloading(false)
                console.log(response?.data)
             
                toast.success(response?.data?.message);
                GetTournament()
            } else {
                setpageloading(false)
            }

        } catch(err){
            setpageloading(false)
            if(err.response.status === 422){
                  toast.error(err.response?.data?.message);   
              
            }
    }
        

}


  return (
    <div>
    {pageloading && <Loader/>}
<DashboardHeader title="Admin player credit score" />
<AdminMenu />
<div className="container">
  <div className="dashboard-panel">
    <div className='row'>
        <div className='col-lg-6'>
            <div className='form-group mb-5'>
                <label>Select Tournament</label>
                <select className="form-control"
                value={tournament}
                onChange={(e)=>TournamentHandle(e.target.value)}
                >
                    {TournamentList&&TournamentList.map((result,i)=>{
                        return (
                            <option key={i} value={result?.id}>{result?.tournament_name}</option>
                        )
                    })}
                
                </select>
            </div>
        </div>
        <div className='col-lg-6'>
            <div className='form-group mb-5'>
                <label>Select Team</label>
                <select className="form-control"
                value={team}
                onChange={(e)=>TeamHandle(e.target.value)}
                >
                    {TeamList&&TeamList.map((result,i)=>{
                        return (
                            <option key={i} value={result?.id}>{result?.team_name}</option>
                        )
                    })}
                
                </select>
            </div>
        </div>
    </div>
  
 

<div className='custom-table table-responsive'>
{!loading ? 

<table className='table'>
<thead>
        <th>Image</th>
        <th>Player Name</th>
        <th>Team Name</th>
        <th>Dicipline</th>
        {/* <th>Nationality</th> */}
        <th>Score</th>
        </thead>
    <tbody>
        {FilterResult&&FilterResult.length > 0 ? 
       FilterResult&&FilterResult.map((list, index)=>{
        return (
            <tr key={index}>
                <td><img src={BaseUrl.baseurl + list?.player_image}  width="60" /></td>
            <td>{list?.player_name}</td>
            <td>{list?.team_name}</td>
            <td>{list?.discipline}</td>
            {/* <td>{list?.nationality}</td> */}
            <td>
               <input type="text" value={list?.admin_credit !== null ? list?.admin_credit :  list?.credit_score} onChange={(e)=>InputHandle(e.target.value, 'credit_score', index)} className='form-control w-50' />
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
<div className='form-group text-center'>
        <button className='btn btn-success btn-lg' onClick={UpdateHandle}>Update</button>
   </div>
  </div>
  </div>


</div>
  )
}

export default AdminPlayerCredit