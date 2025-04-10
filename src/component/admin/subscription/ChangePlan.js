import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import DataTable from 'react-data-table-component';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';

const ChangePlan = () => {

    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [subsdata, setsubsdata] = useState("")

    const [selectitem, setselectitem] = useState({})
    const [amount, setamount] = useState("")

    let navigate = useNavigate()
    let {id} = useParams()

   console.log(selectitem)

    const GetData = async ()=>{
      setloading(true)
      try {
          const  response = await ApiConnection.get(`subscription`)
          if(response?.status == 200){
              console.log(response.data)

              let TempArr = []

              response?.data?.data?.data?.forEach(element => {
                TempArr.push({
                    'subscription_id':element.id,
                    'plan_name':element.plan_name,
                    'plan_price':element.plan_price
                })
              });

              setFilterResult(TempArr)
              setloading(false)
          } else{
              setloading(false)
          }  
      } catch(err){
          setloading(false)
      }
  }

  const GeCurrentPlan = async ()=>{
    setloading(true)
    try {
        const  response = await ApiConnection.get(`subscriber/${id}`)
        if(response?.status == 200){
            console.log(response.data)
            setsubsdata(response.data?.data?.subscription)
           setselectitem(response.data?.data?.subscription)
            setloading(false)
        } else{
            setloading(false)
        }  
    } catch(err){
        setloading(false)
    }
}

  useEffect(()=>{
      GetData()
      GeCurrentPlan()
  },[])


const ChangHandler = async ()=>{

        setloading(true)
        try{

            var FormData = require('form-data');
            var data = new FormData();
            data.append('subscription_id', selectitem?.subscription_id);
            data.append('user_id', id);
            const response = await ApiConnection.post(`subscriber`, data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                navigate(`/admin/subscription-user/view/${id}`)
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
    {loading && <Loader/>}
 <DashboardHeader title="View History" />
 <AdminMenu />
 <div className="container">
   <div className="dashboard-panel custom-table">
    
   <ul className="purchase-c change-plan">
                    {FilterResult&&FilterResult.map((item) =>{
                        return (
                            <li>
                            <button onClick={()=> {
                                setselectitem(item)
                                setamount(item.plan_price)
                            } }
                            style={{backgroundColor: item.subscription_id == selectitem.subscription_id ? '#1A237E':'#fff'}}
                            
                            >
                                <label style={{color:item.subscription_id == selectitem.subscription_id ? '#fff':'#606060'}}><b>Plan Name:</b> {item.plan_name}</label>
                                <label style={{color:item.subscription_id == selectitem.subscription_id ? '#fff':'#0F55BD'}}><b>Amount:</b>{item.plan_price}</label>
                            </button>
                        </li>
                        )
                    })}
                   
                </ul>
            <div className='themebtn text-center mt-5'>
                <button className='btn btn-success btn-lg' onClick={ChangHandler}>Change Plan</button>
            </div>
   </div>
   </div>
     
 </div>
  )
}

export default ChangePlan