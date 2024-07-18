import React, { useState } from 'react';
import styles from "../componentscss/Tablecomponent.module.css";
import { Link } from 'react-router-dom';
import { SERVER_PATH } from '../paths/path';

const Tablecomponent = ({ patients }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const entriesPerPage = 5;

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

  const filteredPatients = patients.filter(patient =>
    String(patient.crno).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(filteredPatients.length / entriesPerPage);

  return (
    <div className={styles.parenttable}>
              <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by CR No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      <h2>Table of Patients</h2>
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
            {currentPatients.map((patient, index) => (
              <tr key={patient._id} className={index % 2 === 0 ? styles.evenrow : styles.oddrow}>
                <td>{patient.name}</td>
                <td>{patient.crno}</td>
                <td>{patient.datinithemodia}</td>
                <td>{patient.sessiondate}</td>
                <td>
                  <Link to={`/data/view/${patient._id}`} className={[styles.btn, styles.viewbtn].join(' ')}>View</Link>
                  <Link to={`/data/edit/${patient._id}`} className={[styles.btn, styles.editbtn].join(' ')}>Edit</Link>
                  <button onClick={() => handleDelete(patient._id)} className={[styles.btn, styles.deletebtn].join(' ')}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  );
}

export default Tablecomponent;
