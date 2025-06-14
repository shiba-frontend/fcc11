import React, { useState, useEffect } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader";
import ApiConnection from "../../../utils/ApiConnection";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState("")
  const [gameId, setgameId] = useState(null)
  const [winner, setwinner] = useState(null)
  const [joinfee, setjoinfee] = useState(null)
  const [winnerprediction, setwinnerprediction] = useState("")
  const [fantacygameId, setfantacygameId] = useState(null)
  const [upcomingList, setupcomingList] = useState([])
  const [LiveList, setLiveList] = useState([])
  const [pastList, setpastList] = useState([])
  const [tabs, settabs] = useState("full_fledged")
  const [ClubList, setClubList] = useState([])
  const [TournamentList, setTournamentList] = useState([])
  const [ClubId, setClubId] = useState("")
  const [year, setyear] = useState(moment(new Date(new Date().setFullYear(new Date().getFullYear()))).format('YYYY'))
  const [tounamentId, settounamentId] = useState("")


  const fetchReducer = useSelector((state) => state.fccDataflowreducer)


let navigate = useNavigate()


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const GetdashboardData = async ()=>{
    setloading(true)
   
    try {
        const  response = await ApiConnection.get(`dashboard`)
        if(response?.status == 200){
            setloading(false)
          console.log(response.data)
          setdata(response.data?.data)
        } else{
           
        }  
    } catch(err){
        setloading(false)
        // if(err.response?.status === 401){
        //   localStorage.clear()
        //   navigate('/home')
        //  }
    }
  }

  const GetFantacy = async (type, val)=>{
    setloading(true)
    try {
        const  response = await ApiConnection.get(`get-all-fantasy-games?game_predict_option=${type}&tournament_id=${val}`)
        if(response?.status == 200){
            setloading(false)
            var List = response.data?.data?.list?.data
            var CompletedTempArr = []
            var LiveTempArr = []
            var UpcommingTempArr = []
            List&&List.forEach(element => {

              // var Acdate = new Date(element?.match?.match_date)
              // var NewDate = new Date(moment(new Date()).format('YYYY-MM-DD'))
              // console.log(Acdate, " ", NewDate);
              // var pastdate = Acdate < NewDate
              // var Todate = element?.match?.match_date === moment(new Date()).format('YYYY-MM-DD')
              // var upcomingdate = Acdate > NewDate

               
                  if(element?.is_match_live == 2  ){
                    // if(element?.is_game_join != 0)
                    return CompletedTempArr.push(element)
                  } else if(element?.is_match_live == 1){
                      // if(element?.is_game_join != 0)
                    return LiveTempArr.push(element)
                  } else if(element?.is_match_live == 0){
                     
                    return UpcommingTempArr.push(element)
                  }

                  // if(element?.status == 2  ){
                  //   if(element?.is_game_join != 0)
                  //   return CompletedTempArr.push(element)
                  // } else if(element?.status == 1){
                     
                  //   return LiveTempArr.push(element)
                  // } else if(element?.status == 0){
                     
                  //   return UpcommingTempArr.push(element)
                  // }
              

             

            });

            setupcomingList(UpcommingTempArr)
            setLiveList(LiveTempArr)
            setpastList(CompletedTempArr)
        } else{
            setloading(false)
        }  
    } catch(err){
        setloading(false)
    }
}

const GetClubList = async ()=>{

  try {
      const  response = await ApiConnection.get(`clubs/list`)
      if(response?.status == 200){
   
        setClubList(response.data?.data?.list)
        setClubId(response.data?.data?.list[0]?.id)
      } else{
         
      }  
  } catch(err){
      setloading(false)
  }
}

const GetTournamentList = async (years)=>{
  setloading(true)
  try {
      const  response = await ApiConnection.get(`tournament/get-tournament-list?year=${years}&club_id=${ClubId}`)
      if(response?.status == 200){
        setloading(false)
        setTournamentList(response.data?.data?.list)
      } else{
        setloading(false)
      }  
  } catch(err){
      setloading(false)
  }
}

useEffect(() => {
  GetdashboardData()
  GetFantacy('full_fledged', '')
  GetClubList()
  GetTournamentList(year)
},[])



