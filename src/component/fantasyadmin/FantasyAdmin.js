import React, { useEffect, useState } from "react";

import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavLink } from "react-router-dom";

import AdminMenu from "../admin/common/AdminMenu";
import Nav from 'react-bootstrap/Nav';

import DashboardFooter from "../admin/common/DashboardFooter";
import ApiConnection from "../../utils/ApiConnection";
import Loader from "../../utils/Loader";
import DashboardHeader from "../admin/common/DashboardHeader";

import FantacyGame from "../admin/dashboard/FantacyGame";
import Earning from "../admin/dashboard/Earning";
import CommissionEarning from "../admin/dashboard/CommissionEarning";
import LifetimeEaning from "../admin/dashboard/LifetimeEaning";
import LifetimeCommission from "../admin/dashboard/LifetimeCommission";
import LifetimePrizemoney from "../admin/dashboard/LifetimePrizemoney";

const FantasyAdmin = () => {
    const [loading, setloading] = useState(false)
    const [data, setdata] = useState("")
  
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
  
  
      useEffect(() => {
        GetdashboardData()
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
          
            <Tab.Container id="left-tabs-example" defaultActiveKey="lifetimeearning">
               
                    <Nav variant="pills" style={{marginTop:'10px'}} className="dashboard-tabs-menu">
                    <ul>
                       
                        {/* <li>
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
                                <b>$4000</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="commission">
                                <span>Commission Paid Last Match</span>
                                <b>$2000</b>
                             </Nav.Link>
                        </li>
                        <li>
                             <Nav.Link eventKey="prize">
                                <span>Prize money given last game</span>
                                <b>$2000</b>
                             </Nav.Link>
                        </li> */}
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

export default FantasyAdmin
