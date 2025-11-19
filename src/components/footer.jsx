import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/footer.css";

const Footer = () => {
  return (
    <div className="footer-outer-container">
      <div className="footer-inner-container">

        <div className="footer-line"></div>

        <div className="footer-content">
          <div className="footer-brand">GalleryX</div>

          <ul className="footer-pages">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Footer;
