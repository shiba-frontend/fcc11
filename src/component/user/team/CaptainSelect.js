import React, { useEffect, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import { useLocation, useNavigate } from 'react-router-dom';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';

const CaptainSelect = () => {

    const navigate = useNavigate()
    const statevalue = useLocation();



    var id = statevalue?.state?.id

    var from = statevalue?.state?.from


    const FilterResult = [
        {
            'id':1,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'387',
            'status':'bat',
            'sellBy':'80%',
            'credits':'90%',
            'captain':false,
            'vcaptain':false
        },
        {
            'id':2,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'sachin tendulkar',
            'points':'100',
            'status':'bat',
            'sellBy':'80%',
            'credits':'50%',
            'captain':false,
            'vcaptain':false
        },
        {
            'id':3,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Rohit Sharma',
            'points':'200',
            'status':'wk',
            'sellBy':'80%',
            'credits':'40%',
            'captain':false,
            'vcaptain':false
        },
        {
            'id':4,
            'image':IMAGE.player_1,
            'country':'sa',
            'name':'Kl Rahul',
            'points':'500',
            'status':'wk',
            'sellBy':'80%',
            'credits':'30%',
            'captain':false,
            'vcaptain':false
        },
    ]

    const [loading, setloading] = useState(false)
    const [rowsData, setrowsData] = useState([]) 
    const [order, setorder] = useState("ASC")
    const [captainobj, setcaptainobj ] = useState({})
    const [vcaptainobj, setvcaptainobj ] = useState({})

    console.log('navigate', rowsData)
    //console.log(captainobj)
 
    const GetPlayers = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get(`member-fantasygame/${id}`)
            if(response?.status == 200){
                setloading(false)
           

                // var wk = response.data?.data?.list?.WicketKeeper

                let wkt = 'WicketKeeper' in response.data?.data?.list;
                let alr = 'AllRounder' in response.data?.data?.list;
                let batsm = 'Batsman' in response.data?.data?.list;
                let bowlr = 'Bowler' in response.data?.data?.list;
             

                const wk = response.data?.data?.list?.WicketKeeper&&response.data?.data?.list?.WicketKeeper.map((item, index) => {
                    return {
                      ...item,
                      'uid': `wk${index}`,
                      'captain': false,
                      'vcaptain':false
                    };
                    

                  });

                  const bat = response.data?.data?.list?.Batsman&&response.data?.data?.list?.Batsman.map((item, index) => {
                    return {
                      ...item,
                      'uid': `bat${index}`,
                      'captain': false,
                      'vcaptain':false
                    };
                  });

                  const ar = response.data?.data?.list?.AllRounder&&response.data?.data?.list?.AllRounder.map((item, index) => {
                    return {
                      ...item,
                      'uid': `ar${index}`,
                      'captain': false,
                      'vcaptain':false
                    };
                  });
                  const bowl = response.data?.data?.list?.Bowler&&response.data?.data?.list?.Bowler.map((item, index) => {
                    return {
                      ...item,
                      'uid': `bowl${index}`,
                      'captain': false,
                      'vcaptain':false
                    };
                  });
               
              

                //   if(wkt && alr && batsm && bowlr){
                //     var finaldata = [...wk, ...bat, ...ar, ...bowl]
                //   } else if(wkt && !alr && !batsm && !bowlr){
                //     var finaldata = [...wk]
                //   } else if(!wkt && alr && !batsm && !bowlr){
                //     var finaldata = [...ar]
                //   }  else if(!wkt && !alr && batsm && !bowlr){
                //     var finaldata = [...bat]
                //   } else if(!wkt && !alr && !batsm && bowlr){
                //     var finaldata = [...bowl]
                //   } else if(wkt && alr && !batsm && !bowlr){
                //     var finaldata = [...wk, ...ar]
                //   } else if(!wkt && alr && batsm && !bowlr){
                //     var finaldata = [...ar, ...bat]
                //   } else if(!wkt && alr && !batsm && bowlr){
                //     var finaldata = [...ar, ...bowl]
                //   } else if(!wkt && alr && !batsm && bowlr){
                //     var finaldata = [...ar, ...bowl]
                //   } else if(wkt && alr && batsm && !bowlr){
                //     var finaldata = [...wk, ...ar, ...bat]
                //   }  else if(wkt && alr && batsm && bowlr){
                //     var finaldata = [...wk, ...ar, ...bat]
                //   }

                var finaldata = [
                    ...(wk || []),
                    ...(bat || []),
                    ...(ar || []),
                    ...(bowl || [])
                  ];
            
               // var finaldata = [...wk, ...bat, ...ar, ...bowl]


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
            data.append("fantasygame_id", statevalue?.state?.fantacyId);
            data.append("team_unique_id", id);

            const response = await ApiConnection.post("member-fantasygame/assign-captain-vicecaptain", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                navigate("/dashboard")
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
    <LoginHeaderTwo  heading="Select Captain" />
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
                            <b></b>
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
                            <b></b>
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
                    <th >C </th>
                    <th >VC </th>
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
                                    <h5>{row?.discipline?.substring(0,3)}</h5>
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
                                   
                                </td>
                                <td>
                                <div className='radio-style'>
                                    
                                        <button style={{background:row?.uid == vcaptainobj?.uid? '#4caf50' : '#fff', color:row?.uid == vcaptainobj?.id? '#fff' : '#222'}} onClick={(e)=>{
                                            if(row?.uid == captainobj?.uid)
                                            setcaptainobj({});
                                            setvcaptainobj(row);
                                        }}>VC</button>
                                         
                                    </div>
                                  </td>
                             </tr>
                        )
                    })}
                    
                </tbody>
            </table>
      </div>
      <div className='text-center mt-4'>
        <ul className='tableBtn'>
            
            <li>
                <button className='solid-btn' onClick={SaveTeam}>{from == 'new' ? 'Save Team' : 'Update Team'}</button>
            </li>
        </ul>
            </div>
      </div>
      </div>
    </>
  )
}

export default CaptainSelect