import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <div className="custom-footer footer">
      <div className='footer-left'>
        <p className='company-text'>Created By Banyan Labs</p>
        <p className='company-text'>Copyright &copy; <script>document.write(new Date().getFullYear())</script> Banyan Labs All Rights Reserved</p>
      </div>
      <div className="footer-right">
        <a target="_blank" className="footer-link">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Footer;
