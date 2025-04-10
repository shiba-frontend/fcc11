import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';

const AddPlayer = () => {
    const [loading, setloading] = useState(false)
    const [team, setteam] = useState("")
    const [dob, setdob] = useState(null)
    const [logo, setlogo] = useState("")
    const [name, setname] = useState("")
    const [dicipline, setdicipline] = useState("")
    const [bathand, setbathand] = useState("")
    const [bowhand, setbowhand] = useState("")
    const [bowtype, setbowtype] = useState("")
    const [country, setcountry] = useState("")
    const [TeamList, setTeamList] = useState([])
    const [DiciplineList, setDiciplineList] = useState([])
    const [BowTypeList, setBowTypeList] = useState([])
    const [countryList, setcountryList] = useState([])

    let navigate = useNavigate()

    const GetTeamList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('teams/list')
            if(response?.status == 200){
                console.log(response.data)
                setTeamList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetDeciplineList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-discipline')
            if(response?.status == 200){
                console.log(response.data)
                setDiciplineList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetBowlingTypeList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-bowling-type')
            if(response?.status == 200){
                console.log(response.data)
                setBowTypeList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetCountryList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-countries')
            if(response?.status == 200){
                console.log(response.data)
                setcountryList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
  

    useEffect(()=>{
        GetTeamList()
        GetDeciplineList()
        GetBowlingTypeList()
        GetCountryList()
    },[])



    const AddHandler = async () => {

        if(name == ''){
            toast.error("Player name is required")
        } else if(dicipline == ''){
            toast.error("Dicipline is required") 
        } else if(bathand == ''){
            toast.error("Batting hand is required") 
        }else if(bowhand == ''){
            toast.error("Bowling hand is required") 
        }else if(bowtype == ''){
            toast.error("Bowling type is required") 
        } else if(country == ''){
            toast.error("Country is required") 
        }else if(dob == null){
            toast.error("DOB is required") 
        }else if(logo == ''){
            toast.error("Image is required") 
        }else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('player_name', name);
                data.append('discipline', dicipline);
                data.append('batting_hand', bathand);
                data.append('bowling_hand', bowhand);
                data.append('bowling_type', bowtype);
                data.append('dob', moment(dob).format("YYYY-MM-DD"));
                data.append('nationality', country);
                data.append('is_active', '1');
                data.append('player_image', logo);
                const response = await ApiConnection.post("player", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/player-list")
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
    <DashboardHeader title="Add a player" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Player Name</label>
                        <input type="text" className="form-control" placeholder="Player Name"
                        value={name}
                        onChange={(e)=>setname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Discipline</label>
                        <select className="form-control"
                            value={dicipline} 
                            onChange={(e)=>setdicipline(e.target.value)}
                            >
                                <option>--Select--</option>
                                {DiciplineList&&DiciplineList.map((result,i)=>{
                                    return (
                                        <option key={i} value={result?.discipline}>{result?.discipline}</option>
                                    )
                                })}
                                
                            </select>
               
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Batting Hand</label>
                        <select className="form-control"
                        value={bathand}
                        onChange={(e)=>setbathand(e.target.value)}
                        > 
                            <option value="">--Select--</option>
                            <option value="Left">Left</option>
                            <option value="Right">Right</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Bowling Hand</label>
                        <select className="form-control"
                        value={bowhand}
                        onChange={(e)=>setbowhand(e.target.value)}
                        >
                            <option value="">--Select--</option>
                             <option value="Left">Left</option>
                            <option value="Right">Right</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Bowling Type</label>
                        <select className="form-control"
                                value={bowtype}
                                onChange={(e)=>setbowtype(e.target.value)}
                            >
                                <option>--Select--</option>
                                {BowTypeList&&BowTypeList.map((result,i)=>{
                                    return (
                                        <option key={i} value={result?.id}>{result?.type_name}</option>
                                    )
                                })}
                                
                            </select>
                       
                    </div>
                </div>
                {/* <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Team</label>
                        <select className="form-control"
                            value={team}
                            onChange={(e)=>setteam(e.target.value)}
                            >
                                <option>--Select--</option>
                                {TeamList&&TeamList.map((result,i)=>{
                                    return (
                                        <option key={i} value={result?.id}>{result?.team_name}</option>
                                    )
                                })}
                                
                            </select>
                    </div>
                </div> */}
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Nationality</label>

                        <select className="form-control"
                               value={country}
                               onChange={(e)=>setcountry(e.target.value)}
                            >
                                <option>--Select--</option>
                                {countryList&&countryList.map((result,i)=>{
                                    return (
                                        <option key={i} value={result?.id}>{result?.name}</option>
                                    )
                                })}
                                
                            </select>

                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Date of birth</label>
                        <DatePicker maxDate={new Date()} selected={dob} onChange={(date) => setdob(date)} className="form-control" />
                    </div>
                </div>
               
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Upload image:</label>
                        <input type="file" className="form-control"
                            accept="image/png, image/jpeg"
                            onChange={(e)=>setlogo(e.target.files[0])}
                        />
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

export default AddPlayer