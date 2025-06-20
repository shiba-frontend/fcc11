import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { COLORS, IMAGE } from '../../utils/Theme'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Loader from '../../utils/Loader'
import ApiConnection from '../../utils/ApiConnection'

const Legality = () => {
  const [loading, setloading] = useState(false)
  const [cmsdata, setcmsdata] = useState("")

  const GetData = async ()=>{
    setloading(true)
   
    try {

      var FormData = require('form-data');
      var data = new FormData();
      data.append("page_slug", "legality");

        const  response = await ApiConnection.post(`cms/get-cms-page-details`, data)
        if(response?.status == 200){
          
          setcmsdata(response.data?.data)
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
        <h3>{cmsdata?.page_title}</h3>
    </div>
<div className='cms-sec py-4'>
<div className='container'>
           <h5><b>{cmsdata?.page_title}</b></h5>

          <div dangerouslySetInnerHTML={{__html: cmsdata?.description}} />        
        </div>
    </div>
<Footer/>
</>
  )
}

export default Legality