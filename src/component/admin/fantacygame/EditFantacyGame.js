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

const EditFantacyGame = () => {

    const [loading, setloading] = useState(false)
    const [gametype, setgametype] = useState("Open")
    const [match, setmatch] = useState("")
    const [tournament, settournament] = useState("")
    const [applicablefor, setapplicablefor] = useState("Match")
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
    const [minimumnumbers, setminimumnumbers] = useState("")
    const [membershipplan, setmembershipplan] = useState("")
    const [matchList, setmatchList] = useState([])
    const [matchmultiList, setmatchmultiList] = useState([])
    const [tournamentList, settournamentList] = useState([])
    const [selectmatch, setselectmatch] = useState([])

    let navigate = useNavigate()

    let {id} = useParams()


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

    const GetMatch = async (val, selectmatch)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`match/get-match-list?match_status=0&tournament_id=${val}`)
            if(response?.status == 200){
                setmatchList(response?.data?.data?.list)
               // let tempTeam = selectmatch.filter((item) => item.id !== data.id);

               var TempArr = []


               response?.data?.data?.list&&response?.data?.data?.list.map((obj)=>{
             
                TempArr.push({
                    ...obj,
                    checked:selectmatch.some(item => item.id === obj.id)
                })
             
               })
             
                setmatchmultiList(TempArr)
             

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
    GetTournament()
    GetUser()
    fetchdata()
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

const handleCheckboxChange = (ids) =>{
    setmatchmultiList((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
          checkbox.id === ids
            ? { ...checkbox, checked: !checkbox.checked }
            : checkbox
        )
      );
}



const SubmitHandler = async () => {

 
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append("game_predict_option", fantasygametype);
            data.append("applicable_for", applicablefor);      
            data.append("tournament_id", tournament);
            data.append("game_type", gametype);
            data.append("game_name", gname);
            data.append("credit_required", credit);
            data.append("players_total_credit_required", playercredit);
            data.append("total_prize_pool", tprize);
            data.append("total_winners", twin);
            data.append("minimum_number_of_teams", minimumnumbers);
            data.append("required_membership_plan", Number(membershipplan));
            data.append('_method', 'PUT');
            if(applicablefor == 'Match'){
                data.append("match_id", match)
            } else if(applicablefor == 'Matches'){
                matchmultiList.map((item)=>{
                    if(item.checked){
                        return  data.append("match_id[]", item.id);
                    }
                    
                })
            }
            rowlist.map((item)=>{
                return  data.append("rank[]", item.rank);
            })
            rowlist.map((item)=>{
                return  data.append("prize_amount[]", item.prizeamount);
            })
            data.append("max_team_per_user", user);
            data.append("user_limit", userlimit);

            selectuser.map((item)=>{
                return  data.append("invited_users[]", item.id);
            })
            
           
            const response = await ApiConnection.post(`fantasy-game/${id}`, data);
            
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                fantasygametype == 'select_winner' ? 
                navigate(`/admin/fantacy-games`)
                :
                navigate(`/admin/fantacy-games-rules/${id}`)
              
            } else {
                setloading(false)
            }

        } catch(err){
            setloading(false)
            if(err.response.status === 422){
                  toast.error(err.response?.data?.message);   
              
            } else if(err.response.status === 500){
                toast.error(err.response?.data?.message);   
            }
    }
        





}


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
            setmatch(editdata?.match[0]?.id)
            setminimumnumbers(editdata?.minimum_number_of_teams)
            setmembershipplan(editdata?.required_membership_plan)
            let TempArray = []

           editdata?.game_prize.forEach(element => {
            TempArray.push({
                rank:element?.rank,
                prizeamount:element?.prize_amount
            })  
           });

           setrowlist(TempArray)
           GetMatch(editdata?.tournament_id, editdata?.match)
        }

    } catch(e){
        setloading(false)  
    }
}

const SingleMatchHandle = (e) =>{
    setmatch(e.target.value)
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('teams');  
    setgname('League-' + option)
    console.log(option)
}


  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="Edit A Fantasy Game" />
