import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import TableLoader from '../../../utils/TableLoader';

const LogList = () => {

    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [loading, setloading] = useState(false)


    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-server-request-log')
            if(response?.status == 200){
                console.log(response.data)
                setFilterResult(response?.data?.data?.list?.data)
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

    const SearchHandle = (value)=>{
        setsearch(value)  

        // const result = FilterResult && FilterResult.filter(data =>{
        //     return data?.club_name.toLowerCase().match(value.toLowerCase())
        //   })
        //   setFilterResult(result)
    }

 




  return (
    <div>
    
    <DashboardHeader title="Log List" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel">

            <div className='table-top'>
                 <div className='form-group w-25'>
                    <input type='text' className='form-control' placeholder='Enter log'
                    value={search}
                    onChange={(e)=>SearchHandle(e.target.value)}
                    />
                </div>
               
            </div>

<div className='custom-table table-responsive'>
    {!loading ? 

    <table className='table'>
    <thead>
            <th>End Point</th>
   
            <th>Action</th>
            </thead>
        <tbody>
            {FilterResult&&FilterResult.length > 0 ? 
           FilterResult&&FilterResult.map((list, index)=>{
            return (
                <tr key={index}>
                <td>{list?.endpoint}</td>
                <td>
                    <NavLink to={`/admin/log/view/${list?.id}`} className="btn btn-sm btn-outline-primary"><i className="fa-solid fa-eye"></i></NavLink>
             
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

      </div>
      </div>
  
     
    </div>
  )
}

export default LogList