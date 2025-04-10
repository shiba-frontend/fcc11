import React, { useEffect, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import LoginHeader from '../common/LoginHeader';
import DashboardMenu from '../common/DashboardMenu';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

const TeamList = () => {
  

    const [loading, setloading] = useState(false)
    const [rowsData, setrowsData] = useState([]) 
    const [deletemodal, setdeletemodal] = useState(false);
    const [rowId, setrowId] = useState('');
    const navigate = useNavigate()
    const fetchReducer = useSelector((state) => state.fccDataflowreducer)

    const {id, props} = useParams()

    console.log(fetchReducer)

    const GetTeam = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`member-fantasygame/joined-team?user_id=${fetchReducer?.user?.user.id}&fantasygame_id=${id}`)
            if(response?.status == 200){
                setloading(false)
                console.log(response.data?.data?.list)
                var TempArray = []

                response.data?.data?.list&&response.data?.data?.list.map((team)=>{

                    let obj = {
                        captain:'',
                        vcaptain:''
                    }
                
                    team?.has_team
                    .forEach(element => {
                        if(element.captain_vicecaptain == 'C'){
                            obj.captain = element
                        } else if(element.captain_vicecaptain == 'VC'){
                            obj.vcaptain = element
                        }
                    });
                    TempArray.push({
                        obj,
                        'team_unique_id':team.team_unique_id,
                        'PlayerList': team.players,
                        "team_details": team.team_details,
                        'has_team': team.has_team
                    })
                })

                setrowsData(TempArray)
               
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }


    useEffect(() => {
        GetTeam()
    },[])

    const deleteModal = (rid) =>{
        setdeletemodal(true)
        setrowId(rid)
    }
    const DeleteHandler = async () =>{
        setloading(true)
        setdeletemodal(false)
        try {

            const  response = await ApiConnection.delete(`member-fantasygame/${rowId}`)
            if(response?.status == 200){
                GetTeam()
                setloading(false)
                setdeletemodal(false)
                toast.success(response?.data?.message)
            } else{
                setloading(false)
                setdeletemodal(false)
                toast.error(response?.data?.message)
            }  
        } catch(err){
            setloading(false)
            setdeletemodal(false)
            toast.error(err.response?.data?.message)
        }
    }


    const CopyHandle = async (ids) => {
        setloading(true)
        try{

            var FormData = require('form-data');
            var data = new FormData();
            data.append("team_unique_id", ids);
            data.append("fantasygame_id", id);
            const response = await ApiConnection.post(`member-fantasygame/copy`, data);
            if(response.status === 200){
                setloading(false)
                if(response?.success){
                 
                    toast.success(response?.data?.message);
                    GetTeam()
                } else {
                    toast.info(response?.data?.message);
                }
            } else {
                setloading(false)
            }



        } catch(err){
            setloading(false)
            if(err?.response?.status === 422){
                  toast.error(err.response?.data?.message);   
              
            }
    }

    }
const CreateTeamHandle = (team_unique_id)=>{
    navigate("/create-team", { state: { fantacygameId: id, gameId: props, uniqueId:team_unique_id,from:'new'
  
    } })
}

const EditHandle = (team_unique_id) => {
    navigate("/create-team", { state: { fantacygameId: id, gameId: props, uniqueId:team_unique_id, from:'edit'
  
    } })
}








  return (
    <>
    {loading && <Loader/>}
    <LoginHeader title="My team list" />
      <DashboardMenu />
 <div className='container'>
 <div className="dashboard-panel p-5">

 {rowsData&&rowsData.length > 0 ?
    
         rowsData&&rowsData.map((team, index)=>{

            console.log(team)


             return (
                 <div className='my-team-box' key={index} id={team?.team_unique_id}>
                 <div className='my-team-box-top'>
                     <h4>Team {index + 1}</h4>
                     {team?.has_team?.length > 0 &&
                     <ul>
                     <li>
                             <NavLink to={`/team-preview/${team?.team_unique_id}`}><img src={IMAGE.view}/></NavLink>
                         </li>
                         <li>
                         <button onClick={()=>EditHandle(team?.team_unique_id)}><img src={IMAGE.edit}/></button>
                        {/* <NavLink to={`/edit-player/${team?.team_unique_id}`}><img src={IMAGE.edit}/></NavLink> */}
                         </li>
                         <li>
                             <button onClick={()=>CopyHandle(team?.team_unique_id)}><img src={IMAGE.copy}/></button>
                         </li>
                         <li>
                             <button onClick={()=>deleteModal(team?.team_unique_id)}><img src={IMAGE.delete}/></button>
                         </li>
                     </ul>
         }
                 </div>
                 <div className='my-team-box-bottom'>
                     <div className='row align-items-center'>
                         <div className='col-lg-6 col-md-6'>
                            {team?.has_team.length > 0 ?
                             <div className='row'>
                                 <div className='col-lg-4 col-6 col-md-6'>
                                     <div className='my-team-box-img'>
                                         <img src={team.obj == '' ? IMAGE.default :  BaseUrl.baseurl + team.obj?.captain?.player_image} alt="player"/>
                                         <label>{team.obj == '' ? 'N/A' : team.obj?.captain?.player_name}</label>
                                         <span>c</span>
                                     </div>
                                 </div>
                                 <div className='col-lg-4 col-6 col-md-6'>
                                    <div className='my-team-box-img'>
                                    <img src={team.obj == '' ? IMAGE.default :  BaseUrl.baseurl + team.obj?.vcaptain?.player_image} alt="player"/>
                                            <label>{team.obj == '' ? 'N/A' : team.obj?.vcaptain?.player_name}</label>
                                            <span>vc</span>
                                        </div>
                                 </div>
                             </div>
                               :
                             <h5>Please create your team first <button className="btn btn-primary" onClick={()=>CreateTeamHandle(team?.team_unique_id)}>Create Team</button></h5>
                           
                            }
                         </div>
                         <div className='col-lg-6 col-md-6'>
                         <div className='row justify-content-end'>
                            {team?.
team_details?.teams?.team_1_details && 
                                            <div className='col-lg-2'>
                                                <div className='my-tem-s'>
                                                    <h6>{team?.
team_details?.teams?.team_1_details?.team_short_name}</h6>
                                                    <b>{team?.
team_details?.teams?.team_1?.length}</b>
                                                </div>
                                            </div>
         }
         {team?.
team_details?.teams?.team_2_details &&
                                            <div className='col-lg-2'>
                                            <div className='my-tem-s'>
                                            <h6>{team?.
team_details?.teams?.team_2_details?.team_short_name}</h6>
                                                    <b>{team?.
team_details?.teams?.team_2?.length}</b>
                                                </div>
                                            </div>
         }
                                        </div>
                             
                         </div>
                     </div>
                     {team?.has_team?.length > 0 &&
                     <ul>
                     <li>WK <b>({team?.team_details?.WicketKeeper&&team?.team_details?.WicketKeeper.length})</b></li>
                                        <li>BAT <b>({team?.team_details?.Batsman&&team?.team_details?.Batsman.length})</b></li>
                                        <li>AR <b>({team?.team_details?.AllRounder&&team?.team_details?.AllRounder.length})</b></li>
                                        <li>BOWL <b>({team?.team_details?.Bowler&&team?.team_details?.Bowler.length})</b></li>
                             </ul>
                            
         }
                 </div>  
             </div>
             )
         })

         :
         <h5>No team list</h5>
        }
      
     </div>
</div>
<Modal
 show={deletemodal}
 backdrop="static"
 keyboard={false}
 centered
>

 <Modal.Body className='text-center'>
     Are you sure you want to delete team
     <ul className='d-flex mt-4 justify-content-center'>
         <li>
             <button className='btn btn-success mr-2' onClick={DeleteHandler}>Yes</button>
         </li>
         <li>
             <button className='btn btn-outline-danger ml-2' onClick={()=>setdeletemodal(false)}>Cancel</button>
         </li>
     </ul>
 </Modal.Body>

</Modal>
</>
  )
}

export default TeamList