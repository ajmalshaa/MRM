import React, { useState, useEffect } from 'react';
import { Button, ProgressBar, Accordion, Modal, Form, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import MemberActivities from './MemberActivities'
import './MemberActivities.css'
const MemberDetails = () => {
  // const memberURL = 'http://127.0.0.1:8000/memberdetails/';
  const memberURL = `${process.env.REACT_APP_API_URL}/memberdetails/`;
  const loanURL = `${process.env.REACT_APP_API_URL}/loans/`;
  const { memberId } = useParams();
  const [memberDetails, setMemberDetails] = useState({});
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    fetch(`${memberURL}${memberId}`)
      .then((res) => res.json())
      .then((data) => {
        setMemberDetails(data.data);
      })
      .catch((error) => {
        console.error('Error fetching member details:', error);
      });
  }, [memberId]);

  useEffect(() => {
    fetch(`${loanURL}${memberId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoans(data.data);
        // console.log(loans.length);
        // console.log("test")
      })
      .catch((error) => {
        console.error('Error fetching loan details:', error);
      });
  }, [memberId]);

  const backClick = () => {
    navigate('/Members');
  };

  const logo = './Images/MRMLogo.png';
  return (
    <div className='row' style={{ backgroundColor: '#212A34 ', margin: '20px', padding: '15px',boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.7)',borderRadius:'8px' }}>
      <div className="d-flex justify-content-end">
        <Button onClick={handleShow} className="btn btn-primary mt-4 shadow-sm bg-primary rounded text-white mx-2">Add Activities</Button>
        <Button onClick={backClick} className="button-back btn btn-secondary mt-4 shadow-sm bg-white rounded text-secondary ">Back</Button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Row>
            <Col>
            <Form.Label>Type</Form.Label>
    <Form.Select aria-label="Default select example" className='mb-3'>
      <option>Type</option>
      <option value="Task">Task</option>
      <option value="Log">Log Activity</option>
      <option value="Note">Note</option>
    </Form.Select>
    </Col>
    <Col>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="date" placeholder="" />
      </Form.Group>
    </Col>
    </Row>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <div className='col-md-3 shadow-lg p-3 mb-5 rounded' style={{ borderRadius: '8px', color: 'white', backgroundColor:'#34495E',boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.7)' }}>
        {memberDetails.profile_picture && (
          <img
            // src={`http://127.0.0.1:8000${memberDetails.profile_picture}`}
            src={`${process.env.REACT_APP_API_URL}${memberDetails.profile_picture}`}
            alt="Profile"
            style={{ width: '50%', borderRadius: '10px', marginTop: '25px' }}
          />
        )}
        <h4>{memberDetails.MemberName}</h4>
        <p style={{ marginBottom: '5px' }}>ID: {memberDetails.MemberID}</p>
        <p style={{ marginBottom: '5px' }}>Email: {memberDetails.MemberEmail}</p>
        <p style={{ marginBottom: '5px' }}>Address: {memberDetails.MemberAddress}</p>
        <div style={{ width: '50%', float: 'left' }}>
          <label>Credit score:</label>
        </div>
        <div style={{ width: '50%', float: 'left', marginTop: '5px' }}>
          {memberDetails.MemberScore < 33 ? (
            <ProgressBar striped variant="danger" now={memberDetails.MemberScore} />
          ) : memberDetails.MemberScore >= 33 && memberDetails.MemberScore < 66 ? (
            <ProgressBar striped variant="warning" now={memberDetails.MemberScore} />
          ) : memberDetails.MemberScore >= 66 ? (
            <ProgressBar striped variant="success" now={memberDetails.MemberScore} />
          ) : (
            <h5>No data</h5>
          )}
        </div>
      </div>
      <div className='col-md-9'>
        <div style={{ textAlign: 'left', marginLeft: '25px' }}>
          <h4 style={{color: '#ECF0F1 '}}>Loans</h4>
          {loans.length===0?(<p style={{marginTop:'15px',color:'red'}}>No data found</p>):(
          <Accordion>
            
            {loans.map(item => (
              <Accordion.Item className='Accordion-Item' eventKey={item.id} key={item.id}>
                <Accordion.Header>{item.LoanType}</Accordion.Header>
                <Accordion.Body>
                  <p>Loan Amount: {item.LoanAmount}</p>
                  <p>Interest Rate: {item.InterestRate}</p>
                  <p>Duration: {item.Duration}</p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>)}
        </div>
        <MemberActivities member={memberDetails}/>
      </div>
      
    </div>
  );
};

export default MemberDetails;
