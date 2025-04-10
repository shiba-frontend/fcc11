import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';

const EditFaqCategory = () => {

    const [catname, setcatname] = useState("")
    const [loading, setloading] = useState(false)
  
    let navigate = useNavigate()
    let {id} = useParams()
    const fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`faq-category/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setcatname(editdata?.category_name)
            }

        } catch(e){
            setloading(false)  
        }
    }


    useEffect(()=>{
        fetchdata()
    },[])
  
  
    const AddHandler = async () => {
  
            if(catname == ''){
                toast.error("Category name is required")
            } else {
                setloading(true)
                try{
                    var FormData = require('form-data');
                    var data = new FormData();
                    data.append('category_name', catname);
                    data.append('is_active', '1');
                    data.append('_method', 'PUT');
                    const response = await ApiConnection.post(`faq-category/${id}`, data);
                    if(response.status === 200){
                        setloading(false)
                        toast.success(response?.data?.message);
                        navigate("/admin/faq-category")
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
<DashboardHeader title="Add faq category" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

     <div className='row'>
          <div className='col-lg-6'>
              <div className='form-group'>
                  <label>Edit Category Name</label>
                  <input type="text" className="form-control" placeholder="Category Name"
                  value={catname}
                  onChange={(e)=>setcatname(e.target.value)}
                  />
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

export default EditFaqCategory