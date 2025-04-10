import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';

const ViewAssessmentAdmin = () => {

    const [club, setclub] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [logo, setlogo] = useState("")
    const [loading, setloading] = useState(false)
    const [FilterResult, setFilterResult] = useState([])

    let navigate = useNavigate()
    let {id} = useParams()

    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('clubs')
            if(response?.status == 200){
                console.log(response.data)
                setFilterResult(response?.data?.data?.data)
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
            const response = await ApiConnection.get(`club-associate/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data[0]
                setclub(editdata?.club[0]?.id)
                setfname(editdata?.first_name)
                setlname(editdata?.last_name)
                setemail(editdata?.email)
                setphone(editdata?.phone)
                setlogo(editdata?.image)
            }
            console.log(response.data)


        } catch(e){
            setloading(false)  
        }
    }

useEffect(()=>{
    GetData()
    fetchdata()
},[])


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View league admin" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

     <div className='row'>
     <div className='col-lg-6'>
              <div className='form-group'>
                  <label>League</label>
                  <select className="form-control"
                  value={club}
                  onChange={(e)=>setclub(e.target.value)}
                  disabled
                  >
                      {FilterResult&&FilterResult.map((result,i)=>{
                          return (
                              <option key={i} value={result?.id}>{result?.club_name}</option>
                          )
                      })}
                    
                  </select>
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>First Name</label>
                  <input type="text" className="form-control" placeholder="First Name"
                  value={fname}
                  onChange={(e)=>setfname(e.target.value)}
                 readOnly />
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Last Name</label>
                  <input type="text" className="form-control" placeholder="Last Name"
                   value={lname}
                   onChange={(e)=>setlname(e.target.value)}
                   readOnly />
              </div>
          </div>
          <div className='col-lg-6'>  
              <div className='form-group'>
                  <label>Email</label>
                  <input type="email" className="form-control" placeholder="Email"
                     value={email}
                     onChange={(e)=>setemail(e.target.value)}
                     readOnly />
              </div>
          </div>
          <div className='col-lg-6'>  
              <div className='form-group'>
                  <label>Phone</label>
                  <input type="text" className="form-control" placeholder="Phone"
                     value={phone}
                     onChange={(e)=>setphone(e.target.value)}
                     onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    maxLength="10"
                    readOnly/>
              </div>
          </div>
          <div className='col-lg-12'>
              <div className='form-group'>
                  <label className='d-block'>Club Logo:</label>
                 <img src={BaseUrl.baseurl + logo} />
              </div>
          </div>
   
     </div>

</div>
</div>

</div>
  )
}

export default ViewAssessmentAdmin