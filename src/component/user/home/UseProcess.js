import React, { useEffect, useState } from 'react'
import { COLORS, IMAGE } from '../../../utils/Theme'
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection'

const UseProcess = ({data}) => {




  return (
    <div className='use-process'>
        <div className='container'>
            <h2>How to play on My <b style={{fontWeight:'bold'}}>Fcc</b><span style={{color:COLORS.primaryColor, fontWeight:'bold'}}>11</span></h2>

            <div className='row'>
                {data.map((item, i) =>{
                    return (
                        <div className='col-lg-3 col-md-3'>
                        <div className='step-list'>
                            <img src={BaseUrl.baseurl +  item.image} alt="one" />
                            <h3>{item.title}</h3>
                            <p>{item.description} </p>
                            <span style={{color:i == 0 ? '#ffde60': i == 1 ? "#ff9934" : i == 2 ? '#59b55c' : '#3f4693'}}>0{i+1}</span>
                        </div>  
                    </div>
                    )
                })}
               
        </div>


        </div>
    </div>
  )
}

export default UseProcess