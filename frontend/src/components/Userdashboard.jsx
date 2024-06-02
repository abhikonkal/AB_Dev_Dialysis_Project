import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import Tablecomponent from './Tablecomponent';
import { Link } from 'react-router-dom';
import styles from '../componentscss/Userdashboard.module.css';
import {SERVER_PATH,CLIENT_PATH} from '../paths/path';

const Userdashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${SERVER_PATH}/userdashboard/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();
        if (data.length === 0) {
          alert('No data found');
        } else {
          setPatients(data.found);  // Assuming `data.found` contains the array of patients
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);  // Ensure loading is set to false after data fetching is complete
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Tablecomponent patients={patients} />
      <div className={styles.linkcentercontainer}>
          <Link to={`/dataformfilling/${id}`} >Go to Form-filling</Link>
        </div>
      <Footer />
    </div>
  );
};

export default Userdashboard;
