import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BandInput from "../BandInput/BandInput";
import PictureInput from "../PictureInput/PictureInput";
import AddBandPics from "../EditBandPics/EditBandPics";

// TODO: have a button to cancel adding a picture (clear that field)
// TODO: have spotify add a picture for new band being added if no picture is uploaded


export default function ConcertForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  // actual USA State (initials) not a generic "useState"
  const [stateAbr, setStateAbr] = useState("");
  const [comments, setComments] = useState("");

  const [bands, setBands] = useState([]);
  const [currentBandIndex, setCurrentBandIndex] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [id, setId] = useState("");
  const userId = useSelector((state) => state.user.id);

  const handleAddBand = (band) => {
    setBands([...bands, { band, pictures: [] }]);
  };
  // Adding a new picture to a specific band
  const handleAddPicture = (bandIndex, url) => {
    if (bandIndex !== null) {
      const updatedBands = [...bands];
      updatedBands[bandIndex].pictures.push(url);
      setBands(updatedBands);
    }
  };
  // Submit Form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!date || !isValidDate(date)) {
      alert("Please select a valid date in the format mm/dd/yy.");
      return;
    }
    if ( venue === "" || city === "") {
      alert("Please fill in all fields.");
      return; // Do not proceed with submission if a field is empty
    }
    const concertData = {
      date,
      venue,
      city,
      state: stateAbr,
      comments,
      bands,
      pictures,
      id: userId,
    };
    console.log("concertData", concertData);
    dispatch({ type: "ADD_CONCERT", payload: concertData });
    // clear inputs after submit
    setDate("");
    setVenue("");
    setCity("");
    setStateAbr("");
    setComments("");
    setBands([]);
    setPictures([]);
    // go back to home after concert has been added
    // and fetch card view to refresh cards
    dispatch({ type: "FETCH_CARD_VIEW" });
    history.push("/");
  };
  return (
    <div className="inputs">
      <h1>Add A New Concert!</h1>
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
            <div key={pictureIndex}><img src={url} style={{maxHeight: '250px', maxWidth: '250px' }}></img> <button> Remove</button></div>
          ))}
          <PictureInput bandIndex={bandIndex} onAddPicture={handleAddPicture} />
          {/* Set the current band index when adding pictures */}
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
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
