import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import BandInput from "../BandInput/BandInput";
import PictureInput from "../PictureInput/PictureInput";
import AddBandPics from "../EditBandPics/EditBandPics";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Row, Col, Button, Control } from "react-bootstrap";

// TODO: have a button to cancel adding a picture (clear that field)
// TODO: have spotify add a picture for new band being added if no picture is uploaded
// TODO: add validation to make sure at least 1 band was added. Ideally, change layout?

export default function ConcertForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [stateAbr, setStateAbr] = useState(""); // state and setState are confusing in regard to States in the US
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
    if (!date || date === "mm/dd/yy") {
      alert("Please select a valid date in the format mm/dd/yy.");
      return;
    }
    if (venue === "" || city === "") {
      alert("Please fill in all fields.");
      return; // Do not proceed with submission if a field is empty
    }
    if (bands.length === 0) {
      alert("Please add at least one band.");
      return; // Do not proceed with submission if no bands have been added
    }
    if (bands.length === 0) {
      alert("Please add at least one band.");
      return; // Do not proceed with submission if no bands have been added
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
    <>
      <h1>Add A New Concert</h1>
      <div className="inputs concertForm">
        <Form>
          <div className="">
            <Form.Label htmlFor="date" className="form-label">
              Date:
              <Form.Control
                className="control"
                type="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Label>
          </div>
          <Form.Label>
            Venue:
            <Form.Control
              className="control"
              type="text"
              id="venue"
              placeholder="Venue"
              onChange={(e) => setVenue(e.target.value)}
            />
          </Form.Label>
          <br />
          <Form.Label>
            City :
            <Form.Control
              className="control"
              type="text"
              id="city"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Label>
          <br />
          <Form.Label>
            State:
            <Form.Control
              className="control"
              type="text"
              id="state"
              maxLength="2"
              placeholder="State Abbr."
              onChange={(e) => setStateAbr(e.target.value)}
            />
          </Form.Label>

          <br />
          <BandInput onAddBand={handleAddBand} />
          {bands.map((band, bandIndex) => (
            <div key={bandIndex}>
              <h2>{band.band}</h2>
              {band.pictures.map((url, pictureIndex) => (
                <div key={pictureIndex}>
                  <img
                    src={url}
                    style={{ maxHeight: "230px", maxWidth: "230px" }}
                  ></img>{" "}
                  {/* TODO: <button> Remove</button> */}
                </div>
              ))}{" "}
              <PictureInput
                bandIndex={bandIndex}
                onAddPicture={handleAddPicture}
              />
              {/* TODO: Set the current band index when adding pictures */}
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
        </Form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
