import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SITE_DATA)
      .then((response) => {
        console.log(response);
        setFooterData(response.data.footer);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching footer data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-company">
          <img src={footerData.companyLogo} alt="Company Logo" className="footer-logo" style={{ width: '50px', height: '50px' }}/>
          <p>{footerData.about}</p>
        </div>
        <div className="footer-social">
          <h4>Quick Links</h4>
          <ul>
            {footerData.navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-social">
          <h4>Social Meida</h4>
            <ul>
            {footerData.socialLinks.map((social) => (
              <li key={social.platform}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <i className={social.icon} /> {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: <a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a></p>
          <p>Phone: <a href={`tel:${footerData.contact.phone}`}>{footerData.contact.phone}</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
