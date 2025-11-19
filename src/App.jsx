import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Gallery from "./pages/Gallery.jsx"
import Signin from "./pages/signin.jsx";
import Signup from "./pages/signup.jsx";
import Upload from "./pages/upload.jsx";
import Details from "./pages/Details.jsx";

const App = () => {
  return (
    <Router>
      

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/gallery/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
