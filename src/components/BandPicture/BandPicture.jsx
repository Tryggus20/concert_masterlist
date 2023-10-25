import React from "react";

const BandPicture = ({ url, onPictureUrlChange, bandIndex, pictureIndex }) => {
  return (
    <div>
        <img src={url}></img>
      <input
        value={url}
        onChange={(e) => onPictureUrlChange(bandIndex, pictureIndex, e.target.value)}
      ></input>
    </div>
  );
};

export default BandPicture;