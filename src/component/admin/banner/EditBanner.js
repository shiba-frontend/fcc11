import React, { useEffect, useState,useRef } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import JoditEditor from 'jodit-react';

const EditBanner = () => {

    const [loading, setloading] = useState(false)
    const [description, setdescription] = useState('')
    const [bname, setbname] = useState('')
    const [position, setposition] = useState('')
    const [logo, setlogo] = useState('')
    let {id} = useParams()
    const editor = useRef(null)
    let navigate = useNavigate()

    const Fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`home-banner/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                console.log(editdata)
                setbname(editdata?.banner_name)
                setposition(editdata?.position)
                setdescription(editdata?.banner_text)

            }
          
        } catch(e){
            setloading(false)  
        }
    }

    useEffect(()=>{
        Fetchdata()
    },[])



    const AddHandler = async () => {

        if(bname == ''){
            toast.error("Banner name is required")
        }  else if(description == ''){
            toast.error("Description is required") 
        }else if(logo == ''){
            toast.error("Image is required") 
        }else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('banner_name', bname);
                data.append('position', position);
                data.append('banner_text', description);
                data.append('banner_image', logo);
                data.append('is_active', '1');
                data.append('_method', 'PUT');
                const response = await ApiConnection.post(`home-banner/${id}`, data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/banner")
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
<DashboardHeader title="Edit Banner" />
<AdminMenu />
<div className="container">
 <div className="dashboard-panel custom-table">

      <div className='row'>
      
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Banner Name</label>
                   <input type="text" className="form-control" placeholder="Banner Name"
                     value={bname}
                     onChange={(e)=>setbname(e.target.value)}
                   />
               </div>
           </div>
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Banner Position</label>
                   <select className="form-control"
                     value={position}
                     onChange={(e)=>setposition(e.target.value)}
                   >
                       <option value="">--select--</option>
                       <option value="left">Left</option>
                       <option value="right">Right</option>
                       <option value="top">Top</option>
                       <option value="bottom">Bottom</option>
                   </select>
               </div>
           </div>
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Upload Banner Image</label>
                   <input type="file" className="form-control"
                   accept="image/png, image/jpeg"
                   onChange={(e)=>setlogo(e.target.files[0])}
                   />
               </div>
           </div>
         
           <div className='col-lg-12'>
               <div className='form-group'>
                   <label>Banner Text</label>
                   <JoditEditor
                       ref={editor}
                       value={description}
                       onChange={(content) => setdescription(content)}
                   />
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

export default EditBanner