import React from 'react';
import styles from "../componentscss/Tablecomponent.module.css";
import { Link } from 'react-router-dom';
import {SERVER_PATH} from '../paths/path';

const Tablecomponent = ({ patients }) => {
  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (confirmDelete) {
      fetch(`${SERVER_PATH}/data/delete/${id}`, {
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
    <div className={styles.parenttable}>
      <div className={styles.tablecontainer}>
      <table className={styles.patienttable}>
        <thead>
          <tr>
            <th className={styles.headingcell}>Name</th>
            <th className={styles.headingcell}>CrNo</th>
            <th className={styles.headingcell}>Date of Initial Dialysis</th>
            <th className={styles.headingcell}>Session Date</th>
            <th className={styles.headingcell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient._id} className={styles.index % 2 === 0 ? styles.evenrow : styles.oddrow}>
              <td>{patient.name}</td>
              <td>{patient.crno}</td>
              <td>{patient.datinithemodia}</td>
              <td>{patient.sessiondate}</td>
              <td>
                <Link to={`/data/view/${patient._id}`} className={[styles.btn,styles.viewbtn].join(' ')}>View</Link>
                <Link to={`/data/edit/${patient._id}`} className={[styles.btn,styles.editbtn].join(' ')}>Edit</Link>
                <Link onClick={() => handleDelete(patient._id)} className={[styles.btn,styles.deletebtn].join(' ')}>Delete</Link>
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
