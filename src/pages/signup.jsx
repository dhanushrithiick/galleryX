import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/signin.css";

import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { AuthContext } from "../AuthContext";

const Signup = () => {
  const navigate = useNavigate();

  const { setUsername } = useContext(AuthContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!usernameInput || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("username", "==", usernameInput));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Username already exists. Choose another.");
        return;
      }

      await addDoc(usersRef, {
        username: usernameInput,
        password: password,
      });

      alert("Account successfully created! 🎉");
      setUsername(usernameInput); 

      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">

        <p className="signin-title">Create Account</p>

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

        <button className="signin-button" onClick={handleSignup}>
          Sign up
        </button>

        <p className="signin-signup">
          Already have an account?{" "}
          <Link to="/">
            <span>Sign in</span>
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