const joinHandle = (id, cid, winner, joinfee, game_predict_option, tournamentid) => {
  // setShow2(true)
 setfantacygameId(id)
   setgameId(cid)
  // setwinner(winner)
  // setjoinfee(joinfee)
  // setwinnerprediction(game_predict_option)
  // setTournamentId(tournamentid)

if(game_predict_option == 'full_fledged'){
  navigate('/fantacy-game-match', {state:{fantacygameId:id}})
} else {
  ConfirmJoin(id, tournamentid)
}

  
}

const ConfirmJoin = async (id, tid) => {
  setloading(true)

  let obj = {
      fantasygame_id:id
  }
  try {
      const  response = await ApiConnection.post(`member-fantasygame/join-game`, obj)
          if(response?.status == 200){
            setloading(false)
    
            if(response.data.success){

          
              navigate("/predict-winner", { state: { fantacygameId: id, gameId: gameId, uniqueId:response?.data?.data?.team_unique_id, tournamenId:tid 
  
              } })



            } else {
              setShow2(false)     
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

const MYteamForPredicWinner =(id, tid)=>{
  
  navigate("/my-prediction", { state: { fantacygameId: id,tournamenId:tid
  
  } })
}


const TabsHandle = (value)=>{
  settabs(value)
  GetFantacy(value, '')

}

function YearHandle(value){
  setyear(value)
  GetTournamentList(value)
  settounamentId('')
  GetFantacy(tabs, '')
}

function TounamentHandle(value){
  settounamentId(value)
  GetFantacy(tabs, value)

}

 // Function to calculate time difference
 const calculateTimeLeft = (matchTime, currentTime) => {
  const now = new Date(currentTime);
  const matchDate = new Date(matchTime);
  const timeDifference = matchDate - now;

  // If the match is in the past, return 'Match already started'
  if (timeDifference <= 0) return 'Match already started';

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};



useEffect(() => {
 
  
  const timerIntervals = upcomingList?.map((match) => {
    return {
      ...match,
      timeLeft: calculateTimeLeft(match?.game_date, match?.now),
    };
  });


  const interval = setInterval(() => {
    setupcomingList(timerIntervals.map((match) => ({
      ...match,
      timeLeft: calculateTimeLeft(match?.game_date, match?.now),
    })));
  }, 1000);

  // Clear the interval when the component is unmounted
  return () => clearInterval(interval);

}, [upcomingList]);





  return (
    <div>
          {loading && <Loader/>}
      <LoginHeader title="Dashboard" />
      <DashboardMenu />
      <div className="container">
        <div className="dashboard-panel">
          <div className="row align-items-center mb-4">
            {/* <div className="col-lg-3 col-md-3">
              <div className="d-box">
                <h2>Statistics</h2>
              </div>
            </div> */}
            <div className="col-lg-12 col-md-12">
                <div class="d-right">
                <div className="d-box">
                <h3>
                Winnings Credit Balance: <b>{fetchReducer?.user?.available_credit_amount
}</b>
           
                
                </h3>
              </div>
                  <div className="d-box">
                  <h3>
                  <img src={IMAGE.credit_icon} alt="d-icon"/> Credit Balance : <b>{fetchReducer?.user?.available_credit_points
}</b>
                  </h3>
                </div>
                <div className="d-box">
                <h3>
                <img src={IMAGE.add_icon} alt="d-icon"/>
                  <NavLink to="/purchase-credit"> Add Credit</NavLink>
                
                </h3>
              </div>
                </div>
              </div>
           
          </div>
          <div className="row align-items-center mb-4">
            <div className="col-lg-4 col-4 col-md-4">
              <div className="dinfo-box">
                <div className="dinfo-box-l"></div>
                <div className="dinfo-box-r">
                  <h5>Lifetime Earnings</h5>
                  <b>{data?.lifetime_earnings} <sub style={{fontWeight:'400'}}>Credits</sub></b>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-4 col-md-4">
              <div className="dinfo-box">
                <div className="dinfo-box-l"></div>
                <div className="dinfo-box-r">
                  <h5>Last 30 days Earning</h5>
                  <b>{data?.last_30_days_earning} <sub style={{fontWeight:'400'}}>Credits</sub> </b>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-4 col-md-4">
              <div className="dinfo-box">
                <div className="dinfo-box-l"></div>
                <div className="dinfo-box-r">
                  <h5>Last Game Earning</h5>
                  <b>{data?.last_game_earning} <sub style={{fontWeight:'400'}}>Credits</sub></b>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard_main_tab">
            <ul>
              <li>
                  <button className={tabs == 'full_fledged' ? 'active' : ''} onClick={()=>TabsHandle('full_fledged')}>Fantasy Game</button>
              </li>
              <li>
                  <button className={tabs == 'select_winner' ? 'active' : ''} onClick={()=>TabsHandle('select_winner')}>Predictions</button>
              </li>
            </ul>
          </div>

   
            <div className="dashboard-form">
                <div className="row">
                <div className="col-lg-4 col-md-4">
                      <select className="form-control" value={ClubId} onChange={(e)=>setClubId(e.target.value)}>
                      <option value="">--Select Clubs--</option>
                        {ClubList&&ClubList.map((clubs, i)=>{
                          return (
                            <option key={i} value={clubs?.id}>{clubs?.club_name}</option>
                          )
                        })}
                        
                      </select>
                  </div>
                  <div className="col-lg-4 col-md-4">
                      <select className="form-control" value={year} onChange={(e)=>YearHandle(e.target.value)}>
                          <option value={moment(new Date(new Date().setFullYear(new Date().getFullYear() -1))).format('YYYY')}>{moment(new Date(new Date().setFullYear(new Date().getFullYear() -1))).format('YYYY')}</option>
                          <option value={moment(new Date(new Date().setFullYear(new Date().getFullYear()))).format('YYYY')}>{moment(new Date(new Date().setFullYear(new Date().getFullYear()))).format('YYYY')}</option>
                          <option value={moment(new Date(new Date().setFullYear(new Date().getFullYear() +1))).format('YYYY')}>{moment(new Date(new Date().setFullYear(new Date().getFullYear() +1))).format('YYYY')}</option>
                      </select>
                  </div>
                 
                  <div className="col-lg-4 col-md-4">
                      <select className="form-control" value={tounamentId} onChange={(e)=>TounamentHandle(e.target.value)}>
                          <option value="">All</option>
                          {TournamentList&&TournamentList.map((tournament, i)=>{
                            return (
                              <option value={tournament?.id} key={i}>{tournament?.tournament_name}</option>
                            )
                          })}
                      </select>
                  </div>
                </div>
            </div>

   <Tabs
   defaultActiveKey="upcoming"
   id="fill-tab-example"
   className="dashboard-tab-menu"
   >
    
   <Tab eventKey="upcoming" title="Upcoming">
   {upcomingList.length > 0 ?
     upcomingList&&upcomingList.map((item, index) =>{
       return (
         <div className="card-listed" key={index}>
    
         <label>{item?.game_name}</label>
         <div className="row align-items-center">
             <div className="col-lg-3 col-6 col-md-4">
                 <div className="card-listed-lft">
                 <h6>{item?.tournament?.tournament_name}</h6>
                     <h5>Prize Money</h5>
                     <h3>Credit: {item?.total_prize_pool}</h3>
                     {item?.game_predict_option == "full_fledged" &&
                     <NavLink className="btnStyle-one" to={`/fantacy-conatct-admin/${item?.game_name}/${item?.created_by}`}>Contact Admin</NavLink>
                      }

                
                     </div>
             </div>
             <div className="col-lg-6 col-6 col-md-4">
                 <div className="card-listed-cen">
               <h6>Match start in:  <b>{item?.timeLeft}</b></h6>
                 {item?.game_predict_option == "select_winner" &&
                 <div className="btnStyle-one mb-1" style={{display:'inline-block'}}>Predict the winner</div>
             
                       
     }
     <br />
     {item?.game_predict_option == "select_winner" &&
     <span>Member Joined: {item?.total_teams}</span>
     }



     {item?.game_predict_option == "full_fledged" &&
     
                 <span>Winners: {item?.total_winners}</span>

     }
               
                         {

                         item?.game_predict_option == "full_fledged" ? 
                         item?.is_game_join != 0 ?
<NavLink to={`/my-team-list/${item?.id}/${item?.created_by}`} className="btnStyle-text">My Team</NavLink>
:null
:
item?.is_game_join != 0 ?
                            <button className="btnStyle-text" onClick={()=>MYteamForPredicWinner(item?.id, item?.tournament_id)}>My Team</button>
                    :
                    null
                         }
                 
     
                 </div>
             </div>
             <div className="col-lg-3 col-12 col-md-4">
                 <div className="card-listed-rht"> 
                  <div className="split-div">
                    <h6>{moment(item?.game_date).format('MM-DD-YYYY')}, {moment(item?.game_date).format('LT')}</h6>
                     <h5>{item?.credit_required} Credits</h5>
                     {item?.is_match_live == 0 &&
                     <button className="btnStyle-two" onClick={()=>fetchReducer?.user?.available_credit_points < item?.credit_required ?  toast.error(`No sufficient credit point`) :   joinHandle(item?.id, item?.created_by, item?.total_winners, item?.credit_required, item?.game_predict_option, item?.tournament_id)}>Join Now</button>
                     }
                     </div>
                     {item?.game_predict_option == "full_fledged" &&
                     <div className="split-div">
                     <h3>Team joined: {item?.total_teams}</h3>
                     <NavLink className="btnStyle-three" to={`/fantacy-game-rule/${item?.game_name}/${item?.created_by}/${item?.id}`}>Game Rules</NavLink>
                     </div>
   }
                 </div>
             </div>
         </div>
         
             </div>
       )
     })

     :
     <h5 className="text-center">No Upcoming Math right now</h5>
   }


   </Tab>
   <Tab eventKey="live" title="Live">
     {LiveList.length > 0 ?
  
   LiveList&&LiveList.map((item, index) =>{
       return (
         <div className="card-listed" key={index}>
    
         <label>{item?.game_name}</label>
         <div className="row align-items-center">
             <div className="col-lg-3 col-6 col-md-4">
                 <div className="card-listed-lft">
                   <h6>{item?.tournament?.tournament_name}</h6>
                     <h5>Prize Money</h5>
                     <h3>Credit: {item?.total_prize_pool}</h3>
                     {item?.game_predict_option == "full_fledged" &&
                     <NavLink className="btnStyle-one" to={`/fantacy-conatct-admin/${item?.game_name}/${item?.created_by}`}>Contact Admin</NavLink>
                      }

                
                     </div>
             </div>
             <div className="col-lg-6 col-6 col-md-4">
                 <div className="card-listed-cen">
                 {item?.game_predict_option == "select_winner" &&
                 <div className="btnStyle-one mb-1" style={{display:'inline-block'}}>Predict the winner</div>
             
                       
     }
     <br />
     {item?.game_predict_option == "select_winner" &&
     <span>Member Joined: {item?.total_teams}</span>
     }



     {item?.game_predict_option == "full_fledged" &&
     
                 <span>Winners: {item?.total_winners}</span>

     }
               
                         {

                         item?.game_predict_option == "full_fledged" ? 
                         item?.is_game_join != 0 ?
<NavLink to={`/my-team-list/${item?.id}/${item?.created_by}`} className="btnStyle-text">My Team</NavLink> 
:null
:
item?.is_game_join != 0 ?
                            <button className="btnStyle-text" onClick={()=>MYteamForPredicWinner(item?.id, item?.tournament_id)}>My Team</button>
                    :
                    null
                         }
                    {tabs == 'full_fledged' &&
                 <div className="card-listed-cen">
                      
                         <NavLink className="btnStyle-text" to={`/contest/complete/${item?.id}`}>Open Contest</NavLink>
                         
                 </div>
   }
     
                 </div>
             </div>
             <div className="col-lg-3 col-12 col-md-4">
                 <div className="card-listed-rht"> 
                 <div className="split-div">
                 <h6>{moment(item?.game_date).format('MM-DD-YYYY')}, {moment(item?.game_date).format('LT')}</h6>
                     <h5>{item?.credit_required} Credits</h5>
                     </div>
                     {item?.is_match_running == 0 &&
                     <button className="btnStyle-two" onClick={()=>fetchReducer?.user?.available_credit_points < item?.credit_required ?  toast.error(`No sufficient credit point`) :   joinHandle(item?.id, item?.created_by, item?.total_winners, item?.credit_required, item?.game_predict_option, item?.tournament_id)}>Join Now</button>
                     }
                     {/* <button className="btnStyle-two" onClick={()=>fetchReducer?.user?.available_credit_points < item?.credit_required ?  toast.error(`No sufficient credit point`) :   joinHandle(item?.id, item?.created_by, item?.total_winners, item?.credit_required, item?.game_predict_option, item?.tournament_id)}>Join Now</button> */}
                     {item?.game_predict_option == "full_fledged" &&
                     <div className="split-div">
                     <h3>Team joined: {item?.total_teams}</h3>
                     <NavLink className="btnStyle-three" to={`/fantacy-game-rule/${item?.game_name}/${item?.created_by}/${item?.id}`}>Game Rules</NavLink>
                     
                     </div>
   }

                 </div>
             </div>
         </div>
         
             </div>
       )
     })
     :
     <h5 className="text-center">No data recorded</h5>
   }
   </Tab>
   <Tab eventKey="completed" title="Completed">
   {pastList.length > 0 ?
   pastList&&pastList.map((item, index) =>{
       return (
         <div className="card-listed" key={index}>
    
         <label>{item?.game_name}</label>
         <div className="row align-items-center">
             <div className="col-lg-3 col-6 col-md-4">
                 <div className="card-listed-lft">
                 <h6>{item?.tournament?.tournament_name}</h6>
                     <h5>Prize Money</h5>
                     <h3>Credit: {item?.total_prize_pool}</h3>
                     <NavLink className="btnStyle-one" to={`/fantacy-conatct-admin/${item?.game_name}/${item?.created_by}`}>Contact Admin</NavLink>
        
                 </div>
             </div>
             <div className="col-lg-6 col-6 col-md-4">
              {tabs == 'full_fledged' &&
                 <div className="card-listed-cen">
                         <span>Winners: {item?.total_winners}</span>
                         <NavLink className="btnStyle-text" to={`/contest/complete/${item?.id}`}>Open Contest</NavLink>
                         
                 </div>
   }
             </div>
             <div className="col-lg-3 col-12 col-md-4">
                 <div className="card-listed-rht">
                 <div className="split-div">
                 <h6>{moment(item?.game_date).format('MM-DD-YYYY')}, {moment(item?.game_date).format('LT')}</h6>
                     <h5>${item?.credit_required}</h5>
                     </div>
                     <div className="split-div">
                     <NavLink className="btnStyle-two" to={`/leaderboard/${item?.id}`}>View Standing</NavLink>
                     
                     <h3>Team joined: {item?.total_teams}</h3>
                     {tabs == 'full_fledged' &&
                     <NavLink className="btnStyle-three" to={`/fantacy-game-rule/${item?.game_name}/${item?.created_by}/${item?.id}`}>Game Rules</NavLink>   }            
                   </div>
            </div>
             </div>
         </div>
         
             </div>
       )
     })
     :
     <h5 className="text-center">No completed Math right now</h5>
     }
   </Tab>
 </Tabs>

          
      

       

        
        </div>
      </div>

     
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='gamerule-modal'>
            <button className='clodeBtn' onClick={handleClose1}><i class="fas fa-window-close"></i></button>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" className="form-control" placeholder="Subject"/>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea  className="form-control" placeholder="Message"></textarea>
            </div>
            <div className="form-group">
              <button className="solid-btn">Send</button>
            </div> 
        </Modal.Body>
 
      </Modal>
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
        centered
      >

        <Modal.Body className='contest-modal text-center'>
            <h3>Join Contest</h3>
            <h5>Total Winings: <b>{winner}</b></h5>
            <h5>Entry Fee: <b>{joinfee}</b></h5>
            <div className="form-group mt-4">
              <button onClick={handleClose2} className="outline-btn mr-2">Cancel</button>
              <button className="solid-btn" onClick={ConfirmJoin}>Join Now</button>
              {/* <NavLink to={`/create-team/${fantacygameId}/${gameId}`} className="solid-btn">Join Now</NavLink> */}
            </div> 
        </Modal.Body>
 
      </Modal>
    </div>
  );
};

export default Dashboard;
