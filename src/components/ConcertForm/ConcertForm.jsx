import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BandInput from "../BandInput/BandInput";
import PictureInput from "../PictureInput/PictureInput";

// TODO: NEED TO INTEGRATE INTO APP AND INTO NAV/ROUTES
// TODO: Fix the wonkiness of the add picture buttons
export default function ConcertForm() {
    dispatch = useDispatch
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  // actual USA State (initials) not a generic "useState"
  const [state, setState] = useState("");
  const [comments, setComments] = useState("");

  const [bands, setBands] = useState([]);
  const [currentBandIndex, setCurrentBandIndex] = useState(null);
  const [pictures, setPictures] = useState([]);
  const handleAddBand = (band) => {
    setBands([...bands, { band, pictures: [] }]);
  };
  // Adding a new picture to a specific band
  const handleAddPicture = (url) => {
    if (currentBandIndex !== null) {
      const updatedBands = [...bands];
      updatedBands[currentBandIndex].pictures.push(url);
      setBands(updatedBands);
    }
  };
  // Submit Form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!date || !venue || !city || bands.length === 0) {
      alert("Please fill in all fields.");
      return; // Do not proceed with submission if a field is empty
    }
    const concertData = {
        date,
        venue,
        city,
        state,
        comments,
        bands,
        pictures,
    }
    console.log("concertData", concertData)
    dispatch({ type: "ADD_CONCERT", payload: concertData})
    //clear inputs after submit
    setDate("");
    setVenue("");
    setCity("");   
     setState("");
     setComments("");
     setBands([]);
     setPictures([]);





  };
  return (
    <div className="inputs">
      <h1>Add A New Concert!</h1>
      {/* TODO: WILL NEED TO CONDITIONALLY RENDER BUTTONS FOR BANDS AND IMAGES.
    AND KEEPING THEM LINKED TO THE SPECIFIC BAND / CONCERT
     (BUTTON ADDS COMPONENT OF BAND INPUT SAME FOR PICTURES) */}
      <label>
        Date:
        <input type="date" id="date" />
      </label>
      <br />
      <label>
        Venue:<input type="text" id="venue" placeholder="Venue"></input>
      </label>
      <br />
      <label>
        City :<input type="text" id="city" placeholder="City"></input>
      </label>
      <br />
      <label>
        State:
        <input type="text" id="state" placeholder="State Abbr."></input>
      </label>

      <br />
      <BandInput onAddBand={handleAddBand} />
      {bands.map((band, bandIndex) => (
        <div key={bandIndex}>
          <h2>{band.band}</h2>
          {band.pictures.map((url, pictureIndex) => (
            <div key={pictureIndex}>{url}</div>
          ))}
          <PictureInput onAddPicture={handleAddPicture} />
          {/* Set the current band index when adding pictures */}
          <button onClick={() => setCurrentBandIndex(bandIndex)}>
            Add Picture for {band.band}
          </button>
        </div>
      ))}
      {/* COMPONENTIZE ME Image */}
      {/* <input type="text" id="url" placeholder='Picture URL only' ></input><button>Add Another</button>
<br/> */}
      <br />
      <textarea rows="3" cols="30" placeholder="Comments"></textarea>
      <br />
      <br />
      <button>Submit</button>
    </div>
  );
}
