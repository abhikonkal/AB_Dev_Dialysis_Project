import React from 'react'
import ReactDOM from 'react-dom'
import '../componentscss/Userlogin.css'
import Header from './Header'
import Footer from './Footer'

const Userlogin = () => {
    return (
        <div >
            <Header />
            <div className='parentuserlogin'>
            <div className="login-card">
            <img src="img/kidney.png" alt="Logo" class="logo"/>
                <h2>Login</h2>
                <form>
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
