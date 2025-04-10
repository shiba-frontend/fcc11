import React from 'react'
import { NavLink } from 'react-router-dom'
import { IMAGE,COLORS } from '../../../utils/Theme'


const Banner = () => {
  return (
    <div className='home-banner'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-6'>
                
                    <h3>FCC <span style={{color:COLORS.primaryColor}}>11</span></h3>
                    <h5>FANTASY GAME <span style={{color:COLORS.thirdColor}}>CREATOR</span> </h5>
                    <h6>FLOW WIREFRAME</h6>
                    <NavLink className="themeBtn" to="/signup" style={{background:COLORS.primaryColor}}>Join Now</NavLink>
                </div>
                <div className='col-lg-6'>
                    <div className='banner-vector'>
                        <img src={IMAGE.banner_vector_cir} alt='cir' className='banner-circle' />
                        <img src={IMAGE.banner_vector_one} alt='one' className='man-icon' />
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner