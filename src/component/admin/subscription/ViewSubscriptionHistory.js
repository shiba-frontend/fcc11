import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import DataTable from 'react-data-table-component';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import Loader from '../../../utils/Loader';


const ViewSubscriptionHistory = () => {
    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)
    const [subsdata, setsubsdata] = useState("")

    let navigate = useNavigate()
    let {id} = useParams()

    const columns = [
        {
            name: 'Start Date',
            selector: row => moment(row.subscription_start ).format('MM-DD-YYYY'),
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row =>moment(row.subscription_end ).format('MM-DD-YYYY'),
            sortable: true,
        },
        
        {
            name: 'Amount',
            selector: row => row.payable_amount,
            sortable: true,
        },
        {
          name: 'Coupon Discount',
          selector: row => row.coupon_discount,
      },
      
    ];


    const GetData = async ()=>{
      setloading(true)
      try {
          const  response = await ApiConnection.get(`subscriber/${id}`)
          if(response?.status == 200){
              console.log(response.data)
              setsubsdata(response.data?.data?.subscription)
              setFilterResult(response?.data?.data?.history
              )
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
  },[])


  return (
    <div>
       {loading && <Loader/>}
    <DashboardHeader title="View History" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">
      <h4>Curren Plan</h4>  
        <p><b>Name:</b> {subsdata?.first_name} {subsdata?.last_name}</p>
        <p><b>Email:</b>   {subsdata?.email} </p>
        <p><b>Plan:</b>   {subsdata?.plan_name} </p>
        <p><b>Subscription Date:</b>  {moment(subsdata?.subscription_start).format('MM-DD-YYYY')}  </p>
        <p><b>Subscription Ends:</b> {moment(subsdata?.subscription_end).format('MM-DD-YYYY')}  </p>
        <p>
            <NavLink className="btn btn-primary" to={`/admin/subscription-user/change/${subsdata?.user_id}`}>Change Plan</NavLink>
        </p>
        <h4>Billing History</h4>    
      <DataTable
            columns={columns}
            data={FilterResult}
            pagination
            highlightOnHover
            
        />
      </div>
      </div>
        
    </div>
  )
}

export default ViewSubscriptionHistory