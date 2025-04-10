import React, { useEffect, useRef, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Wk from './Wk';
import { NavLink, useLocation, useNavigate, useParams  } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { GetTeampreviewAction } from '../../../redux/reducer/fccDataflowreducer';
import moment from 'moment';





const CreateTeam = () => {
    const [loading, setloading] = useState(false)
    const [gamerule, setgamerule] = useState({})
    const [wkList, setwkList] = useState([])
    const [selectwkList, setselectwkList] = useState([])
    const [batList, setbatList] = useState([])
    const [selectbatList, setselectbatList] = useState([])
    const [arList, setarList] = useState([])
    const [selectarList, setselectarList] = useState([])
    const [bowlList, setbowlList] = useState([])
    const [selectbowlList, setselectbowlList] = useState([])
    const [tabs, settabs] = useState("wk")
    const [teams, setteams] = useState([])
    const [match, setmatch] = useState("")
    const [timer, setTimer] = useState("00:00:00");
    const [mineachside, setmineachside] = useState("")
    const [maxachside, setmaxachside] = useState("")
    const [teamonewk, setteamonewk] = useState([])
    const [teamtwowk, setteamtwowk] = useState([])
    const [teamonebat, setteamonebat] = useState([])
    const [teamtwobat, setteamtwobat] = useState([])
    const [teamonear, setteamonear] = useState([])
    const [teamtwoar, setteamtwoar] = useState([])
    const [teamonebow, setteamonebow] = useState([])
    const [teamtwobow, setteamtwobow] = useState([])
    const [fantasyCredit, setfantasyCredit] = useState(null)
    const [players, setplayers] = useState([])
    const [batteams, setbatteams] = useState(null)
    const [bowlteams, setbowlteams] = useState([])
    const [newTeams, setnewTeams] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamPlayerCount, setTeamPlayerCount] = useState({});
    const [TotalCredits, setTotalCredits] = useState(null)
    const [WkTotalCredits, setWkTotalCredits] = useState(null)
    const [BatTotalCredits, setBatTotalCredits] = useState(null)
    const [ARTotalCredits, setARTotalCredits] = useState(null)
    const [BowlTotalCredits, setBowlTotalCredits] = useState(null)

    let dispatch = useDispatch()
    const navigate = useNavigate()
    const {id, pros} = useParams()
    const Ref = useRef(null);

   
    const statevalue = useLocation();

    var {fantacygameId, gameId, uniqueId, from} = statevalue?.state
 

    const GetPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`member-fantasygame/get-game-players/${fantacygameId}`)
            const  responseone = await ApiConnection.get(`get-game-rules?game_admin=${gameId}&fantasygame_id=${fantacygameId}`)
          
            if(response?.status && responseone?.status  == 200){
                setloading(false)
                setgamerule(responseone.data?.data?.list?.game_rule)
                setmineachside(Math.round(responseone.data?.data?.list?.game_rule?.minimum_number_players_each_side))
                setmaxachside(Math.round(responseone.data?.data?.list?.game_rule?.maximum_number_players_each_side))
                setfantasyCredit(responseone.data?.data?.fantasygame?.players_total_credit_required)
                setbatList(response.data?.data?.list?.players?.Batsman)
                setwkList(response.data?.data?.list?.players?.WicketKeeper)
                setarList(response.data?.data?.list?.players?.AllRounder)
                setbowlList(response.data?.data?.list?.players?.Bowler)
                setTotalCredits(responseone.data?.data?.fantasygame?.players_total_credit_required)
                var TempArr = []

   

                var finalarr = [...response.data?.data?.list?.players?.Batsman, ...response.data?.data?.list?.players?.WicketKeeper, ...response.data?.data?.list?.players?.AllRounder, ...response.data?.data?.list?.players?.Bowler]
                setplayers(finalarr)
                const unique = [...new Set(finalarr.map(item => item.player_team_id))];
               
                let Tempitem  = []
                for(let i=0;i<unique.length;i++) {
                    let item = finalarr.filter(item => item.player_team_id == unique[i])
                    Tempitem.push({
                    id: unique[i],
                    team_name:item[0].team_name,
                    data: item,
                    total_players:0
                  })
                }
                setteams(Tempitem)
             
                setnewTeams(response.data?.data?.list?.teams)
                // for (var i = 0; i < finalarr.length; i++){
                //     var tmpArray = [];
                //     for (var j = i+1; j < finalarr.length; j++) {
                //         if(finalarr[i].player_team_id == finalarr[j].player_team_id){
                //             tmpArray.push({
                //                 name:finalarr[j].team_name
                //             });
                           
                //         }   
                //     }
                  

                //     TempBatsman.push(tmpArray.slice(i, 1));
                 
                // }

                // const unique = finalarr.map((item) => item.player_team_id)
                // .filter((value, index, self) => self.indexOf(value) === index);
                //     console.log(unique);

               // console.log(TempBatsman)

                // finalarr.forEach(element => {
                //     finalarr.forEach(innerelement =>{

                //     })
                // })
              
                // response.data?.data?.list?.teams.forEach(element => {

                //     TempArr.push({
                //         'team_name':element?.team_name,
                //         'player_team_id':element?.team_id,
                //         'total_players':0
                //     })
                // });


                
                setmatch(response.data?.data?.list?.matchs)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
 

    useEffect(() => {
        GetPlayers()
   
    },[])

    useEffect(() => {
        const countByTeam = newTeams.reduce((acc, team) => {
          const count = players.filter(
            (player) =>
              player.player_team_id === team.team_id &&
              selectedPlayers.includes(player.player_id)
          ).length;
          acc[team.team_name] = count;
          return acc;
        }, {});
        setTeamPlayerCount(countByTeam);
       console.log(countByTeam)
      }, [selectedPlayers]);



    const wkhandleRowClicked = (row) => {


        var max = Math.round(gamerule?.maximum_number_wicket_keepers)
        var TotalSelectPlayer =  selectbatList.length + selectarList.length + selectbowlList.length
    
        if(!row?.toggleSelected && row?.credit_score > (TotalCredits - (WkTotalCredits+BatTotalCredits+ARTotalCredits+BowlTotalCredits))){
            toast('You have excced credit limit')
                   return ;
         } else {



        const updatedData = wkList.map(item => {
           
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
     
        let sumwk = 0;
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
                sumwk += element?.credit_score;
            }
        })
        

       
       


        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} wicket keeper`)
        } else if((TotalSelectPlayer + TempArr.length -1) >=11){
            toast.error("You Choose Maximum 11 Players")
        
        } else {
            setWkTotalCredits(sumwk)
            setwkList(updatedData);
            setselectwkList(TempArr)
            setSelectedPlayers((prevSelected) => 
                prevSelected.includes(row.player_id)
                  ? prevSelected.filter((id) => id !== row.player_id)
                  : [...prevSelected, row.player_id]
              );
        }
     

      
      
        }

      };

      const bathandleRowClicked = (row) => {

        var max = Math.round(gamerule?.maximum_number_batsman)
        var min = Math.round(gamerule?.minimum_number_batsman)

        var TotalSelectPlayer =  selectwkList.length + selectarList.length + selectbowlList.length

        if(!row?.toggleSelected && row?.credit_score > (TotalCredits - (WkTotalCredits+BatTotalCredits+ARTotalCredits+BowlTotalCredits))){
            toast('You have excced credit limit')
                   return ;
         } else 
{

        const updatedData = batList.map(item => {
        
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
        let sumbat = 0;
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
                sumbat += element?.credit_score;
            }
        })

   

      

       

        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} batsman`)
        } else if((TotalSelectPlayer + TempArr.length -1) >=11){
            toast.error("You Choose Maximum 11 Players")
        }  else {
            setBatTotalCredits(sumbat)
            setbatList(updatedData);
            setselectbatList(TempArr)
            setSelectedPlayers((prevSelected) => 
                prevSelected.includes(row.player_id)
                  ? prevSelected.filter((id) => id !== row.player_id)
                  : [...prevSelected, row.player_id]
              );
           
        }

     
        
      }
      
      };
    
      const arhandleRowClicked = (row) => {

        var max = Math.round(gamerule?.maximum_number_all_rounders)
        var TotalSelectPlayer =  selectwkList.length + selectbatList.length  + selectbowlList.length

        if(!row?.toggleSelected && row?.credit_score > (TotalCredits - (WkTotalCredits+BatTotalCredits+ARTotalCredits+BowlTotalCredits))){
            toast('You have excced credit limit')
                   return ;
         } else 
{


        const updatedData = arList.map(item => {
        
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
        let sumar = 0;
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
                sumar += element?.credit_score;
            }
        })
 

         

   
        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} all rounders`)
        }else if((TotalSelectPlayer + TempArr.length -1) >=11){
            toast.error("You Choose Maximum 11 Players")
        } else {
            setARTotalCredits(sumar)
            setarList(updatedData);
            setselectarList(TempArr)
            setSelectedPlayers((prevSelected) => 
                prevSelected.includes(row.player_id)
                  ? prevSelected.filter((id) => id !== row.player_id)
                  : [...prevSelected, row.player_id]
              );
        }

       
        }

      };
      const bowlhandleRowClicked = (row) => {

        var max = Math.round(gamerule?.maximum_number_bowlers)


        
        var TotalSelectPlayer =  selectwkList.length + selectbatList.length + selectarList.length

        if(!row?.toggleSelected && row?.credit_score > (TotalCredits - (WkTotalCredits+BatTotalCredits+ARTotalCredits+BowlTotalCredits))){
            toast('You have excced credit limit')
                   return ;
         } else 
{
   

        const updatedData = bowlList.map(item => {
        
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
        let sumar = 0;
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
                sumar += element?.credit_score;
            }
        })
     

   
        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} bowlers`)
        } else if((TotalSelectPlayer + TempArr.length -1) >=11){
            toast.error("You Choose Maximum 11 Players")
        } else {
            
            setBowlTotalCredits(sumar)
            setbowlList(updatedData);
            setselectbowlList(TempArr)
            setSelectedPlayers((prevSelected) => 
                prevSelected.includes(row.player_id)
                  ? prevSelected.filter((id) => id !== row.player_id)
                  : [...prevSelected, row.player_id]
              );
        }
        
        }
    }
  

