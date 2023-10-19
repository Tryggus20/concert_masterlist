import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BandInput from "../BandInput/BandInput";
import PictureInput from "../PictureInput/PictureInput";

export default function EditConcert({ concertData }) {
  const dispatch = useDispatch();
  const history = useHistory();

  // TODO: SEND PROPS FROM DETAILED VIEW
  // TODO: give this page a nav location
  // TODO: make sure this works with the backend edit

  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [stateAbr, setStateAbr] = useState("");
  const [comments, setComments] = useState("");
  const [bands, setBands] = useState([]);
  const [pictures, setPictures] = useState([]);

  // Initialize state with concertData when component mounts
  useEffect(() => {
    if (concertData) {
      setDate(concertData.date);
      setVenue(concertData.venue);
      setCity(concertData.city);
      setStateAbr(concertData.state);
      setComments(concertData.comments);
      setBands(concertData.bands);
      setPictures(concertData.pictures);
    }
  }, [concertData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to edit the concert using the updated data
    const editedConcertData = {
      date,
      venue,
      city,
      state: stateAbr,
      comments,
      bands,
      pictures,
      id: concertData.id, // Include the ID for editing
    };
    // Dispatch an "EDIT_CONCERT" action with the updated data
    dispatch({ type: "EDIT_CONCERT", payload: editedConcertData });
    // Clear inputs and go back to home
    setDate("");
    setVenue("");
    setCity("");
    setStateAbr("");
    setComments("");
    setBands([]);
    setPictures([]);
    history.push("/");
  };
  

  return (
    <div className="inputs">
      <h1>Edit Concert</h1>
      <label>
        Date:
        <input
          type="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Venue:
        <input
          type="text"
          id="venue"
          placeholder="Venue"
          onChange={(e) => setVenue(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        City :
        <input
          type="text"
          id="city"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        ></input>
      </label>
      <br />
      <label>
        State:
        <input
          type="text"
          id="state"
          maxLength="2"
          placeholder="State Abbr."
          onChange={(e) => setStateAbr(e.target.value)}
        ></input>
      </label>

      <br />
      <BandInput onAddBand={handleAddBand} />
      {bands.map((band, bandIndex) => (
        <div key={bandIndex}>
          <h2>{band.band}</h2>
          {band.pictures.map((url, pictureIndex) => (
            <div key={pictureIndex}>{url}</div>
          ))}
          <PictureInput bandIndex={bandIndex} onAddPicture={handleAddPicture} />
          {/* Set the current band index when adding pictures */}
          <button onClick={() => setCurrentBandIndex(bandIndex)}>
            Add Picture for {band.band}
          </button>
        </div>
      ))}
      <br />
      <textarea
        rows="3"
        cols="30"
        placeholder="Comments"
        onChange={(e) => setComments(e.target.value)}
      ></textarea>
      <br />
      <br />      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
}