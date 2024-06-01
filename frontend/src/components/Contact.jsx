import React from 'react'
import styles from '../componentscss/Contact.module.css'
import Header from './Header'
import Footer from './Footer'

const Contact = () => {

    

    return (
        <div>
            <Header />
            <div className={styles.contactform}>
                <h1>Contact Us</h1>
                <form method="post" action="/contact">

                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required aria-required="true" aria-label="Your Name" />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required aria-required="true" aria-label="Your Email Address" />
                    </div>

                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" required aria-required="true" aria-label="Your Message"></textarea>
                    </div>

                    <div className={styles.submitcontainer}>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;
