import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { COLORS, IMAGE } from '../../utils/Theme'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Loader from '../../utils/Loader'
import ApiConnection from '../../utils/ApiConnection'
import Accordion from 'react-bootstrap/Accordion';


const HelpSupport = () => {

  const [loading, setloading] = useState(false)
  const [cmsdata, setcmsdata] = useState("")

  const GetData = async ()=>{
    setloading(true)
   
    try {

      var FormData = require('form-data');
      var data = new FormData();
      data.append("page_slug", "help-&-support");

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
        <h3>Help & Support</h3>
    </div>
<div className='cms-sec py-4 faq-sec'>
        <div className='container'>

        <h5><b>{cmsdata?.page_title}</b></h5>

<div dangerouslySetInnerHTML={{__html: cmsdata?.description}} />  

        {/* <Accordion defaultActiveKey="0">

    <Accordion.Item eventKey='0'>
  <Accordion.Header> What is Lorem Ipsum? </Accordion.Header>
  <Accordion.Body>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

  </Accordion.Body>
</Accordion.Item>
    
<Accordion.Item eventKey='1'>
  <Accordion.Header>What is Lorem Ipsum?</Accordion.Header>
  <Accordion.Body>
  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

  </Accordion.Body>
</Accordion.Item>

</Accordion> */}
       
        </div>
    </div>
<Footer/>
</>
  )
}

export default HelpSupport