import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';

const ViewFantacyGameList = () => {

    const [loading, setloading] = useState(false)
    const [gametype, setgametype] = useState("Open")
    const [match, setmatch] = useState("")
    const [tournament, settournament] = useState("")
    const [applicablefor, setapplicablefor] = useState("match")
    const [fantasygametype, setfantasygametype] = useState("full_fledged")
    const [gname, setgname] = useState("")
    const [credit, setcredit] = useState("")
    const [tprize, settprize] = useState("")
    const [twin, settwin] = useState("")
    const [user, setuser] = useState("")
    const [userlimit, setuserlimit] = useState("")
    const [playercredit, setplayercredit] = useState("")
    const [inviteuserList, setinviteuserList] = useState([])
    const [selectuser, setselectuser] = useState([])
    const [rowlist, setrowlist] = useState([{
        rank:'',
        prizeamount:''
    }])



    const [matchList, setmatchList] = useState([])
    const [tournamentList, settournamentList] = useState([])

    let navigate = useNavigate()
    let {id} = useParams()
    const fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`fantasy-game/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setapplicablefor(editdata?.applicable_for)
                setmatch(editdata?.match_id)
                settournament(editdata?.tournament_id)
                setgametype(editdata?.game_type)
                setgname(editdata?.game_name)
                settprize(editdata?.total_prize_pool)
                settwin(editdata?.total_winners)
                setuser(editdata?.max_team_per_user)
                setcredit(editdata?.credit_required)
                setuserlimit(editdata?.user_limit)
                setplayercredit(editdata?.players_total_credit_required)
                setfantasygametype(editdata?.game_predict_option)
                let TempArray = []

               editdata?.game_prize.forEach(element => {
                TempArray.push({
                    rank:element?.rank,
                    prizeamount:element?.prize_amount
                })  
               });

               setrowlist(TempArray)
            }

        } catch(e){
            setloading(false)  
        }
    }


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
            const  response = await ApiConnection.get('match/get-match-list?match_status=0')
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

    const GetUser = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('members/list')
            if(response?.status == 200){
                setinviteuserList(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

useEffect(()=>{
    fetchdata()
    GetMatch()
    GetTournament()
    GetUser()
    
},[])

    const TypeHandle = (value)=>{
        setgametype(value)
    }

const AddRowhandler = ()=>{
    var inputlist = {
        rank:'',
        prizeamount:''
    }
    setrowlist([...rowlist, inputlist]) 
}

const RemoveRowhandler = (index)=>{
    const rows = [...rowlist];
    rows.splice(index, 1);
    setrowlist(rows);
}

const InputHandler = (value, key, index)=>{
    const rows = [...rowlist];
    rows[index][key] = value;
    setrowlist(rows);
}

const handleChange = (e, data) =>{
    const {name, checked} = e.target
    if (checked) {
        setselectuser([...selectuser, data]);
      } else {
        let tempTeam = selectuser.filter((item) => item.id !== data.id);
        setselectuser(tempTeam);
      }
}







  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="View Fantasy Game" />
<AdminMenu />
<div className="container">
 <div className="dashboard-panel custom-table">

      <div className='row'>
      <div className='col-lg-12'>
        <div className='form-group'>
            <label>Fantasy game type</label>
            <br></br>
            <input type="radio" name="fantasygametype" value="full_fledged" onChange={(e)=>setfantasygametype(e.target.value)} checked={fantasygametype === "full_fledged"} disabled /> Full Fledged &nbsp; &nbsp; &nbsp;
            <input type="radio" name="fantasygametype" value="select_winner" onChange={(e)=>setfantasygametype(e.target.value)} checked={fantasygametype === "select_winner"} disabled /> Select Winner
        </div>
    </div>
      <div className='col-lg-12'>
               <div className='form-group'>
                   <label>Applicable for</label>
                   <br></br>
                   <input type="radio" name="applicable" value="Match" onChange={(e)=>setapplicablefor(e.target.value)} checked={applicablefor === "Match"} disabled/> A Specific Match &nbsp; &nbsp; &nbsp;
                   <input type="radio" name="applicable" value="Tournament" onChange={(e)=>setapplicablefor(e.target.value)} checked={applicablefor === "Tournament"} disabled/> A Specific Tournament
               </div>
           </div>
           {applicablefor === 'Match' ?
           <div className='col-lg-6'>
               <div className='form-group'>
                   <label>Select Match</label>
                   <select className="form-control"
                     value={match}
                     onChange={(e)=>setmatch(e.target.value)}
                     disabled
                   >
                       
                       <option>--Select--</option>
                       {matchList&&matchList.map((list,i)=>{
                       return <option key={i} value={list.id}>{list?.team_1?.team_name} VS {list?.team_2?.team_name} - ({moment(list?.match_date).format('MM-DD-YYYY')}) - ({list?.tournament?.tournament_name})</option>
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
                disabled
               >
                   <option>--Select--</option>
                   {tournamentList&&tournamentList.map((list,i)=>{
                       return <option key={i} value={list.id}>{list?.tournament_name}</option>
                   })}
                   
               </select>
           </div>
       </div>        
       }
           <div className='col-lg-12'>
               <div className='form-group'>
                   <label>Game Type</label>
                   <div>
                   <input type="radio" name="type" value="Open" checked={gametype == "Open" ? true : false}  onChange={(e)=>TypeHandle(e.target.value)} disabled/> <span>Open</span>  &nbsp;&nbsp;&nbsp;
                   <input type="radio" name="type" value="Limited" checked={gametype == "Limited" ? true : false} onChange={(e)=>TypeHandle(e.target.value)} disabled/> <span>Limited Member</span> &nbsp;&nbsp;&nbsp;
                   <input type="radio" name="type" value="Private" checked={gametype == "Private" ? true : false} onChange={(e)=>TypeHandle(e.target.value)} disabled/> <span>Private</span> 
                   </div>
              
               </div>
           </div>
           <div className='col-lg-4'>
               <div className='form-group'>
                   <label>Fantasy Game Name</label>
                   <input type="text" className="form-control" placeholder="Fantasy Game Name"
                   value={gname}
                   onChange={(e)=>setgname(e.target.value)}
                   readOnly
                   />
               </div>
           </div>
           <div className='col-lg-4'>
               <div className='form-group'>
                   <label>Credits Required</label>
                   <input type="text" className="form-control" placeholder="Credits Required"
                    value={credit}
                    onChange={(e)=>setcredit(e.target.value)}
                    onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  readOnly
                   />
               </div>
           </div>
           {fantasygametype == "full_fledged" &&
           <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Player Total Credits Required</label>
                        <input type="text" className="form-control" placeholder="Credits Required"
                         value={playercredit}
                         onChange={(e)=>setplayercredit(e.target.value)}
                         onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                         }
                       }}
                       readOnly
                        />
                    </div>
                </div>
}
           <div className='col-lg-4'>  
               <div className='form-group'>
                   <label>Total Prize Pool</label>
                   <input type="text" className="form-control" placeholder="Total Prize Pool"
                    value={tprize}
                    onChange={(e)=>settprize(e.target.value)}
                    onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  readOnly
                   />
               </div>
           </div>
           {fantasygametype == "full_fledged" &&
           <div className='col-lg-4'>  
                       <div className='form-group'>
                           <label>Total Winners</label>
                           <input type="text" className="form-control" placeholder="Total Winners"
                           value={twin}
                           onChange={(e)=>settwin(e.target.value)}
                           onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                           }
                       }}
                       readOnly
                           />
                       </div>
                   </div>
}
           </div>
           {
           rowlist.map((item, index)=>{
               return (
                   <div className="row">
                   <div className='col-lg-5'>  
                       <div className='form-group'>
                           <label>Ranks</label>
                           <input type="text" className="form-control" placeholder="Ranks"
                           value={item.rank}
                           onChange={(e)=>InputHandler(e.target.value, 'rank', index)}
                           readOnly
                           />
                       </div>
                   </div>
                   <div className='col-lg-5'>  
                       <div className='form-group'>
                           <label>Prize Amount Each Winner</label>
                           <input type="text" className="form-control" placeholder="Prize Amount"
                           value={item.prizeamount}
                           onChange={(e)=>InputHandler(e.target.value, 'prizeamount', index)}
                           readOnly
                           />
                       </div>
                   </div>
                 
               </div>
               )
           })}
          
           <div className="row">
           {gametype !== 'Private' && 
               <div className='col-lg-6'>
                   <div className='form-group'>
                       <label>Maximum Team Per User</label>
                       <select className="form-control"
                       value={user}
                       onChange={(e)=>setuser(e.target.value)}
                       disabled
                       >
                         <option value="">--Select--</option> 
                           <option value="1">1</option>
                           <option value="2">2</option>
                           <option value="3">3</option>
                           <option value="4">4</option>
                           <option value="5">5</option>
                           <option value="6">6</option>
                           <option value="7">7</option>
                           <option value="8">8</option>
                           <option value="9">9</option>
                           <option value="10">10</option>
                       </select>
                   </div>
               </div>
           }

           {gametype === 'Limited' &&
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <label>User Limit</label>
                            <input type="text" className="form-control" placeholder="User Limit"
                                value={userlimit}
                                onChange={(e)=>setuserlimit(e.target.value)}
                                onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                               readOnly />
                        </div>
                    </div>
                }


{gametype === 'Private' && 

<div className='col-lg-6'>
<div className='form-group'>
<label>Invite User</label>
<Dropdown className='custom-dropdown-checkbox'>
                       <Dropdown.Toggle variant="success" className="form-control">
                       {selectuser.length > 0 ? 'select ' + selectuser.length : ' select User '}
                      
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                           <ul>
                               
                               {inviteuserList&&inviteuserList.map((list, i) =>{
                                   return (
                                       <li>
                                           <input type="checkbox" id={i} 
                                          checked={selectuser.some((item) => item?.id === list.id)}
                                          onChange={(e) => handleChange(e, list)}
                                           />
                                           <label htmlFor={i}>{list?.first_name + ' ' + list?.last_name}</label>
                                       </li>
                                   )
                               })}
                               
                              
                           </ul>
                       </Dropdown.Menu>
                   </Dropdown>
</div>
</div>


               }
         
      </div>

 </div>
 </div>
   
</div>
  )
}

export default ViewFantacyGameList