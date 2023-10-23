import React, {useState} from "react";

const Band = ({ band, onBandNameChange, bandIndex }) => {
    const [bandName, setBandName] = useState(band);
    console.log("info in band.jsx", band, bandIndex);
    const handleNameChange = (e) => {
        const newName = e.target.value;
        setBandName(newName);
    }
  return (
    <div>
      <h2>{bandName}</h2>
      <input type="text"
        value={bandName}
        onChange={handleNameChange}
      ></input>
    </div>
  );
};

export default Band;