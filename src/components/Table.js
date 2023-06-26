import React from "react";
import "./Table.css";

function Table(props) {
  return (
    <tr
      className={props.isChecked ? "row-container selected table-active" : "row-container"}
      onClick={props.onSelect}
    >
      <td className="table-data">
        {/* <input 
        type="checkbox" 
        checked={props.isChecked} 
        readOnly
        
       /> */}
      </td>
      <td className="table-data">{props.requester}</td>
      <td className="table-data">{props.roomNumber}</td>
      <td className="table-data">{props.dateOfBooking}</td>
      <td className="table-data">{props.checkIn}</td>
      <td className="table-data">{props.checkOut}</td>
      <td className="table-data">
        {props.isChecked && (
          <>
            <button
              type="button"
              className="button-modify button"
              onClick={() => {
                props.toDelete(props);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="button-delete "
              onClick={() => {
                props.toDelete(props);
              }}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export { Table };
