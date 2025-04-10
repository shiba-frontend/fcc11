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

const MyPredictWinner = () => {

    const statevalue = useLocation();

    var {fantacygameId} = statevalue?.state

    const [loading, setloading] = useState(false)
    const [Tournamentteam, setTournamentteam] = useState([])

    const navigate = useNavigate()


    const GetTournamentPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`get-fantasygame-prediction?fantasygame_id=${fantacygameId}`)
          
            if(response?.status  == 200){

              
                var TempArr = []
                response?.data?.data?.list?.forEach(element => {
                    TempArr.push({
                        match_id:element?.match_details?.match_id,
                        match_date:element?.match_details?.match_date,
                        teams:[
                            {
                                team_id:  element?.match_details?.team1_id,
                                team_image:element?.match_details?.a_team_image,
                                team_name: element?.match_details?.a_team_name,
                               // isselect: response?.data?.data?.my_predict_teams.some(id => id === element?.match_details?.team1_id)
                            },
                            {
                                team_id:  element?.match_details?.team2_id,
                                team_image:element?.match_details?.b_team_image,
                                team_name: element?.match_details?.b_team_name,
                                //isselect: response?.data?.data?.my_predict_teams.some(id => id === element?.match_details?.team2_id)
                            },
                        ],
                        isselect:element?.my_prediction
                    })
                });
                setTournamentteam(TempArr)
         
                setloading(false)
            
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
 

    useEffect(() => {
 
        GetTournamentPlayers()
    },[])

    const SelectHandle = (matchId, teams)=>{

        var arr = [...Tournamentteam]
    
        const updatedMatches = arr.map((match) =>
            match?.match_id === matchId ? { ...match, isselect: teams } : match
          );
        
          setTournamentteam(updatedMatches)
       
    
    }

    const SavePredictionTournament = async () => {
       
        setloading(true)
        try{

            
            let data = []

            Tournamentteam.forEach(elaem =>{
                if(elaem.isselect != null){
                    data.push({
                        'match_id':elaem.match_id,
                        'team_id':elaem.isselect.team_id
                    }) 
                }
            })

            const response = await ApiConnection.post(`save-game-prediction/${fantacygameId}`, data);
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
  <LoginHeaderTwo  heading="My Prediction"  />
  <div className='back-page'>
      <div className='container d-flex justify-content-between'>
          <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
          {/* <h6 className='text-center mb-0'>Match Date: {team?.match_date}</h6> */}
      </div>
  </div>
  <div className='container'>
    <div className='py-5'>
   
    <h4 className='text-center mb-3'>Predict The Winner</h4>
 
    <ul className='match-winner-list'>


{Tournamentteam&&Tournamentteam.map((item, index)=>{
    return (
        <li key={index}>
            <h5>{moment(item?.match_date).format('LLL')}</h5>
            <div className='image-vs'>
                {item?.teams?.map((obj, i)=>{
                    return (
                        <div className='image-vs-in'>
                            <img src={BaseUrl.baseurl + obj?.team_image} width="100" />
                            <label> {obj?.team_name}</label>
                            <button className={item?.isselect?.team_id === obj?.team_id && 'active' } onClick={()=>SelectHandle(item?.match_id, obj)}>Select</button>
                        </div>
                    )
                })}
                <span>VS</span>
               
            </div>
       
      
        {/* <button className={tournamentteamId == item?.match_id ? 'active' : null} onClick={()=>SelectHandleTournament(item?.team_id)}>Select</button> */}
    </li>
    )
})}
</ul>




    </div>
    
    <div className='text-center mt-4'>
    <button className='btnStyle-two' onClick={SavePredictionTournament}>Save Prediction</button>
 </div>
  </div>

  </>
  )
}

export default MyPredictWinner