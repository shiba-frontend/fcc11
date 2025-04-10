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

const AddTestimonial = () => {
    const [loading, setloading] = useState(false)
    const [description, setdescription] = useState('')
    const [name, setname] = useState('')
    const [rating, setrating] = useState('')
    const [designation, setdesignation] = useState('')
    const [logo, setlogo] = useState('')

    const editor = useRef(null)
    let navigate = useNavigate()
    const AddHandler = async () => {

        if(name == ''){
            toast.error("Name is required")
        }  else if(description == ''){
            toast.error("Description is required") 
        }else if(logo == ''){
            toast.error("Image is required") 
        }else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('author', name);
                data.append('designation', designation);
                data.append('description', description);
                data.append('stars', rating);
                data.append('image', logo);
                data.append('is_active', '1');
                const response = await ApiConnection.post("testimonials", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/testimonial")
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
    <DashboardHeader title="Add Testimonial" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
           
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Author Name</label>
                        <input type="text" className="form-control" placeholder="Name"
                          value={name}
                          onChange={(e)=>setname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Author Designation</label>
                        <input type="text" className="form-control" placeholder="Designation"
                          value={designation}
                          onChange={(e)=>setdesignation(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Rating</label>
                        <select className="form-control"
                          value={rating}
                          onChange={(e)=>setrating(e.target.value)}
                        >
                            <option value="">--select--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Author Image</label>
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

export default AddTestimonial