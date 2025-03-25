import {React, useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import './MemberActivities.css'
import Nav from 'react-bootstrap/Nav';
function MemberActivities({ member }) {
  const MemberDetailsURL=process.env.REACT_APP_MemberTaskAPI_URL
  console.log("Rendering MemberActivities, member:", member.MemberID);
  const [url,changeUrl]= useState('Overview')
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const handleSelect = (eventKey) => {
    changeUrl(eventKey);
    console.log(url)
  };
  useEffect(()=>{
    if (url === 'Overview') {
      // Do not fetch anything when 'Overview' is selected
      return;
    }
    const fetchActivies= async () =>{

      try{
        console.log(`${MemberDetailsURL}?member_id=${member.MemberID}&activity_type=${url}`)
        const response = await fetch (`${MemberDetailsURL}?member_id=${member.MemberID}&activity_type=${url}`);
        if (!response.ok){
          throw new Error(`HTTP error! status:${response.status}`)
        }
        const data= await response.json();
        
        setData(data.data)
        console.log(data.length)
      }catch(error){
        setError(error.message || 'Failed to fetch data from the server');
      }
    }
    fetchActivies();
  }, [url]);
  return (
    <>
    <Nav fill variant="tabs" defaultActiveKey="Overview" onSelect={handleSelect} style={{width:'97%',marginLeft:'25px',marginTop:'10px'}}> 
      <Nav.Item>
        <Nav.Link eventKey="Overview" >Overview</Nav.Link>
        
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Log" >Logged Activities</Nav.Link>
        
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Task" >Tasks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Notes">Notes</Nav.Link>
      </Nav.Item>
      
        
     
    </Nav>
    <div >
      { url==='Overview' && (
        <div className='member-page'>
        <Card className='task' style={{ width: '18rem' }}>
      <Card.Body>
        <h3>Tasks</h3>
        
        <Card.Text>
          {member.tasks}
        </Card.Text>
        {/* <Card.Link href="#">View Tasks</Card.Link> */}
        
      </Card.Body>
    </Card>
    <Card className='notes' style={{ width: '18rem' }}>
      <Card.Body>
        <h3>Notes</h3>
        
        <Card.Text>
        {member.notes}
        </Card.Text>
        {/* <Card.Link href="#">View Notes </Card.Link> */}
        
      </Card.Body>
    </Card>
    <Card className='logs' style={{ width: '18rem' }}>
      <Card.Body>
        <h3>Logs</h3>
        
        <Card.Text>
        {member.logs}
        </Card.Text>
        {/* <Card.Link href="#">View Logs</Card.Link> */}
        
      </Card.Body>
    </Card>
    </div>
    )}
    {url !== 'Overview' && (
          <div>
            {/* <h2>Logged Activities</h2> */}
            {/* Conditionally render the table */}
            {data.length === 0 ? (
              <p style={{ marginTop: '15px', color: 'red' }}>No data found</p>
            ) : (
              <table className="task-table" style={{ border: '1px solid black', width: '97%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Comments</th>
                    {/* Add other headers based on your data structure */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.Type}</td>
                      <td>{item.Subject}</td>
                      <td>{item.Comment}</td>
                      {/* Map other data fields here */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        
    {/* <p>{props.MemberID}</p> */}
    
    </div>
    </>
  )
}

export default MemberActivities