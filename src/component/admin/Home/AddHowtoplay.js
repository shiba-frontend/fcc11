import React, { useEffect, useState,useRef } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import JoditEditor from 'jodit-react';

const AddHowtoplay = () => {
    const [loading, setloading] = useState(false)
    const [description, setdescription] = useState('')
    const [title, settitle] = useState('')
    const [logo, setlogo] = useState('')

    const editor = useRef(null)
    let navigate = useNavigate()
    const AddHandler = async () => {

        if(title == ''){
            toast.error("Title is required")
        }  else if(description == ''){
            toast.error("Description is required") 
        }else if(logo == ''){
            toast.error("Image is required") 
        }else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('title', title);
  
                data.append('description', description);
  
                data.append('image', logo);
                data.append('is_active', '1');
                const response = await ApiConnection.post("howtoplay", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/howtoplay")
                } else {
                    setloading(false)
                }

            } catch(err){
                setloading(false)
                if(err.response.status === 422){
                      toast.error(err.response?.data?.message);   
                  
                } if(err.response.status === 500){
                    toast.error(err.response?.data?.message);   
                
              }
        }
            

        }

   


}


  return (
    <div>
         {loading && <Loader/>}
    <DashboardHeader title="Add" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
           
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Name"
                          value={title}
                          onChange={(e)=>settitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Image</label>
                        <input type="file" className="form-control"
                        accept="image/png, image/jpeg"
                        onChange={(e)=>setlogo(e.target.files[0])}
                        />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea placeholder='Description' className="form-control"     value={description}
                          onChange={(e)=>setdescription(e.target.value)}></textarea>
                    </div>
             </div>
                
              
              
               
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={AddHandler}>Add</button>
                    </div>
                </div>
           </div>
    
      </div>
      </div>
        
    </div>
  )
}

export default AddHowtoplay