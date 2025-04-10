import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import Accordion from 'react-bootstrap/Accordion';
import { IMAGE } from "../../../utils/Theme";
import Loader from "../../../utils/Loader";
import ApiConnection from "../../../utils/ApiConnection";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

const Membership = () => {


  const [loading, setloading] = useState(false)
    const [pointdata, setpointdata] = useState([])

    const fetchReducer = useSelector((state) => state.fccDataflowreducer)

    console.log(fetchReducer)

    const Getdata = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('subscription')
            if(response?.status == 200){
                setloading(false)
                console.log(response.data)
                setpointdata(response.data?.data?.data)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    useEffect(() => {
      Getdata()
    },[])




  return (
    <>
       {loading && <Loader/>}
     <LoginHeader title="Membership" />
      <DashboardMenu />
        <div className="container">
        <div className="dashboard-panel pt-5">
          {fetchReducer?.user?.is_membership_active && 
            <div className="memberShip-plan-details mb-4">
              <h4>Current Plan Details</h4>
              <p>Plan Status: <b>Active</b> | Day left: <b>{fetchReducer?.user?.membership_days_left}</b>(Days) | Start Date: <b>{moment(fetchReducer?.user?.membership?.subscription_start).format('MM-DD-YYYY')}</b> | End Date: <b>{moment(fetchReducer?.user?.membership?.subscription_end).format('MM-DD-YYYY')}</b></p>
           
              <hr></hr>
            </div>
        }
          <div className="row">
            {pointdata&&pointdata.map((item,i)=>{
              return (
                <div className="col-lg-3 col-md-6" key={i}>
                <div className="subscription-box">
                  {fetchReducer?.user?.membership?.id == item.id && <span className="Activeplan">Active</span>}
                        <h3>{item?.plan_name}</h3>
                        <h2>$ {item?.plan_price}</h2>
                        <p>{item?.other_benefits} </p>
                       
                        {fetchReducer?.user?.membership?.id == item.id ?
                        <button className="subscription-btn basic" disabled style={{background:'orange'}}>Subscribed</button>
                       :
                       <NavLink to={`/payment/${item?.id}`}  className="subscription-btn basic">Subscribe</NavLink>

                      }
                        <ul>
                            <li><span><i class="fas fa-check-circle"></i></span>Credits: {item?.credit?.credit} Credit</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Duration: {item?.plan_duration} (Days)</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Tournaments Valid: {item?.tournament_valid?.valid} Tournament</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Matches Valid: {item?.match_valid?.valid} Match</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cash Prize: {item?.cash_prize}</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Leaderboard: {item?.leaderboard}</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Additional Credits: {item?.additional_credit == 1 ? 'Yes' : 'No'}</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cost of additional credits: ${item?.additional_credit_price}</li>
                        </ul>
                </div>
            </div>
              )
            })}
          
            {/* <div className="col-lg-3">
                <div className="subscription-box">
                        <h3>Silver</h3>
                        <p>Lorem ipsum dolor sit amet, consec etconsectetur adipiscing elit. </p>
                        <h2>$39</h2>
                        <NavLink to="/payment"  className="subscription-btn silver">Subscribe</NavLink>
                        <ul>
                            <li><span><i class="fas fa-check-circle"></i></span>Credits: 0 Credit</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Duration: 30 Days</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Tournaments Valid: 1 Tournament</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Matches Valid: 1 Match</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cash Prize: NO</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Leaderboard: YES</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cost per additional credit: $1.8</li>
                        </ul>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="subscription-box">
                        <label>TOP PICK</label>
                        <h3>Gold</h3>
                        <p>Lorem ipsum dolor sit amet, consec etconsectetur adipiscing elit. </p>
                        <h2>$100</h2>
                        <NavLink to="/payment"  className="subscription-btn gold">Subscribe</NavLink>
                        <ul>
                            <li><span><i class="fas fa-check-circle"></i></span>Credits: 0 Credit</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Duration: 30 Days</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Tournaments Valid: 1 Tournament</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Matches Valid: 1 Match</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cash Prize: NO</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Leaderboard: YES</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Additional Credits: Yes</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cost per additional credit: $1.8</li>
                        </ul>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="subscription-box">
                        <h3>Platinum</h3>
                        <p>Lorem ipsum dolor sit amet, consec etconsectetur adipiscing elit. </p>
                        <h2>$150</h2>
                        <NavLink to="/payment" className="subscription-btn platinum">Subscribe</NavLink>
                        <ul>
                            <li><span><i class="fas fa-check-circle"></i></span>Credits: 0 Credit</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Duration: 30 Days</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Tournaments Valid: 1 Tournament</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Matches Valid: 1 Match</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cash Prize: NO</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Leaderboard: YES</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Additional Credits: Yes</li>
                            <li><span><i class="fas fa-check-circle"></i></span>Cost per additional credit: $1.8</li>
                        </ul>
                </div>
            </div> */}
          </div>
      
          </div>
          </div>
    </>
  )
}

export default Membership