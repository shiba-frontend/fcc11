import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';

const ManageCommision = () => {


    const [ClubList, setClubList] = useState([])
    const [AssociationAdminList, setAssociationAdminList] = useState([])
    const [AssociationGameAdminList, setAssociationGameAdminList] = useState([])
    
    const [loading, setloading] = useState(false)
    const [team, setteam] = useState('');
    const [pageloading, setpageloading] = useState(false)
    const [TeamList, setTeamList] = useState([])


    console.log(ClubList)


    let navigate = useNavigate()

    let {id} = useParams()

    const GetAssociation = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`manage-commission`)
            if(response?.status == 200){
          
                const newArray = response?.data?.data?.list?.association_list?.map(obj => ({
                    ...obj,
                    ['club_commission']: obj.club_commission
                  }));
            
           

                setClubList(newArray)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetAssociationAdmin = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`manage-commission`)
            if(response?.status == 200){
          
                // const newArray = response?.data?.data?.list?.
                // gameadmin_list
                // ?.map(obj => ({
                //     ...obj,
                //     ['fantasygame_commission']: obj.fantasygame_commission.toString()
                //   }));

                  setAssociationAdminList(response?.data?.data?.list?.gameadmin_list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    const GetAssociationGameAdmin = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`manage-commission`)
            if(response?.status == 200){
          

                  setAssociationGameAdminList(response?.data?.data?.list?.associate_gameadmin_list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
 

    useEffect(()=>{
        GetAssociation()
        GetAssociationAdmin()
        GetAssociationGameAdmin()
    },[])


    const InputHandleAssociation = async (value, key, index, uid, cid)=>{

        var raw = [...ClubList]

        raw[index][key] = value

        setClubList(raw) 

    }

    
    const SubmitAssociation = async (value, key, index, uid, cid)=>{

        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
       
            data.append('user_id', uid);
            data.append('club_id', cid);
            data.append('club_commission', value);
           
            const response = await ApiConnection.post(`manage-commission`, data);
            
            if(response.status === 200){
                setloading(false)
                console.log(response?.data)
                GetAssociation()
                toast.success(response?.data?.message);
            
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

    const InputHandleAssociationAdmin = async (value, key, index, uid, cid)=>{

        var raw = [...AssociationAdminList]

        raw[index][key] = value

        setAssociationAdminList(raw) 

    }

    
    const SubmitAssociationAdmin = async (value, key, index, uid, cid)=>{

        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
       
            data.append('user_id', uid);
            data.append('fantasygame_commission', value);
           
            const response = await ApiConnection.post(`manage-commission`, data);
            
            if(response.status === 200){
                setloading(false)
                console.log(response?.data)
                GetAssociationAdmin()
                toast.success(response?.data?.message);
            
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

    const InputHandleAssociationGameAdmin = async (value, key, index)=>{

        var raw = [...AssociationGameAdminList]

        raw[index][key] = value

        setAssociationGameAdminList(raw) 

    }

    const SubmitAssociationGameAdmin = async (cvalue, fvalue, uid, cid)=>{

        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
       
            data.append('user_id', uid);
            data.append('club_id', cid);
            data.append('club_commission', cvalue);
            data.append('fantasygame_commission', fvalue);
            const response = await ApiConnection.post(`manage-commission`, data);
            
            if(response.status === 200){
                setloading(false)
                console.log(response?.data)
                GetAssociationGameAdmin()
                toast.success(response?.data?.message);
            
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

    


return (
    <div>
    {pageloading && <Loader/>}
<DashboardHeader title="Player Credit score" />
<AdminMenu />
<div className="container">
  <div className="dashboard-panel">

  <Tabs
            defaultActiveKey="aa"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
 <Tab eventKey="aa" title="Association Admin">
 <div className='custom-table table-responsive'>
{!loading ? 

<table className='table'>
<thead>
        <th>Image</th>
        <th>User Name</th>
        <th>Association</th>
        <th>Commision (%)</th>
        <th>Action</th>
        </thead>
    <tbody>
        {ClubList&&ClubList.length > 0 ? 
       ClubList&&ClubList.map((list, index)=>{
        return (
            <tr key={index}>
                <td><img src={BaseUrl.baseurl + list?.image}  width="60" /></td>
            <td>{list?.first_name + ' ' + list?.last_name}</td>
            <td>{list?.club_name}</td>
            <td>
               <input type="text" value={list?.club_commission}
                onChange={(e)=>InputHandleAssociation(e.target.value, 'club_commission', index, list?.id, list?.club_id)} 
               
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    } 
                  }}
                className='form-control w-50' />
            </td>
            <td><button className='btn btn-sm btn-primary' onClick={()=>SubmitAssociation(list?.club_commission, 'club_commission', index, list?.id, list?.club_id)}>Submit</button></td>
        </tr>
        )
       })

       :

       <tr>
        <td colSpan="4" className='text-center'>No record data</td>
       </tr>

    }
     
    </tbody>
</table>
  :
<TableLoader/>

}
</div>
 </Tab>
 <Tab eventKey="fg" title="Fantasy Game Admin">
 <div className='custom-table table-responsive'>
{!loading ? 

<table className='table'>
<thead>
        <th>Image</th>
        <th>User Name</th>
        <th>Commision (%)</th>
        <th>Action</th>
        </thead>
    <tbody>
        {AssociationAdminList&&AssociationAdminList.length > 0 ? 
       AssociationAdminList&&AssociationAdminList.map((list, index)=>{
        return (
            <tr key={index}>
                <td><img src={BaseUrl.baseurl + list?.image}  width="60" /></td>
            <td>{list?.first_name + ' ' + list?.last_name}</td>
           
            <td>
               <input type="text" value={list?.fantasygame_commission}
                onChange={(e)=>InputHandleAssociationAdmin(e.target.value, 'fantasygame_commission', index, list?.id)} 
               
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    } 
                  }}
                className='form-control w-50' />
            </td>
            <td><button className='btn btn-sm btn-primary' onClick={()=>SubmitAssociationAdmin(list?.fantasygame_commission, 'fantasygame_commission', index, list?.id)}>Submit</button></td>
        </tr>
        )
       })

       :

       <tr>
        <td colSpan="4" className='text-center'>No record data</td>
       </tr>

    }
     
    </tbody>
</table>
  :
<TableLoader/>

}
</div>
 </Tab>
 <Tab eventKey="fga" title="Association fantasy Game Admin">
 <div className='custom-table table-responsive'>
{!loading ? 

<table className='table'>
<thead>
        <th>Image</th>
        <th>User Name</th>
        <th>Association</th>
        <th>Association Commision (%)</th>
        <th>Fantasy Game Commision (%)</th>
        <th>Action</th>
        </thead>
    <tbody>
        {AssociationGameAdminList&&AssociationGameAdminList.length > 0 ? 
       AssociationGameAdminList&&AssociationGameAdminList.map((list, index)=>{
        return (
            <tr key={index}>
                <td><img src={BaseUrl.baseurl + list?.image}  width="60" /></td>
            <td>{list?.first_name + ' ' + list?.last_name}</td>
            <td>{list?.club_name}</td>
            <td>
               <input type="text" value={list?.club_commission}
                onChange={(e)=>InputHandleAssociationGameAdmin(e.target.value, 'club_commission', index)} 
               
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    } 
                  }}
                className='form-control w-50' />
            </td>
            <td>
               <input type="text" value={list?.fantasygame_commission}
                onChange={(e)=>InputHandleAssociationGameAdmin(e.target.value, 'fantasygame_commission', index)} 
               
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    } 
                  }}
                className='form-control w-50' />
            </td>
            <td><button className='btn btn-sm btn-primary' onClick={()=>SubmitAssociationGameAdmin(list?.club_commission, list?.fantasygame_commission,  list?.id, list?.club_id)}>Submit</button></td>
        </tr>
        )
       })

       :

       <tr>
        <td colSpan="4" className='text-center'>No record data</td>
       </tr>

    }
     
    </tbody>
</table>
  :
<TableLoader/>

}
</div>
 </Tab>
    </Tabs>
 


{/* <div className='form-group text-center'>
        <button className='btn btn-success btn-lg' onClick={UpdateHandle}>Update</button>
   </div> */}
  </div>
  </div>


</div>
  )
}

export default ManageCommision
