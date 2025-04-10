import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE } from '../../../utils/Theme'
import ApiConnection from "../../../utils/ApiConnection";
import Loader from "../../../utils/Loader";
import moment from 'moment';

const LiveMatch = () => {

    const [loading, setloading] = useState(false)
    const [data, setdata] = useState([])

    const GetData = async ()=>{
        setloading(true)
       
        try {
            const  response = await ApiConnection.get(`match?status=live`)
            if(response?.status == 200){
                setloading(false)
                setdata(response?.data?.data?.data)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
      }


      useEffect(() => {
        GetData()
      },[])





  return (
    <>

{data&&data.length > 0

?

data&&data.map((item, i)=>{
    return (
        <div className="dashboard-card-listed" key={i}>
        <h5>{item?.game_name}</h5>
    <div className="row align-items-center">
        <div className="col-lg-3">
            <div className="dashboard-card-listed-lft">
                {/* <img src={IMAGE.ind} /> */}
                <label>{item?.team_1?.team_name}</label>
            </div>
        </div>
        <div className="col-lg-6">
           <div className="dashboard-card-listed-cen">
                <h6 className='text-warning'>{item?.status}</h6>
                <b>{item?.result}</b>
                {/* <b>Eng 180/10 (30.5) | SA 185/7 (40)</b> */}
           </div>
       </div>
        <div className="col-lg-3">
        <div className="dashboard-card-listed-lft">
             <label>{item?.team_2?.team_name}</label>
              {/* <img src={IMAGE.sa} /> */}
              
            </div>
        </div>
    </div>
    <span className='info-text'>{moment(item?.match_date).format('MM-DD-YYYY')   }</span>
</div>
    )
})
:
<h5 className='text-center'>No live match</h5>
} 


    {/* <div className="dashboard-card-listed">
           <h5>Uttar Pradesh T20 League, T20</h5>
       <div className="row align-items-center">
           <div className="col-lg-3">
               <div className="dashboard-card-listed-lft">
                   <img src={IMAGE.ind} />
                   <label>IND</label>
               </div>
           </div>
           <div className="col-lg-6">
               <div className="dashboard-card-listed-cen">
                    <h6 className='text-success'>Live</h6>
                    <b>Eng 180/3 (30.5)</b>
               </div>
           </div>
           <div className="col-lg-3">
           <div className="dashboard-card-listed-lft">
                <label>SA</label>
                 <img src={IMAGE.sa} />
                 
               </div>
           </div>
       </div>
   </div> */}
 
   </>
  )
}

export default LiveMatch