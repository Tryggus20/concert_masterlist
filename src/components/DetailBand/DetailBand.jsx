import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
import ImageModal from "../ImageModal/ImageModal";

function DetailBand({ bandpictures }) {
  const [featuredPic, setFeaturedPic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(bandpictures);
  useEffect(() => {
    const defaultImageUrl =
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1400";

    const url = bandpictures[0].pictureUrls;

    setFeaturedPic(url !== null ? url[0] : defaultImageUrl);
  }, [bandpictures]);
  const handleImageClick = (imageUrl) => {
    setFeaturedPic(imageUrl);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {bandpictures?.map((bandpictures, index) => (
        <div className="artistContainer">
          <script></script>
          <div className="bandName">
            <h3 className="bold">{bandpictures.band}</h3>
          </div>
          <br />
          <div className="image-container">
            <img
              onClick={openModal}
              src={featuredPic}
              alt="Large Image"
              style={{
                // maxHeight: "400px",
                maxWidth: "300px",
                // width: "50%",
                cursor: "pointer",
              }}
            />
            <SpotifyPlayer band={bandpictures.band} />
          </div>
              <br />
          <div>
            {bandpictures.pictureUrls?.map((pictures, index) => (
              <img
                src={pictures}
                onClick={() => handleImageClick(pictures)}
                alt="Error loading image"
                style={{ height: "80px" }}
                className="minipic"
              />
            ))}
          </div>

          {isModalOpen && (
            <ImageModal imageUrl={featuredPic} onClose={closeModal} />
          )}
        </div>
      ))}
    </>
  );
}

export default DetailBand;
