import React from "react";
import { COLORS, IMAGE } from "../../../utils/Theme";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BaseUrl } from "../../../utils/ApiConnection";

const Testimonial = ({data}) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  function rating(val){
    for(var i=0; i<5; i++){
      
    }
  }

  return (
    <div className="testimonail-sec">
      <div className="container">
        <div className="row">
        <div className="col-lg-5 col-md-5">
          <div className="testim-l">
            <label style={{color:COLORS.primaryColor}}>Testimonials</label>
            <h3>
              Here’s what our{" "}
              <span style={{ color: COLORS.primaryColor }}>customers</span> have
              said
            </h3>
            <p>
              Pleasure and praising pain was born and I will give you a complete
              account of the system, and expound the actual teachings of the
              great explorer.
            </p>
          </div>
        </div>
        <div className="col-lg-7 col-md-7">
          <div className="testim-r">
                <ul>
                {data&&data.map((item, index)=>{
                  return (
                    <li>
                    <div className="testi-small-img">
                    <img src={BaseUrl.baseurl + item?.image} alt="client"  />
                    </div>
                </li>
                  )
                })
              }
                   
                    
                </ul>


            <Slider {...settings}>
              {data&&data.map((item, index)=>{
       
                return (
                  <div className="testimonial-box" key={index}>
                    {rating(item?.stars)}
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>

                <p>
                  {item?.description}.{" "}
                </p>

                <div className="testi-pro">
                  <div className="testi-pro-img">
                    <img src={BaseUrl.baseurl + item?.image} alt="client"  />
                  </div>
                  <div className="testi-pro-info">
                    <h4>{item?.author}</h4>
                    <span>{item?.designation}</span>
                  </div>
                </div>
              </div>
                )
              })}
          
            </Slider>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
