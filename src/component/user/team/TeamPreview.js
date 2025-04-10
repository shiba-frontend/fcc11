import React from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BaseUrl } from '../../../utils/ApiConnection';

const TeamPreview = () => {

    const fetchReducer = useSelector((state) => state.fccDataflowreducer)

    console.log(fetchReducer?.Teampreview)


  return (

    <>
    <LoginHeaderTwo  heading="Team Preview"  />
    <div className='back-page'>
        <div className='container'>
            <div className='team-preview-info'>
               <h5>Team</h5> 
               <ul>
                <li>
                    <span>{fetchReducer?.Teampreview?.teams[0]?.team_name}</span>
                </li>
                <li>
                <span>{fetchReducer?.Teampreview?.teams[1]?.team_name}</span>
                </li>
               
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
                    {fetchReducer?.Teampreview?.wicket?.map((player, index)=>{
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
                    {fetchReducer?.Teampreview?.bat?.map((player, index)=>{
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
                    {fetchReducer?.Teampreview?.ar?.map((player, index)=>{
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
                    {fetchReducer?.Teampreview?.bowl?.map((player, index)=>{
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
                {/* <ul className='team-preview-list'>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_sreyas}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_sreyas}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_sreyas}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_sreyas}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_sreyas}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                    <li>
                        <div className='preview-player-list'>
                            <div className='preview-player-list-img'>
                                <img src={IMAGE.player_virat}/>
                            </div>
                            <label>Ishan</label>
                            <span>7.2Cr</span>
                        </div>
                    </li>
                </ul> */}
             
            </div>
        </div>
    </div>
    </>
  )
}

export default TeamPreview