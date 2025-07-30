import React from 'react'
import { COLORS, IMAGE } from '../../../utils/Theme'
import { NavLink } from 'react-router-dom'

const About = () => {
  return (
    <div className='about-sec'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-6 col-md-5'>
                    <img src={IMAGE.about_img} alt='about' />
                </div>
                <div className='col-lg-6 col-md-7'>
                    <h3>About <span style={{color:COLORS.primaryColor}}>us</span></h3>
                    <p>This website supports the fun virtual prediction contests on the tournaments conducted by Farmington cricket club. </p>

                <NavLink className="themeBtn" to="/signup" style={{background:COLORS.primaryColor}}>join now</NavLink>
            </div>
            </div>
        </div>
    </div>
  )
}

export default About