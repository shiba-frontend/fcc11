import React, { useEffect, useRef, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Wk from './Wk';
import { NavLink, useNavigate, useParams  } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { GetTeampreviewAction } from '../../../redux/reducer/fccDataflowreducer';
import moment from 'moment';

const EditCreateTeam = () => {
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

    let dispatch = useDispatch()
    const navigate = useNavigate()
    const {id, pros} = useParams()
    const Ref = useRef(null);

    const GetPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`member-fantasygame/${id}`)
            const  responseone = await ApiConnection.get(`get-game-rules?game_admin=${id}`)
            if(response?.status && responseone?.status  == 200){
                setloading(false)
                setgamerule(responseone.data?.data?.list?.game_rule)
                // setbatList(response.data?.data?.list?.players?.Batsman)
                // setwkList(response.data?.data?.list?.players?.WicketKeeper)
                // setarList(response.data?.data?.list?.players?.AllRounder)
                // setbowlList(response.data?.data?.list?.players?.Bowler)
                setteams(response.data?.data?.list?.teams)
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


    const wkhandleRowClicked = (row) => {

        var max = Math.round(gamerule?.maximum_number_wicket_keepers)

        const updatedData = wkList.map(item => {
        
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
            }
        })
        setselectwkList(TempArr)

        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} wicket keeper`)
        } else {
            setwkList(updatedData);
        }

    

      };

      const bathandleRowClicked = (row) => {

        var max = Math.round(gamerule?.maximum_number_batsman)

        const updatedData = batList.map(item => {
        
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
            }
        })
        setselectbatList(TempArr)
   
        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} batsman`)
        } else {
            setbatList(updatedData);
        }
      };
    
      const arhandleRowClicked = (row) => {

        var max = Math.round(gamerule?.maximum_number_all_rounders)

        const updatedData = arList.map(item => {
        
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
            }
        })
        setselectarList(TempArr)
   
        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} all rounders`)
        } else {
            setarList(updatedData);
        }
      };
      const bowlhandleRowClicked = (row) => {

        var max = Math.round(gamerule?.maximum_number_bowlers)

        const updatedData = bowlList.map(item => {
        
          if (row.id !== item.id) {
            return item
          }
    
          return {
            ...item,
            toggleSelected: !item.toggleSelected
          };
        });
        var TempArr = []
        updatedData.forEach(element =>{
            if(element?.toggleSelected){
                TempArr.push(element);
            }
        })
        setselectbowlList(TempArr)
   
        if(TempArr.length > max){
            toast.error(`You choose maximum ${max} bowlers`)
        } else {
            setbowlList(updatedData);
        }
      };

const NextPageHandle = async () => {

    var minwk =  Math.round(gamerule?.minimum_number_wicket_keepers)
    var minbat = Math.round(gamerule?.minimum_number_batsman)
    var minar = Math.round(gamerule?.minimum_number_all_rounders)
    var minbowl = Math.round(gamerule?.minimum_number_bowlers)
   // selectbowlList.length >= minbowl

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
          
            data.append("fantasygame_id", id);
        
            const response = await ApiConnection.post("member-fantasygame", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                 navigate("/select-captain", { state: { id: response.data?.data?.team_unique_id } })
            } else {
                setloading(false)
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


const TeampreviewHandle = ()=>{
    var minwk =  Math.round(gamerule?.minimum_number_wicket_keepers)
    var minbat = Math.round(gamerule?.minimum_number_batsman)
    var minar = Math.round(gamerule?.minimum_number_all_rounders)
    var minbowl = Math.round(gamerule?.minimum_number_bowlers)
   // selectbowlList.length >= minbowl


    if(selectwkList.length >= minwk && selectbatList.length >= minbat && selectarList.length >= minar)
    {
    let data = {
       wicket:selectwkList,
       bat: selectbatList,
       ar:selectarList,
       bowl:selectbowlList
    }
    dispatch(GetTeampreviewAction(data))
    window.open('/team-preview', '_blank');

} else {
    toast.error('Please select minimum player')
}
    
}



  return (
    <>
      {loading && <Loader/>}
    <LoginHeaderTwo  heading="Edit a team" subheading={timer} />
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
                <div className='row justify-content-center'>
                    {teams&&teams.map((team,i)=>{
                        return (
                            <div className='col-lg-4' key={i}>
                                <div className='team-cnt'>
                                    <div className='team-cnt-img'>
                                        <img src={IMAGE.ind} alt="country"/>
                                    </div>
                                    <div className='team-cnt-info'>
                                        <h4>{team?.team_name.substring(0,3)}</h4>
                                        <b>{team?.players}</b>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                  
            </div>
               
            </div>
            <div className='col-lg-3 text-right'>
                <h5>Credits Left</h5>
                <h6>3</h6>
            </div>
        </div>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <span>ODI Match</span>
    </div>
    </div>
    <div className='team-info'>
        <div className='container'>
            <ul>
                <li>Match Date: <b>{moment(match?.match_date).format('MMM Do YY')}</b></li>
                <li>Match Time: <b>{moment(`2024-01-01 ${match?.match_start_time}`).format('LT')}</b></li>
            </ul>
        </div>
    </div>
    <div className='container'>
            <div className='inner-container'>

                <ul className='team-tabs'>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('wk')} className={tabs === 'wk' ? 'nav-link active' : 'nav-link'}>{`WK (${selectwkList.length})`}</button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('bat')}  className={tabs === 'bat' ? 'nav-link active' : 'nav-link'}>{`bat (${selectbatList.length})`}</button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('ar')}    className={tabs === 'ar' ? 'nav-link active' : 'nav-link'}>{`AR (${selectarList.length})`}</button>
                    </li>
                    <li className='nav-item'>
                        <button onClick={()=>settabs('bowl')}   className={tabs === 'bowl' ? 'nav-link active' : 'nav-link'}>{`BOWL (${selectbowlList.length})`}</button>
                    </li>
                </ul>
                
                <div className='table-style'>
                        {tabs === "wk" &&
                        <>
                        <div className='tab-info'>
                            <h5>Pick 1-{wkList&&wkList.length} Wicket Keeper:</h5>
                            <h6>Minimum: {Math.round(gamerule?.minimum_number_wicket_keepers)}  |  Maximum: {Math.round(gamerule?.maximum_number_wicket_keepers)}</h6>
                        </div>
                             <div className='table-responsive'>
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
                                        <span>{row?.nationality.substring(0,3)}</span>
                                    </div>
                                 </td>
                                 <td>
                                 <div className='point-part'>
                                    <h3>{row?.player_name}</h3>
                                    <h5>200 points</h5>
                                    <h6>Played Last Match</h6>
                                </div>
                                </td>
                                {/* <td>80%</td> */}
                                <td>9.5</td>
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
                              <h5>Pick 1-{batList&&batList.length} Batsman:</h5>
                              <h6>Minimum: {Math.round(gamerule?.minimum_number_batsman)}  |  Maximum: {Math.round(gamerule?.maximum_number_batsman)}</h6>
                          </div>
                               <div className='table-responsive'>
              <table className='custom-table creatTeamTable'>
                  <thead>
                      <th >Team </th>
                      <th >Points </th>
                      <th >Sell By </th>
                      <th >Credits </th>
                  </thead>
                  <tbody>
                      {batList&&batList.map((row, i)=>{
                          return (
                              <tr onClick={()=>bathandleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
                                   <td>
                                      <div className='team-td'>
                                          <img src={BaseUrl.baseurl + row?.player_image} />
                                          <span>{row?.nationality.substring(0,3)}</span>
                                      </div>
                                   </td>
                                   <td>
                                   <div className='point-part'>
                                      <h3>{row?.player_name}</h3>
                                      <h5>200 points</h5>
                                      <h6>Played Last Match</h6>
                                  </div>
                                  </td>
                                  <td>80%</td>
                                  <td>9.5</td>
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
                             <h5>Pick 1-{arList&&arList.length} all rounders:</h5>
                             <h6>Minimum: {Math.round(gamerule?.minimum_number_all_rounders)}  |  Maximum: {Math.round(gamerule?.maximum_number_all_rounders)}</h6>
                         </div>
                              <div className='table-responsive'>
             <table className='custom-table creatTeamTable'>
                 <thead>
                     <th >Team </th>
                     <th >Points </th>
                     <th >Sell By </th>
                     <th >Credits </th>
                 </thead>
                 <tbody>
                     {arList&&arList.map((row, i)=>{
                         return (
                             <tr onClick={()=>arhandleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
                                  <td>
                                     <div className='team-td'>
                                         <img src={BaseUrl.baseurl + row?.player_image} />
                                         <span>{row?.nationality.substring(0,3)}</span>
                                     </div>
                                  </td>
                                  <td>
                                  <div className='point-part'>
                                     <h3>{row?.player_name}</h3>
                                     <h5>200 points</h5>
                                     <h6>Played Last Match</h6>
                                 </div>
                                 </td>
                                 <td>80%</td>
                                 <td>9.5</td>
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
    <h5>Pick 1-{bowlList&&bowlList.length} bowlers:</h5>
    <h6>Minimum: {Math.round(gamerule?.minimum_number_bowlers)}  |  Maximum: {Math.round(gamerule?.maximum_number_bowlers)}</h6>
</div>
     <div className='table-responsive'>
<table className='custom-table creatTeamTable'>
<thead>
<th >Team </th>
<th >Points </th>
<th >Sell By </th>
<th >Credits </th>
</thead>
<tbody>
{bowlList&&bowlList.map((row, i)=>{
return (
    <tr onClick={()=>bowlhandleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
         <td>
            <div className='team-td'>
                <img src={BaseUrl.baseurl + row?.player_image} />
                <span>{row?.nationality.substring(0,3)}</span>
            </div>
         </td>
         <td>
         <div className='point-part'>
            <h3>{row?.player_name}</h3>
            <h5>200 points</h5>
            <h6>Played Last Match</h6>
        </div>
        </td>
        <td>80%</td>
        <td>9.5</td>
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
                                <button className='solid-btn' onClick={NextPageHandle}>Select captain</button>
                            </li>
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

export default EditCreateTeam