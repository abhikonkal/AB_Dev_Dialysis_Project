import React from 'react';
import "../componentscss/Tablecomponent.css";
import { Link } from 'react-router-dom';

const Tablecomponent = ({ patients }) => {
  function handleDelete(id) {
    console.log("delete", id);
  }
  // console.log(patients);

  return (
    <div className='parenttable'>
      <div className="table-container">
      <table className="patient-table">
        <thead>
          <tr>
            <th className="heading-cell">Name</th>
            <th className="heading-cell">CrNo</th>
            <th className="heading-cell">Date of Initial Dialysis</th>
            <th className="heading-cell">Session Date</th>
            <th className="heading-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{patient.name}</td>
              <td>{patient.crno}</td>
              <td>{patient.datinithemodia}</td>
              <td>{patient.sessiondate}</td>
              <td>
                <Link to={`/view/${patient._id}`} className="btn view-btn">View</Link>
                <Link to={`/edit/${patient._id}`} className="btn edit-btn">Edit</Link>
                <Link onClick={() => handleDelete(patient._id)} className="btn delete-btn">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="add-link-container">
          <Link to="/add" className="btn add-btn">Go to Data Filling</Link>
    </div> */}
    </div>
    </div>
  );
}

export default Tablecomponent;
