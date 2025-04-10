import React, { useEffect, useState } from 'react'
import DashboardHeader from "../common/DashboardHeader";
import AdminMenu from "../common/AdminMenu";
import DataTable from 'react-data-table-component';
import { NavLink } from 'react-router-dom';
import { IMAGE } from '../../../utils/Theme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const data = [
    {
        name:"John Smith",
        email:"john.smith@email.com",
        date:"09.28.2023",
        subject:"Lorem Ipsum Dolor...",
        time:"10:38"
    },
    {
        name:"John Smith",
        email:"john.smith@email.com",
        date:"09.28.2023",
        subject:"Lorem Ipsum Dolor...",
        time:"10:38"
    },
    {
        name:"John Smith",
        email:"john.smith@email.com",
        date:"09.28.2023",
        subject:"Lorem Ipsum Dolor..",
        time:"10:38"
    },

]
const SubscriberList = () => {

    const [search, setsearch] = useState("")
    const [FilterResult, setFilterResult] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    const columns = [
       
        {
            name: 'Subscriber Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
      
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'Time',
            selector: row => row.time,
            sortable: true,
        },
        
      {
        name: 'Action',
        selector: (row) => (
          <>
          <button className='btn btn-sm btn-info ml-2'>Active</button>
          <button className='table-btn ml-2'><i className="fa-solid fa-trash"></i></button>
          
          </>
        ),
    },
    ];

    useEffect(()=>{
        const result = data && data.filter(data =>{
          return data.name.toLowerCase().match(search.toLowerCase())
        })
        setFilterResult(result)
      },[search])


  return (
    <div>
    <DashboardHeader title="Subscriber List" />
    <AdminMenu />
    <div className="container">
      <div className="dashboard-panel custom-table">

      <div className="withdraw-history-form row align-items-center mb-4">
        <div className="col-auto">
            <label>From Date:</label>
        </div>
        <div className="col-lg-2">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
        </div>
        <div className="col-auto">
            <label>To Date:</label>
        </div>
        <div className="col-lg-2">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
        </div>
        <div className="col-lg-2">
            <button className="bluesolidBtn">Search</button>
        </div>
        <div className="col-lg-3">
            <button className="csvBtn"><i className="fas fa-download"></i>  Download Excel</button>
        </div>
    </div>
      <DataTable
            columns={columns}
            data={FilterResult}
            pagination
            highlightOnHover
            
        />
      </div>
      </div>
        
    </div>
  )
}

export default SubscriberList