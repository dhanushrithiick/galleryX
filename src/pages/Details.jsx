import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../stylesheets/Details.css";
import { useNavigate } from "react-router-dom";


import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ImageDetails = () => {
  const { id } = useParams();  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

   const navigate = useNavigate();
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const docRef = doc(db, "gallery", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error loading image details:", error);
      }
      setLoading(false);
    };

    fetchImage();
  }, [id]);

  if (loading) return <p className="details-loading">Loading...</p>;
  if (!data) return <p className="details-error">Image not found.</p>;

  return (
    <div className="details-outer-container">
      <div className="details-container">

   
        <img src={data.imageUrl} alt={data.title} className="details-image" />

 
        <div className="details-info">

          <p className="details-label">Title</p>
          <p className="details-text">{data.title}</p>

          <p className="details-label">Description</p>
          <p className="details-text">{data.description}</p>

          <p className="details-label">Uploaded on</p>
          <p className="details-text">{data.uploadedOn}</p>

          <p className="details-label">Uploaded by</p>
          <p className="details-text">{data.uploadedBy}</p>

   
            <button className="details-back-btn"   onClick={() => navigate(-1)} >Back to gallery</button>

        </div>

      </div>
    </div>
  );
};

export default ImageDetails;