<AdminMenu />
<div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
           <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Contest Type</label>
                        <br></br>
                        <input type="radio" name="fantasygametype" value="full_fledged" onChange={(e)=>setfantasygametype(e.target.value)} checked={fantasygametype === "full_fledged"} /> Fantasy Game &nbsp; &nbsp; &nbsp;
                        <input type="radio" name="fantasygametype" value="select_winner" onChange={(e)=>setfantasygametype(e.target.value)} checked={fantasygametype === "select_winner"} /> Prediction
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Applicable for</label>
                        <br></br>
                        <input type="radio" name="applicable" value="Match" onChange={(e)=>{setapplicablefor(e.target.value); setgname(gname)}} checked={applicablefor === "Match"} /> A Specific Match &nbsp; &nbsp; &nbsp;
                        <input type="radio" name="applicable" value="Tournament" onChange={(e)=>{setapplicablefor(e.target.value); setgname(gname)}} checked={applicablefor === "Tournament"} /> A Specific Tournament &nbsp; &nbsp; &nbsp;
                        <input type="radio" name="applicable" value="Matches" onChange={(e)=>{setapplicablefor(e.target.value); setgname(gname)}} checked={applicablefor === "Matches"} /> Select Multiple Matches &nbsp; &nbsp; &nbsp;
                      
                    </div>
                </div>
                {applicablefor === 'Match' &&
                <>
                 <div className='col-lg-6'>
                 <div className='form-group'>
                     <label>Select Tournament</label>
                     <select className="form-control"
                      value={tournament}
                      onChange={(e)=>{
                        GetMatch(e.target.value)
                        settournament(e.target.value)}
                      }
                     >
                         <option>--Select--</option>
                         {tournamentList&&tournamentList.map((list,i)=>{
                             return <option key={i} value={list.id}>{list?.tournament_name}</option>
                         })}
                         
                     </select>
                 </div>
             </div>  
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Select Match</label>
                        <select className="form-control"
                          value={match}
                          onChange={SingleMatchHandle}
                        >
                            
                            <option>--Select--</option>
                            {matchList&&matchList.map((list,i)=>{
                            return <option key={i} teams={list?.team_1?.team_name + ' VS ' + list?.team_2?.team_name} value={list.id}>{list?.team_1?.team_name} VS {list?.team_2?.team_name} - ({moment(list?.match_date).format('LLL')}) - ({list?.tournament?.tournament_name})</option>
                        })}
                        </select>
                    </div>
                </div>
                </>
}

{applicablefor === 'Matches' &&
 <>
 <div className='col-lg-6'>
 <div className='form-group'>
     <label>Select Tournament</label>
     <select className="form-control"
      value={tournament}
      onChange={(e)=>
      {
        GetMatch(e.target.value)
        settournament(e.target.value)}
      }
       
     >
         <option>--Select--</option>
         {tournamentList&&tournamentList.map((list,i)=>{
             return <option key={i} value={list.id}>{list?.tournament_name}</option>
         })}
         
     </select>
 </div>
</div>  
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Select Matches</label>
                        <Dropdown className='custom-dropdown-checkbox'>
                            <Dropdown.Toggle variant="success" className="form-control">
                            {selectmatch.length > 0 ? 'select ' + selectmatch.length : ' select Matches '}
                           
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <ul className='multimatchlist'>
                                    
                                    {matchmultiList&&matchmultiList.map((list, i) =>{
                                        return (
                                            <li>
                                                <input type="checkbox" id={i} 
                                               checked={list.checked}
                                               onChange={() => handleCheckboxChange(list.id)}
                                                />
                                                <label htmlFor={i}>{list?.team_1?.team_name} VS {list?.team_2?.team_name} - ({moment(list?.match_date).format('LLL')}) - ({list?.tournament?.tournament_name})</label>
                                            </li>
                                        )
                                    })}

                                   
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                </>
}





