import React from 'react'
import ReactDOM from 'react-dom'
import '../componentscss/Userlogin.css'
import Header from './Header'
import Footer from './Footer'

const Userlogin = () => {

    function submithandler(e){
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        console.log("Sending")
        fetch('http://localhost:5000/userlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if(data.statuscode === 200){
                alert('Login Successful');
                const path = '/userdashboard/'+data.userid;
                window.location.href = 'http://localhost:3000'+path;
            }else{
                alert('Login Failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div >
            <Header />
            <div className='parentuserlogin'>
            <div className="login-card">
            <img src="img/kidney.png" alt="Logo" className="logo"/>
                <h2>Login</h2>
                <form onSubmit={submithandler}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required/>
                    </div>
                    <div className="form-group">
                        <label hmtlFor="password">Password</label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="additional-links">
                    <a href="#">Forgot Password?</a>
                    <a href="#">Sign Up</a>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Userlogin
