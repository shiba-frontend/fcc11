import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { COLORS, IMAGE } from '../../utils/Theme'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Loader from '../../utils/Loader'
import ApiConnection from '../../utils/ApiConnection'

const About = () => {


    const [loading, setloading] = useState(false)
    const [cmsdata, setcmsdata] = useState("")


    const GetData = async ()=>{
      setloading(true)
     
      try {

        var FormData = require('form-data');
        var data = new FormData();
        data.append("page_slug", "about-Us");

          const  response = await ApiConnection.post(`cms/get-cms-page-details`, data)
          if(response?.status == 200){
            
            setcmsdata(response.data?.data?.description)
              setloading(false)
  
          } else{
              setloading(false)
          }  
      } catch(err){
          setloading(false)
      }
  }
  
  useEffect(()=>{
  
    GetData()
  
      window.scrollTo(0, 0)
  },[])


  return (
    <>
        {loading && <Loader/>}
    <Header/>
 
    <div className='inner-banner'>
        <h3>About Us</h3>
    </div>
<div className='about-sec'>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-6 col-md-4'>
                    <img src={IMAGE.about_img} alt='about' />
                </div>
                <div className='col-lg-6 col-md-8'>
                    <h3>About <span style={{color:COLORS.primaryColor}}>us</span></h3>
                    <p>{cmsdata} </p>
                <NavLink to="/signup" className="themeBtn" style={{background:COLORS.primaryColor}}>join now</NavLink>
            </div>
            </div>
        </div>
    </div>
<Footer/>
</>
  )
}

export default About