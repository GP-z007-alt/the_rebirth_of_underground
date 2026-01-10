import React from 'react'
import '../componentStyles/Footer.css'
import { Phone, Mail, GitHub, YouTube, Instagram } from '@mui/icons-material';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/*Section 1*/}
        <div className='footer-section contact'>
          <h3>Contact Us</h3>
          <p><Phone fontSize='small'/>Phone : 1234567890</p>
          <p><Mail fontSize='small'/>Email : info@undergroundmafia.com</p>
        </div>

        {/*Section 2*/}
        <div className='footer-section social'>
          <h3>Follow Us</h3>
          <div className='social-links'>
            <a href='' target='_blank'>
              <GitHub className='social-icon'/>
            </a>
            <a href='' target='_blank'>
              <YouTube className='social-icon'/>
            </a>
            <a href='' target='_blank'>
              <Instagram className='social-icon'/>
            </a>
          </div>
        </div>

        {/*Section 3*/}
        <div className="footer-section about">
          <h3>About Underground Mafia</h3>
          <p>
            Underground Mafia is a community dedicated to bringing together enthusiasts from all walks of life. Our mission is to foster connections, share knowledge, and create unforgettable experiences.
          </p>
        </div>
      </div>
      <div className='footer-container'>
        <p>&copy; 2026 Underground Mafia. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
