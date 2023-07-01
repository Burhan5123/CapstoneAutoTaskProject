import { AdminBooking } from './components/adminBooking/AdminBooking';
import { CreateBooking } from './components/createBooking/CreateBooking';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<AdminBooking />}></Route>
          <Route path='/createBooking' element= {<CreateBooking />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;