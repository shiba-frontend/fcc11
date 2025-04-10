import React from 'react'

const UpcomingFantasy = ({value}) => {



  return (
       value&&value.map((item, i)=>{
        return (
            <div className="card-listed" key={i}>
                 
            <label>{item?.game_name}</label>
            <div className="row align-items-center">
                <div className="col-lg-3">
                    <div className="card-listed-lft">
                        <h5>Prize Money</h5>
                        <h3>${item?.total_prize_pool}</h3>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card-listed-cen">
                            <span>Winners: {item?.total_winners}</span>
                         
                            <h3>{item?.match?.status}</h3>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card-listed-rht">
                        <h5>{item?.credit_required} Credits</h5>
                
                    
                       
                    </div>
                </div>
            </div>
            
              </div>
        )
    })
  )
}

export default UpcomingFantasy