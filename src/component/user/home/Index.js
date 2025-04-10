import React, { useEffect, useState } from 'react'
import Banner from '../../user/home/Banner'
import UseProcess from './UseProcess'
import About from './About'
import Introduction from './Introduction'
import SiteInfo from './SiteInfo'
import Partners from './Partners'
import Testimonial from './Testimonial'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import ApiConnection from '../../../utils/ApiConnection'

const Index = () => {
  const [loading, setloading] = useState(false)
  const [cmsdata, setcmsdata] = useState("")
  const [processdata, setprocessdata] = useState([])
  const [alldata, setalldata] = useState('')
  
  
  const GetData = async ()=>{
  
   
    try {
  
      var FormData = require('form-data');
      var data = new FormData();
      data.append("page_slug", "about-Us");
  
        const  response = await ApiConnection.get('get-homepage-content')
        if(response?.status == 200){
          setprocessdata(response?.data?.data?.howtoplay)
          setalldata(response?.data?.data)
  
        } else{
           
        }  
    } catch(err){
        setloading(false)
    }
  }
  
  useEffect(()=>{
  
  GetData()
  
  },[])


  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://fcc11.com",
      "@type": "FCC11",
      "headline": "Play Fantasy game & Win Cash Prizes on Fcc11",
      "description": "Fcc11 provides a fantasy gaming platform forfantasy cricket. It is an online game where users create a virtual team of real-life players and earn points based on the performances of these players in real matches.",
      "datePublished": "2024-12-07",
      "publisher": {
        "@type": "Organization",
        "name": "FCC11",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fcc11.com/images/footer-logo.png"
        }
      },
      "mainEntityOfPage": "https://fcc11.com"
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Clean up when the component unmounts
    };
  }, []);



  return (
    <>
    <Header/>
      <Banner/>
      <UseProcess data={processdata}  />
      <About />
      <Introduction data={alldata?.introduction} />
      <SiteInfo/>
      <Testimonial data={alldata?.testimonials} />
      <Partners/>
      <Footer/>
    </>
  )
}

export default Index