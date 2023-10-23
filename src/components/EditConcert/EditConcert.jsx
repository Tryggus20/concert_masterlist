import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BandInput from "../BandInput/BandInput";
import PictureInput from "../PictureInput/PictureInput";
import { useParams } from "react-router-dom";

export default function EditConcert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const concertData = useSelector(
    (state) => state.concertDetail.concertDetailReducer[0]
  );


  /* TODO:  how things are set up, the band with the lowest id is the headliner. 
  If a "new band" to the database gets added and the opener is re-used, 
  the opener will be the headliner. Will need to implement concert position after all
  may need to use array location (+1) to get that value */

  useEffect(() => {
    if (concertData) {
      setDate(concertData.date);
      setVenue(concertData.venue);
      setCity(concertData.city);
      setStateAbr(concertData.state);
      setComments(concertData.comments);
      setBands(concertData.bands);
      setPictures(concertData.bandpictures);
    }
  }, [concertData]);

  console.log("```````````````````````````", concertData);
  console.log("id is:", id);

  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [stateAbr, setStateAbr] = useState("");
  const [comments, setComments] = useState("");
  const [bands, setBands] = useState([]);
  const [pictures, setPictures] = useState([]);

  const handleAddBand = (band) => {
    setBands([...bands, { band, pictures: [] }]);
  };
  const handleAddPicture = (bandIndex, url) => {
    if (bandIndex !== null) {
      const updatedBands = [...bands];
      updatedBands[bandIndex].pictures.push(url);
      setBands(updatedBands);
    }
  };
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

  console.log(concertData);
const handleSubmitBands = (event) => {
    event.preventDefault();
    console.log("clicked a button!");
}

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic to edit the concert using the updated data
    const editedConcertData = {
      date,
      venue,
      city,
      state: stateAbr,
      comments,
      //   bands,
      //   pictures,
      concert_id: concertData.concert_id, // Include the ID for editing
      userConcertId: id, 
    };
    // Dispatch an "EDIT_CONCERT" action with the updated data
    console.log(
      "=+=+=+=+=+=+=+===+=+=+=+=+=+=+===++=+= editedConcertData n Editconcert.jsx",
      editedConcertData
    );
    dispatch({ type: "EDIT_CONCERT", payload: editedConcertData });
    // Clear inputs and go back to home
    setDate("");
    setVenue("");
    setCity("");
    setStateAbr("");
    setComments("");
    // setBands([]);
    // setPictures([]);
    history.push("/");
  };

  if (!concertData) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="inputs">
      <h1>Edit Concert</h1>
      <label>
        Date:
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Venue:
        <input
          type="text"
          id="venue"
          value={venue}
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
          value={city}
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
          value={stateAbr}
          placeholder="State Abbr."
          onChange={(e) => setStateAbr(e.target.value)}
        ></input>
      </label>
      <br />
      <textarea
        rows="3"
        cols="30"
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      ></textarea>
      <br /> <button onClick={handleSubmit}>Update Concert Info</button>
      <hr />
      {/* START OF EDIT BAND AND PICTURES */}
      <br />
      {/* <BandInput onAddBand={handleAddBand} />
      {concertData.bandpictures.map((band, bandIndex) => (
        <div key={bandIndex}>
          <h2>{band.band}</h2>
          <input
            value={band.band}
            onChange={(e) => {
              const updatedBands = [...bands];
              updatedBands[bandIndex].band = e.target.value;
              setBands(updatedBands);
            }}
          ></input>
          {band.pictureUrls &&
            band.pictureUrls.map((url, pictureIndex) => (
              <div key={pictureIndex}>
                <input
                  value={url}
                  onChange={(e) => {
                    const updatedBands = [...bands];
                    updatedBands[bandIndex].pictures[pictureIndex] =
                      e.target.value;
                    setBands(updatedBands);
                  }}
                ></input>
              </div>
            ))}
          <PictureInput bandIndex={bandIndex} onAddPicture={handleAddPicture} /> */}
          {/* Set the current band index when adding pictures */}
{/* 
          <button onClick={handleSubmitBands}>Update Band and Picture Info</button>
        </div>
      ))} */}
    </div>
  );
}
