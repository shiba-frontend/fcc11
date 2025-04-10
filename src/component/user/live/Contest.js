import React, { useState } from 'react'
import { IMAGE } from '../../../utils/Theme';
import { BaseUrl } from '../../../utils/ApiConnection';

const Contest = ({data}) => {

    const FilterResult = [
        {
            'id':1,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'387',
            'status':'WK',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'id':2,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'100',
            'status':'Captain',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'id':3,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Rohit Sharma',
            'points':'200',
            'status':'BAT',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'image':IMAGE.player_1,
            'country':'sa',
            'name':'Kl Rahul',
            'points':'500',
            'status':'WK',
            'sellBy':'80%',
            'credits':'9.5'
        },
    ]
    const [rowsData, setrowsData] = useState(FilterResult) 
    const [order, setorder] = useState("ASC")

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

  return (
    <div className='table-responsive'>
    <table className='custom-table'>
        <thead>
            <th onClick={()=>sortingHandle("country")}>Players <img src={IMAGE.sortIcon}/></th>
            <th onClick={()=>sortingHandle("sellBy")}>Selected By <img src={IMAGE.sortIcon}/></th>
            <th onClick={()=>sortingHandle("points")}>Points <img src={IMAGE.sortIcon}/></th>
        </thead>
        <tbody>
            {data&&data.map((row, i)=>{
                return (
                    <tr key={i}>
                         <td>
                            <div className='player_info'>
                                <div className='player_info_lft'>
                                <img src={BaseUrl.baseurl + row.player_image} />
                                <span>{row.team_short_name}</span>
                                </div>  
                                <div className='player_info_rht'>
                                    <h4>{row.player_name}</h4>
                                    <span>{row.discipline}</span>
                                </div>
                            </div>

                         </td>
                         <td>{parseFloat(row.selected_by).toFixed(2) } %</td>
                        <td>{row.game_point}</td>
                     </tr>
                )
            })}
            
        </tbody>
    </table>
</div>
  )
}

export default Contest