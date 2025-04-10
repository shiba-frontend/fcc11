import React from 'react'
import DataTable from 'react-data-table-component';
import { IMAGE } from '../../../utils/Theme';

const Wk = () => {

    const FilterResult = [
        {
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'387',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'100',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'387',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
        {
            'image':IMAGE.player_1,
            'country':'ind',
            'name':'Virat Kohli',
            'points':'387',
            'status':'Played Last Match',
            'sellBy':'80%',
            'credits':'9.5'
        },
    ]

    const columns = [
        {
            name: 'Team',
            selector: (row) => (
                <div className='team-td'>
                    <img src={row.image} />
                    <span>{row.country}</span>
                </div>
                
            ),
            sortable: true,
        
        },
        {
            name: 'Points',
            selector: row => (
                <div className='point-part'>
                    <h3>{row.name}</h3>
                    <h5>{row.points} points</h5>
                    <h6>{row.status}</h6>
                </div>
            ),
            sortable: true,
        },
        {
          name: 'Sell By',
          selector: row => row.sellBy,
          sortable: true,
      },
      {
        name: 'Credits',
        selector: row => row.credits,
        sortable: true,
    },

      
      {
        name: '',
        selector: (row) => (
          <>
          <button className='table-btn delete-rowbtn'><i className="far fa-times-circle"></i></button>
          </>
        ),
    },
    ];


const RowClickHandler = (row)=>{
    console.log("clicked", row)
}


  return (
   
         <div className='table-responsive'>
          <DataTable
            columns={columns}
            data={FilterResult}
            onRowClicked={RowClickHandler}
        />


      </div>
 
  )
}

export default Wk