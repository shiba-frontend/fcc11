import React, { useState } from "react";
import LoginHeader from "../common/LoginHeader";
import DashboardMenu from "../common/DashboardMenu";
import { IMAGE } from "../../../utils/Theme";
import { NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <>
    <LoginHeader title="Settings" />
     <DashboardMenu />
       <div className="container">
            <div className="dashboard-panel p-5">
                <div className="setting-sec">
                    <h2>Preferences</h2>
                    <hr></hr>
                    <h5>Contact Preferences</h5>
                    <hr></hr>
                    <h6>FCC11 may contact you by:</h6>
                    <button className="mr-2">SMS</button>
                    <button>Phone</button>
                    <h5 className="mt-3">Message Preferences</h5>
                    <hr></hr>
                    <p>You can control the communication you wish to receivefrom us</p>
                    <table>
                        <th></th>
                        <th>SMS</th>
                        <th>Email</th>
                        <tr>
                            <td>Newsletter</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Special Offers</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Tournaments/contests</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <h2 className="mt-5">Account Deletion</h2>
                    <hr></hr>
                    <p>To initiate deletion of your accountplease <NavLink>click here</NavLink></p>
                </div>
        
            </div>
         </div>
   </>
  )
}

export default Settings