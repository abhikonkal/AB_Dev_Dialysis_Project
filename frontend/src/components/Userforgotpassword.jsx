import React from 'react'
import ReactDOM from 'react-dom'
import '../componentscss/Userlogin.css'
import Header from './Header'
import Footer from './Footer'

const Userforgotpassword = () => {

    function submithandler(e){
        e.preventDefault();
        const email = e.target.email.value;
        console.log("Sending");
        fetch(`http://localhost:5000/forgotpassword/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert(data.message);
            if(data.statuscode === 200){
                // alert('Login Successful');
                const path = 'forgotpassword-waiting';
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
                <h2>Forgot Password</h2>
                <form onSubmit={submithandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" required/>
                    </div>
                    <div className="form-group">
                        <p>An email to change your password will be sent if the given email is registered!!</p>
                        <p><strong>So Please ensure the email is correct.</strong></p>
                    </div>
                    <button type="submit">Send</button>
                </form>
                <div className="additional-links">
                    <a href="/userlogin">Login</a>
                    <a href="/signup">Sign Up</a>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Userforgotpassword;
