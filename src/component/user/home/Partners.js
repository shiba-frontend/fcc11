import React from 'react'
import { COLORS, IMAGE } from '../../../utils/Theme'

const Partners = () => {
  return (
    <div className='partners-sec'>
      <h2>Clients & <span style={{color:COLORS.primaryColor}}>Partners</span></h2>
      <div className='container'>
          <ul>
            <li>
                <img src={IMAGE.partners_one} alt='partners' />
            </li>
            <li>
                <img src={IMAGE.partners_two} alt='partners' />
            </li>
            <li>
                <img src={IMAGE.partners_three} alt='partners' />
            </li>
            <li>
                <img src={IMAGE.partners_four} alt='partners' />
            </li>
            <li>
                <img src={IMAGE.partners_five} alt='partners' />
            </li>
          </ul>
      </div>
    </div>
  )
}

export default Partners