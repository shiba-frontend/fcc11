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

const EditTeam = () => {

    const navigate = useNavigate()
    
    let {id} = useParams()

    const [loading, setloading] = useState(false)
    const [rowsData, setrowsData] = useState([]) 
    const [order, setorder] = useState("ASC")
    const [captainobj, setcaptainobj ] = useState({})
    const [vcaptainobj, setvcaptainobj ] = useState({})


    console.log(rowsData)
 
    const GetPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`member-fantasygame/${id}`)
            if(response?.status == 200){
                setloading(false)
                console.log(response.data)

                // var wk = response.data?.data?.list?.WicketKeeper

                const wk = response.data?.data?.list?.WicketKeeper&&response.data?.data?.list?.WicketKeeper.map((item, index) => {
                    return {
                      ...item,
                      'uid': `wk${index}`,
                      'captain': item?.captain_vicecaptain == 'C' ? true : false,
                      'vcaptain':item?.captain_vicecaptain == 'VC' ? true : false
                    };
                    

                  });

                  const bat = response.data?.data?.list?.Batsman&&response.data?.data?.list?.Batsman.map((item, index) => {
                    return {
                      ...item,
                      'uid': `bat${index}`,
                      'captain': item?.captain_vicecaptain == 'C' ? true : false,
                      'vcaptain':item?.captain_vicecaptain == 'VC' ? true : false
                    };
                  });

                  const ar = response.data?.data?.list?.AllRounder&&response.data?.data?.list?.AllRounder.map((item, index) => {
                    return {
                      ...item,
                      'uid': `ar${index}`,
                      'captain': item?.captain_vicecaptain == 'C' ? true : false,
                      'vcaptain':item?.captain_vicecaptain == 'VC' ? true : false
                    };
                  });
                  const bowl = response.data?.data?.list?.Bowler&&response.data?.data?.list?.Bowler.map((item, index) => {
                    return {
                      ...item,
                      'uid': `bowl${index}`,
                      'captain': item?.captain_vicecaptain == 'C' ? true : false,
                      'vcaptain':item?.captain_vicecaptain == 'VC' ? true : false
                    };
                  });
             
       

                var finaldata = [...wk, ...bat, ...ar, ...bowl]

                var cobj = {}
                var vobj = {}

                finaldata&&finaldata.forEach(elem =>{
                    if(elem.captain){
                        cobj =  elem
                    } else if(elem.vcaptain){
                        vobj = elem
                    }
                })

                setcaptainobj(cobj)
                setvcaptainobj(vobj)
                setrowsData(finaldata)
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


 

  const SaveTeam = async ()=>{
    if(Object.keys(captainobj).length > 0 &&  Object.keys(vcaptainobj).length > 0 ){
        setloading(true)
        try{

            var FormData = require('form-data');
            var data = new FormData();
            data.append("captain", captainobj?.id);
            data.append("vicecaptain",vcaptainobj?.id);
            data.append("fantasygame_id", captainobj?.created_by);
            data.append("team_unique_id", id);

            const response = await ApiConnection.post("member-fantasygame/assign-captain-vicecaptain", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                navigate("/my-team")
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
        toast.error('Please select captain and vice captain')
    }
    
  }




  return (
    <>
    {loading && <Loader/>}
<LoginHeaderTwo  heading="captain Select" subheading="1d - 17h 43m - 16secs" />
<div className='back-page'>
  <div className='container'>
  <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
  </div>
</div>
<div className='team-container'>
<div className='container'>
      <div className='select-captain-info'>
          <h2>Select Captain and Vice Captain</h2>

          {Object.keys(captainobj).length > 0 &&  Object.keys(vcaptainobj).length >0 
          ?
          <div className='row justify-content-center'>
 
          <div className='col-lg-6'>
              <div className='select-captain-card'>
                  <div className='select-captain-card-img'>
                      <img src={BaseUrl.baseurl + captainobj?.player_image} alt="country"/>
                      <label>{captainobj?.player_name&&captainobj?.player_name.split(" ")[0]}</label>
                  </div>
                  <div className='select-captain-card-info'>
                      <h4>Captain</h4>
                      <b>320 Points</b>
                  </div>
              </div>
          </div>
          <div className='col-lg-6'>
              <div className='select-captain-card'>
                  <div className='select-captain-card-img'>
                      <img src={BaseUrl.baseurl + vcaptainobj?.player_image} alt="country"/>
                      <label>{vcaptainobj?.player_name&&vcaptainobj?.player_name.split(" ")[0]}</label>
                  </div>
                  <div className='select-captain-card-info'>
                      <h4>Vice Captain</h4>
                      <b>310 Points</b>
                  </div>
              </div>
          </div>
</div>
:
null
          
          }
     

  </div>
</div>
</div>
<div className='container'>
      <div className='inner-container'>
<div className='table-responsive'>
      <table className='custom-table creatTeamTable'>
          <thead>
              <th >Team </th>
              <th >Points </th>
              <th >C % </th>
              <th >VC % </th>
          </thead>
          <tbody>
              {rowsData&&rowsData.map((row, i)=>{
                  return (
                      <tr key={i} className={row?.uid == captainobj?.uid || row?.uid == vcaptainobj?.uid  ? "selected" : ''} >
                           <td>
                              <div className='team-td'>
                                  <img src={BaseUrl.baseurl + row?.player_image} />
                                  <span>{row?.nationality?.substring(0,3)}</span>
                              </div>
                           </td>
                           <td>
                           <div className='point-part'>
                              <h3>{row?.player_name}</h3>
                              <h5>{row?.discipline?.substring(0,3)} | 500 pts</h5>
                          </div>
                          </td>
                          <td>
                              <div className='radio-style'>
                                  <button style={{background:row?.uid == captainobj?.uid? '#4caf50' : '#fff', color:row?.uid == captainobj?.uid? '#fff' : '#222'}} onClick={(e)=>{
                                      if(row?.uid == vcaptainobj?.uid)
                                      setvcaptainobj({});
                                      setcaptainobj(row);
                                  
                                  }}>C</button>
                                
                              </div>
                             
                             90%
                          </td>
                          <td>
                          <div className='radio-style'>
                              
                                  <button style={{background:row?.uid == vcaptainobj?.uid? '#4caf50' : '#fff', color:row?.uid == vcaptainobj?.uid? '#fff' : '#222'}} onClick={(e)=>{
                                      if(row?.uid == captainobj?.uid)
                                      setcaptainobj({});
                                      setvcaptainobj(row);
                                  }}>VC</button>
                                   
                              </div>
                             80&</td>
                       </tr>
                  )
              })}
              
          </tbody>
      </table>
</div>
<div className='text-center mt-4'>
  <ul className='tableBtn'>
      
      <li>
          <button className='solid-btn' onClick={SaveTeam}>Update Team</button>
      </li>
  </ul>
      </div>
</div>
</div>
</>
  )
}

export default EditTeam