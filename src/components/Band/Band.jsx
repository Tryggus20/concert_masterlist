import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const Band = ({ band, bandIndex, bandConcertId }) => {
  console.log("info in band.jsx", band, bandIndex, "bandConcertId:", bandConcertId);
  const dispatch = useDispatch();
  const [bandName, setBandName] = useState(band);
  const { userConcertId } = useParams();


  const handleNameChange = (e) => {
    const newName = e.target.value;
    setBandName(newName);
  };
  return (
    <div>
      <h2>{bandName}</h2>
      <input type="text" value={bandName} onChange={handleNameChange}></input>
      <button 
        onClick={() => {
          dispatch({
            type: "EDIT_BAND_NAME",
            payload: { bandIndex, newName: bandName, bandConcertId },
          });
        }}
      >
        Update Band Name
      </button>
    </div>
  );
};

export default Band;
