import React,{useEffect,useState} from 'react'
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './CalendarActivities.css'


// const API_URL = {Loggedactivity:'http://127.0.0.1:8000/log/',
// Tasks:'http://127.0.0.1:8000/tasks/',
// Overduetasks:'http://127.0.0.1:8000/overduetask/'
// }
const API_URL = {Loggedactivity:`${process.env.REACT_APP_API_URL}/log/`,
  Tasks:`${process.env.REACT_APP_API_URL}/tasks/`,
  Overduetasks:`${process.env.REACT_APP_API_URL}/overduetask/`
  }





const CalendarActivities = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [url,changeUrl]= useState('Loggedactivity')
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivies= async () =>{
      try{
        const response = await fetch (API_URL[url]);
        if (!response.ok){
          throw new Error(`HTTP error! status:${response.status}`)
        }
        const data= await response.json();
        setData(data.data)
        console.log(data)
      }catch(error){
        setError(error.message || 'Failed to fetch data from the server');
      }
    }
    fetchActivies();
  }, [url]);

  const handleSelect = (eventKey) => {
    changeUrl(eventKey);
    console.log(url)
  };

 
  return (

    <div style={{marginTop:'50px',marginLeft:'25px',width:'95%',paddingBottom:"50px"}}>
        <Nav  fill variant="tabs" defaultActiveKey="Loggedactivity" className='nav-calendar' onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link eventKey="Loggedactivity" >Logged Activities</Nav.Link>
        
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Tasks" >Tasks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Overduetasks">Overdue Tasks</Nav.Link>
      </Nav.Item>
      
        
     
    </Nav>
    {data.length===0?(<p style={{marginTop:'15px',color:'red'}}>No data found</p>):(
    <table class="task-table" style={{  width: '100%', borderCollapse: 'collapse' ,}}>
        <thead>
          <tr>
            {/* <th style={{ border: '1px solid black', padding: '8px' }}>ID</th> */}
            <th >Type</th>
            <th >Subject</th>
            <th >Comments</th>
            {/* Add other headers based on your data structure */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {/* <td style={{ border: '1px solid black', padding: '8px' }}>{item.id}</td> */}
              <td >{item.Type}</td>
              <td >{item.Subject}</td>
              <td >{item.Comment}</td>
              {/* Map other data fields here */}
            </tr>
          ))}
        </tbody>
      </table>)}
    </div>
  )
}

export default CalendarActivities