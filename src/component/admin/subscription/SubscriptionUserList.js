import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from 'moment';





const SubscriptionUserList = () => {

  const [search, setsearch] = useState("")
  const [FilterResult, setFilterResult] = useState([])
  const [loading, setloading] = useState(false)
  const [status, setstatus] = useState('');
  const [rowId, setrowId] = useState('');
  const [statusmodal, setstatusmodal] = useState(false);
  const [pageloading, setpageloading] = useState(false)
  const [deletemodal, setdeletemodal] = useState(false);
  const [numberpagination, setnumberpagination] = useState([])
  const [active, setactive] = useState(0)
  const [Totallength, setTotallength] = useState(0)




  const GetData = async (number, text)=>{
    let endpoint = ''
    if(text !== ''){
        endpoint = `subscriber?search=${text}`
    } else endpoint = `subscriber?page=${number}`

      setloading(true)
      try {
          const  response = await ApiConnection.get(endpoint)
          if(response?.status == 200){
              setFilterResult(response?.data?.data?.data)
              setloading(false)
              setTotallength(response.data?.data?.total)
              var count = response.data?.data?.total / response.data?.data?.per_page
              var roundof = Math.ceil(count)
              let pagArr = []
          
              for(let i=0; i<roundof; i++){
                pagArr.push(i)
              }
              setnumberpagination(pagArr)
          } else{
              setloading(false)
          }  
      } catch(err){
          setloading(false)
      }
  }

  useEffect(()=>{
      GetData(1, '')
  },[])

 const SearchHandle = ()=>{
        if(search == ''){
            toast.error("Please enter a search kewword")
        } else {
            GetData(1, search)
        }
       

    }

    const ResetHandle = ()=>{  
        GetData(1, '')
        setsearch('')
    }

 

    const  DownLoadExcel = async () =>{
      
      setpageloading(true)

      try{
          const  response = await ApiConnection.get('subscription/excel')
          if(response?.status == 200){
              setpageloading(false)
              const link = document.getElementById("Download");
              link.setAttribute("href", response.data?.data?.path);
              link.click();
          } else{
              setpageloading(false)
              toast.error(response?.data?.message)
          } 

      } catch(err){
          setpageloading(false)
          toast.error(err?.response?.data?.message)
      }
  }

  const paginateHandle = (number) =>{
    setactive(number - 1)
    GetData(number)
  }


  return (
    <div>
    {pageloading && <Loader/>}
<DashboardHeader title="User Subscriber" />
<AdminMenu />
<div className="container">
  <div className="dashboard-panel">

        <div className='table-top'>
        <div className='form-group w-50 d-flex'>
                    <input type='text' className='form-control' placeholder='Enter  keyword'
                    value={search}
                    onChange={(e)=>setsearch(e.target.value)}
                    />
                    <button type='submit' onClick={SearchHandle} className='btn btn-primary ml-2'>Search</button>
                    <button onClick={ResetHandle} className='btn btn-info ml-2'>Reset</button>
                </div>
            <div className='form-group'>
                <ul>
                 
                    <li>
                        <button onClick={DownLoadExcel} className='btn btn-outline-info'><i className="fa-solid fa-file-excel"></i> Export </button>
                    </li>
                </ul>
                <a id="Download" download></a>
            </div>
        </div>

<div className='custom-table table-responsive'>
{!loading ? 

<table className='table'>
<thead>
        <th>Name</th>
        <th>Email</th>
        <th>Plan Name</th>
        <th>Subscription Date</th>
        <th>Subscription End</th> 
        <th>Action</th>
        </thead>
    <tbody>
        {FilterResult&&FilterResult.length > 0 ? 
       FilterResult&&FilterResult.map((list, index)=>{
        return (
            <tr key={index}>
            <td>{list?.first_name} {list?.last_name}</td>
            <td>{list?.email}</td>
            <td>{list?.plan_name}</td>
            <td>{moment(list?.subscription_start).format('MM-DD-YYYY')}</td>
            <td>{moment(list?.subscription_end).format('MM-DD-YYYY')}</td>
         
            <td>
            <NavLink to={`/admin/subscription-user/view/${list?.user_id}`} className="btn btn-primary">View History</NavLink>
            </td>
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
<div className='d-flex justify-content-end'>
{Totallength > 20 &&
<ul className='pagination'>
  {numberpagination&&numberpagination.map((number, i)=>{
    return (
      <li key={i}><button className={active == number ? 'active':null} onClick={()=>paginateHandle(number + 1)}>{number + 1}</button></li>
    )
  })}
 
</ul>
}
</div>
  </div>
  </div>


</div>
  )
}

export default SubscriptionUserList