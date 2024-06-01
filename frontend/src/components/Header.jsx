import React from 'react'
import styles from '../componentscss/Header.module.css'

const Header = () => {
    return (
        <div>
            <section>
                <img src="/img/All_India_Institute_of_Medical_Sciences,_Nagpur_logo.png" alt="AIMS logo" height="100px" id="aimsLogo"/>
                    <h1> Hemodialysis</h1>
                    <img src="/img/VNIT_logo.jpeg" alt="VNIT logo" height="100px" id="vnitlogo"/>
            </section>
            <div className={styles.container}>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact Us</a>
            </div>
        </div>
                )
}

export default Header;