const NextPageHandle = async (isskip) => {

    var totalplayer = selectwkList.length + selectbatList.length + selectarList.length + selectbowlList.length

    var minwk =  Math.round(gamerule?.minimum_number_wicket_keepers)
    var minbat = Math.round(gamerule?.minimum_number_batsman)
    var minar = Math.round(gamerule?.minimum_number_all_rounders)
    var minbowl = Math.round(gamerule?.minimum_number_bowlers)
   // selectbowlList.length >= minbowl
   if(totalplayer < 11){
    toast.error('Please choose minimum 11 players')
   }
   else {


    if(selectwkList.length >= minwk && selectbatList.length >= minbat && selectarList.length >= minar)
    {
        setloading(true)
        try{
            
            var FormData = require('form-data');
            var data = new FormData();
    
            selectwkList.map((list, i) =>{
                return   data.append('wicket_keeper[]', list.id);
            })

            selectbatList.map((list, i) =>{
                return   data.append('batsman[]', list.id);
            })

            selectarList.map((list, i) =>{
                return   data.append('all_rounder[]', list.id);
            })

            selectbowlList.map((list, i) =>{
                return   data.append('bowler[]', list.id);
            })
          
            data.append("fantasygame_id", fantacygameId);
            data.append("team_unique_id", uniqueId);

            if(from == 'new'){
                const response = await ApiConnection.post("member-fantasygame", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                     navigate("/select-captain", { state: { id: response.data?.data?.team_unique_id, fantacyId:fantacygameId, from:from} })
                } else {
                    setloading(false)
                } 
            } else {

                var FormData = require('form-data');
                var data1 = new FormData();
        
                selectwkList.map((list, i) =>{
                    return   data1.append('wicket_keeper[]', list.id);
                })
    
                selectbatList.map((list, i) =>{
                    return   data1.append('batsman[]', list.id);
                })
    
                selectarList.map((list, i) =>{
                    return   data1.append('all_rounder[]', list.id);
                })
    
                selectbowlList.map((list, i) =>{
                    return   data1.append('bowler[]', list.id);
                })
              
                data1.append("fantasygame_id", fantacygameId);
                data1.append("team_unique_id", uniqueId);
                data1.append("_method", 'PUT');

                const response = await ApiConnection.post(`member-fantasygame/${fantacygameId}`, data1);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    if(isskip == 'skip'){
                        navigate("/dashboard")
                    } else
                     navigate("/select-captain", { state: { id: response.data?.data?.team_unique_id, fantacyId:fantacygameId, from:from} })
                } else {
                    setloading(false)
                } 
            }
            
        
            

        } catch(err){
            setloading(false)
            if(err?.response?.status === 422){
                  toast.error(err.response?.data?.message);   
              
            }
    }
  
    } else {
       toast.error('Please select minimum player')
    }

}


   
}


