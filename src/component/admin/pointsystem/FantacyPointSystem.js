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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const FantacyPointSystem = () => {


    const [loading, setloading] = useState(false)
    
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

    const [key, setKey] = useState('ps');
  

    console.log('captain', captain)
   
    let navigate = useNavigate()
    let {id} = useParams()
    

    const GetBattingData = async ()=>{
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

    useEffect(()=>{
         GetplayerData()
         GetBattingData()
        // GetBowData()
        // GetfieldData()
    },[])

    const AddbatHandler = async () => {

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
            setloading(true)
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
                data.append('fantasygame_id', id); 
                const response = await ApiConnection.post("points-statement", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
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

   


    }

  
    const AddplayerHandler = async () => {

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
            setloading(true)
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
                data.append('fantasygame_id', id);
                
                const response = await ApiConnection.post("player-selection-rules", data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    setKey('batting')
                    //navigate("/admin/fantacy-games")
                    // GetplayerData()
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
<DashboardHeader title="Fantacy Point System Management" />
<AdminMenu />
<div className="container">
 <div className="dashboard-panel custom-table">

       <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
       className="mb-3"
       >
       <Tab eventKey="ps" title="Player Selection">
       <div className='row'>
           <div className='col-lg-4'>
               <div className='form-group'>
                   <label>Minimum Number Players from Each Side:</label>
                   <select className="form-control"
                   value={minplayer}
                   onChange={(e)=>setminplayer(e.target.value)}
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
               <div className='form-group'>
                   <button className='btn btn-success btn-lg' onClick={AddplayerHandler}>Submit</button>
               </div>
           </div>
      </div>
       </Tab>
       <Tab eventKey="batting" title="Point System" disabled={key == 'batting' ? false : true}>
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
               <div className='form-group'>
                   <button className='btn btn-success btn-lg' onClick={AddbatHandler}>Submit</button>
               </div>
           </div>
      </div>
       </Tab>
  

   
       </Tabs>

      

 </div>
 </div>
   
</div>
  )
}

export default FantacyPointSystem