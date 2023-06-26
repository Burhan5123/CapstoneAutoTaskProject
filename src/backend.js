const express = require('express');
const cors = require("cors");
const mysql = require('mysql');


const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bookingdatabase'
});

app.get("/", (req, res) =>{
  const sql = "SELECT * FROM createbooking";
  db.query(sql, (err, data) =>{
    if(err) return res.json("Error");
    return res.json(data);  
  })

})

// app.post('/booking', (req, res) => {
//   const sql = "INSERT INTO createbooking (roomID, noOfGuest, bookingDate, startTime, totalBookingHours, enquiries, endTime) VALUES (?)";

//   const startTime = req.body.time; // Assuming req.body.time is a valid time string
//   const totalHours = req.body.totalHours;
  
//   // Convert the startTime to minutes
//   const startTimeInMinutes = parseInt(startTime.slice(0, 2)) * 60 + parseInt(startTime.slice(3));
  
//   // Calculate the endTime by adding totalHours to startTime
//   const endTimeInMinutes = startTimeInMinutes + totalHours * 60;
  
//   // Adjust the endTime if it exceeds 24 hours
//   const adjustedEndTimeInMinutes = endTimeInMinutes % (24 * 60);
  
//   // Format the endTime as HH:mm
//   const endTime = `${Math.floor(adjustedEndTimeInMinutes / 60).toString().padStart(2, '0')}:${(adjustedEndTimeInMinutes % 60).toString().padStart(2, '0')}`;
 

//   const values = [
//     req.body.roomID,
//     req.body.noOfGuest,
//     req.body.date,
//     req.body.time,
//     req.body.totalHours,
//     req.body.enquiry,
//     endTime
//   ]
  
//   db.query(sql, [values], (err, data) => {
//     if(err) return res.json("Error");
//     return res.json(data);
//   })

// })
app.post('/booking', (req, res) => {
  const message = "The selected time slot conflicts with an existing booking.";
  const sql = "INSERT INTO createbooking (roomID, noOfGuest, bookingDate, startTime, totalBookingHours, enquiries, endTime) VALUES (?)";

  const startTime = req.body.time; // Assuming req.body.time is a valid time string
  const totalHours = req.body.totalHours;

  // Convert the startTime to minutes
  const startTimeInMinutes = parseInt(startTime.slice(0, 2)) * 60 + parseInt(startTime.slice(3));

  // Calculate the endTime by adding totalHours to startTime
  const endTimeInMinutes = startTimeInMinutes + totalHours * 60;

  // Adjust the endTime if it exceeds 24 hours
  const adjustedEndTimeInMinutes = endTimeInMinutes % (24 * 60);

  // Format the endTime as HH:mm
  const endTime = `${Math.floor(adjustedEndTimeInMinutes / 60)
    .toString()
    .padStart(2, '0')}:${(adjustedEndTimeInMinutes % 60)
    .toString()
    .padStart(2, '0')}`;

  const newStartTime = startTimeInMinutes;
  const newEndTime = adjustedEndTimeInMinutes;

  const roomID = req.body.roomID;
  const bookingDate = req.body.date;

  // Check if the same roomID is booked at the same date during the selected time slot
  const selectSql = 'SELECT * FROM createbooking WHERE roomID = ? AND bookingDate = ?';
  db.query(selectSql, [roomID, bookingDate], (selectErr, bookingData) => {
    if (selectErr) {
      return res.json("Error");
    }

    const hasConflict = bookingData.some((booking) => {
      const existingStartTime = parseInt(booking.startTime.slice(0, 2)) * 60 + parseInt(booking.startTime.slice(3));
      const existingEndTime = parseInt(booking.endTime.slice(0, 2)) * 60 + parseInt(booking.endTime.slice(3));

      if ((newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
          (newEndTime > existingStartTime && newEndTime <= existingEndTime)) {
        return true;
      }

      return false;
    });
    

    if (hasConflict) {
      // Return the alert message to the user
      return res.send('<script>alert("The selected time slot conflicts with an existing booking."); window.location.href = "/";</script>');
    }

    

    const values = [
      roomID,
      req.body.noOfGuest,
      bookingDate,
      req.body.time,
      req.body.totalHours,
      req.body.enquiry,
      endTime,
    ];

    db.query(sql, [values], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
});

app.listen(3005, () => {
  console.log("listening");
})



