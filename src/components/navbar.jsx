import React, { useContext } from "react";
import "../stylesheets/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {

  const { setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    setUsername("");   
    alert("Signed out successfully!");
    navigate("/");  
  };

  return (
    <nav className="navbar">

      <div className="navbar-title">
        GalleryX
      </div>

      <ul className="navbar-pages">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
      </ul>

      <button className="navbar-signout-button" onClick={handleSignout}>
        Sign Out
      </button>

    </nav>
  );
};

export default Navbar;
