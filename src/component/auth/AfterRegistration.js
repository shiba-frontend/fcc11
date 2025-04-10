import React from 'react'
import { IMAGE } from '../../utils/Theme'
import { NavLink } from 'react-router-dom'

const AfterRegistration = () => {
  return (
    <div className='common-auth'>
  
  <div className='container'>
      <div className='auth-bg'>
      <div className='row no-gutter'>
          <div className='col-lg-5'>
              <div className='auth-lft'>
                  <img src={IMAGE.auth_vector} alt="vector" />
              </div>
          </div>
          <div className='col-lg-7'>
                  <div className='auth-form'>
                      <h2>Registration under admin moderation</h2>
                      <p>Your registratin request is currently under queue for admin approval.
                        Until the system administrator approves the request the you will not be login to the website
                      </p>
                    <p>
                        Once the system administrator approves your registration request , you will get andemail
                        notification of the approval, then you would be able to login to the website
                        and access their respective panel.
                    </p>
                    <NavLink className='submitBtn mt-3' to="/">Go to home</NavLink>

              </div>
          </div>
          </div>
      </div>
  </div>

</div>
  )
}

export default AfterRegistration