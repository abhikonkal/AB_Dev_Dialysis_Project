import React from 'react'
import styles from '../componentscss/Usersignup.module.css'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import {SERVER_PATH,CLIENT_PATH} from '../paths/path';

const Usersignup = () => {

    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        retypepassword: '',
    });

    const [formErrors, setFormErrors] = useState({
        password: '',
        retypepassword: '',
    });

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (name === 'password') {
            if (!validatePassword(value)) {
                setFormErrors({
                    ...formErrors,
                    password: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
                });
            } else {
                setFormErrors({ ...formErrors, password: '' });
            }
        }

        if (name === 'retypepassword') {
            if (value !== formValues.password) {
                setFormErrors({ ...formErrors, retypepassword: 'Passwords do not match.' });
            } else {
                setFormErrors({ ...formErrors, retypepassword: '' });
            }
        }
    }

    function submithandler(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        const email = e.target.email.value;
        const retypepassword = e.target.retypepassword.value;
        console.log(username, password, email, retypepassword);
        let flag=0;

        if (password !== retypepassword || formErrors.password || formErrors.retypepassword) {
            alert('Please fix the errors before submitting.');
            flag=1;
        }
        console.log("Sending")
        if(flag===0){
            console.log(username,password,email);
        fetch(`${SERVER_PATH}/usersignup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.statuscode === 200) {
                    alert('Signup Successful');
                    const path = '/postsignup';
                    window.location.href = `${CLIENT_PATH}` + path;
                } 
                else if (data.statuscode === 201) {
                    alert('User already exists,please use differnt mail!!');
                }
                else {
                    alert('Signup Failed');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error);
            });
        }

    }

    return (
        <div >
            <Header />
            <div className={styles.parentuserlogin}>
                <div className={styles.logincard}>
                    <img src="img/kidney.png" alt="Logo" className={styles.logo} />
                    <h2>Sign Up</h2>
                    <form onSubmit={submithandler}>
                        <div className={styles.formgroup}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={formValues.username} onChange={handleChange} required />
                        </div>
                        <div className={styles.formgroup}>
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' name="email" value={formValues.email} onChange={handleChange} required />
                        </div>
                        <div className={styles.formgroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formValues.password} onChange={handleChange} required />
                            {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
                        </div>
                        <div className={styles.formgroup}>
                            <label htmlFor="retypepassword">Re-type Password</label>
                            <input type="password" id="retypepassword" name="retypepassword" value={formValues.retypepassword} onChange={handleChange} required />
                            {formErrors.retypepassword && <p className={styles.error}>{formErrors.retypepassword}</p>}
                        </div>
                        <button className={styles.usersignupbtn} type="submit">Sign Up</button>
                    </form>
                    <div className={styles.additionallinks}>
                        <a href="/forgotpassword">Forgot Password?</a>
                        <a href="/userlogin">Sign in</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Usersignup;
