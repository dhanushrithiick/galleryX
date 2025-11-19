import React, { useState, useContext } from "react";
import "../stylesheets/upload.css";
import { Link, useNavigate } from "react-router-dom";

import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

import { cloud_name, upload_preset } from "../cloudinary";
import { AuthContext } from "../AuthContext";

const Upload = () => {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };
  const formatDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  const handleUpload = async () => {
    if (!title || !desc || !file) {
      alert("Please fill all fields and choose a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudData = await cloudRes.json();
      const imageUrl = cloudData.secure_url;

      await addDoc(collection(db, "gallery"), {
        title,
        description: desc,
        uploadedOn: formatDate(),   
        uploadedOnTimestamp: Date.now(), 
        uploadedBy: username,
        imageUrl,
      });

      alert("Photo uploaded successfully!");
      navigate("/home");

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="upload">

      <div className="upload-back">
        <Link to="/home" className="upload-back-text">Back</Link>
      </div>

      <div className="upload-container">

        <p className="upload-title">Upload a new photo</p>

        <div className="upload-card">

          <p className="upload-input-header">Title</p>
          <input
            className="upload-input-box"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

         
          <p className="upload-input-header">Description</p>
          <input
            className="upload-input-box"
            placeholder="Description"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

      
          <p className="upload-input-header">Photo</p>
          <label className="upload-file-button">
            Choose file
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>

          <p className="upload-file-name">{fileName}</p>
        </div>

        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
