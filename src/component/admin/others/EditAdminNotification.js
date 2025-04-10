import React, { useEffect, useRef, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import ApiConnection from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';

const EditAdminNotification = () => {

    const [content, setcontent] = useState('')
    const [name, setname] = useState('')
    const [subject, setsubject] = useState('')
    const [date, setdate] = useState('')
    const [time, settime] = useState('')
    const [roleId, setroleId] = useState('')
    const [UserId, setUserId] = useState([])
    const [loading, setloading] = useState(false)
    const [RoleList, setRoleList] = useState([])
    const [UserList, setUserList] = useState([])
    const [checked, setChecked] = useState(false); 
    const [selectUserList, setselectUserList] = useState([])
    
    const editor = useRef(null)
    let navigate = useNavigate()
    let {id} = useParams()

    console.log(UserId)

    function handleChange(e) {
        setChecked(e.target.checked);
     }

     
     const getdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`notification/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setname(editdata?.name)
                setsubject(editdata?.subject)
                setcontent(editdata?.content)
                setdate(editdata?.date)
                settime(editdata?.time)
                setChecked(editdata?.is_schedular == 1 ? true : false)
                setroleId(editdata?.role_id)
                GetUserByrole(editdata?.role_id, editdata?.user_id_array)
             
            }
          
        } catch(e){
            setloading(false)  
        }
    }

    const GetUser = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('roles/get-role')
            if(response?.status == 200){
                setRoleList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetUserByrole = async (value, selectuser)=>{
        setroleId(value)
        setloading(true)
        try {
            const  response = await ApiConnection.get(`get-user-list?role_id=${value}`)
            if(response?.status == 200){
                // setUserList(response?.data?.data?.list)
                let TemArr = [];
                response?.data?.data?.list&&response?.data?.data?.list.forEach(element => {
                    TemArr.push({
                        id: element.id,
                        name: element.first_name + ' ' + element.last_name
                    })     
                });

                var arrtwoIds = selectuser.map(id => parseInt(id))
                // Filter arrone based on matching IDs
                var matchingData = TemArr.filter(item => arrtwoIds.includes(item.id));
                setselectUserList(matchingData)
                setUserList(TemArr)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

  
    useEffect(()=>{
        getdata()
        GetUser()
    },[])

    const RoleHandle = async (value)=>{
        setroleId(value)
        setloading(true)
        try {
            const  response = await ApiConnection.get(`get-user-list?role_id=${value}`)
            if(response?.status == 200){
                // setUserList(response?.data?.data?.list)
                let TemArr = [];
                response?.data?.data?.list&&response?.data?.data?.list.forEach(element => {
                    TemArr.push({
                        id: element.id,
                        name: element.first_name + ' ' + element.last_name
                    })     
                });
                setUserList(TemArr)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    
const onSelect = (selectedList, selectedItem) => {
    setUserId(selectedList)
}

const onRemove = (selectedList, removedItem) =>{
    setUserId(selectedList)
}


const AddHandler = async () => {

    if(name == ''){
        toast.error("Name is required")
    } else if(subject == ''){
        toast.error("Subject is required") 
    }  else if(date == ''){
        toast.error("Date is required") 
    } else if(content == ''){
        toast.error("Message is required") 
    } else {
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('name', name);
            data.append('subject', subject);
            data.append('date', date);
            data.append('time', time);
            data.append('role_id', roleId);
            data.append('is_schedular', checked ? 1 : 0);
            data.append('content', content);
            UserId.length > 0 ?
            UserId.forEach(element => {
                data.append('user_id[]', element.id);  
            })
            :
            selectUserList.forEach(element => {
                data.append('user_id[]', element.id);  
            })
            data.append('_method', 'PUT');
            const response = await ApiConnection.post(`notification/${id}`, data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                navigate("/admin/notification-list")
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
<DashboardHeader title="Edit Notification" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

    <div className='row'>
    
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Notification Name</label>
                 <input type="text" className="form-control" placeholder="Notification Name"
                 value={name}
                 onChange={(e)=>setname(e.target.value)}
                 />
             </div>
         </div>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Notification Subject</label>
                 <input type="text" className="form-control" placeholder="Notification Subject"
                   value={subject}
                   onChange={(e)=>setsubject(e.target.value)}
                 />
             </div>
         </div>
         <div className='col-lg-12'>
             <div className='form-group'>
                 <label>Is Shedule</label>
                 <input value="1" type="checkbox" className='ml-2'  onChange={handleChange} checked={checked} /> 
             </div>
         </div>
         {checked && 
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Date</label>
                 <input type="date" className="form-control"
                    value={date}
                    onChange={(e)=>setdate(e.target.value)}
                 />
             </div>
         </div>
}
{checked && 
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Time</label>
                 <input type="time" className="form-control"
                    value={time}
                    onChange={(e)=>settime(e.target.value)}
                 />
             </div>
         </div>
}
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Select Role</label>
                 <select className="form-control"
                 value={roleId}
                 onChange={(e)=>RoleHandle(e.target.value)}
                 >
                 <option value="">--Select--</option>
                     {RoleList&&RoleList.map((item, index)=>{
                         return (
                             <option key={index} value={item?.id}>{item?.role}</option>
                         )
                     })}
                  
                 </select>
             </div>
         </div>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Select user</label>
                 <Multiselect
                 options={UserList} 
                 selectedValues={selectUserList}
                 onSelect={onSelect} 
                 onRemove={onRemove} 
                 displayValue="name" 
                 />
             </div>
         </div>

         <div className='col-lg-12'>
             <div className='form-group'>
                 <label>Notification Text</label>
                     <textarea className="form-control" placeholder='Message' rows="4"
                      value={content}
                      onChange={(e) => setcontent(e.target.value)}
                     ></textarea>
             </div>
         </div>
       
         {/* <div className='col-lg-12'>
             <div className='form-group'>
                 <label>Notification Text</label>
                 <JoditEditor
                     ref={editor}
                     value={content}
                     onChange={(content) => setcontent(content)}
                 />
             </div>
         </div> */}
         
        
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

export default EditAdminNotification