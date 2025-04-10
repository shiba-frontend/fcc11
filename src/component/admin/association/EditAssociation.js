import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';

const EditAssociation = () => {

    const [associationname, setassociationname] = useState("")
    const [shortname, setshortname] = useState("")
    const [year, setyear] = useState(null)
    const [logo, setlogo] = useState("")
    const [info, setinfo] = useState("")
    const [loading, setloading] = useState(false)

    let navigate = useNavigate()
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
                setyear(new Date(`01-01-${editdata?.incorporation_year}`))
                setinfo(editdata?.team_info)
            }
            console.log(response.data)


        } catch(e){
            setloading(false)  
        }
    }

    getdata()

    },[])


    const AddHandler = async () => {

            if(associationname == ''){
                toast.error("League name is required")
            } else if(shortname == ''){
                toast.error("Short name is required") 
            } else if(shortname == ''){
                toast.error("Short name is required") 
            } else if(year == null){
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
                    data.append('club_name', associationname);
                    data.append('club_short_name', shortname);
                    data.append('incorporation_year', moment(year).format("YYYY"));
                    data.append('team_info', info);
                    data.append('is_active', '1');
                    data.append('club_image', logo);
                    data.append('_method', 'PUT');
                    const response = await ApiConnection.post(`clubs/${id}`, data);
                    if(response.status === 200){
                        setloading(false)
                        toast.success(response?.data?.message);
                        navigate("/admin/association")
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
<DashboardHeader title="Edit League" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

     <div className='row'>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>League Name</label>
                  <input type="text" className="form-control" placeholder="League Name"
                  value={associationname}
                  onChange={(e)=>setassociationname(e.target.value)}
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
                  <label>Upload Club Logo:</label>
                  <input type="file" className="form-control"
                  accept="image/png, image/jpeg"
                  onChange={(e)=>setlogo(e.target.files[0])}
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

export default EditAssociation