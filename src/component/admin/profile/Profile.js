import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink } from 'react-router-dom';
import Loader from '../../../utils/Loader';
import ApiConnection, { BaseUrl } from '../../../utils/ApiConnection';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';

const Profile = () => {

    const [loading, setloading] = useState(false)
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [phone, setphone] = useState("")
    const [email, setemail] = useState("")
    const [display, setdisplay] = useState("")
    const [display1, setdisplay1] = useState("")
    const [image, setimage] = useState("")
    const [profileImage, setprofileImage] = useState("")
    const [modal, setmodal] = useState(false);

    const GetProfile = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('get-profile')
            if(response?.status == 200){
                setloading(false)
                console.log(response.data?.data?.user)
                var editData = response.data?.data?.user
                setfname(editData?.first_name)
                setlname(editData?.last_name)
                setemail(editData?.email)
                setphone(editData?.phone)
                setdisplay(editData?.display_name)
                setdisplay1(editData?.display_name)
                setprofileImage(BaseUrl.baseurl + editData?.image)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }
    useEffect(() => {
        GetProfile()
    },[])

    const HandleImage = (e) => {
        var file = e.target.files[0];
        setimage(file);
        var reader = new FileReader();
        //var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          const fsize = file.size;
          const fileSize = Math.round(fsize / 1024);
          if (fileSize >= 800) {
            toast.error('file size is too large');
          } else {
            setprofileImage(reader.result)
            // var editImg = document.getElementById("editImg");
            // editImg.src = reader.result;
          }
        };
        reader.readAsDataURL(file);
      };

      const UpdateHandler = async () => {

            setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('first_name', fname);
                data.append('last_name', lname);
                data.append('email', email);
                data.append('phone', phone);
                data.append('image', image);
                const response = await ApiConnection.post(`update-profile`, data);
                if(response.status === 200){
                    setloading(false)
                    toast.success(response?.data?.message);
                    GetProfile()
                } else {
                    setloading(false)
                }

            } catch(err){
                setloading(false)
                if(err.response.status === 422){
                      toast.error(err.response?.data?.message);   
                  
                }
        }
        

}

const UpdateDisplayHandler = async () => {

    if(display1 == ''){
        toast.error('Please enter a display name')
    } else {

    setloading(true)
            try{
                var FormData = require('form-data');
                var data = new FormData();
                data.append('display_name', display1);
                const response = await ApiConnection.post(`update-display-name`, data);
                if(response.status === 200){
                    setloading(false)
                    setmodal(false)
                    toast.success(response?.data?.message);
                    GetProfile()
                } else {
                    setloading(false)
                }

            } catch(err){
                setloading(false)
                if(err.response.status === 422){
                      toast.error(err.response?.data?.message);   
                  
                }
        }
    }

}


  return (
    <div>
         {loading && <Loader/>}
    <DashboardHeader title="Update Profile" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="First Name"
                        value={fname}
                        onChange={(e)=>setfname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Last Name"
                        value={lname}
                        onChange={(e)=>setlname(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Phone</label>
                        <input type="text" className="form-control" placeholder="Phone"
                        value={phone}
                        onChange={(e)=>setphone(e.target.value)}
                        maxLength="10"
                    minLength="10"
                    onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email"
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        readOnly/>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Display Name</label>
                        <input type="text" className="form-control" placeholder="Display Name"
                        value={display}
                        onChange={(e)=>setdisplay(e.target.value)}
                       readOnly />
                       <button className='dchangeBtn' onClick={()=>setmodal(true)}>Change</button>
                    </div>
                </div>
              
               
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Upload profile picture</label>
                        <input type="file" className="form-control"
                        accept="image/png, image/jpeg"
                        onChange={HandleImage}
                        />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <img src={profileImage} width="200" />
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <button className='btn btn-success btn-lg' onClick={UpdateHandler}>Update</button>
                    </div>
                </div>
           </div>
    
      </div>
      </div>
      <Modal
  show={modal}
  backdrop="static"
  keyboard={false}
  centered
>

  <Modal.Body className='text-center'>
      <div className='form-group'>
        <label>Display Name</label>
            <input type='text' className='form-control' placeholder='display name'
             value={display1}
             onChange={(e)=>setdisplay1(e.target.value)}
            />
      </div>
      <ul className='d-flex mt-4 justify-content-center'>
          <li>
              <button className='btn btn-success mr-2' onClick={UpdateDisplayHandler}>Update</button>
          </li>
          <li>
              <button className='btn btn-outline-danger ml-2' onClick={()=>setmodal(false)}>Cancel</button>
          </li>
      </ul>
  </Modal.Body>

</Modal> 
    </div>
  )
}

export default Profile