import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ViewStanding = () => {


    const [loading, setloading] = useState(false)
    const [data, setdata] = useState("")
    const [leaderboard, setfantasyleaderboard] = useState([])
    const [predictionleaderboard, setpredictionleaderboard] = useState([])
    const [type, settype] = useState(true)
    const [joined, setjoined] = useState("")

    let navigate = useNavigate();
    let {id} = useParams()

    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`fantasy-game/${id}`)
            if(response?.status == 200){
                console.log(response.data)
                setloading(false)
                setdata(response?.data)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetLeaderboard = async ()=>{
 
        try {
            const  response = await ApiConnection.get(`member-fantasygame/get-leaderboard?fantasygame_id=${id}`)
            if(response?.status == 200){
                setjoined(response?.data?.data?.total_teams_joined)
                if(response?.data?.data?.game_type == 'select_winner'){
                    settype(false)
                    setpredictionleaderboard(response?.data?.data?.list)
                } else {
                    settype(true)
                    setfantasyleaderboard(response?.data?.data?.list)
                }
              
    
            } else{
            
            }  
        } catch(err){
            
        }
    }
    useEffect(() => {
        GetData()
        GetLeaderboard()
    },[])



  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View Fantasy Game" />
<AdminMenu />
<div className="container">
<div className='back-page mt-3'>
            <div className='container'>
            <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
            </div>
        </div>
 <div className="dashboard-panel custom-table">

 <div className='leaderboard-top p-0 mb-4'>
                <span>{data?.data?.applicable_for}</span>
                <div className='row align-items-center'>
                    {
                       data?.matchs?.map((item, i)=>{
                            return (
                             
                                <div className='col-lg-6' key={i}>
                                    <div className='team-vs'>
                                        <div className='leaderboard-team'>
                                            <div className='leaderboard-team-img'>
                                                <img src={BaseUrl.baseurl + item?.a_team_image} alt="country"/>
                                            </div>
                                            <h4>{item?.a_team_name}</h4>
                                        </div>
                                        VS

                                        <div className='leaderboard-team'>
                                            <div className='leaderboard-team-img'>
                                                <img src={BaseUrl.baseurl + item?.b_team_image} alt="country"/>
                                            </div>
                                            <h4>{item?.b_team_name}</h4>
                                        </div>
                                </div>
                            </div>
                        
                   
                            )
                        })
                    }
                 
                     
                    </div>
                </div>
              
                    <div className="card-listed leaderboard-v">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <div className="card-listed-lft">
                                   
                                    <p>Total Winning: <b>Credit {data?.data?.total_prize_pool}</b></p>
                                
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card-listed-select">
                                    <select className='form-control' disabled>
                                        <option>Total Winners: {data?.data?.total_winners}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card-listed-rht">
                                    <h5>Credit {data?.data?.credit_required}</h5>
                                
                                    {/* <button className="btnStyle-two">Join Now</button> */}
                                    <h3>Team Joined: {joined}</h3>
                                </div>
                            </div>
                        </div>
          
                </div>
                <div className="leader-tab">
                    {/* <h5><span><i className="fas fa-user"></i></span> You can join this contest with {data?.data?.max_team_per_user} Teams</h5>
                    <h5><span><i className="fas fa-dollar-sign"></i></span> You can Use Bonus Cash to avail discount on this contest with {data?.data?.max_team_per_user} Teams</h5>
                    
                    <div className='leader-tab-share'>
                        <input type="text" readOnly value="Earn $10 referral bonus/friends!" />
                        <button><i class="fas fa-share-alt"></i> Share</button>
                    </div> */}
                    <Tabs
                defaultActiveKey="Leaderboard"
                id="fill-tab-example"
                
                >
                {/* <Tab eventKey="Break-Up" title="Prize Break-Up">
                    <table>
                        <th>Rank</th>
                        <th>Prize Amount</th> 
                        <tbody>
                            {data?.data?.game_prize&&data?.data?.game_prize.map((item, i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{item?.rank}</td>
                                        <td>$ {item?.prize_amount}</td>
                                    </tr>
                                )
                            })}
                           
                        </tbody>
                    </table>
                </Tab> */}
                <Tab eventKey="Leaderboard" title="Leaderboard">
                    {type ? 
                <table>
                        <th>Rank</th>
                        <th>Team Id</th>
                        <th>Member</th>
                        <th>Image</th> 
                        <th>Score</th>
                        <tbody>
                            {leaderboard&&leaderboard.map((item, i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{item?.rank}</td>
                                        <td>{item?.team_unique_id}</td>
                                        <td>{item?.first_name} {item?.last_name}</td>
                                        <td><img src={BaseUrl.baseurl + item.image} width="100" /></td>
                                        <td>{item?.point}</td>
                                    </tr>
                                )
                            })}
                           
                        </tbody>
                    </table>

                    :
                    <table>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Total winning match</th>
                        <th>Winning amount</th> 
                        <tbody>
                            {predictionleaderboard&&predictionleaderboard.map((item, i)=>{
                                return (
                                    <tr key={i}>
                                       <td>{item?.first_name} {item?.last_name}</td>
                                        <td>{item?.email}</td>
                                        
                                        <td>{item?.total_winning_matchs}</td>
                                        <td>{item?.winning_amount}</td>
                                    </tr>
                                )
                            })}
                           
                        </tbody>
                    </table>
                        }
                </Tab>
            
            </Tabs>
            {/* <p className='mt-3'><b>Note:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium quam quis faucibus facilisis. Donec dictum ex non dapibus tempus. Sed arcu ante, accumsan quis faucibus vitae, ornare id tellus. Sed posuere leo justo, egeteleifend elit pretium nec. </p> */}
                </div>
 </div>
 </div>
   
</div>
  )
}

export default ViewStanding