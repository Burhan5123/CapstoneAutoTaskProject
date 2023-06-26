CREATE DATABASE prospectnow;

CREATE TABLE bookings (
    roomId int(2),
    userid int(6),
    noOfGuest int(2),
    dateOfBooking date,
    startTime date,
    noOfHours int(2),
    enquiry varchar(255)
);