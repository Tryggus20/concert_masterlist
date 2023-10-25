import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";

function DetailBand( concertDetail ) {
  const [featuredPic, setFeaturedPic] = useState("");

  useEffect(() => {
    setFeaturedPic(concertDetail?.concertDetails.bandpictures[0].pictureUrls[0]);
  }, [concertDetail]);
  const handleImageClick = (imageUrl) => {
    setFeaturedPic(imageUrl);
  };
  return (
    <>
      <>
        {concertDetail.concertDetails.bandpictures?.map((bandpictures, index) => (
          <>
            <script></script>
            <h3 className="bold">{bandpictures.band}</h3>
            <img
              src={featuredPic}
              alt="Large Image"
              style={{ maxHeight: "800px", maxWidth: "800px" }}
            ></img>
            <SpotifyPlayer band={bandpictures.band} />
            <br />
            {bandpictures.pictureUrls?.map((pictures, index) => (
              <>
                <img
                  src={pictures}
                  onClick={() => handleImageClick(pictures)}
                  alt="Error loading image"
                  style={{ maxHeight: "80px", maxWidth: "80px" }}
                />
              </>
            ))}

            <hr />
          </>
        ))}
      </>
    </>
  );
}

export default DetailBand;
