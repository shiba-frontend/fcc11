import React, { useEffect, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import Contest from './Contest';
import ScoreBoard from './ScoreBoard';
import MyContest from './MyContest';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';




const Live = ()=>{
    const [loading, setloading] = useState(false)

    const [contestdata, setcontestdata] = useState([])
    const [livefeed, setlivefeed] = useState([])
    const [Playerstate, setPlayerstate] = useState([])
    const [ContestList, setContestList] = useState([])

    const {pros, id, id1, id2} = useParams()
    const navigate = useNavigate()


    const Getscoreboard = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`member-fantasygame/get-scorecard/${id}`)
            if(response?.status == 200){
                setloading(false)
                setcontestdata(response.data?.data)
               
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetLivefeed = async ()=>{
       
        try {
            const  response = await ApiConnection.get(`get-ballbyball-info?fantasygame_id=${id}`)
            if(response?.status == 200){
                setlivefeed(response.data?.data)
              console.log(response.data?.data)
               
            } else{
               
            }  
        } catch(err){
            
        }
    }

    
    const Getplayerpoint = async ()=>{
       
        try {
            const  response = await ApiConnection.get(`get-player-points?fantasygame_id=${id}`)
            if(response?.status == 200){
               
                setPlayerstate(response?.data?.data?.list)
               
            } else{
               
            }  
        } catch(err){
            
        }
    }

    const GetContest = async ()=>{
       
        try {
            const  response = await ApiConnection.get(`member-fantasygame?fantasygame_id=${id}`)
            if(response?.status == 200){
               
                setContestList(response?.data?.data?.list)
               
            } else{
               
            }  
        } catch(err){
            
        }
    }


    useEffect(() => {
        Getscoreboard()
        GetLivefeed()
        Getplayerpoint()
        GetContest()
    },[])


console.log(livefeed)



    return (
        <>
           {loading && <Loader/>}
        <LoginHeaderTwo subheading={pros} />
        <div className='back-page'>
        <div className='container'>
        <button onClick={() => navigate('/dashboard')}><i className="fas fa-arrow-left"></i> Back</button>
        </div>
    </div>
        <div className='team-container'>
            <div className='container'>
                <div className='matchoverview row'>
                    {contestdata?.map((item, i)=>{
                        return (
                            <div className='col-lg-6' key={i}>
                            <div className='matchoverview-i'>
                                    <div className='team-cnt'>
                                    <div className='team-cnt-img'>
                                        <img src={BaseUrl.baseurl + item?.team_1?.team_image} alt="country"/>
                                    </div>
                                    <div className='team-cnt-info'>
                                        <h4>{item?.list?.matchInfo?.teamOneName}</h4>
                                        <b>{item?.list?.innings1?.total}/{item?.list?.innings1?.wickets} ({item?.list?.innings1?.overs})</b>
                                    </div>
                                </div>
                                VS
                                <div className='team-cnt'>
                                    <div className='team-cnt-img'>
                                        <img src={BaseUrl.baseurl + item?.team_2?.team_image} alt="country"/>
                                    </div>
                                    <div className='team-cnt-info'>
                                        <h4>{item?.list?.matchInfo?.teamTwoName}</h4>
                                        <b>{item?.list?.innings2?.total}/{item?.list?.innings2?.wickets} ({item?.list?.innings2?.overs})</b>
                                    </div>
                                </div>
                             </div>
                             </div>
                        )
                    })}
                    
                </div>
                {/* <div className='row align-items-center'>
                    <div className='col-lg-5'>
                    <div className='team-cnt'>
                        <div className='team-cnt-img'>
                            <img src={BaseUrl.baseurl + contestdata?.team_1?.team_image} alt="country"/>
                        </div>
                        <div className='team-cnt-info'>
                            <h4>{contestdata?.team_1?.team_name}</h4>
                            <b>{contestdata?.list?.innings1?.total}/{contestdata?.list?.innings1?.wickets} ({contestdata?.list?.innings1?.overs})</b>
                        </div>
                    </div>
                    </div>
                    <div className='col-lg-2'>
                        <div className='liveTxt'>
                            <span>{pros}</span>
                        </div>
                    </div>
                    <div className='col-lg-5 text-right'>
                        <div className='team-cnt'>
                            <div className='team-cnt-info'>
                                    <h4>{contestdata?.team_2?.team_name}</h4>
                                    <b>{contestdata?.list?.innings2?.total}/{contestdata?.list?.innings2?.wickets} ({contestdata?.list?.innings2?.overs})</b>
                                </div>
                                <div className='team-cnt-img'>
                                <img src={BaseUrl.baseurl + contestdata?.team_2?.team_image} alt="country"/>
                                </div>
                                
                            </div>
                    </div>
                </div> */}
              
            </div>
    </div>
    <div className='live-info'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-12'>
                {livefeed?.map((item)=>{
                        return (
                            <>
                            <h6>({item?.match_info?.a_team_name}) VS ({item?.match_info?.b_team_name})</h6>
                <div className='d-flex align-items-center my-2'>
              
                                
                                <label>{item?.rcb} ({item?.overNum})   </label>
                <ul>

                    {item?.balls&&item?.balls.map((ball, i) =>{
                        return (
                            <li key={i}>
                            <span className={ball?.runsDisplay == 'W' ? 'wicket' : ball?.ballType == 'Wide' ? 'wide'  :  null}>{
                            ball?.runsDisplay == 'W' ? 
                                ball?.runsDisplay :  ball?.ballType == 'Wide' ? 'WD':  ball?.runs}</span>
                        </li>
                        )
                    })}
                </ul>
                         
                    
                
            </div>
            </>
                )
            })}
                </div>
                {/* <div className='col-lg-4 text-right'>
                    <h6 className='m-0 text-danger'>{contestdata?.match_info}</h6>
                </div> */}
            </div>
        
        </div>
    </div>
    <div className='container'>
        <div className='inner-container'>
        <Tabs
                    defaultActiveKey="mc"
                    id="fill-tab-example"
                    className='team-tabs'
                    >
                    <Tab eventKey="mc" title={`My Contests ${ContestList.length}`}>
                        {/* <div className='tab-info'>
                            <h5>Best 11:</h5>
                            <h6>743.6 Pts</h6>
                        </div> */}
                        <div className='table-style'>
                            {ContestList.length > 0 ? 
                            <MyContest data={ContestList} />
                            :
                            <h5 className='mt-3'>You have not joined a team for this fantasy game</h5>
}
                        
                        </div>
                </Tab>
                <Tab eventKey="ps" title={`Player Stats`}>
                       
                        <div className='table-style'>
                            <Contest data={Playerstate} />
                        </div>
                </Tab>
                <Tab eventKey="sb" title={`Scoreboard`}>
                      <ScoreBoard data={contestdata} />
                </Tab>
        </Tabs>
        </div>
    </div>
        </>
    )
}

export default Live