import React from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import logo from './assets/prospectLogo.png';
import { Header } from './components/Header';
import { Main } from './components/Main';

const user = {
  email: 'use@example.com',
};

function App() {

  const [requests, setRequests] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  
  const searchedRequests = requests.filter(
    (request) => {
      const valueToLower = searchValue.toLowerCase();
      const requesterToLower = request.requester.toLowerCase();
      const roomNumberToLower = request.roomNumber.toLowerCase();
      const dateOfBookingToLower = request.dateOfBooking.toLowerCase();
      const checkInToLower = request.checkIn.toLowerCase();
      const checkOutToLower = request.checkOut.toLowerCase();

      return (
        requesterToLower.includes(valueToLower) ||
        roomNumberToLower.includes(valueToLower) ||
        dateOfBookingToLower.includes(valueToLower) ||
        checkInToLower.includes(valueToLower) ||
        checkOutToLower.includes(valueToLower)
      );
    }
  );
  const totalRequests = searchedRequests.length;
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  
  const toDelete = (id, requester) => {
    Swal.fire({
      title: 'Would you like to delete this register?',
      html: `<i><strong>${requester}</strong> would be deleted from files.</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`)
        .then(() => {
          getRequestList();
          Swal.fire({
            title:'Success!',
            html:`<strong>${requester}</strong> has been deleted.`,
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
        title="Room Booking Request" 
        logo={logo} 
        user={user} 
      />
      <Main 
        requests={requests}
        setRequests={setRequests}
        totalRequests={totalRequests}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchedRequests={searchedRequests}
        handleSearchInputChange={handleSearchInputChange}
        toDelete={toDelete}
      >
    </Main>
    </>
  );
}

export default App;
