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
import Dropdown from 'react-bootstrap/Dropdown';

const AddFantacyGameList = () => {
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
    const [minimumnumbers, setminimumnumbers] = useState("")
    const [membershipplan, setmembershipplan] = useState("")
    const [inviteuserList, setinviteuserList] = useState([])
    const [selectuser, setselectuser] = useState([])
    const [rowlist, setrowlist] = useState([{
        rank:'',
        prizeamount:''
    }])


    const [matchList, setmatchList] = useState([])
    const [matchmultiList, setmatchmultiList] = useState([])
    const [tournamentList, settournamentList] = useState([])
    const [selectmatch, setselectmatch] = useState([])
    const [tabs1, settabs1] = useState('1')
    const [tabs2, settabs2] = useState('')
    const [tabs3, settabs3] = useState('')


    const [batrun, setbatrun] = useState("")
    const [batboundary, setbatboundary] = useState("")
    const [batsix, setbatsix] = useState("")
    const [bathalf, setbathalf] = useState("")
    const [batcentury, setbatcentury] = useState("")

    const [captain, setcaptain] = useState("")
    const [vcaptain, setvcaptain] = useState("")

    const [runout, setrunout] = useState("")

    const [bowwicket, setbowwicket] = useState("")
    const [bowbonus, setbowbonus] = useState("")
    const [bowbonus3, setbowbonus3] = useState("")
    const [bowbonus4, setbowbonus4] = useState("")
    const [bowbonus5, setbowbonus5] = useState("")


    const [minplayer, setminplayer] = useState("")
    const [maxplayer, setmaxplayer] = useState("")
    const [minwicket, setminwicket] = useState("")
    const [maxwicket, setmaxwicket] = useState("")
    const [minbatsman, setminbatsman] = useState("")
    const [maxbatsman, setmaxbatsman] = useState("")
    const [minallrounder, setminallrounder] = useState("")
    const [maxallrouner, setmaxallrounder] = useState("")
    const [minbowlers, setminbowlers] = useState("")
    const [maxbowlers, setmaxbowlers] = useState("")



    const GetPointData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('points-statement')
            if(response?.status == 200){
             
                var editdata = response.data?.data
                console.log(editdata.captain)
                setcaptain(response.data?.data?.captain.toString())
                setvcaptain(editdata?.vice_captain.toString())
                setrunout(editdata?.catch_runout.toString())
                setbatrun(editdata?.runs.toString())
                setbatboundary(editdata?.boundary_bonus.toString())
                setbatsix(editdata?.six_bonus.toString())
                setbathalf(editdata?.half_century_bonus.toString())
                setbatcentury(editdata?.century_bonus.toString())
                setbowwicket(editdata?.wicket.toString())
                setbowbonus(editdata?.bonus.toString())
                setbowbonus3(editdata?.wicket_bonus_3.toString())
                setbowbonus4(editdata?.wicket_bonus_4.toString())
                setbowbonus5(editdata?.wicket_bonus_5.toString())
          
                setminplayer(editdata?.minimum_number_players_each_side.toString())
                setmaxplayer(editdata?.maximum_number_players_each_side.toString())
                setminwicket(editdata?.minimum_number_wicket_keepers.toString())
                setmaxwicket(editdata?.maximum_number_wicket_keepers.toString())
                setminbatsman(editdata?.minimum_number_of_batsman.toString())
                setmaxbatsman(editdata?.maximum_number_of_batsman.toString())
                setminallrounder(editdata?.minimum_number_of_all_rounders.toString())
                setmaxallrounder(editdata?.maximum_number_of_all_rounders.toString())
                setminbowlers(editdata?.minimum_number_of_bowlers.toString())
                setmaxbowlers(editdata?.maximum_number_of_bowlers.toString())
             
              
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }


    const GetplayerData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('player-selection')
            if(response?.status == 200){
                console.log(response.data)
                var editdata = response.data?.data
                setminplayer(editdata?.minimum_number_players_each_side.toString())
                setmaxplayer(editdata?.maximum_number_players_each_side.toString())
                setminwicket(editdata?.minimum_number_wicket_keepers.toString())
                setmaxwicket(editdata?.maximum_number_wicket_keepers.toString())
                setminbatsman(editdata?.minimum_number_of_batsman.toString())
                setmaxbatsman(editdata?.maximum_number_of_batsman.toString())
                setminallrounder(editdata?.minimum_number_of_all_rounders.toString())
                setmaxallrounder(editdata?.maximum_number_of_all_rounders.toString())
                setminbowlers(editdata?.minimum_number_of_bowlers.toString())
                setmaxbowlers(editdata?.maximum_number_of_bowlers.toString())
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }






    let navigate = useNavigate()

    console.log("team Id", selectmatch)


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

    const GetMatch = async (val)=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`match/get-match-list?match_status=0&tournament_id=${val}`)
            if(response?.status == 200){
                setmatchList(response?.data?.data?.list)
                setmatchmultiList(response?.data?.data?.list)
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
    GetPointData()
    GetplayerData()
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

const handlemultiplematchChange = (e, data) =>{
    const {name, checked} = e.target
    if (checked) {
        setselectmatch([...selectmatch, data]);
      } else {
        let tempTeam = selectmatch.filter((item) => item.id !== data.id);
        setselectmatch(tempTeam);
      }
}



// const SubmitHandler = async () => {

 
//         setloading(true)
//         try{
//             var FormData = require('form-data');
//             var data = new FormData();
//             data.append("game_predict_option", fantasygametype);
//             data.append("applicable_for", applicablefor);      
//             data.append("tournament_id", tournament);
//             data.append("game_type", gametype);
//             data.append("game_name", gname);
//             data.append("credit_required", credit);
//             data.append("players_total_credit_required", playercredit);
//             data.append("total_prize_pool", tprize);
//             data.append("total_winners", twin);
//             data.append("minimum_number_of_teams", minimumnumbers);
//             data.append("required_membership_plan", Number(membershipplan));
//             if(applicablefor == 'Match'){
//                 data.append("match_id", match)
//             } else if(applicablefor == 'Matches'){
//                 selectmatch.map((item)=>{
//                     return  data.append("match_id[]", item.id);
//                 })
//             }
//             rowlist.map((item)=>{
//                 return  data.append("rank[]", item.rank);
//             })
//             rowlist.map((item)=>{
//                 return  data.append("prize_amount[]", item.prizeamount);
//             })
//             data.append("max_team_per_user", user);
//             data.append("user_limit", userlimit);

//             selectuser.map((item)=>{
//                 return  data.append("invited_users[]", item.id);
//             })
            
           
//             const response = await ApiConnection.post("fantasy-game", data);
            
//             if(response.status === 200){
//                 setloading(false)
//                 console.log(response?.data)
             
//                 toast.success(response?.data?.message);
//                 fantasygametype == 'select_winner' ? 
//                 navigate(`/admin/fantacy-games`)
//                 :
//                 navigate(`/admin/fantacy-games-rules/${response?.data?.data?.id}`)
//             } else {
//                 setloading(false)
//             }

//         } catch(err){
//             setloading(false)
//             if(err.response.status === 422){
//                   toast.error(err.response?.data?.message);   
              
//             } else if(err.response.status === 500){
//                 toast.error(err.response?.data?.message);   
//             }
//     }
        





// }

async function  AddFamtasyGame  (){

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
        if(applicablefor == 'Match'){
            data.append("match_id", match)
        } else if(applicablefor == 'Matches'){
            selectmatch.map((item)=>{
                return  data.append("match_id[]", item.id);
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
        
       
        const response = await ApiConnection.post("fantasy-game", data);
        
        if(response.status === 200){
            setloading(false)
            console.log(response?.data)
            if(fantasygametype == 'select_winner'){
                toast.success(response?.data?.message)
                navigate(`/admin/fantacy-games`)
            } else {
                SubmitPoint(response?.data?.data?.id, response?.data?.message)
            }
         
         
           // toast.success(response?.data?.message);
         
           
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

async function SubmitPoint(_id, _message) {
    try{
        var FormData = require('form-data');
        var data = new FormData();
        data.append('minimum_number_players_each_side',minplayer);
        data.append('maximum_number_players_each_side', maxplayer);
        data.append('minimum_number_wicket_keepers', minwicket);
        data.append('maximum_number_wicket_keepers', maxwicket);
        data.append('minimum_number_batsman', minbatsman);
        data.append('maximum_number_batsman', maxbatsman);
        data.append('minimum_number_all_rounders', minallrounder);
        data.append('maximum_number_all_rounders', maxallrouner);
        data.append('minimum_number_bowlers', minbowlers);
        data.append('maximum_number_bowlers', maxbowlers);
        data.append('fantasygame_id', _id);
        
        const response = await ApiConnection.post("player-selection-rules", data);
        if(response.status === 200){
            setloading(false)
           // toast.success(response?.data?.message);
           SubmitPlayerPoint(_id, _message)
         
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

async function SubmitPlayerPoint(_id, _message) {
    try{
        var FormData = require('form-data');
        var data = new FormData();
        data.append('runs', batrun);
        data.append('boundary_bonus', batboundary);
        data.append('six_bonus', batsix);
        data.append('half_century_bonus', bathalf);
        data.append('century_bonus', batcentury); 
        data.append('wicket', bowwicket); 
        data.append('bonus', bowbonus); 
        data.append('wicket_bonus_3', bowbonus3); 
        data.append('wicket_bonus_4', bowbonus4); 
        data.append('wicket_bonus_5', bowbonus5); 
        data.append('catch_runout', runout);
        data.append('captain', captain); 
        data.append('vice_captain', vcaptain); 
        data.append('fantasygame_id', _id); 
        const response = await ApiConnection.post("points-statement", data);
        if(response.status === 200){
            setloading(false)
            toast.success(_message);
            navigate('/admin/fantacy-games')
            // GetBattingData()
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

function StepOneHandle(){ 
if(gname == ''){
    toast("Fantasy Game Name is required")
} else if(credit == ''){
    toast("Credit is required")
} else if(tprize == ''){
    toast("Prize pool is required")
} else if(fantasygametype == 'select_winner'){
    AddFamtasyGame()
} else {
    settabs1('')
    settabs2('2')
    settabs3('')
}
   
}

function StepTwoHandle(){

    
    if(minplayer == ''){
        toast.error("Min player is required")
    }else if(maxplayer == ''){
        toast.error("Max player required") 
    }else if(maxplayer < minplayer){
        toast.error("Max player should be greter then min player") 
    }else if(minwicket == ''){
        toast.error("Min wicket keeper is required") 
    }else if(maxwicket == ''){
        toast.error("Max wicket keeper is required") 
    }else if(maxwicket < minwicket){
        toast.error("Max wicket should be greter then min wicket") 
    }else if(minbatsman == ''){
        toast.error("Min batsman bonus is required") 
    }else if(maxbatsman == ''){
        toast.error("Max batsman is required") 
    }else if(maxbatsman < minbatsman){
        toast.error("Max batsman should be greter then min batsman")  
    }else if(minallrounder == ''){
        toast.error("Min all rounder over is required") 
    }else if(maxallrouner == ''){
        toast.error("Max all rounder over is required") 
    }else if(maxallrouner < minallrounder){
        toast.error("Max all rounder should be greter then min all rounder") 
    }else if(minbowlers == ''){
        toast.error("Min bowlers is required") 
    }else if(maxbowlers == ''){
        toast.error("Max bowlers is required") 
    }else if(maxbowlers < minbowlers){
        toast.error("Max bowlers should be greter then min bowlers") 
    }else {

    settabs1('')
    settabs2('')
    settabs3('3')
    }
}

const StepTheeHandle = async () =>{
    if(batrun == ''){
        toast.error("runs is required")
    }  else if(batboundary == ''){
        toast.error("Boundary is required") 
    }else if(batsix == ''){
        toast.error("Six is required") 
    }else if(bathalf == ''){
        toast.error("Half century is required") 
    }else if(batcentury == ''){
        toast.error("Century is required") 
    }else {
        AddFamtasyGame()

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
    <DashboardHeader title="Add A Fantasy Game" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">
        {fantasygametype == 'full_fledged' ? 
        <ul className='step-wizard'>
            <li>
                <span className={tabs1 == '1' || tabs2 == '2'  || tabs3 == '3'  ?  'badge badge-primary' : 'badge badge-secondary'}>Step 1</span>
            </li>
            <li>
            <span className={tabs2 == '2' || tabs3 == '3' ?  'badge badge-primary' : 'badge badge-secondary'}>Step 2</span>
            </li>
            <li>
            <span className={ tabs3 == '3'  ?  'badge badge-primary' : 'badge badge-secondary'}>Step 3</span>
            </li>
        </ul>
        :
        <ul className='step-wizard'>
        <li>
            <span className={tabs1 == '1' || tabs2 == '2'  || tabs3 == '3'  ?  'badge badge-primary' : 'badge badge-secondary'}>Step 1</span>
        </li>
       
    </ul>
}

{/* <div className='text-right'>
    <button className='btn btn-danger' >Force Get Tournament </button>
</div> */}

{tabs1 == '1' &&
<>

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
                        <input type="radio" name="applicable" value="Tournament" onChange={(e)=>{setapplicablefor(e.target.value); setgname('')}} checked={applicablefor === "Tournament"} /> A Specific Tournament &nbsp; &nbsp; &nbsp;
                        <input type="radio" name="applicable" value="Matches" onChange={(e)=>{setapplicablefor(e.target.value);setgname('')}} checked={applicablefor === "Matches"} /> Select Multiple Matches &nbsp; &nbsp; &nbsp;
                      
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
                          onChange={SingleMatchHandle}>
                            
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
                                               checked={selectmatch.some((item) => item?.id === list.id)}
                                               onChange={(e) => handlemultiplematchChange(e, list)}
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
                {fantasygametype == "full_fledged" && 
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
                    <div className='form-group text-right'>
                        <button className='btn btn-success btn-lg' onClick={()=>StepOneHandle()}>{fantasygametype == 'full_fledged' ? 'Next' : 'Submit'}  </button>
                    </div>
                </div>
           </div>
           </>
}

{tabs2 == '2' &&
 <div className='row'>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Minimum Number Players from Each Side:</label>
         <select className="form-control"
         value={minplayer}
         onChange={(e)=>setminplayer(e.target.value)}
         disabled
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Maximum Number Players from Each Side:</label>
         <select className="form-control"
         value={maxplayer}
         onChange={(e)=>setmaxplayer(e.target.value)}
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Minimum Number of Wicket Keepers:</label>
         <select className="form-control"
         value={minwicket}
         onChange={(e)=>setminwicket(e.target.value)}
         disabled
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Maximum Number of Wicket Keepers:</label>
         <select className="form-control"
         value={maxwicket}
         onChange={(e)=>setmaxwicket(e.target.value)}
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Minimum Number of Batsman:</label>
         <select className="form-control"
         value={minbatsman}
         onChange={(e)=>setminbatsman(e.target.value)}
         disabled
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Maximum Number of Batsman:</label>
         <select className="form-control"
         value={maxbatsman}
         onChange={(e)=>setmaxbatsman(e.target.value)}
         
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Minimum Number of All Rounders:</label>
         <select className="form-control"
         value={minallrounder}
         onChange={(e)=>setminallrounder(e.target.value)}
         disabled
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Maximum Number of All Rounders:</label>
         <select className="form-control"
         value={maxallrouner}
         onChange={(e)=>setmaxallrounder(e.target.value)}
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Minimum Number of Bowlers:</label>
         <select className="form-control"
         value={minbowlers}
         onChange={(e)=>setminbowlers(e.target.value)}
         disabled
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-4'>
     <div className='form-group'>
         <label>Maximum Number of Bowlers:</label>
         <select className="form-control"
         value={maxbowlers}
         onChange={(e)=>setmaxbowlers(e.target.value)}
         >
             <option value=''>--Select--</option>
             <option value="0">0</option>
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
             <option value="11">11</option>
             <option value="12">12</option>
         </select>
     </div>
 </div>
 <div className='col-lg-12'>
     <div className='form-group text-right'>
     <button className='btn btn-outline-danger btn-lg' onClick={()=>{
        settabs1('1')
        settabs2('')
        settabs3('')
     }}>Back</button>
         <button className='btn btn-success btn-lg ml-2' onClick={()=>StepTwoHandle()}>Next</button>
     </div>
 </div>
</div>
}

{tabs3 == '3' &&
 <div className='row'>
 <div className='col-lg-3'>
         <div className='form-group'>
             <label>Captain:</label>
             <select className="form-control"
             value={captain}
             onChange={(e)=>setcaptain(e.target.value)}
             >
                <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
             </select>
         </div>
     </div>
     <div className='col-lg-3'>
         <div className='form-group'>
             <label>Vice Captain:</label>
             <select className="form-control"
             value={vcaptain}
             onChange={(e)=>setvcaptain(e.target.value)}
             >
                <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
             </select>
         </div>
     </div>
     <div className='col-lg-3'>
         <div className='form-group'>
             <label>Runs:</label>
             <select className="form-control"
             value={batrun}
             onChange={(e)=>setbatrun(e.target.value)}
             >
                <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
             </select>
         </div>
     </div>
     <div className='col-lg-3'>
         <div className='form-group'>
             <label>Boundary Bonus:</label>
             <select className="form-control"
             value={batboundary}
             onChange={(e)=>setbatboundary(e.target.value)}
             >
                 <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
             </select>
         </div>
     </div>
     <div className='col-lg-3'>
         <div className='form-group'>
             <label>Six Bonus:</label>
             <select className="form-control"
             value={batsix}
             onChange={(e)=>setbatsix(e.target.value)}
             >
                <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
             </select>
         </div>
     </div>
     <div className='col-lg-3'>
         <div className='form-group'>
             <label>Half-century Bonus:</label>
             <select className="form-control"
             value={bathalf}
             onChange={(e)=>setbathalf(e.target.value)}
             >
               <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
             </select>
         </div>
     </div>
     <div className='col-lg-3'>
         <div className='form-group'>
             <label>Century Bonus:</label>
             <select className="form-control"
             value={batcentury}
             onChange={(e)=>setbatcentury(e.target.value)}
             >
               <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
             </select>
         </div>
     </div>
     <div className='col-lg-3'>
              <div className='form-group'>
                  <label>Wicket (Excluding Run Out):</label>
                  <select className="form-control"
                  value={bowwicket}
                  onChange={(e)=>setbowwicket(e.target.value)}
                  >
                    <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
                  </select>
              </div>
          </div>
          <div className='col-lg-3'>
              <div className='form-group'>
                  <label>Bonus (LBW / Bowled) :</label>
                  <select className="form-control"
                  value={bowbonus}
                  onChange={(e)=>setbowbonus(e.target.value)}
                  >
                    <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
                  </select>
              </div>
          </div>
          <div className='col-lg-3'>
              <div className='form-group'>
                  <label>3 Wicket Bonus:</label>
                  <select className="form-control"
                  value={bowbonus3}
                  onChange={(e)=>setbowbonus3(e.target.value)}
                  >
                    <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
                  </select>
              </div>
          </div>
          <div className='col-lg-3'>
              <div className='form-group'>
              <label>4 Wicket Bonus:</label>
              <select className="form-control"
                  value={bowbonus4}
                  onChange={(e)=>setbowbonus4(e.target.value)}
                  >
                    <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
                  </select>
              </div>
          </div>
          <div className='col-lg-3'>
              <div className='form-group'>
              <label>5 Wicket Bonus:</label>
              <select className="form-control"
                  value={bowbonus5}
                  onChange={(e)=>setbowbonus5(e.target.value)}
                  >
                    <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
                  </select>
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='form-group'>
              <label>Run out:</label>
              <select className="form-control"
                  value={runout}
                  onChange={(e)=>setrunout(e.target.value)}
                  >
                    <option value=''>--Select--</option>
                      <option value="0">0</option>
                      <option value="1.00">1</option>
                      <option value="2.00">2</option>
                      <option value="3.00">3</option>
                      <option value="4.00">4</option>
                      <option value="5.00">5</option>
                      <option value="6.00">6</option>
                      <option value="7.00">7</option>
                      <option value="8.00">8</option>
                      <option value="9.00">9</option>
                      <option value="10.00">10</option>
                      <option value="11.00">11</option>
                      <option value="12.00">12</option>
                  </select>
              </div>
          </div>
       
          <div className='col-lg-12'>
     <div className='form-group text-right'>
     <button className='btn btn-outline-danger btn-lg' onClick={()=>{
          settabs1('')
          settabs2('2')
          settabs3('')
     }}>Back</button>
         <button className='btn btn-success btn-lg ml-2' onClick={()=>StepTheeHandle()}>Submit</button>
     </div>
 </div>
</div>
}
      </div>
      </div>
        
    </div>
  )
}

export default AddFantacyGameList