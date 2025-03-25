import React, { useEffect, useState } from 'react'
import './Members.css'
import {Link} from 'react-router-dom'
const Members = () => {
  const Members_URL=`${process.env.REACT_APP_API_URL}/members/`
  const [members,setMembers]=useState([])
  useEffect(()=>{
    fetch(Members_URL).then((res)=>{
      return res.json().then((data)=>{
        setMembers(data.data)
        console.log(data.data)
      })
    })
  },[])

  return (
    <div className="members-tab bg-white mt-5" style={{width:"95%"}}>
        
      <table>
        <thead>
          <tr style={{color:"#3abef2"}}>
            <th>Member Name</th>
            <th>Email</th>
            <th>Member ID</th>
            {/* Add more headers if needed */}
          </tr>
        </thead>
        <tbody>
        {members.map(item => (
          <tr key={item.id}>
          <td>{item.MemberName}</td>
          <td>{item.MemberEmail}</td>
          <Link to={`/Member_Details/${item.MemberID}`} style={{ textDecoration: 'none' }}>{item.MemberID}</Link>
          {/* Add more data cells if needed */}
        </tr>
        
         
           
      ))}
        
         
        </tbody>
      </table>
    </div>
  )
}

export default Members