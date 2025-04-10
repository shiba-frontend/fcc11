import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE } from '../../../utils/Theme'
import ApiConnection from "../../../utils/ApiConnection";
import Loader from "../../../utils/Loader";
import moment from 'moment';

const LifetimeEaning = () => {


    const [loading, setloading] = useState(false)
    const [data, setdata] = useState([])

    const GetData = async ()=>{
        setloading(true)
       
        try {
            const  response = await ApiConnection.get(`dashboard/get-earning-details`)
            if(response?.status == 200){
                setloading(false)
       
              setdata(response?.data?.data?.data)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
      }


      useEffect(() => {
        GetData()
      },[])








  return (
    <div className='table-responsive dashboard-earning-view mt-4'>
    <table>
        <th>Fantacy Game</th>
        <th>Match</th>
        <th>Match Date</th>
        <th>Team Joined</th>
        <th>Earnings</th>
        <tbody>
           
            <tr>
                <td>ABCD1123</td>
                <td>Raj vs Del</td>
                <td>16-12-2023</td>
                <td>25</td>
                <td>$ 2450</td>
            </tr>
            <tr>
                <td>ABCD1123</td>
                <td>Raj vs Del</td>
                <td>16-12-2023</td>
                <td>25</td>
                <td>$ 2450</td>
            </tr>
            <tr>
                <td>ABCD1123</td>
                <td>Raj vs Del</td>
                <td>16-12-2023</td>
                <td>25</td>
                <td>$ 2450</td>
            </tr>
            <tr>
                <td>ABCD1123</td>
                <td>Raj vs Del</td>
                <td>16-12-2023</td>
                <td>25</td>
                <td>$ 2450</td>
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default LifetimeEaning