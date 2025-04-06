import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CalendarActivities from './CalendarActivities';
import { useState,useEffect } from 'react';
import {Row,Col} from 'react-bootstrap'
import Utilities from './Utilities';
const localizer = momentLocalizer(moment)
// const API_URL ='http://127.0.0.1:8000/tasks/'
const API_URL =`${process.env.REACT_APP_API_URL}/tasks/`


const MyView = () => {
  const [events,setEvents] = useState([])
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchEvents= async()=>{
    try{
      const response= await fetch(API_URL);
      if (!response.ok){
        throw new Error(`HTTP error ! ststus : ${response.status}`);
      }
      const data= await response.json();
      setEvents(data.data);
    }
    catch(error){
      setError(error.message || 'Failed to fetch data from server')
    }
    fetchEvents();}
    }
  
  // fetch(API_URL)
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     //console.log(data);
  //     setEvents(data.data);
  //     //console.log(data.data)
  //   });
, []);
  return (
    
    <div style={{backgroundColor:'#212A34',width:"95%",marginLeft:"25px",marginTop:"1px"}}>
      <Row>
        <Col xs={12} md={8}>
       <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ marginTop:'50px',marginLeft:'25px',width:'95%',height:'400px', padding:"25px",backgroundColor:'#212A34',color:'#FFFFFF',boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.7)',borderRadius:'8px'}}
    />
    <CalendarActivities />
    </Col>
    <Col xs={12} md={4}>
    
    <Utilities />
    </Col>
    </Row>
    </div>
  )
}

export default MyView