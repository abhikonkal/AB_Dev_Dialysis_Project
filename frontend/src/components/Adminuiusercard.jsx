import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Usercardwithactions from './Usercardwithactions'
import Homedatacard from './homecard'
import { Link } from 'react-router-dom'

const Adminuiusercard = () => {
    const [users, setUsers] = useState([]);
    const  {id} = useParams();
    useEffect(() => {
        fetch('http://localhost:5000/adminuiusers/'+id, {method: 'GET'})
            .then(res => res.json())
            .then(data => setUsers(data.data))
    }, [id]);
    console.log(users);

    const handleAccept = (userId) => {
        fetch('http://localhost:5000/adminuiusers/accept/' + userId, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                console.log('User accepted:', data);
                // Optionally update state or UI here
            })
            .catch(error => console.error('Error accepting user:', error));
    };

    const handleReject = (userId) => {
        fetch('http://localhost:5000/adminuiusers/reject/' + userId, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                console.log('User rejected:', data);
                // Optionally update state or UI here
            })
            .catch(error => console.error('Error rejecting user:', error));
    };


    return (
        <div>
        <Header />
        <div className='adminuibody'>
        {users.length > 0 ? (
                    users.map(user => (
                        <Usercardwithactions
                            key={user._id}
                            user={user}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))
                ) : (
                    <Homedatacard title="No Users Found" midcontent="No New Users Requested at this point." endcontent="Please check back later!!!" />
                )}
            </div>
            <div className="link-center-container">
          <Link to={`/admincontrolpanel/${id}`} >Go control Panel</Link>
        </div>
        <Footer />
        </div>
    )
}

export default Adminuiusercard;
