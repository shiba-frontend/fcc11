import React from 'react'
import { NavLink } from 'react-router-dom'
import { COLORS, IMAGE } from '../../../utils/Theme'
import { BaseUrl } from '../../../utils/ApiConnection'


const Introduction = ({data}) => {
  return (
    <div className='intro-sec'>
        <div className='container'>
            <div className='intro-inner'>
            <h2>INTRODUCTION</h2>
            <div dangerouslySetInnerHTML={{__html: data?.description.slice(150)}}></div>
            </div>
           
            <div className='row align-items-center'>
                <div className='col-lg-7 col-md-6'>
                    <img src={BaseUrl.baseurl +  data?.image} alt='intro'/>
                </div>
                <div className='col-lg-5 col-md-6'>
                   <h3>View All <span style={{color:COLORS.primaryColor}}>Matches</span></h3>
                   <div dangerouslySetInnerHTML={{__html: data?.description}}></div>               
                       <NavLink to="/signup" className="themeBtn" style={{background:COLORS.primaryColor}}>join now</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Introduction