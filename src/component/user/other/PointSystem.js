import React, { useEffect, useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import Accordion from 'react-bootstrap/Accordion';
import { IMAGE } from "../../../utils/Theme";
import Loader from "../../../utils/Loader";
import ApiConnection from "../../../utils/ApiConnection";

const PointSystem = () => {

    const [loading, setloading] = useState(false)
    const [pointdata, setpointdata] = useState("")

    const GetPoint = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-game-rules')
            if(response?.status == 200){
                setloading(false)
                console.log(response.data)
                setpointdata(response.data?.data?.list?.points_rule)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    useEffect(() => {
        GetPoint()
    },[])


  return (
    <>
       {loading && <Loader/>}
    <LoginHeader title="Fantasy Points System" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-5">
                <div className="point-history">
                <ul>
                                <li><b>Per Run</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.runs} Point</li>
                            </ul>
                            <ul>
                                <li><b>Boundary</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.boundary_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Over Boundary</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.six_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Half Century</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.half_century_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Century</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.century_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket (Excluding Run Out)</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket} Point</li>
                            </ul>
                            <ul>
                                <li><b>Bonus (LBW / Bowled) </b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 3</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket_bonus_3} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 4</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket_bonus_4} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 5</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket_bonus_5} Point</li>
                            </ul>
                            <ul>
                                <li><b>Run Out</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.catch_runout} Point</li>
                            </ul>
                            <ul>
                                <li><b>Captain</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.captain} Point</li>
                            </ul>
                            <ul>
                                <li><b>Vice Captain</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.vice_captain} Point</li>
                            </ul>
                {/* <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="mb-3">
                        <Accordion.Header>Batting</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li><b>Per Run</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.runs} Point</li>
                            </ul>
                            <ul>
                                <li><b>Boundary</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.boundary_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Over Boundary</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.six_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Half Century</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.half_century_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Century</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.century_bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket (Excluding Run Out)</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket} Point</li>
                            </ul>
                            <ul>
                                <li><b>Bonus (LBW / Bowled) </b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bonus} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 3</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket_bonus_3} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 4</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket_bonus_4} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 5</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.wicket_bonus_5} Point</li>
                            </ul>
                            <ul>
                                <li><b>Run Out</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.catch_runout} Point</li>
                            </ul>
                            <ul>
                                <li><b>Captain</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.captain} Point</li>
                            </ul>
                            <ul>
                                <li><b>Vice Captain</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.vice_captain} Point</li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className="mb-3">
                        <Accordion.Header>Bowling</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li><b>Per Wicket</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bowling?.wicket} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 3</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bowling?.wicket_bonus_3} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 4</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bowling?.wicket_bonus_4} Point</li>
                            </ul>
                            <ul>
                                <li><b>Wicket 5</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bowling?.wicket_bonus_5} Point</li>
                            </ul>
                            <ul>
                                <li><b>Maiden Over</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bowling?.maiden_over} Point</li>
                            </ul>
                            <ul>
                                <li><b>Dismissal for a duck</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.bowling?.dismissal_for_a_duck} Point</li>
                            </ul>
                            
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className="mb-3">
                        <Accordion.Header>Fielding</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li><b>Per Catch</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.fielding?.catch} Point</li>
                            </ul>
                            <ul>
                                <li><b>3 Catches</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.fielding?.catch_bonus_3} Point</li>
                            </ul>
                            
                            <ul>
                                <li><b>Stumping</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.fielding?.stumping} Point</li>
                            </ul>
                            <ul>
                                <li><b>Run out direct</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.fielding?.run_out_direct} Point</li>
                            </ul>
                            <ul>
                                <li><b>Run out Indirect</b></li>
                                <li><img src={IMAGE.long_arrow}/></li>
                                <li>{pointdata?.fielding?.run_out_indirect} Point</li>
                            </ul>
                           
                        </Accordion.Body>
                    </Accordion.Item>
                   
                    </Accordion> */}
                    
                </div>
        
            </div>
         </div>
   </>
  )
}

export default PointSystem