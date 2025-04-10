import React, { useEffect } from 'react'
import { IMAGE, URL } from '../../../utils/Theme'
import { NavLink, useParams } from 'react-router-dom'
import ApiConnection from '../../../utils/ApiConnection'

const CreditSuccess = () => {

    const {id} = useParams()

    console.log(id)

    useEffect(()=>{

        const FinalSuccess = async () => {
        try{
            var FormData = require('form-data');
            var data = new FormData();
            data.append('_method', 'PUT');
            const response = await ApiConnection.post(`credit-points/purchase/${id}`, data);
            if(response.status === 200){
            }
    
        } catch(err){
          
            if(err.response?.status === 422){
              
            }
    }
}
FinalSuccess()
    },[])


  return (
    <div className='success-sec'>
    <div className='success-box'>
        <img src={IMAGE.succes_image} />
        <h5 className='my-3'>Thanks for purchase</h5>
        <NavLink to="/dashboard" className="solid-btn">Return home</NavLink>
    </div>

</div>
  )
}

export default CreditSuccess