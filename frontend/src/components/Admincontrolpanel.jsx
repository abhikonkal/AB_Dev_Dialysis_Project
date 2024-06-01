import React from 'react'
import styles from "../componentscss/Admincontrolpanel.module.css"
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Admincontrolpanel = () => {
    const [acceptedUsers, setAcceptedUsers] = useState([]);
    const [revokedUsers, setRevokedUsers] = useState([]);
    const [isValidAdmin, setIsValidAdmin] = useState(null); // null means not yet checked
    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        // Verify admin ID
        fetch(`http://localhost:5000/admincontrolpanel/verify/${id}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.statuscode === 200) {
                    setIsValidAdmin(true);
                }
                else {
                    setIsValidAdmin(false);
                }
            })
            .catch(error => {
                console.error('Error verifying admin ID:', error);
                setIsValidAdmin(null);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:5000/admincontrolpanel/accepted/${id}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => setAcceptedUsers(data.data))
            .catch(error => console.error('Error fetching accepted users:', error));

        fetch(`http://localhost:5000/admincontrolpanel/revoked/${id}`, { method: 'GET' })
            .then(res => res.json())
            .then(data => setRevokedUsers(data.data))
            .catch(error => console.error('Error fetching revoked users:', error));
    }, [id]);

    const handleRevoke = (userId) => {
        console.log("khjhjhbjh", userId);
        const body = {
            "torevokeid": userId,
            "status": "revoked",
            "revokedby": id
        }
        fetch(`http://localhost:5000/admincontrolpanel/revoke/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log('User revoked:', data);
                setAcceptedUsers(acceptedUsers.filter(user => user._id !== userId));
                setRevokedUsers([...revokedUsers, data.user]);
            })
            .catch(error => console.error('Error revoking user:', error));
    };

    const handleReauthorize = (userId) => {
        const body = {
            "toreauthorize": userId,
            "status": "reauthorized",
            "reauthorizedby": id
        }
        fetch(`http://localhost:5000/admincontrolpanel/reauthorize/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log('User reauthorized:', data);
                setRevokedUsers(revokedUsers.filter(user => user._id !== userId));
                setAcceptedUsers([...acceptedUsers, data.user]);
            })
            .catch(error => console.error('Error reauthorizing user:', error));
    };

    const handleDelete = (userId) => {
        //have an alert about this and proceed only if user confirms the delete
        // alert("Are you sure you want to delete this user?");
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        const body = {
            "todelete": userId,
            "status": "deleteuser",
            "deleteby": id
        }
        fetch(`http://localhost:5000/admincontrolpanel/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log('User deleted:', data);
                setRevokedUsers(revokedUsers.filter(user => user._id !== userId));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    if (isValidAdmin === null) {
        return <p>Loading...</p>;
    }

    if (isValidAdmin === false) {
        return <p>Permission Denied.</p>;
    }

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.tableContainer}>
                    <div>
                        <h2>Accepted Users</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acceptedUsers.length > 0 ? (
                                    acceptedUsers.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button onClick={() => handleRevoke(user._id)} className={`${styles.btn} ${styles.btnRevoke}`}>Revoke Access</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No accepted users</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <h2>Revoked Users</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revokedUsers.length > 0 ? (
                                    revokedUsers.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button onClick={() => handleReauthorize(user._id)} className={`${styles.btn} ${styles.btnReauthorize}`}>Reauthorize</button>
                                                <button onClick={() => handleDelete(user._id)} className={`${styles.btn} ${styles.btnDelete}`}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No revoked users</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="link-center-container">
                <Link to={`/dataformfilling/${id}`} >Go to Form-filling</Link>
            </div>

            <div className="link-center-container">
                <Link to={`/userdashboard/${id}`}>Data Dashboard</Link>
            </div>
            <Footer />
        </div>
    );
}

export default Admincontrolpanel
