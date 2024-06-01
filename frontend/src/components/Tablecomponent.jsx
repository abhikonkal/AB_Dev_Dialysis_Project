import React from 'react';
import "../componentscss/Tablecomponent.css";
import { Link } from 'react-router-dom';

const Tablecomponent = ({ patients }) => {
  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (confirmDelete) {
      fetch(`http://localhost:5000/data/delete/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.statuscode === 200) {
            alert("Patient deleted successfully");
            window.location.reload();
          } else {
            alert("Patient not found");
          }
        });     
      
    }
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
                <Link to={`/data/view/${patient._id}`} className="btn view-btn">View</Link>
                <Link to={`/data/edit/${patient._id}`} className="btn edit-btn">Edit</Link>
                <Link onClick={() => handleDelete(patient._id)} className="btn delete-btn">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
}

export default Tablecomponent;
