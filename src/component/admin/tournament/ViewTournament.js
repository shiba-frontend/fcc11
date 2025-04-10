import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';

const ViewTournament = () => {


    const [tournamentname, settournamentname] = useState("")
    const [shortname, setshortname] = useState("")
    const [year, setyear] = useState(null)
    const [logo, setlogo] = useState("")
    const [list, setlist] = useState([])
    const [loading, setloading] = useState(false)

    let navigate = useNavigate()
    let {id} = useParams()
  

    const fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`tournament/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                var teamId = editdata?.teams[0]?.pivot?.team_id
                settournamentname(editdata?.tournament_name)
                setshortname(editdata?.tournament_short_name)
                setyear(new Date(`01-01-${editdata?.tournament_year}`))
                setlist(editdata?.teams)
                setlogo(editdata?.tournament_image)
            }
     


        } catch(e){
            setloading(false)  
        }
    }

    useEffect(()=>{
        fetchdata()
    },[])


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View tournament" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

     <div className='row'>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Tournament Name</label>
                  <input type="text" className="form-control" placeholder="Tournament Name"
                  value={tournamentname}
                  onChange={(e)=>settournamentname(e.target.value)}
                  readOnly/>
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Short Name</label>
                  <input type="text" className="form-control" placeholder="Short Name"
                  value={shortname}
                  onChange={(e)=>setshortname(e.target.value)}
                  readOnly/>
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Select Year </label>
                  <DatePicker
                  selected={year}
                  showYearPicker
                  dateFormat="yyyy"
                  onChange={(date) => setyear(date)}
                  className="form-control"
                  maxDate={new Date()}
                  disabled/>


              </div>
          </div>
          <div className='col-lg-12'>
                        <div className='form-group'>
                            <label className='d-block'>Teams</label>
                            {list&&list.map((result,i)=>{
                                    return (
                                        <b>{result?.team_name}, </b>
                                    )
                                })}
                        </div>
                    </div>
                    <div className='col-lg-12'>
                    <div className='form-group'>
                        <label className='d-block'>Tournament Logo:</label>
                        <img src={BaseUrl.baseurl + logo} />
                    </div>
                </div>
         
        
     </div>

</div>
</div>

</div>
  )
}

export default ViewTournament