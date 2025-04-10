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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.. 

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.. </p>
                <NavLink className="themeBtn" style={{background:COLORS.primaryColor}}>join now</NavLink>
            </div>
            </div>
        </div>
    </div>
  )
}

export default About