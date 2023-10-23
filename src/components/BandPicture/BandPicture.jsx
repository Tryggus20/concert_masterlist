import React from "react";

const BandPicture = ({ url, onPictureUrlChange }) => {
  return (
    <div>
      <input
        value={url}
        onChange={(e) => onPictureUrlChange(e.target.value)}
      ></input>
    </div>
  );
};

export default BandPicture;