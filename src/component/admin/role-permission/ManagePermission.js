import React, { useEffect, useRef, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useParams } from 'react-router-dom';
import ApiConnection from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';

// const data = [
//     {
//         id:1,
//         label:'Team Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:2,
//         label:'Tournament Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:3,
//         label:'Player Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:4,
//         label:'Matches Schedule Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:5,
//         label:'Player Credit Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:6,
//         label:'Match Score Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:7,
//         label:'Fantasy Games Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:8,
//         label:'View Fantasy Games Result',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:9,
//         label:'Earnings',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:10,
//         label:'Fantasy Game Winners and Payouts',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:11,
//         label:'Association Admin Sub-User Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:12,
//         label:'Coupon Management',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:13,
//         label:'Reports',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
//     {
//         id:14,
//         label:'Login Log',
//         isview:true,
//         isupdate:false,
//         isadd:false,
//     },
    
// ]

const ManagePermission = () => {
    const [loading, setloading] = useState(false)
const [menulist, setmenulist] = useState([])

let {id} = useParams()

function include(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == obj) return true;
    }
  }


const GetMenupermision = async ()=>{
    setloading(true)
    try {
        const  response = await ApiConnection.get(`menupermission/${id}`)
        if(response?.status == 200){

            var value = response.data?.data?.menu

            var TmpArray = []

            value.forEach(element => {
                    var foundupdate = null
                    var foundadd = null
                    var foundview = null
                    var founddell = null
                if(element.access.length > 0){
                    foundadd = include(element.access, 1); 
                    foundupdate = include(element.access, 2); 
                    foundview = include(element.access, 3); 
                    founddell = include(element.access, 4); 
                }

             

                TmpArray.push({
                    id:element.id,
                    label:element.name,
                    isadd:foundadd ? true : false,
                    isupdate:foundupdate ? true : false,
                   
                    isview:foundview ? true : false,
                    isdelete:founddell ? true : false,
                   
                })
            });

            setmenulist(TmpArray)
     


            setloading(false)
        } else{
            setloading(false)
        }  
    } catch(err){
        setloading(false)
    }
}

useEffect(()=>{
    GetMenupermision()
},[])


//console.log(menulist)

const ViewHandle = async (event,key,index, rid) => {

    const value = event.target.value;
    const isChecked = event.target.checked;
    var Arr = [...menulist]
    if (isChecked) {
        Arr[index][key] = true
        setmenulist(Arr);
        var _isadd = ''

        if(key == 'isadd'){
          _isadd = 1
        } else if(key == 'isupdate'){
          _isadd = 2
        } else if(key == 'isview'){
            _isadd = 3
          } else if(key == 'isdelete'){
            _isadd = 4
          }
  
  
        try{
            setloading(true)
          var FormData = require('form-data');
          var data = new FormData();
          data.append('user_id', id);
          data.append('menu_id', rid);
          data.append('access', _isadd);
          data.append('action', 'grant');
  
          
          const response = await ApiConnection.post("menupermission", data);
          if(response.status === 200){
              setloading(false)
              toast.success(response?.data?.message);
              GetMenupermision()
          } else {
              setloading(false)
          }
  
      } catch(err){
          setloading(false)
          if(err.response?.status === 422){
                toast.error(err.response?.data?.message);   
            
          }
      }
      } else {
        Arr[index][key] = false
        setmenulist(Arr);
        var _isadd = ''

        if(key == 'isadd'){
            _isadd = 1
          } else if(key == 'isupdate'){
            _isadd = 2
          } else if(key == 'isview'){
              _isadd = 3
            } else if(key == 'isdelete'){
              _isadd = 4
            }
  
  
        try{
            setloading(true)
          var FormData = require('form-data');
          var data = new FormData();
          data.append('user_id', id);
          data.append('menu_id', rid);
          data.append('access', _isadd);
          data.append('action', 'revoke');
  
          
          const response = await ApiConnection.post("menupermission", data);
          if(response.status === 200){
              setloading(false)
              toast.success(response?.data?.message);
              GetMenupermision()
          } else {
              setloading(false)
          }
  
      } catch(err){
          setloading(false)
          if(err.response?.status === 422){
                toast.error(err.response?.data?.message);   
            
          }
      }
      }

     
}





  return (
    <div>
         {loading && <Loader/>}
    <DashboardHeader title="Access Management" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label></label>
                    </div>
                </div>
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                        <b>Add</b>
                    </div>
                </div>
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                        <b>Update</b>
                    </div>
                </div>
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                        <b>View</b>
                    </div>
                </div>
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                        <b>Delete</b>
                    </div>
                </div>
               
           </div>
           {menulist.map((item,index)=>{
            return (
                <div className='row' key={index}>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>{item.label}</label>
                    </div>
                </div>
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                    <input type='checkbox'
                     name={`role${index}`} 
                     checked={item.isadd ? true : false} 
                     onChange={(e)=>ViewHandle(e, 'isadd', index, item.id)}
                     />
                    </div>
                </div>
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                    <input type='checkbox'
                     name={`role${index}`} 
                     checked={item.isupdate ? true : false}
                     onChange={(e)=>ViewHandle(e, 'isupdate', index, item.id)}
                     />
                    </div>
                </div>
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                        <input type='checkbox' 
                        name={`role${index}`} 
                        checked={item.isview ? true : false} 
                        onChange={(e)=>ViewHandle(e, 'isview', index, item.id)}
                        />
                    </div>
                </div>
               
                <div className='col-lg-1'>
                    <div className='form-group text-center'>
                        <input type='checkbox' 
                        name={`role${index}`} 
                        checked={item.isdelete ? true : false} 
                        onChange={(e)=>ViewHandle(e, 'isdelete', index, item.id)}
                        />
                    </div>
                </div>
           </div>
            )
           })}
          
          {/* <div className='form-group'>
                        <button className='btn btn-success btn-lg'>Update</button>
                    </div> */}
      </div>
      </div>
        
    </div>
  )
}

export default ManagePermission