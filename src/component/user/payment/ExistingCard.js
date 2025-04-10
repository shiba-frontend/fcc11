import React, { useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavLink } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const ExistingCard = () => {
   
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

  return (
    <>
    <LoginHeader title="Existing Cards" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-2 payment-page">
                <div className="d-flex justify-content-between mb-5">
                     <h2>Existing Cards</h2>
                    <button  className="solid-btn" onClick={()=>setShow(true)}>Add New Card</button>
                </div>
                
                 
                 <h5>Credit Card Numbers</h5>
                 <ul className="card-list">
                    <li>
                         123X-XXXX-XXXX-X456
                    </li>
                    <li>
                        <button className="btn btn-dark">Select</button>
                        <button className="btn btn-success ml-2">Default</button>
                        <button className="btn btn-dark ml-2">Edit</button>
                        <button className="btn btn-dark ml-2">Delete</button>
                    </li>
                 </ul>
                 <ul className="card-list">
                    <li>
                         123X-XXXX-XXXX-X456
                    </li>
                    <li>
                        <button className="btn btn-dark">Select</button>
                        <button className="btn btn-info ml-2">Make Default</button>
                        <button className="btn btn-dark ml-2">Edit</button>
                        <button className="btn btn-dark ml-2">Delete</button>
                    </li>
                 </ul>
            </div>
         </div>

         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >

        <Modal.Body className='contest-modal text-left'>
            <h3>Add New Bank Account</h3>
            <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Card name</label>
                        <input type="text" className="form-control" placeholder="Holder Name"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="form-control" placeholder="Card Number"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-group">
                        <label>Expiry date</label>
                        <input type="text" className="form-control" placeholder="Expiry date"/>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="form-group">
                        <label>CVV</label>
                        <input type="text" className="form-control" placeholder="XXX"/>
                    </div>
                </div>
            </div>
            <div className="form-group mt-4">
              <button onClick={handleClose} className="outline-btn mr-2">Cancel</button>
                <button className="solid-btn">Submit</button>
            </div> 
        </Modal.Body>
 
      </Modal>
   </>
  )
}

export default ExistingCard