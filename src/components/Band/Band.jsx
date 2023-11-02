import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Row, Col, Button, Control } from "react-bootstrap";

const Band = ({ concertData }) => {
  const dispatch = useDispatch();
  const [bandName, setBandName] = useState([concertData.bands]);
  let bandConcertId = concertData.band_concert_id;
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setBandName(newName);
  };
  // this component maps through the bands in the concert to be able to 
  // edit the band name of each band
  return (
    <>
      {concertData.bands.map((band, bandIndex) => (
        <div key={bandIndex}>
          <div>
            <h2>{bandName}</h2>
            <Form.Control
              type="text"
              value={bandName}
              onChange={handleNameChange}
            ></Form.Control>
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
