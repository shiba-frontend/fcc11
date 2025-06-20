import React from 'react'
import { IMAGE } from '../../utils/Theme'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    let API_Token = localStorage.getItem("fcc_access_token");


  return (
    <div className='footer'>
        <div className='container'>
            {/* <div className='footer-top'>
                 <div className='footer-top-l'>
                    <button>
                        <img src={IMAGE.video_icon} alt='icon' />
                    </button>
                </div>
                <div className='footer-top-l'>
                    <img src={IMAGE.footer_logo} alt='logo' />
                    <h4>watch video</h4>
                </div>
            </div> */}
            <div className='row'>
                <div className='col-lg-3'>
                    <div className='footer-widget'>
                        <img src={IMAGE.footer_logo} alt='logo' />
                        <p>We work with a passion of taking
                        challenges and creating new ones in
                        advertising sector.</p>
                        <ul className='footer-social-l'>
                            <li>
                                <a href='#'><i className="fab fa-facebook-f"></i></a>
                            </li>
                            <li>
                                <a href='#'><i className="fab fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href='#'><i className="fab fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-7'>
                    <div className='footer-widget'>
                        <h3>Quick Links</h3>
                        <ul>
                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> Home</NavLink>
                            </li>
                            {API_Token == '' || API_Token == null &&
                            <li>
                                <NavLink to="/signup-fantasygame"><i className="fas fa-angle-double-right"></i> Signup as Content Creator</NavLink>
                            </li>
}
{API_Token == '' || API_Token == null &&
                            <li>
                                <NavLink to="/signup-club"><i className="fas fa-angle-double-right"></i> Signup as a League admin </NavLink>
                            </li>
}
                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> How to Download</NavLink>
                            </li>
                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> Points System</NavLink>
                            </li>
                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> Tips & Tricks</NavLink>
                            </li>
                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> Promotions</NavLink>
                            </li>
                           

                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> Help</NavLink>
                            </li>
                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> Withdraw Cash</NavLink>
                            </li>
                        
                         
                            <li>
                                <NavLink to="/about-us"><i className="fas fa-angle-double-right"></i> About Us</NavLink>
                            </li>
                            <li>
                                <NavLink to="/legality"><i className="fas fa-angle-double-right"></i> Legality</NavLink>
                            </li>
                            <li>
                                <NavLink to="/term-of-services"><i className="fas fa-angle-double-right"></i> Terms of Service</NavLink>
                            </li>
                            <li>
                                <NavLink to="/privacy-policy"><i className="fas fa-angle-double-right"></i> Privacy Policy</NavLink>
                            </li>
                            <li>
                                <NavLink to="/help-support"><i className="fas fa-angle-double-right"></i> Help & Support</NavLink>
                            </li>
                            <li>
                                <NavLink><i className="fas fa-angle-double-right"></i> Blog</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact-us"><i className="fas fa-angle-double-right"></i> Contact Us</NavLink>
                            </li>
                            
                        </ul>
                    </div>
                 </div>
                 <div className='col-lg-2'>
                    <div className='footer-widget'>
                     
                    <img src={IMAGE.footer_icon} alt='icon' />
                    </div>
                    </div>
            </div>
            <p className='copyRight'>Copyright © {new Date().getFullYear()} . All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer