import React from "react";

const Band = ({ band, onBandNameChange }) => {
  return (
    <div>
      <h2>{band.band}</h2>
      <input
        value={band.band}
        onChange={(e) => onBandNameChange(e.target.value)}
      ></input>
    </div>
  );
};

export default Band;