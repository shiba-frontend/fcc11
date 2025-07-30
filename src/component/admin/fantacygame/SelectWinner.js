import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';
import { toast } from 'react-toastify';


const SelectWinner = () => {


    const [loading, setloading] = useState(false)
    const [data, setdata] = useState([])


    let navigate = useNavigate();
    let {id} = useParams()

    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`fantasy-game/get-match/${id}`)
            if(response?.status == 200){
                console.log("match", response.data?.data?.list)
                setloading(false)
                setdata(response.data?.data?.list)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(() => {
        GetData()
   
    },[])


    const UpdateHandle = async (teamId, matchId) =>{
         setloading(true)

        let obj = {
            team_unique_id:teamId
        }

        try {
            const  response = await ApiConnection.post(`fantasy-game/update-match-winner-team/${matchId}`, obj)
            if(response?.status == 200){
                setloading(false)
                
                if(response?.data?.success){
                     toast.success(response?.data?.message);
                } else {
                     toast.info(response?.data?.message);
                }
              
                GetData()
                
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }



  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="Select the Winner" />
<AdminMenu />
<div className="container">
<div className='back-page mt-3'>
            <div className='container'>
            <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
            </div>
        </div>
 <div className="dashboard-panel custom-table">

 <div className='leaderboard-top p-0 mb-4'>
               
                <div className='row align-items-center'>
                    {
                       data?.map((item, i)=>{
                            return (
                             
                                <div className='col-lg-6' key={i}>
                                    <div className='team-vs flex-wrap py-5 px-3'>
                                        
                                        <div className='leaderboard-team'>
                                            {Number(item?.a_team_unique_id) == item?.winner_team_id &&
                                            <span className='winerTeam'>Winner</span>
                       }
                                            <div className='leaderboard-team-img'>
                                                <img src={BaseUrl.baseurl + item?.a_team_image} alt="country"/>
                                            </div>
                                            <h4>{item?.a_team_name}</h4>
                                         
                                        </div>
                                        VS

                                        <div className='leaderboard-team'>
                                              {Number(item?.b_team_unique_id) == item?.winner_team_id &&
                                            <span className='winerTeam'>Winner</span>
                       }
                                            <div className='leaderboard-team-img'>
                                                <img src={BaseUrl.baseurl + item?.b_team_image} alt="country"/>
                                            </div>
                                            <h4>{item?.b_team_name}</h4>
                                             
                                        </div>
                                        {item?.match_status == 2 &&
                                        <div className='d-flex justify-content-between w-100 mt-3 mb-3'>
                                               <button disabled={Number(item?.a_team_unique_id) == item?.winner_team_id ? true : false } className={Number(item?.a_team_unique_id) == item?.winner_team_id ? 'btn btn-primary' : 'btn btn-outline-primary' } onClick={()=>UpdateHandle(item?.a_team_unique_id, item?.match_id)} >Select Winner</button>
                                                <button disabled={Number(item?.b_team_unique_id) == item?.winner_team_id ? true : false } className={Number(item?.b_team_unique_id) == item?.winner_team_id ? 'btn btn-primary' : 'btn btn-outline-primary' } onClick={()=>UpdateHandle(item?.b_team_unique_id, item?.match_id)}>Select Winner</button>
                                        </div>
                       }
                       <span className='match-date'>{moment(item?.match_date).format('MM-DD-YYYY, hh:mm A')}</span>
                       <span className={item?.match_status == 2 ? 'matchStatus Completed' : item?.match_status == 1 ? 'matchStatus Live' : 'matchStatus Pending'}>{item?.match_status == 2 ? 'Completed' : item?.match_status == 1 ? 'Live' : 'Pending'}</span>
                                     </div>
                            </div>
                        
                   
                            )
                        })
                    }
                 
                     
                    </div>
                </div>
              
                
 </div>
 </div>
   
</div>
  )
}

export default SelectWinner