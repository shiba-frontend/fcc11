import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import moment from 'moment';

const ViewAssociation = () => {
    const [associationname, setassociationname] = useState("")
    const [shortname, setshortname] = useState("")
    const [year, setyear] = useState(null)
    const [logo, setlogo] = useState("")
    const [info, setinfo] = useState("")
    const [loading, setloading] = useState(false)

    let {id} = useParams()

    useEffect( ()=>{

        const getdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`clubs/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setassociationname(editdata?.club_name)
                setshortname(editdata?.club_short_name)
                setyear(editdata?.incorporation_year)
                setinfo(editdata?.team_info)
                setlogo(editdata?.club_image)
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
<DashboardHeader title="View League" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

     <div className='row'>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>League Name</label>
                  <input type="text" className="form-control" placeholder="Association Name"
                  value={associationname}
                  onChange={(e)=>setassociationname(e.target.value)}
                  readOnly
                  />
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Short Name</label>
                  <input type="text" className="form-control" placeholder="Short Name"
                  value={shortname}
                  onChange={(e)=>setshortname(e.target.value)}
                  readOnly
                  />
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
                          readOnly
                        />

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
                  <label className='d-block'>League Logo:</label>
                 <img src={BaseUrl.baseurl + logo} />
              </div>
          </div>
     </div>

</div>
</div>

</div>
  )
}

export default ViewAssociation