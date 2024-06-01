import React from 'react'
import styles from '../componentscss/Footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footercontent}>
                <div className={styles.footersection} >
                    <h2>About Us</h2>
                    <p>We provide comprehensive hemodialysis care. Our team is dedicated to offering the best services for our patients.</p>
                </div>
                <div className={styles.footersection }>
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/userlogin">User Login</a></li>
                    </ul>
                </div>
                <div className={styles.footersection }>
                    <h2>Contact Us</h2>
                    <p>Email: vnitnagpuraiims@gmail.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className={styles.footerbottom}>
                &copy; 2024 All Rights Reserved.
            </div>
        </footer>

    )
}

export default Footer
