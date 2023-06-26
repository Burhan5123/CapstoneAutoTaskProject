
import './App.css';
import CreateBooking from './CreateBooking';
import YourBookings from './YourBookings';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;400;600;900&display=swap" rel="stylesheet"></link>


function App() {
  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path='/' element= {<YourBookings />} ></Route>
        <Route path='/CreateBooking' element= {<CreateBooking />} ></Route>
       </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
