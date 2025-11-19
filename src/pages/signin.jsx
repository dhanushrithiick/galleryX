import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/signin.css";

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../AuthContext";

const Signin = () => {
  const navigate = useNavigate();

  const { setUsername } = useContext(AuthContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    if (!usernameInput || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("username", "==", usernameInput));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Invalid username or password");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      if (userData.password !== password) {
        alert("Invalid username or password");
        return;
      }

    
      setUsername(userData.username);
      alert("Successfully logged in! 🎉");
      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">

        <p className="signin-title">Login to GalleryX</p>

        <div className="signin-card">
          <p className="signin-input-header">Username</p>
          <input
            type="text"
            placeholder="Username"
            className="signin-input-box"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />

          <p className="signin-input-header">Password</p>
          <input
            type="password"
            placeholder="Password"
            className="signin-input-box"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="signin-button" onClick={handleSignin}>
          Sign in
        </button>

        <p className="signin-signup">
          Don't have an account?{" "}
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signin;
