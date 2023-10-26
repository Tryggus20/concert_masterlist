import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
import ImageModal from "../ImageModal/ImageModal";

function DetailBand(concertDetail) {
  const [featuredPic, setFeaturedPic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(concertDetail?.concertDetails?.bandpictures[0]?.pictureUrls);

  useEffect(() => {
    const defaultImageUrl =
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&w=1400";

    const url = concertDetail?.concertDetails?.bandpictures[0]?.pictureUrls;

    setFeaturedPic(url !== null ? url[0] : defaultImageUrl);
  }, [concertDetail]);
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
      <>
        {concertDetail.concertDetails.bandpictures?.map(
          (bandpictures, index) => (
            <>
              <script></script>
              <h3 className="bold">{bandpictures.band}</h3>
              <img
                onClick={openModal}
                src={featuredPic}
                alt="Large Image"
                style={{
                  maxHeight: "750px",
                  maxWidth: "750px",
                  width: "60%", 
                  cursor: "pointer",
                }}
              />
              <SpotifyPlayer band={bandpictures.band} />
              <br />
              {bandpictures.pictureUrls?.map((pictures, index) => (
                <>
                  <img
                    src={pictures}
                    onClick={() => handleImageClick(pictures)}
                    alt="Error loading image"
                    style={{ height: "80px" }}
                    className="minipic"
                  />
                </>
              ))}

              <hr />
              {isModalOpen && (
                <ImageModal imageUrl={featuredPic} onClose={closeModal} />
              )}
            </>
          )
        )}
      </>
    </>
  );
}

export default DetailBand;
