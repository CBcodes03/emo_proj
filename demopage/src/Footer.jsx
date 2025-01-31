import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-text">
          © 2025 Emotional Analysis by spacece.co | All Rights Reserved
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com/SpacECEIn/" target="_blank">
            <img className='social-icon' src="facebook.png" alt="FacebookPage" />
          </a>
          <a href="https://www.instagram.com/spacece.in/" target="_blank">
            <img className='social-icon' src="/instagram.png" alt="InstagramPage" />
          </a>
          <a href="https://www.linkedin.com/company/spacece-co/?originalSubdomain=in" target="_blank">
            <img className='social-icon' src="/linkedin.png" alt="LinkedInPage" />
          </a>
          <a href="https://www.youtube.com/@SpacECE" target="_blank" >
            <img className='social-icon' src="/youtube.png" alt="YouTubePage" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
