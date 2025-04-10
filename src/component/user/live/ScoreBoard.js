import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';

const ScoreBoard = ({data}) => {
const [innoneshow, setinnoneshow] = useState('innoneshow')

console.log(data)


  return (

data?.map((item, i)=>{
  return (

    <div className='separate'>
    <h4 className='mt-3 mb-4 ml-2'>({item?.team_1?.team_name}) VS ({item?.team_2?.team_name}) : {item?.match_info
    }</h4>


    <Accordion defaultActiveKey="0" className='scorboard-acc'>
    <Accordion.Item eventKey="0">
      <Accordion.Header>
        <label>{item?.list?.innings1?.teamName}</label>
        <ul>
            <li>Run Rate: {item?.list?.innings1?.runRate}</li>
            <li><b>{item?.list?.innings1?.total}/{item?.list?.innings1?.wickets} ({item?.list?.innings1?.overs})</b></li>
            <li><i className="fas fa-angle-down"></i></li>
        </ul>
      </Accordion.Header>
      <Accordion.Body>
            <div className='table-reponsive'>
              
                <table className='scorboard-table'>
                  <thead onClick={()=>setinnoneshow(!innoneshow)}>
                  <th >Batter </th>
                    <th >R </th>
                    <th >B </th>
                    <th >4s </th>
                    <th >6s </th>
                    <th >SR </th>
                  </thead>
                  {innoneshow &&
                  <tbody>
                    {item?.list?.innings1?.batting.map((items, i)=>{
                      return (
                        <tr key={i}>
                      <td>
                        <h5>{items?.firstName} {items?.lastName} {items?.isOut == '0' && <span style={{color:'red'}}>*</span>} {items?.isOut == '0' || items?.isOut == '' ?  null : <span className='howout'>({items?.howOut})</span>}</h5>
                        <h6>{item?.outStringNoLink}</h6>
                      </td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : items?.runsScored}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : items?.ballsFaced}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : items?.fours}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : items?.sixers}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : parseFloat((items?.runsScored / items?.ballsFaced) * 100).toFixed(0)} </td>
                    </tr>
                      )
                       } )}
                    
                      
                  </tbody>
}



                </table>
                <ul className='d-flex my-2 fallwk ml-2'>
                      <li><b>Extras:</b></li>
                      <li className='ml-3'><b>{item?.list?.innings1?.extras.b + item?.list?.innings1?.extras.lb + item?.list?.innings1?.extras.nb + item?.list?.innings1?.extras.pn + item?.list?.innings1?.extras.wd}</b> ( {`b ${item?.list?.innings1?.extras.b}, lb ${item?.list?.innings1?.extras.lb}, nb ${item?.list?.innings1?.extras.nb}, pn ${item?.list?.innings1?.extras.pn}, wd ${item?.list?.innings1?.extras.wd}`})</li>
                    </ul>
                    <ul className='d-flex my-2 fallwk ml-2'>
                    <li><b>Fall of wickets:</b></li>
                        {item?.list?.innings1?.fallOfWickets.map((items, index) =>{
                          return (
                            <li>[{items?.total} - <b>{items?.playerName}</b>],</li>
                          )
                        })}
                      </ul>
                <table className='scorboard-table'>
                  <thead>
                  <th >Bowling </th>
                    <th >O </th>
                    <th >M </th>
                    <th >R </th>
                      <th>W</th>
                    <th >NB </th>
                    <th >WD </th>
                    <th>ECO</th>
                  </thead>
              
                  <tbody>
                    {item?.list?.innings1?.bowling.map((items, i)=>{
                      var overs = Math.floor(items?.balls / 6);
                      var remainingBalls = items?.balls % 6;
                      var result = overs + "." + remainingBalls
                      return (
                        <tr key={i}>
                      <td>
                        <h5>{items?.firstName} {items?.lastName} </h5>
                  
                      </td>
                      <td>{result}</td>
                      <td>{items?.maidens}</td>
                      <td>{items?.runs}</td>
                      <td>{items?.wickets}</td>
                      <td>{items?.noBalls}</td>
                      <td>{items?.wides} </td>
                      <td>{(items?.runs/result).toFixed(2)}</td>
                    </tr>
                      )
                       } )}
                    
                 
                  </tbody>

                </table>
            </div>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
      <Accordion.Header>
        <label>{item?.list?.innings2?.teamName}</label>
        <ul>
            <li>Run Rate: {item?.list?.innings2?.runRate}</li>
            <li><b>{item?.list?.innings2?.total}/{item?.list?.innings2?.wickets} ({item?.list?.innings2?.overs})</b></li>
            <li><i className="fas fa-angle-down"></i></li>
        </ul>
      </Accordion.Header>
      <Accordion.Body>
            <div className='table-reponsive'>
              
                <table className='scorboard-table'>
                  <thead>
                  <th >Batting </th>
                    <th >R </th>
                    <th >B </th>
                    <th >4s </th>
                    <th >6s </th>
                    <th >SR </th>
                  </thead>
                  <tbody>
                    {item?.list?.innings2?.batting.map((items, i)=>{
                      return (
                        <tr>
                      <td>
                        <h5>{items?.firstName} {items?.lastName} {items?.isOut == '0' && <span style={{color:'red'}}>*</span>} {items?.isOut == '0' || items?.isOut == '' ?  null : <span className='howout'>({items?.howOut})</span>}</h5>
                        <h6>{items?.outStringNoLink}</h6>
                      </td>
                      <td>{items?.ballsFaced == 0 && item?.runsScored == 0 ? '--' : items?.runsScored}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : items?.ballsFaced}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : items?.fours}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : items?.sixers}</td>
                      <td>{items?.ballsFaced == 0 && items?.runsScored == 0 ? '--' : parseFloat((items?.runsScored / items?.ballsFaced) * 100).toFixed(0)} </td>
                    </tr>
                      )
                       } )}
                    
                 
                  </tbody>
                  
                </table>
                <ul className='d-flex my-2 fallwk'>
                      <li><b>Extras:</b></li>
                      <li className='ml-3'><b>{item?.list?.innings2?.extras.b + item?.list?.innings2?.extras.lb + item?.list?.innings2?.extras.nb + item?.list?.innings2?.extras.pn + item?.list?.innings2?.extras.wd}</b> ( {`b ${item?.list?.innings2?.extras.b}, lb ${item?.list?.innings2?.extras.lb}, nb ${item?.list?.innings2?.extras.nb}, pn ${item?.list?.innings2?.extras.pn}, wd ${item?.list?.innings2?.extras.wd}`})</li>
                    </ul>
                    <ul className='d-flex my-2 fallwk'>
                    <li><b>Fall of wickets:</b></li>
                        {item?.list?.innings2?.fallOfWickets.map((items, index) =>{
                          return (
                            <li>[{items?.total} - <b>{items?.playerName}</b>],</li>
                          )
                        })}
                      </ul>
                <table className='scorboard-table'>
                  <thead>
                  <th >Bowling </th>
                    <th >O </th>
                    <th >M </th>
                    <th >R </th>
                      <th>W</th>
                    <th >NB </th>
                    <th >WD </th>
                    <th>ECO</th>
                  </thead>
              
                  <tbody>
                    {item?.list?.innings2?.bowling.map((items, i)=>{
                      var overs = Math.floor(items?.balls / 6);
                      var remainingBalls = items?.balls % 6;
                      var result = overs + "." + remainingBalls
                      return (
                        <tr>
                      <td>
                        <h5>{items?.firstName} {items?.lastName} </h5>
                  
                      </td>
                      <td>{result}</td>
                      <td>{items?.maidens}</td>
                      <td>{items?.runs}</td>
                      <td>{items?.wickets}</td>
                      <td>{items?.noBalls}</td>
                      <td>{items?.wides} </td>
                      <td>{(items?.runs/result).toFixed(2)}</td>
                    </tr>
                      )
                       } )}
                    
                 
                  </tbody>
                 
                </table>
            </div>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>

  </div>
  )
})


  )
}

export default ScoreBoard