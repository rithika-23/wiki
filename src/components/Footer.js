import React from 'react';
import styles from '../styles/Footer'; 

const Footer = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
     
      <footer style={{ position: 'fixed', bottom: 0,padding:'20px', width: '100%', backgroundColor: '#f6f6f6' }}>
        <p style={{ display: 'flex', alignItems: 'center' }} className='text-xs md:text-sm'>
          <span>&copy; 2024 Your Wikipedia-style Website. All rights reserved. | </span>
          <span style={{ marginLeft: 'auto' }}>
            <a href="/privacy-policy" style={styles.link}>Privacy Policy</a> | 
            <a href="/terms-of-service" style={styles.link}>Terms of Service</a>
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
