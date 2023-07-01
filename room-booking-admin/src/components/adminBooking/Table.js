import React from "react";
import "./Table.css";

function Table(props) {
  return (
    <tr
      className={props.isChecked ? "row-container-ab selected table-active" : "row-container-ab"}
      onClick={props.onSelect}
    >
      <td className="table-data-ab"></td>
      <td className="table-data-ab">{props.roomID}</td>
      <td className="table-data-ab">{props.name}</td>
      <td className="table-data-ab">{props.noOfGuest}</td>
      <td className="table-data-ab">{props.bookingDate}</td>
      <td className="table-data-ab">{props.startTime}</td>
      <td className="table-data-ab">{props.totalHours}</td>
      <td className="table-data-ab">{props.enquiry}</td>
      <td className="table-data-ab">{props.endTime}</td>
      <td className="table-data-ab">
        {props.isChecked && (
          <>
            <button
              type="button"
              className="button-modify-ab"
              onClick={() => {
                props.toDelete(props);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="button-delete-ab"
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
