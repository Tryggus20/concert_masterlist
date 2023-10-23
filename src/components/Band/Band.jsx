import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Band = ({ band, bandIndex }) => {
  console.log("info in band.jsx", band, bandIndex, "band:", band);
  const dispatch = useDispatch();
  const [bandName, setBandName] = useState(band);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setBandName(newName);
  };
 
  return (
    <div>
      <h2>{band}</h2>
      <input type="text" value={bandName} onChange={handleNameChange}></input>
      <button
        onClick={() => {
          dispatch({
            type: "EDIT_BAND_NAME",
            payload: { bandIndex, newName: bandName },
          });
        }}
      >
        Update Band Name
      </button>
    </div>
  );
};

export default Band;