const TeampreviewHandle = ()=>{
    var minwk =  Math.round(gamerule?.minimum_number_wicket_keepers)
    var minbat = Math.round(gamerule?.minimum_number_batsman)
    var minar = Math.round(gamerule?.minimum_number_all_rounders)
    var minbowl = Math.round(gamerule?.minimum_number_bowlers)
   // selectbowlList.length >= minbowl


    // if(selectwkList.length >= minwk && selectbatList.length >= minbat && selectarList.length >= minar)
    if(selectwkList.length + selectbatList.length + selectarList.length + selectbowlList.length < 11)
    {
        toast.error('Please select 11 player')
 

} else {
    let data = {
        wicket:selectwkList,
        bat: selectbatList,
        ar:selectarList,
        bowl:selectbowlList,
        teams:teams
     }
     dispatch(GetTeampreviewAction(data))
     window.open('/team-preview', '_blank');
}
    
}




const getTimeRemaining = (e) => {
    const total =
        Date.parse(e) - Date.parse(match?.match_date);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor(
        (total / 1000 / 60) % 60
    );
    const hours = Math.floor(
        (total / 1000 / 60 / 60) % 24
    );
    return {
        total,
        hours,
        minutes,
        seconds,
    };
};

const startTimer = (e) => {
    let { total, hours, minutes, seconds } =
        getTimeRemaining(e);
    if (total >= 0) {
        // update the timer
        // check if less than 10 then we need to
        // add '0' at the beginning of the variable
        setTimer(
            (hours > 9 ? hours : "0" + hours) +
            ":" +
            (minutes > 9
                ? minutes
                : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
    }
};
const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
    }, 1000);
    Ref.current = id;
};
const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
};
useEffect(() => {
    clearTimer(getDeadTime());
}, []);

