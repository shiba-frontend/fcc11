import React, { useEffect, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';

const MyTeamPreview = () => {

   

    const [loading, setloading] = useState(false)
    const [rowsData, setrowsData] = useState([]) 

    const navigate = useNavigate()
    let {id} = useParams()

    console.log(rowsData)

    const GetPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`member-fantasygame/${id}`)
            if(response?.status == 200){
                setloading(false)
                console.log(response.data?.data?.list)
                setrowsData(response.data?.data?.list)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(() => {
        GetPlayers()
        window.scrollTo(0,0)
    },[])
 

  return (
    <>
      {loading && <Loader/>}
    <LoginHeaderTwo  heading="Team Preview" />
    <div className='back-page'>
        <div className='container'>
            <div className='team-preview-info'>
               <h5>My Team</h5> 
               <ul>
                {/* <li>
                    <span>IND</span>
                </li>
                <li>
                    <span>SA</span>
                </li> */}
                {/* <li>
                    <NavLink to="/create-team"><i className="fa-solid fa-pen"></i></NavLink>
                </li> */}
               </ul>
            </div>
        </div>
    </div>
    <div className='team-preview'>
        <div className='container'>
            <div className='team-preview-inner'>
                <h3>Wicket Keeper</h3>
                <div className='peach-container'>
                    <h4>Batters</h4>
                    <h4>All-Rounder</h4>
                    <h4>Bowlers</h4>
                </div>
                <ul className='team-preview-list wicketkeeper-slot'>
                    {rowsData?.WicketKeeper?.map((player, index)=>{
                        return (
                            <li>
                                <div className='preview-player-list'>
                                    <div className='preview-player-list-img'>
                                        <img src={BaseUrl.baseurl + player?.player_image}/>
                                    </div>
                                    <label>{player?.player_name.split(' ')[0]}</label>
                                  
                                </div>
                            </li>
                        )
                    })}
                  </ul>
                  <ul className='team-preview-list batting-slot'>
                    {rowsData?.Batsman?.map((player, index)=>{
                        return (
                            <li>
                                <div className='preview-player-list'>
                                    <div className='preview-player-list-img'>
                                        <img src={BaseUrl.baseurl + player?.player_image}/>
                                    </div>
                                    <label>{player?.player_name.split(' ')[0]}</label>
                                   
                                </div>
                            </li>
                        )
                    })}
                    
                  </ul>
                  <ul className='team-preview-list ar-slot'>
                    {rowsData?.AllRounder?.map((player, index)=>{
                        return (
                            <li>
                                <div className='preview-player-list'>
                                    <div className='preview-player-list-img'>
                                        <img src={BaseUrl.baseurl + player?.player_image}/>
                                    </div>
                                    <label>{player?.player_name.split(' ')[0]}</label>
                               
                                </div>
                            </li>
                        )
                    })}
                    
                  </ul>
                  <ul className='team-preview-list bowl-slot'>
                    {rowsData?.Bowler?.map((player, index)=>{
                        return (
                            <li>
                                <div className='preview-player-list'>
                                    <div className='preview-player-list-img'>
                                        <img src={BaseUrl.baseurl + player?.player_image}/>
                                    </div>
                                    <label>{player?.player_name.split(' ')[0]}</label>
                                  
                                </div>
                            </li>
                        )
                    })}
                   
                  </ul>
             
             
            </div>
        </div>
    </div>
    </>
  )
}

export default MyTeamPreview