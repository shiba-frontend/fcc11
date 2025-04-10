import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';

const ViewPlayer = () => {
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

    const [DiciplineList, setDiciplineList] = useState([])
    const [BowTypeList, setBowTypeList] = useState([])
    const [countryList, setcountryList] = useState([])
    const [FilterResult, setFilterResult] = useState([])
    let navigate = useNavigate()
    let {id} = useParams()



    const GetDeciplineList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-discipline')
            if(response?.status == 200){
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
                setcountryList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const Fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`player/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                console.log(editdata)
                setname(editdata?.player_name)
                setdicipline(editdata?.discipline)
                setbathand(editdata?.batting_hand)
                setbowhand(editdata?.bowling_hand)
                setbowtype(editdata?.bowling_type?.id)
                setcountry(editdata?.nationality?.id)
                setdob(new Date(editdata?.dob))
                setlogo(editdata?.player_image)
                setFilterResult(editdata?.teams)
            }
          
        } catch(e){
            setloading(false)  
        }
    }
  

    useEffect(()=>{
        GetDeciplineList()
        GetBowlingTypeList()
        GetCountryList()
        Fetchdata()
    },[])


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View a player" />
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
                readOnly />
             </div>
         </div>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Discipline</label>
                 <select className="form-control"
                     value={dicipline} 
                     onChange={(e)=>setdicipline(e.target.value)}
                     disabled>
                         <option>--Select--</option>
                         {DiciplineList&&DiciplineList.map((result,i)=>{
                             return (
                                 <option key={i} value={result?.id}>{result?.discipline}</option>
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
                 disabled> 
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
                disabled >
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
                     disabled>
                         <option>--Select--</option>
                         {BowTypeList&&BowTypeList.map((result,i)=>{
                             return (
                                 <option key={i} value={result?.id}>{result?.type_name}</option>
                             )
                         })}
                         
                     </select>
                
             </div>
         </div>
         <div className='col-lg-12'>
             <div className='form-group'>
                 <label className='d-block'>Player List</label>
                 {FilterResult?.map((list, i)=>{
                return <span className='badge bg-primary text-white mr-2' key={i}>{list?.team_name} </span>
            })}
             </div>
         </div>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Nationality</label>

                 <select className="form-control"
                        value={country}
                        onChange={(e)=>setcountry(e.target.value)}
                     disabled>
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
                 <DatePicker maxDate={new Date()} selected={dob} onChange={(date) => setdob(date)} className="form-control" readOnly />
             </div>
         </div>
        
         <div className='col-lg-12'>
              <div className='form-group'>
                  <label className='d-block'>Player Image:</label>
                 <img src={BaseUrl.baseurl + logo} width="200" />
              </div>
          </div>
         
         
    </div>

</div>
</div>
 
</div>
  )
}

export default ViewPlayer