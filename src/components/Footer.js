import React from 'react';

const Footer = () => {
  return (
     
     
    <footer style={{ padding: '20px', width: '100%', backgroundColor: '#f6f6f6', marginTop: 'auto' }}>
      <p style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
        <span>&copy; 2024 Your Wikipedia-style Website. All rights reserved. | </span>
        <span style={{ marginLeft: 'auto' }}>
          <a href="/privacy-policy" style={{ marginLeft: '10px', textDecoration: 'none', color: 'inherit' }}>Privacy Policy</a> | 
          <a href="/terms-of-service" style={{ marginLeft: '10px', textDecoration: 'none', color: 'inherit' }}>Terms of Service</a>
        </span>
      </p>
    </footer>

  );
};

export default Footer;
