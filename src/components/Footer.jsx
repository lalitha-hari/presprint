import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>PrepSprint</h2>
            <p>Bridging Talent with Opportunity</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#highlights">Highlights</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Mr. Phani Babu</p>
            <p><a href="tel:+919177726263">+91 91777 26263</a></p>
            <p>prepsprintcareers@gmail.com</p>

          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PrepSprint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;