const onClickReset = () => {
    clearTimer(getDeadTime());
};

function GetTotalcreditscore(){

    let sumbat = 0;

    selectbatList.forEach( num => {
        sumbat += num?.credit_score;
    })

let sumwk = 0;

selectwkList.forEach( num => {
    sumwk += num?.credit_score;
})

let sumar = 0;

selectarList.forEach( num => {
    sumar += num?.credit_score;
})

let sumbowl = 0;

selectbowlList.forEach( num => {
    sumbowl += num?.credit_score;
})

var total = sumbat + sumwk + sumar + sumbowl

var leftr = fantasyCredit - total

return leftr;

}


console.log("teams", selectbatList)
console.log("wkList", wkList)


  return (
    <>
      {loading && <Loader/>}
    <LoginHeaderTwo  heading="Create a Team"  />
    <div className='back-page'>
        <div className='container'>
            <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
           
        </div>
    </div>
    <div className='team-container'>
    <div className='container'>
        <div className='row align-items-center'>
            <div className='col-lg-3'>
                <h5>Player</h5>
                <h6>{selectwkList.length + selectbatList.length + selectarList.length + selectbowlList.length}/11</h6>
            </div>
            <div className='col-lg-6'>
                <div className='row  hori-scroll'>
{
    newTeams&&newTeams.map((team, i)=>{
        return (
            <div className='col-lg-6' key={i}>
            <div className='team-match-i'>
                <img src={BaseUrl.baseurl + team?.team_image} />
                <div className='team-cnt-info'>
                  <h4>{team?.team_name}</h4>
                  <b>{teamPlayerCount[team.team_name] || 0}</b>
                  {/* {team.team_name}: {teamPlayerCount[team.team_name] || 0} selected player(s) */}
              </div>
            </div>
           
        </div>
        )
    })
}

            
                            {/* <div className='col-lg-4'>
                                <div className='team-cnt'>
                                  
                                    <div className='team-cnt-info'>
                                        <h4>{teams[1]?.team_name.substring(0,3)}</h4>
                                        <b>{teamtwowk.length + teamtwobat.length + teamtwoar.length + teamtwobow.length}</b>
                                    </div>
                                </div>
                            </div> */}
                    
                  
            </div>
               
            </div>
            <div className='col-lg-3 text-right'>
                <h5>Credits Left</h5>
                {/* <h6>{GetTotalcreditscore()}</h6> */}
                <h6>{TotalCredits - (WkTotalCredits+BatTotalCredits+ARTotalCredits+BowlTotalCredits)}</h6>
            </div>
        </div>
      
    </div>
    </div>
   
    <div className='container'>
            <div className='inner-container'>

                <ul className='team-tabs'>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('wk')} className={tabs === 'wk' ? 'nav-link active' : 'nav-link'}>WK <span style={{color:selectwkList.length < Math.round(gamerule?.minimum_number_wicket_keepers) ? 'red' : 'green'}}>{selectwkList.length}</span> <span style={{color:'#9C9C9C'}}>({Math.round(gamerule?.minimum_number_wicket_keepers)} - {Math.round(gamerule?.maximum_number_wicket_keepers)})</span></button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('bat')}  className={tabs === 'bat' ? 'nav-link active' : 'nav-link'}>bat <span style={{color:selectbatList.length < Math.round(gamerule?.minimum_number_batsman) ? 'red' : 'green'}}>{selectbatList.length}</span> <span style={{color:'#9C9C9C'}}>( {Math.round(gamerule?.minimum_number_batsman)} - {Math.round(gamerule?.maximum_number_batsman)})</span></button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('ar')}    className={tabs === 'ar' ? 'nav-link active' : 'nav-link'}>All Round <span style={{color:selectarList.length < Math.round(gamerule?.minimum_number_all_rounders) ? 'red' : 'green'}}>{selectarList.length}</span>  <span style={{color:'#9C9C9C'}}>({Math.round(gamerule?.minimum_number_all_rounders)} - {Math.round(gamerule?.maximum_number_all_rounders)})</span></button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('bowl')}   className={tabs === 'bowl' ? 'nav-link active' : 'nav-link'}>BOWL <span style={{color:selectbowlList.length < Math.round(gamerule?.minimum_number_bowlers) ? 'red' : 'green'}}>{selectbowlList.length}</span> <span style={{color:'#9C9C9C'}}>({Math.round(gamerule?.minimum_number_bowlers)} - {Math.round(gamerule?.maximum_number_bowlers)})</span></button>
                    </li>
                </ul>
                
                <div className='table-style'>
                        {tabs === "wk" &&
                        <>
                        <div className='tab-info'>
                            <h5>Pick {Math.round(gamerule?.minimum_number_wicket_keepers)} - {Math.round(gamerule?.maximum_number_wicket_keepers)}</h5>
                            <h6>Minimum: {Math.round(gamerule?.minimum_number_wicket_keepers)}  |  Maximum: {Math.round(gamerule?.maximum_number_wicket_keepers)}</h6>
                        </div>
                             <div className='table-responsive scroll-table'>
            <table className='custom-table creatTeamTable'>
                <thead>
                    <th >Team </th>
                    <th >Points </th>
                    {/* <th >Sell By </th> */}
                    <th >Credits </th>
                </thead>
                <tbody>
                    {wkList&&wkList.map((row, i)=>{
                        return (
                            <tr onClick={()=>wkhandleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
                                 <td>
                                    <div className='team-td'>
                                        <img src={BaseUrl.baseurl + row?.player_image} />
                                        <span>{row?.team_short_name}</span>
                                    </div>
                                 </td>
                                 <td>
                                 <div className='point-part'>
                                    <h3>{row?.player_name}</h3>
                                    {/* <h5>200 points</h5>
                                    <h6>Played Last Match</h6> */}
                                </div>
                                </td>
                                {/* <td>80%</td> */}
                                <td>{row?.credit_score}</td>
                                <td>{row.toggleSelected ? <i className="far fa-times-circle text-danger"></i>  : <i className="fas fa-plus-circle"></i>}</td>
                             </tr>
                        )
                    })}
                    
                </tbody>
            </table>
                                                  </div>
                        
                      
                             <div className='text-center mt-4'>
                             <ul className='tableBtn'>
                              
                                 <li>
                                     <button className='solid-btn' onClick={()=>{
                                        if(Math.round(selectwkList.length < gamerule?.minimum_number_wicket_keepers ))
                                        toast.error(`Please select minimum ${Math.round(gamerule?.minimum_number_wicket_keepers)}`)
                                            
                                        else settabs('bat')
                                     }}>Next</button>
                                 </li>
                             </ul>
                     </div>
                     </>
                        }
                         {tabs === "bat" &&
                          <>
                          <div className='tab-info'>
                              <h5>Pick {Math.round(gamerule?.minimum_number_batsman)} - {Math.round(gamerule?.maximum_number_batsman)}</h5>
                              <h6>Minimum: {Math.round(gamerule?.minimum_number_batsman)}  |  Maximum: {Math.round(gamerule?.maximum_number_batsman)}</h6>
                          </div>
                               <div className='table-responsive scroll-table'>
              <table className='custom-table creatTeamTable'>
                  <thead>
                      <th >Team </th>
                      <th >Points </th>
                      <th >Credits </th>
                  </thead>
                  <tbody>
                      {batList&&batList.map((row, i)=>{
                          return (
                              <tr onClick={()=>bathandleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
                                   <td>
                                      <div className='team-td'>
                                          <img src={BaseUrl.baseurl + row?.player_image} />
                                          <span>{row?.team_short_name}</span>
                                      </div>
                                   </td>
                                   <td>
                                   <div className='point-part'>
                                      <h3>{row?.player_name}</h3>
                                      {/* <h5>200 points</h5>
                                      <h6>Played Last Match</h6> */}
                                  </div>
                                  </td>
                                  <td>{row?.credit_score}</td>
                                  <td>{row.toggleSelected ? <i className="far fa-times-circle text-danger"></i>  : <i className="fas fa-plus-circle"></i>}</td>
                               </tr>
                          )
                      })}
                      
                  </tbody>
              </table>
                                                    </div>
                          
                        
                               <div className='text-center mt-4'>
                               <ul className='tableBtn'>
                               <li>
                                <button className='outline-btn' onClick={()=>settabs('wk')}>Prev</button>
                          
                            </li>
                               <li>
                                     <button className='solid-btn' onClick={()=>{
                                        if(Math.round(selectbatList.length < gamerule?.minimum_number_batsman ))
                                        toast.error(`Please select minimum ${Math.round(gamerule?.minimum_number_batsman)}`)
                                            
                                        else settabs('ar')
                                     }}>Next</button>
                                 </li>
                               </ul>
                       </div>
                       </>
                        } 
                       {tabs === "ar" &&
                         <>
                         <div className='tab-info'>
                             <h5>Pick {Math.round(gamerule?.minimum_number_all_rounders)} - {Math.round(gamerule?.maximum_number_all_rounders)}</h5>
                             <h6>Minimum: {Math.round(gamerule?.minimum_number_all_rounders)}  |  Maximum: {Math.round(gamerule?.maximum_number_all_rounders)}</h6>
                         </div>
                              <div className='table-responsive scroll-table'>
             <table className='custom-table creatTeamTable'>
                 <thead>
                     <th >Team </th>
                     <th >Points </th>
                     <th >Credits </th>
                 </thead>
                 <tbody>
                     {arList&&arList.map((row, i)=>{
                         return (
                             <tr onClick={()=>arhandleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
                                  <td>
                                     <div className='team-td'>
                                         <img src={BaseUrl.baseurl + row?.player_image} />
                                         <span>{row?.team_short_name}</span>
                                     </div>
                                  </td>
                                  <td>
                                  <div className='point-part'>
                                     <h3>{row?.player_name}</h3>
                                     {/* <h5>200 points</h5>
                                     <h6>Played Last Match</h6> */}
                                 </div>
                                 </td>

                                 <td>{row?.credit_score}</td>
                                 <td>{row.toggleSelected ? <i className="far fa-times-circle text-danger"></i>  : <i className="fas fa-plus-circle"></i>}</td>
                              </tr>
                         )
                     })}
                     
                 </tbody>
             </table>
                                                   </div>
                         
                       
                              <div className='text-center mt-4'>
                              <ul className='tableBtn'>
                              <li>
                                <button className='outline-btn' onClick={()=>settabs('bat')}>Prev</button>
                          
                            </li>
                              <li>
                                    <button className='solid-btn' onClick={()=>{
                                       if(Math.round(selectarList.length < gamerule?.minimum_number_all_rounders ))
                                       toast.error(`Please select minimum ${Math.round(gamerule?.minimum_number_all_rounders)}`)
                                           
                                       else settabs('bowl')
                                    }}>Next</button>
                                </li>
                              </ul>
                      </div>
                      </>
                        } 
                       
                         {tabs === "bowl" &&

<>
<div className='tab-info'>
    <h5>Pick {Math.round(gamerule?.minimum_number_bowlers)} - {Math.round(gamerule?.maximum_number_bowlers)}</h5>
    <h6>Minimum: {Math.round(gamerule?.minimum_number_bowlers)}  |  Maximum: {Math.round(gamerule?.maximum_number_bowlers)}</h6>
</div>
     <div className='table-responsive scroll-table'>
<table className='custom-table creatTeamTable'>
<thead>
<th >Team </th>
<th >Points </th>
<th >Credits </th>
</thead>
<tbody>
{bowlList&&bowlList.map((row, i)=>{
return (
    <tr onClick={()=>bowlhandleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
         <td>
            <div className='team-td'>
                <img src={BaseUrl.baseurl + row?.player_image} />
                <span>{row?.team_short_name}</span>
            </div>
         </td>
         <td>
         <div className='point-part'>
            <h3>{row?.player_name}</h3>
            {/* <h5>200 points</h5>
            <h6>Played Last Match</h6> */}
        </div>
        </td>
        <td>{row?.credit_score}</td>
        <td>{row.toggleSelected ? <i className="far fa-times-circle text-danger"></i>  : <i className="fas fa-plus-circle"></i>}</td>
     </tr>
)
})}

</tbody>
</table>
                          </div>


     <div className='text-center mt-4'>
     <ul className='tableBtn'>
     <li>
                                <button className='outline-btn' onClick={()=>settabs('ar')}>Prev</button>
                          
                            </li>
                            <li>
                            <button className='outline-btn' onClick={TeampreviewHandle}>Team Preview</button>
             
                          
                            </li>
                            <li>
                                <button className='solid-btn' onClick={()=>NextPageHandle('noskip')}>Select captain</button>
                            </li>
                            {from == 'edit' && 
                            <li>
                                <button className='solid-btn' onClick={()=>NextPageHandle('skip')}>Skip select captain </button>
                            </li>
}
     </ul>
</div>
</>
                     
                       
                        } 
                    </div>
          
              
            </div>
    </div>
    </>
  )
}

export default CreateTeam