import React from 'react'
import { COLORS, IMAGE } from '../../../utils/Theme'

const SiteInfo = () => {
  return (
    <div className='info-sec'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4 mt-auto col-md-4'>
                    <img src={IMAGE.cricketImg} alt="cricket"/>
                </div>
                <div className='col-lg-8 col-md-8'>
                    <h2>Play Fantasy <span style={{color:COLORS.thirdColor}}>Cricket on</span></h2>
                    <h1>FCC<span style={{color:COLORS.primaryColor}}>11</span></h1>
                    <ul>
                        <li>
                            <span> <img src={IMAGE.icon_one} alt="icon"/></span>
                            <h6>4.3 OUT OF 5</h6>
                            <b>USER RATING</b>
                        </li>
                        <li>
                            <span> <img src={IMAGE.icon_two} alt="icon"/></span>
                            <h6>4+ CRORE</h6>
                            <b>TOTAL USERS</b>
                        </li>
                        <li>
                            <span> <img src={IMAGE.icon_three} alt="icon"/></span>
                            <h6>₹ 500 CRORE+</h6>
                            <b>PRIZES WON</b>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SiteInfo