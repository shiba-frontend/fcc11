import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import Multiselect from 'multiselect-react-dropdown';

const AddTeam = () => {
    const [teamname, setteamname] = useState("")
    const [shortname, setshortname] = useState("")
    const [year, setyear] = useState(null)
    const [logo, setlogo] = useState("")
    const [info, setinfo] = useState("")
    const [loading, setloading] = useState(false)
    const [FilterResult, setFilterResult] = useState([])
    const [selectplayer, setselectplayer] = useState([])

    console.log(selectplayer)

    let navigate = useNavigate()

    const AddHandler = async () => {

        if(teamname == ''){
            toast.error("Team name is required")
        } else if(shortname == ''){
            toast.error("Short name is required") 
        }  else if(year == null){
            toast.error("Year is required") 
        } else if(logo == ''){
            toast.error("Logo is required") 
        }else if(info == ''){
            toast.error("Message is required") 
        } else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('team_name', teamname);
                data.append('team_short_name', shortname);
                data.append('incorporation_year', moment(year).format("YYYY"));
                data.append('team_info', info);
                data.append('is_active', '1');
                data.append('team_image', logo);
                selectplayer.forEach(element => {
                    data.append(' player_id[]', element.id);  
                });
               
                const response = await ApiConnection.post("teams", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/team-list")
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


const GetData = async ()=>{
    setloading(true)
    try {
        const  response = await ApiConnection.get('player/list')
        if(response?.status == 200){
            console.log(response.data)
            setFilterResult(response?.data?.data?.list)
            setloading(false)
        } else{
            setloading(false)
        }  
    } catch(err){
        setloading(false)
    }
}

useEffect(()=>{
    GetData()
},[])

const onSelect = (selectedList, selectedItem) => {
    setselectplayer(selectedList)
}

const onRemove = (selectedList, removedItem) =>{
    setselectplayer(selectedList)
}


  return (
    <div>
           {loading && <Loader/>}
    <DashboardHeader title="Add a team" />
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
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Team Short Name</label>
                        <input type="text" className="form-control" placeholder="Short Name"
                         value={shortname}
                         onChange={(e)=>setshortname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Select Year of Incorporation</label>
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
                        <label>Upload team Logo:</label>
                        <input type="file" className="form-control"
                         accept="image/png, image/jpeg"
                         onChange={(e)=>setlogo(e.target.files[0])}
                        />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Select Player</label>
                        <Multiselect
                        options={FilterResult} 
                        onSelect={onSelect} 
                        onRemove={onRemove} 
                        displayValue="player_name" 
                        />
                        
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Team Info</label>
                        <textarea className="form-control" placeholder='Message'
                          value={info}
                          onChange={(e)=>setinfo(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg'  onClick={AddHandler}>Add</button>
                    </div>
                </div>
           </div>
    
      </div>
      </div>
        
    </div>
  )
}

export default AddTeam