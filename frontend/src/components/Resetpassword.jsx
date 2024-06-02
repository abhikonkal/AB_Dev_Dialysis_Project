import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import styles from "../componentscss/Resetpassword.module.css"
import {SERVER_PATH,CLIENT_PATH} from '../paths/path';
import { useParams } from 'react-router-dom'

const Resetpassword = () => {

    const {token,email}=useParams();
    
    const [formValues, setFormValues] = useState({
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
        const password = e.target.password.value;
        const retypepassword = e.target.retypepassword.value;
        console.log( password, retypepassword);
        let flag=0;

        if (password !== retypepassword || formErrors.password || formErrors.retypepassword) {
            alert('Please fix the errors before submitting.');
            flag=1;
        }
        console.log("Sending")
        if(flag===0){
        console.log(password);
        fetch(`${SERVER_PATH}/resetpassword/${token}/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.statuscode === 200) {
                    alert('Signup Successful');
                    const path = '/userlogin';
                    window.location.href = `${CLIENT_PATH}` + path;
                } else {
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
            <div className={styles.resetparentuserlogin}>
                <div className={styles.resetlogincard}>
                    <img src="/img/kidney.png" alt="Logo" className={styles.resetlogo} />
                    <h2>Reset Password</h2>
                    <form onSubmit={submithandler}>
                        <div className={styles.resetformgroup}>
                            <label htmlFor="password">New Password</label>
                            <input type="password" id="password" name="password" value={formValues.password} onChange={handleChange} required />
                            {formErrors.password && <p className={styles.reseterror}>{formErrors.password}</p>}
                        </div>
                        <div className={styles.resetformgroup}>
                            <label htmlFor="retypepassword">Re-type New Password</label>
                            <input type="password" id="retypepassword" name="retypepassword" value={formValues.retypepassword} onChange={handleChange} required />
                            {formErrors.retypepassword && <p className={styles.reseterror}>{formErrors.retypepassword}</p>}
                        </div>
                        <button type="submit">Save Password</button>
                    </form>
                    <div className={styles.resetadditionallinks}>
                        <a href="/signup">Sign up</a>
                        <a href="/userlogin">Login</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Resetpassword;
