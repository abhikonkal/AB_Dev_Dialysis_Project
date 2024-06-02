import React, { useState } from 'react';
import styles from '../componentscss/Contact.module.css';
import Header from './Header';
import Footer from './Footer';
import {SERVER_PATH,CLIENT_PATH} from '../paths/path';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_PATH}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const res=await response.json();
      if (res.statuscode===200) {
        alert('Message sent successfully!');
        window.location='/';
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the message.');
    }
    
  };

  return (
    <div>
      <Header />
      <div className={styles.contactform}>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required aria-required="true" aria-label="Your Name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required aria-required="true" aria-label="Your Email Address" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required aria-required="true" aria-label="Your Message" value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div className={styles.submitcontainer}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
