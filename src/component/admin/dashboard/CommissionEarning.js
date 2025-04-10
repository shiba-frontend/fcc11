import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE } from '../../../utils/Theme'
import ApiConnection from "../../../utils/ApiConnection";
import Loader from "../../../utils/Loader";
import moment from 'moment';

const CommissionEarning = () => {


    const [loading, setloading] = useState(false)
    const [data, setdata] = useState([])

    const GetData = async ()=>{
        setloading(true)
       
        try {
            const  response = await ApiConnection.get(`dashboard/get-commission-details?for=lastgame`)
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
    <div className='dashboard-earning-view'>
    <ul>
        <li>
            <b>Fantasy Game</b>
            <span>RajasDel1500</span>
        </li>
        <li>
            <b>Match</b>
            <span>Raj Vs. Del </span>
        </li>
        <li>
            <b>Match Date</b>
            <span>16-12-23 </span>
        </li>
        <li>
            <b>Teams Joined</b>
            <span>20 </span>
        </li>
        <li>
            <b>Platform Commission</b>
            <span>$ 2000 </span>
        </li>
    </ul>
    <div className='table-responsive mt-5'>
        <table>
            <th></th>
            <th>User Name</th>
            <th>Team</th>
            <th>Credit</th>
            <tbody>
                <tr>
                    <td>
                        <img src={IMAGE.player_1} className='earning-user-img' />
                    </td>
                    <td>ABCD1123</td>
                    <td>T1</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>
                        <img src={IMAGE.player_1} className='earning-user-img' />
                    </td>
                    <td>ABCD1123</td>
                    <td>T1</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>
                        <img src={IMAGE.player_1} className='earning-user-img' />
                    </td>
                    <td>ABCD1123</td>
                    <td>T1</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>
                        <img src={IMAGE.player_1} className='earning-user-img' />
                    </td>
                    <td>ABCD1123</td>
                    <td>T1</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>
                        <img src={IMAGE.player_1} className='earning-user-img' />
                    </td>
                    <td>ABCD1123</td>
                    <td>T1</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>
                        <img src={IMAGE.player_1} className='earning-user-img' />
                    </td>
                    <td>ABCD1123</td>
                    <td>T1</td>
                    <td>25</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  )
}

export default CommissionEarning