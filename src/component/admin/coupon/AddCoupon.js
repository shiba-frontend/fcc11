import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';

const AddCoupon = () => {

    const [loading, setloading] = useState(false)
   
    const [cname, setcname] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [toDate, settoDate] = useState(null)
    const [dtype, setdtype] = useState("percentage")
    const [amount, setamount] = useState("")
    const [user, setuser] = useState("")
    const [applicablefor, setapplicablefor] = useState("match")
    const [match, setmatch] = useState("")
    const [tournament, settournament] = useState("")

    const [matchList, setmatchList] = useState([])
    const [tournamentList, settournamentList] = useState([])

  

    let navigate = useNavigate()


    const GetTournament = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('tournament/get-tournament-list')
            if(response?.status == 200){
                settournamentList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetMatch = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('match/get-match-list')
            if(response?.status == 200){
                setmatchList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

useEffect(()=>{
    GetMatch()
    GetTournament()
},[])


const AddHandler = async () => {

    if(cname == ''){
        toast.error("Coupon name is required")
    } else if(amount == ''){
        toast.error("Amount is required")
    } else if(toDate == null){
        toast.error("Valid to is required")
    } else if(user == ''){
        toast.error("User is required")
    }   else {
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('coupon_name', cname);
            data.append('valid_from',moment(startDate).format('YYYY-MM-DD') );
            data.append('valid_to', moment(toDate).format('YYYY-MM-DD'));
            data.append('discount_type', dtype === 'percentage' ? 0 :1);
            data.append('amount', amount);
            data.append('valid_users', user);
            // data.append('applicable_for', applicablefor);
            // data.append('applicable_for_id', applicablefor === 'match' ? match : tournament);
            data.append('is_active', '1');
            
            const response = await ApiConnection.post("coupon", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                navigate("/admin/coupon")
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
    <DashboardHeader title="Add Coupon" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
           
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Coupon Name</label>
                        <input type="text" className="form-control" placeholder="Coupon Name"
                        value={cname}
                        onChange={(e)=>setcname(e.target.value)}
                        />
                    </div>
                </div>
               
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Valid From</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Valid To</label>
                        <DatePicker minDate={startDate} selected={toDate} onChange={(date) => settoDate(date)} className="form-control" />
                    </div>
                </div>
               
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Type of Discount</label>
                        <br></br>
                        <input type="radio" name="type" value="percentage" checked={dtype === "percentage"} onChange={(e)=>setdtype(e.target.value)} /> Percentage &nbsp; &nbsp; &nbsp;
                        <input type="radio" name="type" value="flat" checked={dtype === "flat"} onChange={(e)=>setdtype(e.target.value)} /> Flat
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Amount</label>
                        <input type="text" className="form-control" placeholder="Amount"
                            value={amount}
                            onChange={(e)=>setamount(e.target.value)}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Valid Users</label>
                        <input type="text" className="form-control" placeholder="Valid Users"
                        value={user}
                        onChange={(e)=>setuser(e.target.value)}
                        onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                        />
                    </div>
                </div>
                {/* <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Applicable for</label>
                        <br></br>
                        <input type="radio" name="applicable" value="match" onChange={(e)=>setapplicablefor(e.target.value)} checked={applicablefor === "match"} /> A Specific Match &nbsp; &nbsp; &nbsp;
                        <input type="radio" name="applicable" value="tournament" onChange={(e)=>setapplicablefor(e.target.value)} checked={applicablefor === "tournament"} /> A Specific Tournament
                    </div>
                </div> */}
                {/* {applicablefor === 'match' ?
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Select Match</label>
                        <select className="form-control"
                          value={match}
                          onChange={(e)=>setmatch(e.target.value)}
                        >
                            
                            <option>--Select--</option>
                            {matchList&&matchList.map((list,i)=>{
                            return <option key={i} value={list.id}>{list?.team_1?.team_name} vs {list?.team_2?.team_name}</option>
                        })}
                        </select>
                    </div>
                </div>
                :
                <div className='col-lg-6'>
                <div className='form-group'>
                    <label>Select Tournament</label>
                    <select className="form-control"
                     value={tournament}
                     onChange={(e)=>settournament(e.target.value)}
                    >
                        <option>--Select--</option>
                        {tournamentList&&tournamentList.map((list,i)=>{
                            return <option key={i} value={list.id}>{list?.tournament_name}</option>
                        })}
                        
                    </select>
                </div>
            </div>        
            } */}
                 <div className='col-lg-12'>
                        <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={AddHandler}>Add</button>
                        </div>
                    </div>
           </div>
    
      </div>
      </div>
        
    </div>
  )
}

export default AddCoupon