import React from "react";

const BandPicture = ({ url, onPictureUrlChange, bandIndex, pictureIndex }) => {
  // Input field that loads for each band to tie the pictures to that specific band
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