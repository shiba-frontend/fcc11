import React, { useEffect, useState } from 'react'
import LoginHeaderTwo from '../common/LoginHeaderTwo'
import { IMAGE } from '../../../utils/Theme'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiConnection from '../../../utils/ApiConnection';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';

const FantacyContactAdmin = () => {
    const [loading, setloading] = useState(false)
    const [subject, setsubject] = useState("")
    const [message, setmessage] = useState("")
    
    const navigate = useNavigate()
    let {pros, id} = useParams()

    const AddHandler = async () => {

      if(subject == ''){
          toast.error("Subject is required")
      } else if(message == ''){
          toast.error("Message is required") 
      }  else {
          setloading(true)
          try{
              var FormData = require('form-data');
              var data = new FormData();
              data.append('subject', subject);
              data.append('message', message);
              data.append('fantasygameadmin', id);
              
              const response = await ApiConnection.post("member-contactadmin", data);
              if(response.status === 200){
                  setloading(false)
                  toast.success(response?.data?.message);
                  navigate("/dashboard")
              } else {
                  setloading(false)
              }
  
          } catch(err){
              setloading(false)
              if(err.response?.status === 422){
                    toast.error(err.response?.data?.message);   
                
              }
      }
          
  
      }
  
  }


  return (
     <>
       {loading && <Loader/>}
    <LoginHeaderTwo  heading={`contact admin of ${pros}`} />
    <div className='back-page'>
    <div className='container'>
        <button onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i> Back</button>
        </div>
    </div>
   
    <div className='container'>
            <div className='inner-container'>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" className="form-control" placeholder="Subject"
                 value={subject}
                 onChange={(e)=>setsubject(e.target.value)}
              
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea  className="form-control" placeholder="Message"
                value={message}
                onChange={(e)=>setmessage(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="solid-btn" onClick={AddHandler}>Send</button>
            </div> 
            </div>
      </div>
    </>
  )
}

export default FantacyContactAdmin