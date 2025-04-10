import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate , useParams} from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';

const ViewTeam = () => {
    const [teamname, setteamname] = useState("")
    const [shortname, setshortname] = useState("")
    const [year, setyear] = useState(null)
    const [logo, setlogo] = useState("")
    const [info, setinfo] = useState("")
    const [loading, setloading] = useState(false)
    const [FilterResult, setFilterResult] = useState([])

    let navigate = useNavigate()
    let {id} = useParams()

    useEffect( ()=>{

        const getdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`teams/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setteamname(editdata?.team_name)
                setshortname(editdata?.team_short_name)
                setyear(editdata?.incorporation_year)
                setinfo(editdata?.team_info)
                setlogo(editdata?.team_image)
                setFilterResult(editdata?.players)
            }
          
        } catch(e){
            setloading(false)  
        }
    }

    getdata()

    },[])

 


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="Update a team" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

    <div className='row'>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Team Name</label>
                 <input type="text" className="form-control" placeholder="Team Name"
                   value={teamname}
                   onChange={(e)=>setteamname(e.target.value)}
                   readOnly />
             </div>
         </div>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Team Short Name</label>
                 <input type="text" className="form-control" placeholder="Short Name"
                  value={shortname}
                  onChange={(e)=>setshortname(e.target.value)}
                  readOnly/>
             </div>
         </div>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Select Year of Incorporation</label>
                 <input type="text" className="form-control" placeholder="YYYY"
                 value={year}
                 onChange={(e)=>setyear(e.target.value)}
                 onKeyPress={(event) => {
                     if (!/[0-9]/.test(event.key)) {
                       event.preventDefault();
                     }
                   }}
                   maxLength="4"
                   readOnly/>
             </div>
         </div>
         <div className='col-lg-12'>
             <div className='form-group'>
                 <label className='d-block'>Player List</label>
                 {FilterResult?.map((list, i)=>{
                return <span className='badge bg-primary text-white mr-2' key={i}>{list?.player_name} </span>
            })}
             </div>
         </div>
        
         <div className='col-lg-12'>
             <div className='form-group'>
                 <label>Team Info</label>
                 <textarea className="form-control" placeholder='Message'
                   value={info}
                   onChange={(e)=>setinfo(e.target.value)}
                 readOnly></textarea>
             </div>
         </div>
         <div className='col-lg-12'>
              <div className='form-group'>
                  <label className='d-block'>Team Logo:</label>
                 <img src={BaseUrl.baseurl + logo} width="200" />
              </div>
          </div>
    </div>

</div>
</div>
 
</div>
  )
}

export default ViewTeam