{applicablefor === 'Tournament' &&
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
            }
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Game Type</label>
                        <div>
                        <input type="radio" name="type" value="Open" checked={gametype == "Open" ? true : false}  onChange={(e)=>TypeHandle(e.target.value)} /> <span>Open</span>  &nbsp;&nbsp;&nbsp;
                        <input type="radio" name="type" value="Limited" checked={gametype == "Limited" ? true : false} onChange={(e)=>TypeHandle(e.target.value)} /> <span>Limited Member</span> &nbsp;&nbsp;&nbsp;
                        <input type="radio" name="type" value="Private" checked={gametype == "Private" ? true : false} onChange={(e)=>TypeHandle(e.target.value)} /> <span>Private</span> 
                        </div>
                   
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Fantasy Game Name</label>
                        <input type="text" className="form-control" placeholder="Fantasy Game Name"
                        value={gname}
                        onChange={(e)=>setgname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Joining Credits Required</label>
                        <input type="text" className="form-control" placeholder="Joining Credits Required"
                         value={credit}
                         onChange={(e)=>setcredit(e.target.value)}
                         onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                         }
                       }}
                        />
                    </div>
                </div>
       
      
                <div className='col-lg-4'>  
                    <div className='form-group'>
                    <label>Total Prize Pool (In Credits)</label>
                        <input type="text" className="form-control" placeholder="Total Prize Pool"
                         value={tprize}
                         onChange={(e)=>settprize(e.target.value)}
                         onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                         }
                       }}
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
                                />
                            </div>
                        </div>
                         }
                             <div className='col-lg-4'>  
                            <div className='form-group'>
                                <label>Minimum number of teams required to join</label>
                                <input type="text" className="form-control" placeholder="Enter Numbers"
                                value={minimumnumbers}
                                onChange={(e)=>setminimumnumbers(e.target.value)}
                                onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                                />
                            </div>
                        </div>
                        <div className='col-lg-4'>  
                            <div className='form-group'>
                                <label>Membership plan required to join</label>
                                <select className="form-control"   value={membershipplan}
                                onChange={(e)=>setmembershipplan(e.target.value)}>
                                    <option>--Select--</option>
                                    <option value="0">All</option>
                                </select>
                               
                            </div>
                        </div>
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
                                
                                />
                            </div>
                        </div>
                        <div className='col-lg-5'>  
                            <div className='form-group'>
                            <label>Prize Credit For Each Winner</label>
                                <input type="text" className="form-control" placeholder="Prize Amount"
                                value={item.prizeamount}
                                onChange={(e)=>InputHandler(e.target.value, 'prizeamount', index)}
                                
                                />
                            </div>
                        </div>
                        {index < 1 ?
                        <div className='col-lg-2'>  
                            <div className='form-group'>
                                <label className='d-block'>&nbsp;</label>
                                <button className='btn btn-success btn-md' onClick={AddRowhandler}>Add</button>
                            </div>
                        </div>
                    :
                    <div className='col-lg-2'>  
                        <div className='form-group'>
                            <label className='d-block'>&nbsp;</label>
                            <button className='btn btn-danger btn-md' onClick={()=>RemoveRowhandler(index)}>Remove</button>
                        </div>
                    </div>
                    }
                    </div>
                    )
                })
            }
                <div className="row">
                    {gametype !== 'Private' && 
                   
                    <div className='col-lg-6'>
                        <div className='form-group'>
                            <label>Maximum Team Per User</label>
                            { fantasygametype == 'full_fledged' ?
                            <select className="form-control"
                            value={user}
                            onChange={(e)=>setuser(e.target.value)}
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
                            :
                            <select className="form-control"
                            value={user}
                            onChange={(e)=>setuser(e.target.value)}
                            >
                                <option value="">--Select--</option> 
                                <option value="1">1</option>
                            </select>
}
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
                                />
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
                             {fantasygametype == "full_fledged" &&
                <div className='col-lg-4'>
                    <div className='form-group'>
                        <label>Fantasy Game Player Point Maximum</label>
                        <input type="text" className="form-control" placeholder="Enter the point"
                         value={playercredit}
                         onChange={(e)=>setplayercredit(e.target.value)}
                         onKeyPress={(event) => {
                         if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                         }
                       }}
                        />
                    </div>
                </div>
}
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={SubmitHandler}>Update</button>
                    </div>
                </div>
           </div>
    
      </div>
      </div>
   
</div>
  )
}

export default EditFantacyGame