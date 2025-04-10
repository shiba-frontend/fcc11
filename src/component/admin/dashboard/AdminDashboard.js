import React, { useEffect, useState } from "react";
import { IMAGE } from "../../../utils/Theme";
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavLink } from "react-router-dom";
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import Nav from 'react-bootstrap/Nav';
import UpcomingMatch from "./UpcomingMatch";
import LiveMatch from "./LiveMatch";
import CompleteMatch from "./CompleteMatch";
import FantacyGame from "./FantacyGame";
import Earning from "./Earning";
import CommissionEarning from "./CommissionEarning";
import LifetimeEaning from "./LifetimeEaning";
import LifetimeCommission from "./LifetimeCommission";
import LifetimePrizemoney from "./LifetimePrizemoney";
import DashboardFooter from "../common/DashboardFooter";
import ApiConnection from "../../../utils/ApiConnection";
import Loader from "../../../utils/Loader";
import UpcomingFantasy from "./UpcomingFantasy";
import CompleteFantasy from "./CompleteFantasy";


const AdminDashboard = () => {
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState("")
    const [AllFantasy, setAllFantasy] = useState([])
    const [upcomingFantasy, setupcomingFantasy] = useState([])
    const [completeFantasy, setcompleteFantasy] = useState([])

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
        }
      }

      const GetAllFantasy = async ()=>{
        setloading(true)
       
        try {
            const  response = await ApiConnection.get(`fantasy-game`)
            const  responseone = await ApiConnection.get(`fantasy-game?match_status=0`)
            const  responsetwo = await ApiConnection.get(`fantasy-game?match_status=2`)
            if(response?.status == 200){
                setloading(false)
                setAllFantasy(response?.data?.data?.data)
            } else{
                setloading(false)
            }  
            if(responseone?.status == 200){
                setloading(false)
                setupcomingFantasy(responseone?.data?.data?.data)
            } else{
                setloading(false)
            } 
            if(responsetwo?.status == 200){
                setloading(false)
                setcompleteFantasy(responsetwo?.data?.data?.data)
            } else{
                setloading(false)
            } 
        } catch(err){
            setloading(false)
        }
      }

      useEffect(() => {
        GetdashboardData()
        GetAllFantasy()
        
      },[])


  return (
    <div>
         {loading && <Loader/>}
      <DashboardHeader title="Dashboard" />
      <AdminMenu />
      <div className="container">
        <div className="dashboard-panel">
          <div className="row align-items-center mb-4">
            <div className="col-lg-4">
              <div className="d-box">
                <h2>Stats</h2>
              </div>
            </div>
          </div>
        
        <div className="dashboard-panel-item">
            <ul>
                <li>
                    <span>Total Teams</span>
                    <b>{data?.total_teams}</b>
                </li>
                <li>
                    <span>Active Teams</span>
                    <b>{data?.active_teams}</b>
                </li>
                <li>
                    <span>Total Number of Players</span>
                    <b>{data?.total_players}</b>
                </li>
                <li>
                    <span>Total Tournaments</span>
                    <b>{data?.total_tournaments}</b>
                </li>
                <li>
                    <span>Active Tournaments</span>
                    <b>{data?.active_tournaments}</b>
                </li>
                <li>
                    <span>Total Matches</span>
                    <b>{data?.total_matchs}</b>
                </li>
                
            </ul>
            <Tab.Container id="left-tabs-example" defaultActiveKey="upcoming">
               
                    <Nav variant="pills" style={{marginTop:'10px'}} className="dashboard-tabs-menu">
                    <ul>
                        <li>
                             <Nav.Link eventKey="upcoming">
                                <span>Upcoming Matches</span>
                                <b>{data?.upcoming_matchs}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="live">
                                <span>Live Matches</span>
                                <b>{data?.live_matchs}</b>
                             </Nav.Link>
                             </li>
                        <li>
                             <Nav.Link eventKey="completed">
                                <span>Completed Matches</span>
                                <b>{data?.past_matchs}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="fantacy">
                                <span>Total Fantacy Games</span>
                                <b>{data?.total_fantasygames}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="upcomingfantacy">
                                <span>Upcoming Fantacy Games</span>
                                <b>{data?.upcoming_fantasygames}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="completefantacy">
                                <span>Completed Fantacy Games</span>
                                <b>{data?.completed_fantasygames}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="earning">
                                <span>Earning from last match</span>
                                <b>$ {data?.last_game_earning}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="commission">
                                <span>Commission Paid Last Match</span>
                                <b>$ {data?.commission_paid_last_match}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="prize">
                                <span>Prize money given last game</span>
                                <b>$ {data?.prize_money_given_last_match}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="lifetimeearning">
                                <span>Lifetime Earnings</span>
                                <b>$ {data?.lifetime_earnings}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="lifetimecommission">
                                <span>Lifetime commission paid</span>
                                <b>$ {data?.lifetime_commission_paid}</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="lifetimeprize">
                                <span>Lifetime Prize Money Given</span>
                                <b>$ {data?.lifetime_prize_money_given}</b>
                             </Nav.Link>
                        </li>
                     </ul>
                    </Nav>
                  
                    <Tab.Content className="mt-4">
                        <Tab.Pane eventKey="upcoming">
                            <div className="tabs-container">
                                <h4>Upcoming Matches</h4>
                                <UpcomingMatch/>

                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="live">
                        <div className="tabs-container">
                                <h4>Live Matches</h4>
                                <LiveMatch/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="completed">
                        <div className="tabs-container">
                                <h4>Completed Matches</h4>
                                <CompleteMatch/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fantacy">
                            <div className="tabs-container">
                                <h4>Fantacy Games</h4>
                                <FantacyGame value={AllFantasy}/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="upcomingfantacy">
                            <div className="tabs-container">
                                <h4>Upcoming Fantacy Games</h4>
                                <UpcomingFantasy value={upcomingFantasy} />
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="completefantacy">
                            <div className="tabs-container">
                                <h4>Completed Fantacy Games</h4>
                                <CompleteFantasy value={completeFantasy}/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="earning">
                            <div className="tabs-container">
                                <h4>Earning</h4>
                                <Earning/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="commission">
                            <div className="tabs-container">
                                <h4>Commission Earning</h4>
                                <CommissionEarning/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="prize">
                            <div className="tabs-container">
                                <h4>Prize Money</h4>
                                <Earning/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="lifetimeearning">
                            <div className="tabs-container">
                                <h4>Lifetime Earning</h4>
                                <LifetimeEaning/>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="lifetimecommission">
                            <div className="tabs-container">
                                <h4>Lifetime commission</h4>
                                <LifetimeCommission/>
                            </div>
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey="lifetimeprize">
                            <div className="tabs-container">
                                <h4>Lifetime Prize Money</h4>
                                <LifetimePrizemoney/>
                            </div>
                        </Tab.Pane>
                        
                    </Tab.Content>
                   
                </Tab.Container>

        </div>



         

        
        </div>
      </div>
    <DashboardFooter/>
    </div>
  )
}

export default AdminDashboard