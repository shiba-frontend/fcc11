import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';

const Settings = () => {
    const [loading, setloading] = useState(false)
    const [sname, setsname] = useState('')
    const [sphone, setsphone] = useState('')
    const [semail, setsemail] = useState('')
    const [saddress, setsaddress] = useState('')
    const [sfblink, setsfblink] = useState('')

    const [hostname, sethostname] = useState('')
    const [hosttype, sethosttype] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [fromemail, setfromemail] = useState('')
    const [fromname, setfromname] = useState('')
    const [port, setport] = useState('')

    const GetgeneralData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-general-settings?section=general')
            if(response?.status == 200){
                var editdata = response.data?.data
                setsname(editdata?.site_name)
                setsphone(editdata?.site_phone)
                setsemail(editdata?.site_email)
                setsaddress(editdata?.site_address)
                setsfblink(editdata?.fb_link)
            
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    const GetemailData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-general-settings?section=email')
            if(response?.status == 200){
             
                var editdata = response.data?.data
                sethostname(editdata.hostname)
                sethosttype(editdata.type)
                setusername(editdata.username)
                setpassword(editdata.password)
                setfromemail(editdata.from_mail)
                setfromname(editdata.from_name)
                setport(editdata.port)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(()=>{
        GetgeneralData()
        GetemailData()
    },[])


    const GeneralsubmitHandler = async ()=>{
        
   
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();

            data.append('site_name', sname);
            data.append('site_phone', sphone );
            data.append('site_email', semail);
            data.append('site_address', saddress);
            data.append('fb_link', sfblink);
            
            
            const response = await ApiConnection.post("store-general-settings", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                GetgeneralData()
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

    const EmailsubmitHandler = async ()=>{
        
   
        setloading(true)
        try{
            var FormData = require('form-data');
            var data = new FormData();

            data.append('hostname', hostname);
            data.append('type', hosttype );
            data.append('username', username);
            data.append('password', password);
            data.append('from_mail', fromemail);
            data.append('from_name', fromname);
            data.append('port', port);
            
            const response = await ApiConnection.post("store-email-settings", data);
            if(response.status === 200){
                setloading(false)
                toast.success(response?.data?.message);
                GetemailData()
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


  return (
    <div>
          {loading && <Loader/>}
    <DashboardHeader title="Settings" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

            <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="home" title="General Settings">
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Site Name</label>
                        <input type="text" className="form-control" placeholder="Site Name"
                        value={sname}
                        onChange={(e)=>setsname(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Phone Number</label>
                        <input type="text" className="form-control" placeholder="Phone Number"
                        value={sphone}
                        onChange={(e)=>setsphone(e.target.value)}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength="10"
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Site Email</label>
                        <input type="email" className="form-control" placeholder="Email"
                             value={semail}
                             onChange={(e)=>setsemail(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Facebook Link</label>
                        <input type="text" className="form-control" placeholder="Enter Link"
                         value={sfblink}
                         onChange={(e)=>setsfblink(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Site Address</label>
                        <textarea className="form-control" placeholder="Site Address"
                         value={saddress}
                         onChange={(e)=>setsaddress(e.target.value)}
                        ></textarea>
                       
                    </div>
                </div>
                {/* <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Twitter Link</label>
                        <input type="text" className="form-control" placeholder="Enter Link"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>LinkedIn Link</label>
                        <input type="text" className="form-control" placeholder="Enter Link"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Instagram Link</label>
                        <input type="text" className="form-control" placeholder="Enter Link"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>YouTube Link</label>
                        <input type="text" className="form-control" placeholder="Enter Link"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Criclub Link</label>
                        <input type="text" className="form-control" placeholder="Enter Link"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Google Analytics Code</label>
                        <input type="text" className="form-control" placeholder="Enter Link"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Pixels Code</label>
                        <input type="text" className="form-control" placeholder="Enter Link"/>
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Upload Site Logo</label>
                        <input type="file" className="form-control"/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Upload Fav Icon</label>
                        <input type="file" className="form-control"/>
                    </div>
                </div> */}
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={GeneralsubmitHandler}>Update</button>
                    </div>
                </div>
           </div>
            </Tab>
            <Tab eventKey="contact" title="Email Settings">
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Hostname</label>
                        <input type="text" className="form-control" placeholder="Hostname"
                        value={hostname}
                        onChange={(e)=>sethostname(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Type</label>
                        <input type="text" className="form-control" placeholder="Type"
                         value={hosttype}
                         onChange={(e)=>sethosttype(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username"
                        value={username}
                        onChange={(e)=>setusername(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type="text" className="form-control" placeholder="XXXXX"
                        value={password}
                        onChange={(e)=>setpassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>From Email</label>
                        <input type="email" className="form-control" placeholder="From Email"
                        value={fromemail}
                        onChange={(e)=>setfromemail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>From Name</label>
                        <input type="text" className="form-control" placeholder="From Name"
                          value={fromname}
                          onChange={(e)=>setfromname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Port</label>
                        <input type="text" className="form-control" placeholder="Port"
                         value={port}
                         onChange={(e)=>setport(e.target.value)}
                        />
                    </div>
                </div>
              
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={EmailsubmitHandler}>Update</button>
                    </div>
                </div>
           </div>
            </Tab>
            </Tabs>

        
    
      </div>
      </div>
        
    </div>
  )
}

export default Settings