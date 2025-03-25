
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import MyView from './MyView';
import logo from './Images/MRMLogo.png';
import MemberDetails from './MemberDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Members from './Members';
import { NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App" style={{height:'800px'}}>
      <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>
      
      


      
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/"><img className='logo' src={logo}/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Members">Members</Nav.Link>
            
            <Nav style={{ marginLeft: '850px',marginTop:'10px' }}>
            <FontAwesomeIcon icon={faHouse} />
            <NavItem >User</NavItem>
            </Nav>
            
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={< MyView/>}/>
        
          <Route path="Members" element={<Members/>} />
          <Route path="Member_Details/:memberId" element={<MemberDetails/>} />
          
      </Routes>
    </BrowserRouter>
      
    
    </div>
  );
}

export default App;
