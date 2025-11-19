import React, { useEffect, useState } from "react";
import "../stylesheets/gallery.css";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Gallery = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const galleryRef = collection(db, "gallery");

        const q = query(galleryRef, orderBy("uploadedOnTimestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const images = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPhotos(images);
      } catch (error) {
        console.error("Error loading gallery:", error);
      }
    };

    fetchAllImages();
  }, []);

  return (
    <>
      <Navbar />

      <div className="gallery-outer-container">
        <div className="gallery-inner-container">

          <div className="gallery-heading">Gallery</div>

          <div className="gallery-grid">
            {photos.length > 0 ? (
              photos.map((item) => (
                <div
                  className="gallery-card"
                  key={item.id}
                  onClick={() => navigate(`/gallery/${item.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={item.imageUrl} alt={item.title} />
                  <div className="gallery-card-overlay"></div>
                  <div className="gallery-card-title">{item.title}</div>
                </div>
              ))
            ) : (
              <p style={{ marginTop: "40px" }}>Loading...</p>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );Q
};

export default Gallery;
