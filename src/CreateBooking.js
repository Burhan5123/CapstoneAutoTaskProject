
import React, { useState } from 'react'  
import './CreateBooking.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from './logo.png';
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap" rel="stylesheet"></link>


export default function CreateBooking() {
  const navigate = useNavigate();

  const [roomID, setRoomID] = useState('')
  const [noOfGuest, setNoOfGuest] = useState('')
  const [date, setDate] = useState('')
  const [time, setStartTime] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [enquiry, setEnquiry] = useState('')
  
  function handleSubmit(event){
  
    event.preventDefault();
    axios.post('http://localhost:3005/booking' , {roomID, noOfGuest, date, time, totalHours, enquiry} )
    .then(res => {
         console.log(res);
         navigate('/');
    }).catch(err => console.log(err));
       
  }
  
  // function showAlert() {
  //   alert('This is an alert message!');
  //   }

  return (
    <>
        <header>
            <img id='webLogo' src={logo} alt=''></img>
            <h1 id="ticketHeader">Create Booking</h1>
        </header>
        


<div className='main'>
    <div className='form'>
      <h2>Welcome! John</h2>  <h2>Email: John@example.com </h2><br/>
    
      <form onSubmit={handleSubmit}>
      <div>
      <label>Select Room Number:</label>
      <select onChange={e => setRoomID(e.target.value)} required> 
      <option value="">Choose a Room Number</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
		  </select>
      </div>

      <div>
      <label>Select Number Of Guests:</label>
      <select onChange={e => setNoOfGuest(e.target.value)} required>
      <option value="">Choose Number Of Max Guests</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
		  </select>
      </div>

      <div><label>Date Of Booking:</label>
		  <input type='date' class="form-control" min={new Date().toISOString().split('T')[0]} onChange={e => setDate(e.target.value)} required></input><br/></div>

      <div><label>Start Time:</label>
		  <input type='time' onChange={e => setStartTime(e.target.value)} required></input><br/></div>

      <div>
      <label>Select Number Of Hours:</label>
      <select onChange={e => setTotalHours(e.target.value)} required>
      <option value="">Choose Number Of Hours</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">until end of the day</option>

		  </select></div>
      
      <div>
      <label>Any enquiries or concerns:</label>
		  <textarea cols="40" rows="10" placeholder="Add Description" onChange={e => setEnquiry(e.target.value)}></textarea>
      </div>

      <input type="submit" value="Book Room!"/>

      {/* showAlert(); */}
      
      
      </form>
    </div>
    </div>
  </>
  )




}
