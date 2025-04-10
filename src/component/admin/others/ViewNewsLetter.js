import React, { useEffect, useRef, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import ApiConnection from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import Multiselect from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';

const ViewNewsLetter = () => {

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
            const response = await ApiConnection.get(`newsletter/${id}`)
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




  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View Newsletter" />
<AdminMenu />
<div className="container">
<div className="dashboard-panel custom-table">

    <div className='row'>
    
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Newsletter Name</label>
                 <input type="text" className="form-control" placeholder="Newsletter Name"
                 value={name}
                 onChange={(e)=>setname(e.target.value)}
                 readOnly/>
             </div>
         </div>
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Newsletter Subject</label>
                 <input type="text" className="form-control" placeholder="Newsletter Subject"
                   value={subject}
                   onChange={(e)=>setsubject(e.target.value)}
                   readOnly/>
             </div>
         </div>
         <div className='col-lg-12'>
             <div className='form-group'>
                 <label>Is Shedule</label>
                 <input value="1" type="checkbox" className='ml-2'  onChange={handleChange} checked={checked} readOnly/> 
             </div>
         </div>
         {checked && 
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Date</label>
                 <input type="date" className="form-control"
                    value={date}
                    onChange={(e)=>setdate(e.target.value)}
                    readOnly/>
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
                    readOnly/>
             </div>
         </div>
}
         <div className='col-lg-6'>
             <div className='form-group'>
                 <label>Select Role</label>
                 <select className="form-control"
                 value={roleId}
                 onChange={(e)=>RoleHandle(e.target.value)}
                 disabled>
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
                 displayValue="name" 
                 disabled/>
             </div>
         </div>

         <div className='col-lg-12'>
             <div className='form-group'>
                 <label>Notification Text</label>
                     <textarea className="form-control" placeholder='Message' rows="4"
                      value={content}
                      onChange={(e) => setcontent(e.target.value)}
                    readOnly ></textarea>
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
         
       
    </div>

</div>
</div>
 
</div>
  )
}

export default ViewNewsLetter