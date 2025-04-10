import React, { useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import { useLocation, useNavigate } from 'react-router-dom';

const CaptainSelect = () => {

    const navigate = useNavigate()
    const {state} = useLocation();
    const { id } = state;

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


    const [rowsData, setrowsData] = useState(FilterResult) 
    const [order, setorder] = useState("ASC")
    const [captainobj, setcaptainobj ] = useState({})
    const [vcaptainobj, setvcaptainobj ] = useState({})


    console.log(captainobj)
 


  const sortingHandle = (col)=>{
    if(order === "ASC"){
        const sorted = [...rowsData].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        )
        setrowsData(sorted)
        setorder("DSC")
    }
    if(order === "DSC"){
        const sorted = [...rowsData].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        )
        setrowsData(sorted)
        setorder("ASC")
    }
  }

 

  const SaveTeam = ()=>{
    navigate("/my-team")
  }
  

  return (
    <>
    <LoginHeaderTwo  heading="Select Captain" subheading="1d - 17h 43m - 16secs" />
    <div className='back-page'>
        <div className='container'>
            <h5><i className="fas fa-arrow-left"></i> Back</h5>
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
                            <img src={captainobj?.image} alt="country"/>
                            <label>{captainobj?.name&&captainobj?.name.split(" ")[0]}</label>
                        </div>
                        <div className='select-captain-card-info'>
                            <h4>Captain</h4>
                            <b>{captainobj?.points} Points</b>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='select-captain-card'>
                        <div className='select-captain-card-img'>
                            <img src={vcaptainobj?.image} alt="country"/>
                            <label>{vcaptainobj?.name&&vcaptainobj?.name.split(" ")[0]}</label>
                        </div>
                        <div className='select-captain-card-info'>
                            <h4>Vice Captain</h4>
                            <b>{vcaptainobj?.points} Points</b>
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
                    <th onClick={()=>sortingHandle("country")}>Team <img src={IMAGE.sortIcon}/></th>
                    <th onClick={()=>sortingHandle("points")}>Points <img src={IMAGE.sortIcon}/></th>
                    <th onClick={()=>sortingHandle("sellBy")}>C % <img src={IMAGE.sortIcon}/></th>
                    <th onClick={()=>sortingHandle("credits")}>VC % <img src={IMAGE.sortIcon}/></th>
                </thead>
                <tbody>
                    {rowsData&&rowsData.map((row, i)=>{
                        return (
                            <tr key={i} className={row?.id == captainobj?.id || row?.id == vcaptainobj?.id  ? "selected" : ''} >
                                 <td>
                                    <div className='team-td'>
                                        <img src={row.image} />
                                        <span>{row.country}</span>
                                    </div>
                                 </td>
                                 <td>
                                 <div className='point-part'>
                                    <h3>{row.name}</h3>
                                    <h5>{row.status} | {row.points} pts</h5>
                                </div>
                                </td>
                                <td>
                                    <div className='radio-style'>
                                        <button style={{background:row?.id == captainobj?.id? '#4caf50' : '#fff', color:row?.id == captainobj?.id? '#fff' : '#222'}} onClick={(e)=>{
                                            if(row?.id == vcaptainobj?.id)
                                            setvcaptainobj({});
                                            setcaptainobj(row);
                                        
                                        }}>C</button>
                                      
                                    </div>
                                   
                                    {row.sellBy}
                                </td>
                                <td>
                                <div className='radio-style'>
                                    
                                        <button style={{background:row?.id == vcaptainobj?.id? '#4caf50' : '#fff', color:row?.id == vcaptainobj?.id? '#fff' : '#222'}} onClick={(e)=>{
                                            if(row?.id == captainobj?.id)
                                            setcaptainobj({});
                                            setvcaptainobj(row);
                                        }}>VC</button>
                                         
                                    </div>
                                    {row.credits}</td>
                             </tr>
                        )
                    })}
                    
                </tbody>
            </table>
      </div>
      <div className='text-center mt-4'>
        <ul className='tableBtn'>
            
            <li>
                <button className='solid-btn' onClick={SaveTeam}>Save Team</button>
            </li>
        </ul>
            </div>
      </div>
      </div>
    </>
  )
}

export default CaptainSelect