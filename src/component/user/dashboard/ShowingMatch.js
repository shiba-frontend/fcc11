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

const ShowingMatch = () => {
    const [loading, setloading] = useState(false)
    const [gameinfo, setgameinfo] = useState('')
    const Ref = useRef(null);
    const navigate = useNavigate()
    const statevalue = useLocation();
    var {fantacygameId} = statevalue?.state


    const GetFantacydetails = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`get-fantasy-game/${fantacygameId}`)
            if(response?.status == 200){
                setloading(false)
                setgameinfo(response?.data?.data)
    
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(()=>{
        GetFantacydetails()
    },[])

    const ConfirmJoin = async () => {
        setloading(true)
      
        let obj = {
            fantasygame_id:fantacygameId
        }
        try {
            const  response = await ApiConnection.post(`member-fantasygame/join-game`, obj)
                if(response?.status == 200){
                  setloading(false)
          
                  if(response.data.success){
      
                   
                   
                    navigate("/create-team", { state: { fantacygameId: fantacygameId, gameId: gameinfo?.game?.created_by, uniqueId:response?.data?.data?.team_unique_id
        
                      } })
      
    
      
      
      
                  } else {
                    
                    toast.error(response?.data?.message)
                  }
                 
                }
             else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
      }


  return (
    <>
    {loading && <Loader/>}
  <LoginHeaderTwo  heading={`Fantasy Game - ${gameinfo?.game?.game_name}`}  />
  <div className='back-page'>
      <div className='container d-flex justify-content-between'>
          <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
      </div>
  </div>
  <div className='container'>
    <div className='py-5'>
   
    <h4 className='text-center mb-3'>Match Details</h4>

<ul className='game-info'>
    <li>
        <h5>Fantasy Game Name: <b>{gameinfo?.game?.game_name}</b></h5>
    </li>
    <li>
        <h5>Tournament Name:  <b>{gameinfo?.tournament_name}</b></h5>
    </li>
    <li>
        <h5>Total Winning: <b>$ {gameinfo?.game?.total_prize_pool}</b> | Total Winners:<b>{gameinfo?.game?.total_winners}</b></h5>
    </li>
    <li>
        <h5>Joining Fee: <b>{gameinfo?.game?.credit_required} Credits</b></h5>
    </li>
</ul>


<ul className='fantsy-match-list'>
    {gameinfo?.matchs&&gameinfo?.matchs.map((item, index)=>{
        return (
            <li key={index}>
            <div className='match-list-box'>
                <div className='match-list-box-t'>
                    <div className='match-list-box-tl'>
                        <img src={BaseUrl.baseurl + item?.a_team_image} width="50" />
                        <span>{item?.a_team_name}</span>
                    </div>
                    <div className='match-list-box-tl'>
                    <img src={BaseUrl.baseurl + item?.b_team_image} width="50" />
                        <span>{item?.b_team_name}</span>
                    </div>
                </div>
                <label> {moment(item?.match_date).format('LLL')}</label>
            </div>
        </li>
        )
    })}
   
</ul>
<div className='text-center mt-4'>
        <button className='btnStyle-two' onClick={ConfirmJoin}>Join Now</button>
     </div>
    </div>
    
      
  </div>

  </>
  )
}

export default ShowingMatch