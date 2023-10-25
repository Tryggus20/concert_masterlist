import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Band = ({ concertData }) => {
  const dispatch = useDispatch();
  const [bandName, setBandName] = useState([concertData.bands]);
  let bandConcertId = concertData.band_concert_id;
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setBandName(newName);
  };
  return (
    <>
      {concertData.bands.map((band, bandIndex) => (
        <div key={bandIndex}>
          <div>
            <h2>{bandName}</h2>
            <input
              type="text"
              value={bandName}
              onChange={handleNameChange}
            ></input>
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
        </div>
      ))}{" "}
    </>
  );
};

export default Band;
