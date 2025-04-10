import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate , useParams} from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import Multiselect from 'multiselect-react-dropdown';

const EditTeam = () => {
    const [teamname, setteamname] = useState("")
    const [shortname, setshortname] = useState("")
    const [year, setyear] = useState(null)
    const [logo, setlogo] = useState("")
    const [info, setinfo] = useState("")
    const [loading, setloading] = useState(false)
    const [FilterResult, setFilterResult] = useState([])
    const [selectedplayer, setselectedplayer] = useState([])

console.log(selectedplayer)


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
                setyear(editdata?.incorporation_year !== null ? new Date(`01-01-${editdata?.incorporation_year}`) : new Date())
                setinfo(editdata?.team_info)
                setselectedplayer(editdata?.players)
            }
          
        } catch(e){
            setloading(false)  
        }
    }

    const GetPlayer = async ()=>{
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

    getdata()
    GetPlayer()

    },[])

    // const selectedPlayer = () => {  
    //     return (selectedplayer.map(data => ({
    //         player_name: data.player_name, 
    //         value:data.id
    //     })
    // ))  
    // }

    const onSelect = (selectedList, selectedItem) => {
       var raws = [...selectedplayer]
      raws = selectedList
      setselectedplayer(raws)
    }
    
    const onRemove = (selectedList, removedItem) =>{
        var raws = [...selectedplayer]
        raws = selectedList
        setselectedplayer(raws)
    }
    

    const AddHandler = async () => {

        if(teamname == ''){
            toast.error("Team name is required")
        } else if(shortname == ''){
            toast.error("Short name is required") 
        }  else if(year == null){
            toast.error("Year is required") 
        } else if(info == ''){
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
                selectedplayer.forEach(element => {
                    data.append(' player_id[]', element.id);  
                });
                data.append('_method', 'PUT');
                const response = await ApiConnection.post(`teams/${id}`, data);
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
                        selectedValues={selectedplayer}
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
                 <button className='btn btn-success btn-lg'  onClick={AddHandler}>Update</button>
             </div>
         </div>
    </div>

</div>
</div>
 
</div>
  )
}

export default EditTeam