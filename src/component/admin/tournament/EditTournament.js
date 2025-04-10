import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';

const EditTournament = () => {

    const [tournamentname, settournamentname] = useState("")
    const [shortname, setshortname] = useState("")
    const [year, setyear] = useState(null)
    const [logo, setlogo] = useState("")
    const [list, setlist] = useState([])
    const [team, setteam] = useState("")
    const [loading, setloading] = useState(false)
    const [selectteam, setselectteam] = useState([])
    var user = JSON.parse(localStorage.getItem('user'))
    let navigate = useNavigate()
    let {id} = useParams()
    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('teams/list')
            if(response?.status == 200){
                setlist(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

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
                setteam(teamId)
                setselectteam(editdata?.teams)
            }
     


        } catch(e){
            setloading(false)  
        }
    }

    useEffect(()=>{
        GetData()
        fetchdata()
    },[])

    const handleChange = (e, data) =>{
        const {name, checked} = e.target
        if (checked) {
            setselectteam([...selectteam, data]);
          } else {
            let tempTeam = selectteam.filter((item) => item.id !== data.id);
            setselectteam(tempTeam);
          }
    }

    const AddHandler = async () => {

        if(tournamentname == ''){
            toast.error("Tournament name is required")
        } else if(shortname == ''){
            toast.error("Short name is required") 
        } else if(team == ''){
            toast.error("Team is required") 
        } else if(year == null){
            toast.error("Year is required") 
        } else if(logo == ''){
            toast.error("Logo is required") 
        } else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('tournament_name', tournamentname);
                data.append('tournament_short_name', shortname);
                data.append('tournament_year', moment(year).format("YYYY"));
                selectteam.map((team, i) =>{
                    return   data.append('team_id[]', team.id);
                })
                data.append('is_active', '1');
                data.append('tournament_image', logo);
                data.append('_method', 'PUT');
                data.append('club_id', user?.id);
                const response = await ApiConnection.post(`tournament/${id}`, data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/tournament-list")
                } else {
                    setloading(false)
                }

            } catch(err){
                setloading(false)
                if(err.response.status === 422){
                      toast.error(err.response?.data?.message);   
                  
                }
        }
            

        }

   


}


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="Edit a tournament" />
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
                  />
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Short Name</label>
                  <input type="text" className="form-control" placeholder="Short Name"
                  value={shortname}
                  onChange={(e)=>setshortname(e.target.value)}
                  />
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
                  
                  />


              </div>
          </div>
          <div className='col-lg-6'>
                        <div className='form-group'>
                            <label>Teams</label>
                            <Dropdown className='custom-dropdown-checkbox'>
                            <Dropdown.Toggle variant="success" className="form-control">
                            {selectteam.length > 0 ? 'select ' + selectteam.length : ' select Team '}
                           
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <ul>
                                    
                                    {list&&list.map((list, i) =>{
                                        return (
                                            <li>
                                                <input type="checkbox" id={i} 
                                               checked={selectteam.some((item) => item?.id === list.id)}
                                               onChange={(e) => handleChange(e, list)}
                                                />
                                                <label htmlFor={i}>{list?.team_name}</label>
                                            </li>
                                        )
                                    })}
                                    
                                   
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                    </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Upload tournament logo:</label>
                  <input type="file" className="form-control"
                  accept="image/png, image/jpeg"
                  onChange={(e)=>setlogo(e.target.files[0])}
                  />
              </div>
          </div>
         
          <div className='col-lg-12'>
              <div className='form-group'>
                  <button className='btn btn-success btn-lg'
                  onClick={AddHandler}
                  >Update</button>
              </div>
          </div>
     </div>

</div>
</div>

</div>
  )
}

export default EditTournament