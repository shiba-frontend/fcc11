import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import { IMAGE } from '../../../utils/Theme';
import { toast } from 'react-toastify';

const Wk = () => {

    const FilterResult = [
        {
            'id':1,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'387',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'id':2,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'100',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'id':3,
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Rohit Sharma',
            'points':'200',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'image':IMAGE.player_1,
            'country':'sa',
            'name':'Kl Rahul',
            'points':'500',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
    ]


    const [rowsData, setrowsData] = useState(FilterResult) 
    const [order, setorder] = useState("ASC")

    console.log(rowsData)
 

const handleRowClicked = (row) => {
var max = 2

    const updatedData = rowsData.map(item => {
      if (row.id !== item.id) {
        return item;
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
 
    if(TempArr.length > max){
        toast.error("sfsf")
    } else {
        setrowsData(updatedData);
    }

   
  };

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
    <>
   
         <div className='table-responsive'>
            <table className='custom-table creatTeamTable'>
                <thead>
                    <th onClick={()=>sortingHandle("country")}>Team <img src={IMAGE.sortIcon}/></th>
                    <th onClick={()=>sortingHandle("points")}>Points <img src={IMAGE.sortIcon}/></th>
                    <th onClick={()=>sortingHandle("sellBy")}>Sell By <img src={IMAGE.sortIcon}/></th>
                    <th onClick={()=>sortingHandle("credits")}>Credits <img src={IMAGE.sortIcon}/></th>
                </thead>
                <tbody>
                    {rowsData&&rowsData.map((row, i)=>{
                        return (
                            <tr onClick={()=>handleRowClicked(row)} key={i} className={row.toggleSelected ? "selected" : ''}>
                                 <td>
                                    <div className='team-td'>
                                        <img src={row.image} />
                                        <span>{row.country}</span>
                                    </div>
                                 </td>
                                 <td>
                                 <div className='point-part'>
                                    <h3>{row.name}</h3>
                                    <h5>{row.points} points</h5>
                                    <h6>{row.status}</h6>
                                </div>
                                </td>
                                <td>{row.sellBy}</td>
                                <td>{row.credits}</td>
                                <td>{row.toggleSelected ? <i className="far fa-times-circle text-danger"></i>  : <i className="fas fa-plus-circle"></i>}</td>
                             </tr>
                        )
                    })}
                    
                </tbody>
            </table>
      </div>
      
      </>
 
  )
}

export default Wk