import React, { useState, useEffect, useContext } from "react";
import "../stylesheets/Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { AuthContext } from "../AuthContext";

import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const Home = () => {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  const [latestImages, setLatestImages] = useState([]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const galleryRef = collection(db, "gallery");

      
        const q = query(galleryRef, orderBy("uploadedOnTimestamp", "desc"), limit(4));
        const querySnapshot = await getDocs(q);

        const images = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLatestImages(images);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <Navbar />

      <div className="home">
        <div className="home-outer-container">
          <div className="home-inner-container">

            <div className="home-welcome">
              Welcome {username}!
            </div>

            <div className="home-heading">Add a new photo</div>

            <div
              className="home-upload-photo-container"
              onClick={() => navigate("/upload")}
              style={{ cursor: "pointer" }}
            >
              <div className="home-upload-photo-container-circle">
                <span className="material-icons">add</span>
              </div>
              <div className="home-upload-photo-container-text">Upload photo</div>
            </div>

            <div className="home-heading">Gallery</div>

            <div className="home-gallery">
              {latestImages.length > 0 ? (
                latestImages.map((item) => (
                  <div
                    className="home-gallery-card"
                    key={item.id}
                    onClick={() => navigate(`/gallery/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={item.imageUrl} alt={item.title} />
                    <div className="home-gallery-card-overlay"></div>
                    <div className="home-gallery-card-title">{item.title}</div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>

            <button
              className="home-see-all-button"
              onClick={() => navigate("/gallery")}
            >
              See all
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
