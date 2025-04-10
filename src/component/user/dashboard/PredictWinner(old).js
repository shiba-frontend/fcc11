import React, { useEffect, useRef, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { NavLink, useLocation, useNavigate, useParams  } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { GetTeampreviewAction } from '../../../redux/reducer/fccDataflowreducer';
import moment from 'moment';

const PredictWinner = () => {
    const [loading, setloading] = useState(false)
    const [team, setteam] = useState({})
    const [teamId, setteamId] = useState(null)
    const [tournamentteamId, settournamentteamId] = useState(null)
    const [Tournamentteam, setTournamentteam] = useState([])

    let dispatch = useDispatch()
    const navigate = useNavigate()
    const {id, pros} = useParams()
    const Ref = useRef(null);

    const statevalue = useLocation();

    var {fantacygameId, gameId, uniqueId, gameType, tournamenId} = statevalue?.state



    const GetPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`get-fantasygame-prediction?fantasygame_id=${fantacygameId}`)
          
            if(response?.status  == 200){
                setloading(false)
                setteam(response?.data?.data?.match_details)

                response?.data?.data?.my_prediction !== null &&  setteamId(response?.data?.data?.my_prediction?.team_id)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetTournamentPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`get-tournament-team-prediction-list/${tournamenId}/${fantacygameId}`)
          
            if(response?.status  == 200){

                setTournamentteam(response?.data?.data?.list)
                response?.data?.data?.my_prediction !== null  ? settournamentteamId(response?.data?.data?.my_prediction?.team_id) 
                :
                setteamId(null) 
                setloading(false)
            
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
 

    useEffect(() => {
        // if(gameType == 'match'){
        //     GetPlayers()
        // } else {
        //     GetTournamentPlayers()
        // }
        GetPlayers()
     
    },[])

    const SelectHandle =(id)=>{
        setteamId(id)
    }
    const SelectHandleTournament =(id)=>{
        settournamentteamId(id)
    }
    

    const SavePrediction = async () => {
       
            setloading(true)
            try{
    
                var FormData = require('form-data');
                var data = new FormData();
                data.append("fantasygame_id", fantacygameId);
                data.append("team_id", teamId);
                data.append("action", 'F');
                const response = await ApiConnection.post("save-game-prediction", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/dashboard")
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

    const SavePredictionTournament = async () => {
       
        setloading(true)
        try{

            var FormData = require('form-data');
            var data = new FormData();
            data.append("fantasygame_id", fantacygameId);
            data.append("tournament_id", tournamenId);
            data.append("team_id", tournamentteamId);
            data.append("action", 'T');
            const response = await ApiConnection.post("save-game-prediction", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                navigate("/dashboard")
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

    

  return (
    <>
    {loading && <Loader/>}
  <LoginHeaderTwo  heading="Winner Prediction"  />
  <div className='back-page'>
      <div className='container d-flex justify-content-between'>
          <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
          <h6 className='text-center mb-0'>Match Date: {team?.match_date}</h6>
      </div>
  </div>
  <div className='container'>
    <div className='py-5'>
   
    <h4 className='text-center mb-3'>Predict The Winner</h4>
    {gameType == 'match' ? 
    <>
   
     <ul className='match-winner-list'>
        <li>
        <img src={BaseUrl.baseurl + team?.a_team_image} width="100" />
            <label> {team?.a_team_name}</label>
          
            <button className={teamId == team?.team1_id ? 'active' : null} onClick={()=>SelectHandle(team?.team1_id)}>Select</button>
        </li>
        <li>
        <img src={BaseUrl.baseurl + team?.b_team_image} width="100" />
            <label>{team?.b_team_name}</label>
           
            <button className={teamId == team?.team2_id ? 'active' : null} onClick={()=>SelectHandle(team?.team2_id)}>Select</button>
        </li>
     </ul>
     {teamId !== null &&
     <div className='text-center mt-4'>
        <button className='btnStyle-two' onClick={SavePrediction}>Save Prediction</button>
     </div>
}
</>
:
<>


<ul className='match-winner-list'>


    {Tournamentteam&&Tournamentteam.map((item, index)=>{
        return (
            <li>
        <img src={BaseUrl.baseurl + item?.team_image} width="100" />
            <label> {item?.team_name}</label>
          
            <button className={tournamentteamId == item?.team_id ? 'active' : null} onClick={()=>SelectHandleTournament(item?.team_id)}>Select</button>
        </li>
        )
    })}
    </ul>
    {tournamentteamId !== null &&
     <div className='text-center mt-4'>
        <button className='btnStyle-two' onClick={SavePredictionTournament}>Save Prediction</button>
     </div>
}
    </>
    }
    </div>
    
      
  </div>

  </>
  )
}

export default PredictWinner