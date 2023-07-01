import React from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import logo from '../../assets/prospectLogo.png';
import { Header } from './Header';
import { Main } from './Main';

const user = {
  email: 'use@example.com',
};

const AdminBooking = () => {

  const [requests, setRequests] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  
  const searchedRequests = requests.filter(
    (request) => {
      const valueToLower = searchValue.toLowerCase();
      const roomIDLower = request.roomID.toString().toLowerCase();
      const nameToLower = request.name.toLowerCase();
      const noOfGuestLower = request.noOfGuest.toString().toLowerCase();
      const bookingDateLower = request.bookingDate.toLowerCase();
      const startTimeLower = request.startTime.toLowerCase();
      const totalHoursLower = request.totalHours.toString().toLowerCase();
      const enquiryLower = request.enquiry.toLowerCase();
      const endTimeLower = request.endTime.toLowerCase();

      return (
        roomIDLower.includes(valueToLower) ||
        nameToLower.includes(valueToLower) ||
        noOfGuestLower.includes(valueToLower) ||
        bookingDateLower.includes(valueToLower) ||
        startTimeLower.includes(valueToLower) ||
        totalHoursLower.includes(valueToLower) ||
        enquiryLower.includes(valueToLower) ||
        endTimeLower.includes(valueToLower) 
      );
    }
  );
  const totalRequests = searchedRequests.length;
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    getRequestList(value);
  };
  
  const toDelete = (id, name) => {
    Swal.fire({
      title: 'Would you like to delete this register?',
      html: `<i><strong>${name}</strong> would be deleted from files.</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}` )
        .then(() => {
          console.log(id);
          getRequestList();
          Swal.fire({
            title:'Success!',
            html:`<strong>${name}</strong> has been deleted.`,
            icon:'success'
          });
        }).catch(function(error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Delete process failed.',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Please try again this operation later":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

  const getRequestList = () => {
    Axios.get("http://localhost:3001/requests").then((response) => {
      setRequests(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  getRequestList();

  return (
    <>
      <Header 
        title="Room Booking Request List" 
        logo={logo} 
        user={user} 
      />
      <Main 
        requests={searchedRequests}
        setRequests={setRequests}
        totalRequests={totalRequests}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearchInputChange={handleSearchInputChange}
        toDelete={toDelete}
      >
      </Main>
    </>
  );
}

export { AdminBooking };
