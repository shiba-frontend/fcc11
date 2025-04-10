import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';
import ApiConnection from '../../../utils/ApiConnection';

const ViewFaq = () => {

    const [catname, setcatname] = useState("")
    const [loading, setloading] = useState(false)
    const [FilterResult, setFilterResult] = useState([])
    const [question, setquestion] = useState("")
    const [ans, setans] = useState("")
    const [links, setlinks] = useState(false)
  
    let navigate = useNavigate()
    let {id} = useParams()
    const fetchdata = async ()=>{
        setloading(true)  

        try{
            const response = await ApiConnection.get(`faq/${id}`)
            setloading(false)  
            if(response.status === 200){
                var editdata = response?.data?.data
                setcatname(editdata?.faqcategory_id)  
                setquestion(editdata?.question)
                setans(editdata?.answer) 
                setlinks(editdata?.show_in_quick_link == 0 ? false : true)
            }

        } catch(e){
            setloading(false)  
        }
    }
    
    const GetData = async ()=>{
        setloading(true)
        try {
            const  response = await ApiConnection.get('faq-category/list')
            if(response?.status == 200){
                setFilterResult(response?.data?.data?.list)
                setloading(false)
            } else{
                setloading(false)
            }  
        } catch(err){
            setloading(false)
        }
    }

    useEffect(()=>{
        GetData()
        fetchdata()
    },[])
  
  


  return (
    <div>
        {loading && <Loader/>}
    <DashboardHeader title="View faq" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

           <div className='row'>
           <div className='col-lg-6'>
                        <div className='form-group'>
                            <label>Select Faq Category</label>
                            <select className="form-control"
                            value={catname}
                            onChange={(e)=>setcatname(e.target.value)}
                            disabled
                            >
                                <option>--Select--</option>
                                {FilterResult&&FilterResult.map((result,i)=>{
                                    return (
                                        <option key={i} value={result?.id}>{result?.category_name}</option>
                                    )
                                })}
                              
                            </select>
                        </div>
                    </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                        <label>Question</label>
                        <input type="text" className="form-control" placeholder="Question"
                        value={question}
                        onChange={(e)=>setquestion(e.target.value)}
                        readOnly/>
                    </div>
                </div>
               
                <div className='col-lg-12'>
                    <div className='form-group'>
                        <label>Answer to the Question</label>
                        <textarea rows="5" className="form-control" placeholder="Answer"
                         value={ans}
                         onChange={(e)=>setans(e.target.value)}
                         readOnly></textarea>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='form-group'>
                    <input type="checkbox"
                    defaultChecked={links}
                         onChange={() => setlinks(!links)}
                        /> &nbsp; 
                        <label>Quick Links</label>
                        
                    </div>
                </div>
              
           </div>
    
      </div>
      </div>
        
    </div>
  )
}

export default ViewFaq