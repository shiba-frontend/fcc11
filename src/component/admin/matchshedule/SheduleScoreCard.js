import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import TableLoader from '../../../utils/TableLoader';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from 'moment';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import ApiConnectionJson from '../../../utils/ApiConnectionJson';

const SheduleScoreCard = () => {

    const [teamone, setteamone] = useState("")
    const [teamtwo, setteamtwo] = useState("")
    const [TeamOneBatPlayer, setTeamOneBatPlayer] = useState([])
    const [TeamOneBowlPlayer, setTeamOneBowlPlayer] = useState([])
    const [TeamTwoBatPlayer, setTeamTwoBatPlayer] = useState([])
    const [TeamTwoBowlPlayer, setTeamTwoBowlPlayer] = useState([])
    const [loading, setloading] = useState(false)
    const [status, setstatus] = useState('');
    const [RowId, setRowId] = useState('');
    const [dismissalmodal, setdismissalmodal] = useState(false);
    const [dismissalmodalForTeamTwo, setdismissalmodalForTeamTwo] = useState(false);
    
    const [dismisaalType, setdismisaalType] = useState('');
    const [TeamOnePlayerOne, setTeamOnePlayerOne] = useState('');
    const [TeamOnePlayerTwo, setTeamOnePlayerTwo] = useState('');
    const [TeamOneTotalRuns, setTeamOneTotalRuns] = useState('');
    const [TeamOneTotalWickets, setTeamOneTotalWickets] = useState('');
    const [TeamOneTotalOvers, setTeamOneTotalOvers] = useState('');
    const [TeamTwoTotalRuns, setTeamTwoTotalRuns] = useState('');
    const [TeamTwoTotalWickets, setTeamTwoTotalWickets] = useState('');
    const [TeamTwoTotalOvers, setTeamTwoTotalOvers] = useState('');
    const [TeamTwoPlayerOne, setTeamTwoPlayerOne] = useState('');
    const [TeamTwoPlayerTwo, setTeamTwoPlayerTwo] = useState('');
    
    const [ScoreUpdateId, setScoreUpdateId] = useState(null)
    const [isdisabled, setisdisabled] = useState(false)
    
 
   

    const statevalue = useLocation();

    var {matchId, teamOneId, teamTwoId, selectTeam} = statevalue?.state

    const [key, setKey] = useState(teamOneId == selectTeam ? 'team_one' : teamTwoId == selectTeam ? 'team_two' : null );

    // let {id, team1, team2} = useParams()

    let navigate = useNavigate()


    const GetTeamOne = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`teams/list?team_id=${teamOneId}`)
            if(response?.status == 200){
                setteamone(response?.data?.data?.list[0]?.team_name)
                var team = response?.data?.data?.list[0]?.players
          
                var TempArray = []


                for(let i =0; i<11; i++){
                  var TempPlayerList = []
                  team.forEach(element => {
                    TempPlayerList.push({
                      'player_name': element.player_name,
                      'player_id': element.id,
                    })
                  })
                  TempArray.push({
                    'player_list':TempPlayerList,
                    'player_id':null,
                    'dismisal':{
                      'type':'-',
                      'player1':'',
                       'player2':'',
                    },
                       'run':null,
                       'ball':null,
                       'fours':null,
                       'sixs':null,
                       'sr':null,
                  
                  })
                }

                setTeamOneBatPlayer(TempArray)


                var TeamArr1 = []

                for(var i = 0; i <5; i++){
                  var BolwlerList = []
                  team.forEach(element => {
                    BolwlerList.push({
                      'player_id': element.id,
                      'player_name': element.player_name,
                    })
                  })
                  let object = {
                    'player_list':BolwlerList,
                    'over':null,
                    'mover':null,
                    'run':null,
                    'wicket':null,
                    'nb':null,
                    'wide':null,
                    'eco':null,
                  }
                  TeamArr1.push(object)
                }

                setTeamOneBowlPlayer(TeamArr1)

                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    const GetTeamTwo = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`teams/list?team_id=${teamTwoId}`)
            if(response?.status == 200){
                setteamtwo(response?.data?.data?.list[0]?.team_name)
                var team = response?.data?.data?.list[0]?.players
          
                var TempArray = []


                for(let i =0; i<11; i++){
                  var TempPlayerList = []
                  team.forEach(element => {
                    TempPlayerList.push({
                      'player_name': element.player_name,
                      'player_id': element.id,
                    })
                  })
                  TempArray.push({
                    'player_list':TempPlayerList,
                    'player_id':null,
                    'dismisal':{
                      'type':'-',
                      'player1':'',
                       'player2':'',
                    },
                       'run':null,
                       'ball':null,
                       'fours':null,
                       'sixs':null,
                       'sr':null,
                  
                  })
                }

          
                setTeamTwoBatPlayer(TempArray)

                var TeamArr1 = []

                for(var i = 0; i <5; i++){
                  var BolwlerList = []
                  team.forEach(element => {
                    BolwlerList.push({
                      'player_id': element.id,
                      'player_name': element.player_name,
                    })
                  })
                  let object = {
                    'player_list':BolwlerList,
                    'over':null,
                    'mover':null,
                    'run':null,
                    'wicket':null,
                    'nb':null,
                    'wide':null,
                    'eco':null,
                  }
                  TeamArr1.push(object)
                }

                setTeamTwoBowlPlayer(TeamArr1)
                setloading(false)

            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(()=>{
        GetTeamOne()
        GetTeamTwo()
    },[])

    console.log(TeamTwoBatPlayer)



    const TeamoneBatInputHandle = (value, index, key)=>{
      var raw = [...TeamOneBatPlayer]

      raw[index][key] = value

      var run =  raw[index]['run'] 
      var ball =  raw[index]['ball'] 

      if(key == 'ball'){
        raw[index]['sr'] = ((Number(run) / Number(ball)) * 100).toFixed(2)
      }

      setTeamOneBatPlayer(raw)

    }


    const TeamoneBowlInputHandle = (value, index, key)=>{
      var raw = [...TeamOneBowlPlayer]

      raw[index][key] = value

      var run =  raw[index]['run'] 
      var over =  raw[index]['over'] 


      if(key == 'over'){
        raw[index]['eco'] = ((Number(run) / Number(over))).toFixed(2)
      }

      setTeamOneBowlPlayer(raw)

    }

function DismissalHandle(rid){
  setRowId(rid)
  setdismissalmodal(true)
}

function SubmitDismissalHandle (){
  var raw = [...TeamOneBatPlayer]

      raw[RowId]['dismisal'].type = dismisaalType
      raw[RowId]['dismisal'].player1 = TeamOnePlayerOne
      raw[RowId]['dismisal'].player2 = TeamOnePlayerTwo
      setTeamOneBatPlayer(raw)
      setdismissalmodal(false)
      setdismisaalType('')
      setTeamOnePlayerOne('')
      setTeamOnePlayerTwo('')
}

const AddRowhandlerTeamOne = ()=>{
  var TemArr = []

  TeamOneBowlPlayer[0].player_list.forEach(elem =>{
    TemArr.push({
      'player_id': elem.id,
      'player_name': elem.player_name,
    })
  })

  var inputlist = {
    'player_list':TemArr,
    'over':null,
    'mover':null,
    'run':null,
    'wicket':null,
    'nb':null,
    'wide':null,
    'eco':null,
  }
setTeamOneBowlPlayer([...TeamOneBowlPlayer, inputlist]) 
}

const SubmitHandle = async () => {

    if(TeamOneTotalRuns == ''){
      toast.error('Total runs is mandatory')
    } else  if(TeamOneTotalWickets == ''){
      toast.error('Total wickets is mandatory')
    } else  if(TeamOneTotalOvers == ''){
      toast.error('Total overs is mandatory')
    } else {


  setloading(true)

  let players = []
  let bowlers = []

  TeamOneBatPlayer.map((item)=>{
    let objj = {
      'id': item.player_id,
      'run':item.run,
      'ball':item.ball,
      "fours": item.fours,
      "sixers": item.sixs,
      "sr":item.sr,
      "dismissal": {
          "type":item.dismisal.type,
          "player1": item.dismisal.player1,
          "player2": item.dismisal.player2
      }
    }
    players.push(objj)
  })

  TeamOneBowlPlayer.map((item)=>{
    bowlers.push({
            'id':item.player_id,
            "O": Number(item.over),
            "M": Number(item.mover),
            "R": Number(item.run),
            "W": Number(item.wicket),
            "NB": Number(item.over),
            "WD": Number(item.wide),
            "ECO": Number(item.eco)
    })
  })

  let obj = {
    "score_update_id": selectTeam == teamOneId ? '' : teamTwoId,
    "team_id": teamOneId,
    "runs": TeamOneTotalRuns,
    "wickets": TeamOneTotalWickets,
    "overs": TeamOneTotalOvers,
    "batting": players,
    'bowling':bowlers
 }
 setisdisabled(true)
 setKey('team_two')


  try{
    const response = await ApiConnectionJson.post(`update-scorecard/${matchId}`, obj)

    if(response?.status == 200){
      setloading(false)
      toast.success(response?.data?.message);
      console.log(response.data?.data?.score_update_id)
      setScoreUpdateId(response.data?.data?.score_update_id)
      setKey('team_two')
    }


    


  } catch(err){
  }
}

}

// Team Two

const TeamtwoBatInputHandle = (value, index, key)=>{
  var raw = [...TeamTwoBatPlayer]

  raw[index][key] = value

  var run =  raw[index]['run'] 
  var ball =  raw[index]['ball'] 

  if(key == 'ball'){
    raw[index]['sr'] = ((Number(run) / Number(ball)) * 100).toFixed(2)
  }

  setTeamTwoBatPlayer(raw)

}

function DismissalHandleTeamTwo(rid){
  setRowId(rid)
  setdismissalmodalForTeamTwo(true)
}

function SubmitDismissalHandleForTeamTwo (){
  var raw = [...TeamTwoBatPlayer]

      raw[RowId]['dismisal'].type = dismisaalType
      raw[RowId]['dismisal'].player1 = TeamTwoPlayerOne
      raw[RowId]['dismisal'].player2 = TeamTwoPlayerTwo
      setTeamTwoBatPlayer(raw)
      setdismissalmodalForTeamTwo(false)
      setdismisaalType('')
      setTeamTwoPlayerOne('')
      setTeamTwoPlayerTwo('')
}

const TeamtwoBowlInputHandle = (value, index, key)=>{
  var raw = [...TeamTwoBowlPlayer]

  raw[index][key] = value

  var run =  raw[index]['run'] 
  var over =  raw[index]['over'] 


  if(key == 'over'){
    raw[index]['eco'] = ((Number(run) / Number(over))).toFixed(2)
  }

  setTeamTwoBowlPlayer(raw)

}

const AddRowhandlerTeamTwo = ()=>{
  var TemArr = []

  TeamTwoBowlPlayer[0].player_list.forEach(elem =>{
    TemArr.push({
      'player_id': elem.id,
      'player_name': elem.player_name,
    })
  })

  var inputlist = {
    'player_list':TemArr,
    'over':null,
    'mover':null,
    'run':null,
    'wicket':null,
    'nb':null,
    'wide':null,
    'eco':null,
  }
setTeamTwoBowlPlayer([...TeamTwoBowlPlayer, inputlist]) 
}

const SubmitHandleTeamTwo = async () => {

  if(TeamTwoTotalRuns == ''){
    toast.error('Total runs is mandatory')
  } else  if(TeamTwoTotalWickets == ''){
    toast.error('Total wickets is mandatory')
  } else  if(TeamTwoTotalOvers == ''){
    toast.error('Total overs is mandatory')
  } else {


setloading(true)

let players = []
let bowlers = []

TeamTwoBatPlayer.map((item)=>{
  let objj = {
    'id': item.player_id,
    'run':item.run,
    'ball':item.ball,
    "fours": item.fours,
    "sixers": item.sixs,
    "sr":item.sr,
    "dismissal": {
        "type":item.dismisal.type,
        "player1": item.dismisal.player1,
        "player2": item.dismisal.player2
    }
  }
  players.push(objj)
})

TeamTwoBowlPlayer.map((item)=>{
  bowlers.push({
          'id':item.player_id,
          "O": Number(item.over),
          "M": Number(item.mover),
          "R": Number(item.run),
          "W": Number(item.wicket),
          "NB": Number(item.over),
          "WD": Number(item.wide),
          "ECO": Number(item.eco)
  })
})

let obj = {
  "score_update_id": selectTeam == teamTwoId ? '' : teamOneId,
  "team_id": teamTwoId,
  "runs": TeamTwoTotalRuns,
  "wickets": TeamTwoTotalWickets,
  "overs": TeamTwoTotalOvers,
  "batting": players,
  'bowling':bowlers
}
setisdisabled(true)
setKey('team_one')



try{
  const response = await ApiConnectionJson.post(`update-scorecard/${matchId}`, obj)

  if(response?.status == 200){
    setloading(false)
    toast.success(response?.data?.message);
    setScoreUpdateId(response.data?.data?.score_update_id)
    setKey('team_one')
   //navigate('/admin/match-schedule')
  }


  


} catch(err){
  setloading(false)
}
}

}





  return (
    <div>
    {loading && <Loader/>}
<DashboardHeader title="Scorecard" />
<AdminMenu />
<div className="container">
  <div className="dashboard-panel">
  <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="team_one" title={`${teamone} (Team One)`} disabled={teamTwoId == selectTeam || isdisabled ? true : false}>

      <Accordion defaultActiveKey="0" flush className='scorboard-acc'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Batting</Accordion.Header>
        <Accordion.Body>
          <div className='row justify-content-end my-3'>
            <div className='col-lg-2'>
               <input type="text" className="form-control" placeholder="Total Runs"
                value={TeamOneTotalRuns}
                onChange={(e)=>setTeamOneTotalRuns(e.target.value)}
               />
            </div>
            <div className='col-lg-2'>
               <input type="text" className="form-control" placeholder="Total Wickets"
               value={TeamOneTotalWickets}
               onChange={(e)=>setTeamOneTotalWickets(e.target.value)}
               />
            </div>
            <div className='col-lg-2'>
               <input type="text" className="form-control" placeholder="Total Overs"
               value={TeamOneTotalOvers}
               onChange={(e)=>setTeamOneTotalOvers(e.target.value)}
               />
            </div>
          </div>

        <table className="table-scroe w-100">
          <th>Position</th>
            <th>Player</th>
            <th>Mode of</th>
            <th>Type</th>
            <th style={{width:'90px'}}>R</th>
            <th style={{width:'90px'}}>B</th>
            <th style={{width:'90px'}}>4s</th>
            <th style={{width:'90px'}}>6s</th>
            <th style={{width:'110px'}}>SR</th>
            <tbody>
              {
                TeamOneBatPlayer&&TeamOneBatPlayer.map((item, i)=>{
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                    <td>
                    
                    <select className='form-control'
                    value={item?.player_id}
                    onChange={(e)=>TeamoneBatInputHandle(e.target.value, i, 'player_id')}
                    >
                      <option value=''>--Select Player--</option>
                      {item?.player_list.map((list, i)=>{
                        return <option key={i} value={list?.player_id}>{list?.player_name}</option>
                      })}
                    </select>

                    </td>
                    <td>
                      <button className='btn btn-outline-primary' onClick={()=>DismissalHandle(i)}>Dismissal</button>
                    </td>
                    <td>{item?.dismisal?.type}</td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.run}
                        onChange={(e)=>TeamoneBatInputHandle(e.target.value, i, 'run')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control '
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.ball}
                        onChange={(e)=>TeamoneBatInputHandle(e.target.value, i, 'ball')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.fours}
                        onChange={(e)=>TeamoneBatInputHandle(e.target.value, i, 'fours')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.sixs}
                        onChange={(e)=>TeamoneBatInputHandle(e.target.value, i, 'sixs')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.sr}
                        readOnly
                        />
                    </td>
                  </tr>
                  )
                })
              }
             
            </tbody>
          </table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Bowling</Accordion.Header>
        <Accordion.Body>
        <table className="table-scroe w-100">
            <th>Player</th>
            <th style={{width:'90px'}}>Run</th>
            <th style={{width:'90px'}}>O</th>
            <th style={{width:'90px'}}>MO</th>
            <th style={{width:'90px'}}>W</th>
            <th style={{width:'90px'}}>NB</th>
            <th style={{width:'90px'}}>WD</th>
            <th style={{width:'110px'}}>ECO</th>
            <tbody>
              {
                TeamOneBowlPlayer&&TeamOneBowlPlayer.map((item, i)=>{
                  return (
                    <tr key={i}>
                    <td>
                    <select className='form-control'
                    value={item?.player_id}
                    onChange={(e)=>TeamoneBowlInputHandle(e.target.value, i, 'player_id')}
                    >
                      <option value=''>--Select Player--</option>
                      {item?.player_list.map((list, i)=>{
                        return <option key={i} value={list?.player_id}>{list?.player_name}</option>
                      })}
                    </select>
                    

                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.run}
                        onChange={(e)=>TeamoneBowlInputHandle(e.target.value, i, 'run')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                      
                        value={item.over}
                        onChange={(e)=>TeamoneBowlInputHandle(e.target.value, i, 'over')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control '
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.mover}
                        onChange={(e)=>TeamoneBowlInputHandle(e.target.value, i, 'mover')}
                        />
                    </td>
                   
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.w}
                        onChange={(e)=>TeamoneBowlInputHandle(e.target.value, i, 'wicket')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.nb}
                        onChange={(e)=>TeamoneBowlInputHandle(e.target.value, i, 'nb')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.wd}
                        onChange={(e)=>TeamoneBowlInputHandle(e.target.value, i, 'wide')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.eco}
                        readOnly
                        />
                    </td>
                  </tr>
                  )
                })
              }
             
            </tbody>
          </table>
          <div className="text-center my-3">
          <button className='btn btn-outline-primary' onClick={AddRowhandlerTeamOne}>Add More</button>
          </div>
         
        </Accordion.Body>
      </Accordion.Item>
      <div className='text-right mt-4'>
        <button className='btn btn-success' onClick={SubmitHandle}>Update</button>
      </div>
    </Accordion>



         
      </Tab>
      <Tab eventKey="team_two"  title={`${teamtwo} (Team Two)`} disabled={teamOneId == selectTeam || isdisabled  ? true : false}>
      <Accordion defaultActiveKey="2" flush className='scorboard-acc'>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Batting</Accordion.Header>
        <Accordion.Body>
          <div className='row justify-content-end my-3'>
            <div className='col-lg-2'>
               <input type="text" className="form-control" placeholder="Total Runs"
                value={TeamTwoTotalRuns}
                onChange={(e)=>setTeamTwoTotalRuns(e.target.value)}
               />
            </div>
            <div className='col-lg-2'>
               <input type="text" className="form-control" placeholder="Total Wickets"
               value={TeamTwoTotalWickets}
               onChange={(e)=>setTeamTwoTotalWickets(e.target.value)}
               />
            </div>
            <div className='col-lg-2'>
               <input type="text" className="form-control" placeholder="Total Overs"
               value={TeamTwoTotalOvers}
               onChange={(e)=>setTeamTwoTotalOvers(e.target.value)}
               />
            </div>
          </div>

        <table className="table-scroe w-100">
          <th>Position</th>
            <th>Player</th>
            <th>Mode of</th>
            <th>Type</th>
            <th style={{width:'90px'}}>R</th>
            <th style={{width:'90px'}}>B</th>
            <th style={{width:'90px'}}>4s</th>
            <th style={{width:'90px'}}>6s</th>
            <th style={{width:'110px'}}>SR</th>
            <tbody>
              {
                TeamTwoBatPlayer&&TeamTwoBatPlayer.map((item, i)=>{
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                    <td>
                    
                    <select className='form-control'
                    value={item?.player_id}
                    onChange={(e)=>TeamtwoBatInputHandle(e.target.value, i, 'player_id')}
                    >
                      <option value=''>--Select Player--</option>
                      {item?.player_list.map((list, i)=>{
                        return <option key={i} value={list?.player_id}>{list?.player_name}</option>
                      })}
                    </select>

                    </td>
                    <td>
                      <button className='btn btn-outline-primary' onClick={()=>DismissalHandleTeamTwo(i)}>Dismissal</button>
                    </td>
                    <td>{item?.dismisal?.type}</td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.run}
                        onChange={(e)=>TeamtwoBatInputHandle(e.target.value, i, 'run')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control '
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.ball}
                        onChange={(e)=>TeamtwoBatInputHandle(e.target.value, i, 'ball')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.fours}
                        onChange={(e)=>TeamtwoBatInputHandle(e.target.value, i, 'fours')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.sixs}
                        onChange={(e)=>TeamtwoBatInputHandle(e.target.value, i, 'sixs')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.sr}
                        readOnly
                        />
                    </td>
                  </tr>
                  )
                })
              }
             
            </tbody>
          </table>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Bowling</Accordion.Header>
        <Accordion.Body>
        <table className="table-scroe w-100">
            <th>Player</th>
            <th style={{width:'90px'}}>Run</th>
            <th style={{width:'90px'}}>O</th>
            <th style={{width:'90px'}}>MO</th>
            <th style={{width:'90px'}}>W</th>
            <th style={{width:'90px'}}>NB</th>
            <th style={{width:'90px'}}>WD</th>
            <th style={{width:'110px'}}>ECO</th>
            <tbody>
              {
                TeamTwoBowlPlayer&&TeamTwoBowlPlayer.map((item, i)=>{
                  return (
                    <tr key={i}>
                    <td>
                    <select className='form-control'
                    value={item?.player_id}
                    onChange={(e)=>TeamtwoBowlInputHandle(e.target.value, i, 'player_id')}
                    >
                      <option value=''>--Select Player--</option>
                      {item?.player_list.map((list, i)=>{
                        return <option key={i} value={list?.player_id}>{list?.player_name}</option>
                      })}
                    </select>
                    

                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.run}
                        onChange={(e)=>TeamtwoBowlInputHandle(e.target.value, i, 'run')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                      
                        value={item.over}
                        onChange={(e)=>TeamtwoBowlInputHandle(e.target.value, i, 'over')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control '
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.mover}
                        onChange={(e)=>TeamtwoBowlInputHandle(e.target.value, i, 'mover')}
                        />
                    </td>
                   
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.w}
                        onChange={(e)=>TeamtwoBowlInputHandle(e.target.value, i, 'wicket')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.nb}
                        onChange={(e)=>TeamtwoBowlInputHandle(e.target.value, i, 'nb')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.wd}
                        onChange={(e)=>TeamtwoBowlInputHandle(e.target.value, i, 'wide')}
                        />
                    </td>
                    <td>
                        <input type="text" 
                        name=""
                        placeholder="-" 
                        className='form-control'
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        value={item.eco}
                        readOnly
                        />
                    </td>
                  </tr>
                  )
                })
              }
             
            </tbody>
          </table>
          <div className="text-center my-3">
          <button className='btn btn-outline-primary' onClick={AddRowhandlerTeamTwo}>Add More</button>
          </div>
         
        </Accordion.Body>
      </Accordion.Item>
      <div className='text-right mt-4'>
        <button className='btn btn-success' onClick={SubmitHandleTeamTwo}>Update</button>
      </div>
    </Accordion>
      </Tab>

    </Tabs>

  </div>
  </div>
  <Modal
    show={dismissalmodal}
   
    centered
  >

    <Modal.Body className='text-center'>
         <h5>Select mode of dismissal</h5>   
         <select className='form-control mb-4'
         value={dismisaalType}
         onChange={(e)=>setdismisaalType(e.target.value)}
         >
         <option value=''>--Select--</option>
              <option value='bowled'>Bowled</option>
              <option value='lbw'>LBW</option>
              <option value='caught'>Caught</option>
              <option value='stumped'>Stumped</option>
              <option value='runout'>Run Out</option>
              <option value='Retired Hurt'>Retired Hurt</option>
              <option value='Timed Out'>Timed Out</option>
              <option value='Did not bat'>Did not bat</option>
          </select>  
          {dismisaalType === 'bowled' && 
          <div className='row'>
              <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>Bowled By</label>
                    <select className='form-control'
                    value={TeamOnePlayerOne}
                    onChange={(e)=>setTeamOnePlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                        {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
             
          </div>
            
          }
          {dismisaalType === 'lbw' && 
          <div className='row'>
              <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>LBW By</label>
                    <select className='form-control'
                     value={TeamOnePlayerOne}
                     onChange={(e)=>setTeamOnePlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
          </div>
            
          }
          {dismisaalType === 'caught' && 
          <div className='row'>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Bowler By</label>
                    <select className='form-control'
                     value={TeamOnePlayerOne}
                     onChange={(e)=>setTeamOnePlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Caught By</label>
                    <select className='form-control'
                    value={TeamOnePlayerTwo}
                    onChange={(e)=>setTeamOnePlayerTwo(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
          </div>
          }
            {dismisaalType === 'stumped' && 
          <div className='row'>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Bowler By</label>
                    <select className='form-control'
                     value={TeamOnePlayerOne}
                     onChange={(e)=>setTeamOnePlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Stumped By</label>
                    <select className='form-control'
                     value={TeamOnePlayerTwo}
                     onChange={(e)=>setTeamOnePlayerTwo(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
          </div>
          }
            {dismisaalType === 'runout' && 
          <div className='row'>
            <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Bowler By</label>
                    <select className='form-control'
                     value={TeamOnePlayerOne}
                     onChange={(e)=>setTeamOnePlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Run out By</label>
                    <select className='form-control'
                     value={TeamOnePlayerTwo}
                     onChange={(e)=>setTeamOnePlayerTwo(e.target.value)}
                    >
                    <option>--Select--</option>
                    {TeamTwoBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
             
          </div>
            
          }
         <ul className='d-flex mt-5 justify-content-center '>
            <li>
                <button className='btn btn-success mr-2' onClick={SubmitDismissalHandle}>Submit</button>
            </li>
            <li>
                <button className='btn btn-outline-danger ml-2' onClick={()=>setdismissalmodal(false)}>Cancel</button>
            </li>
        </ul>
    </Modal.Body>
  
  </Modal>
  <Modal
    show={dismissalmodalForTeamTwo}
   
    centered
  >

    <Modal.Body className='text-center'>
         <h5>Select mode of dismissal</h5>   
         <select className='form-control mb-4'
         value={dismisaalType}
         onChange={(e)=>setdismisaalType(e.target.value)}
         >
         <option value=''>--Select--</option>
              <option value='bowled'>Bowled</option>
              <option value='lbw'>LBW</option>
              <option value='caught'>Caught</option>
              <option value='stumped'>Stumped</option>
              <option value='runout'>Run Out</option>
              <option value='Retired Hurt'>Retired Hurt</option>
              <option value='Timed Out'>Timed Out</option>
              <option value='Did not bat'>Did not bat</option>
          </select>  
          {dismisaalType === 'bowled' && 
          <div className='row'>
              <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>Bowled By</label>
                    <select className='form-control'
                    value={TeamOnePlayerOne}
                    onChange={(e)=>setTeamOnePlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                        {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
             
          </div>
            
          }
          {dismisaalType === 'lbw' && 
          <div className='row'>
              <div className='col-lg-12'>
                  <div className='form-group'>
                    <label>LBW By</label>
                    <select className='form-control'
                     value={TeamTwoPlayerOne}
                     onChange={(e)=>setTeamTwoPlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
          </div>
            
          }
          {dismisaalType === 'caught' && 
          <div className='row'>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Bowler By</label>
                    <select className='form-control'
                      value={TeamTwoPlayerOne}
                      onChange={(e)=>setTeamTwoPlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Caught By</label>
                    <select className='form-control'
                         value={TeamTwoPlayerTwo}
                         onChange={(e)=>setTeamTwoPlayerTwo(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
          </div>
          }
            {dismisaalType === 'stumped' && 
          <div className='row'>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Bowler By</label>
                    <select className='form-control'
                     value={TeamTwoPlayerOne}
                     onChange={(e)=>setTeamTwoPlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Stumped By</label>
                    <select className='form-control'
                         value={TeamTwoPlayerTwo}
                         onChange={(e)=>setTeamTwoPlayerTwo(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
          </div>
          }
            {dismisaalType === 'runout' && 
          <div className='row'>
            <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Bowler By</label>
                    <select className='form-control'
                     value={TeamTwoPlayerOne}
                     onChange={(e)=>setTeamTwoPlayerOne(e.target.value)}
                    >
                      <option>--Select--</option>
                      {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
              <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Run out By</label>
                    <select className='form-control'
                     value={TeamTwoPlayerTwo}
                     onChange={(e)=>setTeamTwoPlayerTwo(e.target.value)}
                    >
                    <option>--Select--</option>
                    {TeamOneBowlPlayer[0].player_list.map((player)=>{
                          return <option value={player?.player_id}>{player?.player_name}</option>
                        })}
                    </select>
                </div>
              </div>
             
          </div>
            
          }
         <ul className='d-flex mt-5 justify-content-center '>
            <li>
                <button className='btn btn-success mr-2' onClick={SubmitDismissalHandleForTeamTwo}>Submit</button>
            </li>
            <li>
                <button className='btn btn-outline-danger ml-2' onClick={()=>setdismissalmodalForTeamTwo(false)}>Cancel</button>
            </li>
        </ul>
    </Modal.Body>
  
  </Modal>
</div>
  )
}

export default SheduleScoreCard