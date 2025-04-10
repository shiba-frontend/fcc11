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

const EditCms = () => {
    const [loading, setloading] = useState(false)
    const [pagename, setpagename] = useState('')
    const [slug, setslug] = useState('')
    const [pagetitle, setpagetitle] = useState('')
    const [logo, setlogo] = useState('')
    const [description, setdescription] = useState('')
    const [parentpage, setparentpage] = useState('')
    const [parentpageList, setparentpageList] = useState([])

    const editor = useRef(null)
    let navigate = useNavigate()
    let {id} = useParams()

    const pageList = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('cms/get-cms-page-list')
            if(response?.status == 200){  
                setloading(false)
               setparentpageList(response.data?.data?.list)
                
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
            const response = await ApiConnection.get(`cms/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                console.log(editdata)
                setpagename(editdata?.page_name)
                setpagetitle(editdata?.page_title)
                setdescription(editdata?.description)
                setparentpage(editdata?.parent_id)
                setslug(editdata?.page_slug)
            }
          
        } catch(e){
            setloading(false)  
        }
    }

    useEffect(()=>{
        pageList()
        Fetchdata()
    },[])


    
    const AddHandler = async () => {

        if(pagename == ''){
            toast.error("Page name is required")
        }  else if(description == ''){
            toast.error("Description is required") 
        }else if(logo == ''){
            toast.error("Image is required") 
        }else {
            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('page_name', pagename);
                data.append('page_title', pagetitle);
                data.append('description', description);
                data.append('parent_id', parentpage);
                data.append('image', logo);
                data.append('is_active', '1');
                data.append('_method', 'PUT');
                const response = await ApiConnection.post(`cms/${id}`, data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    navigate("/admin/cms")
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
<DashboardHeader title="Edit CMS" />
<AdminMenu />
<div className="container">
 <div className="dashboard-panel custom-table">

      <div className='row'>
      
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Page Name</label>
                   <input type="text" className="form-control" placeholder="Page Name"
                   value={pagename}
                   onChange={(e)=>setpagename(e.target.value)}
                   />
               </div>
           </div>
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Slug</label>
                   <input type="text" className="form-control" placeholder="Slug"
                   value={slug}
                   onChange={(e)=>setslug(e.target.value)}
                   />
               </div>
           </div>
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Page Title</label>
                   <input type="text" className="form-control" placeholder="Page Title"
                   value={pagetitle}
                   onChange={(e)=>setpagetitle(e.target.value)}
                   />
               </div>
           </div>
           
           <div className='col-lg-12'>
               <div className='form-group'>
                   <label>Description</label>
                   <JoditEditor
                       ref={editor}
                       value={description}
                       onChange={(content) => setdescription(content)}
                   />
               </div>
           </div>
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Select Parent Page</label>
                   <select className="form-control" value={parentpage}
                   onChange={(e)=>setparentpage(e.target.value)}>
                       <option>--select--</option>
                       {parentpageList&&parentpageList.map((list,i)=>{
                           return (
                               <option key={i} value={list?.id}>{list?.page_name}</option>
                           )
                       })}
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
                   <button className='btn btn-success btn-lg' onClick={AddHandler}>Update</button>
               </div>
           </div>
      </div>

 </div>
 </div>
   
</div>
  )
}

export default EditCms