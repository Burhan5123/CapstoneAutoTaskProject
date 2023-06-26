import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './CreateBooking.css';
import { useNavigate } from "react-router-dom";

export default function YourBookings() {
    const navigate = useNavigate();

    const [booking, setBooking] = useState([])
    useEffect(()=> {
      axios.get('http://localhost:3005/')
      .then(res => setBooking(res.data))
      .catch(err => console.log(err));
    }, [])

  return (
    <div>
        <table className='table'>
          <thead>
            <tr>
            <th>Room Number</th>
            <th>Number of Guests</th>
            </tr>
          </thead>
          <tbody>
            {
                booking.map((data, i) => (
                  <tr key={i}>
                    <td>{data.roomID}</td>
                    <td>{data.noOfGuest}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      <button className='' onClick={createBooking}> CREATE YOUR BOOKING</button>
    </div>
  )

  function createBooking(){  
  
    navigate('/CreateBooking');
   
}

}

