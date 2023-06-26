import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Table } from './Table';
import "./Main.css";

function Main({ 
  totalRequests,
  searchValue,
  requests,
  handleSearchInputChange,
  toDelete,
  searchedRequests
}) {  

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <>
      <div className='main-header'>
        <div className="search-container">
          <p className="total-search search-container-element">Total Room Requests: {totalRequests}</p>
          <div className="search-input-explorer search-container-element">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
      <table className="table table-hover">
        <thead className="header-container table-dark">
          <tr className="row-container">
            <th className="table-header checkbox">
              {/* <input type="checkbox" /> */}
              
            </th>
            <th className="table-header">Requester</th>
            <th className="table-header">Room Number</th>
            <th className="table-header">Date of Booking</th>
            <th className="table-header">Check In</th>
            <th className="table-header">Check Out</th>
            <th>
              <button
                type="button"
                className="table-header button-add button"
                // onClick={() => {
                //   props.toDelete(props);
                // }}
              >
                Add 
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {requests.map((val, index) => (
            <Table 
              key={index}
              isChecked={selectedRows.includes(index)}
              requester={val.requester}
              roomNumber={val.roomNumber}
              dateOfBooking={val.dateOfBooking}
              checkIn={val.checkIn}
              checkOut={val.checkOut}
              toDelete={() => toDelete(val.id, val.requester)}
              onSelect={() => handleRowSelection(index)}
            />
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}

export { Main };