import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BandInput from "../BandInput/BandInput";
import PictureInput from "../PictureInput/PictureInput";
import { useParams } from "react-router-dom";
import EditBandPics from "../EditBandPics/EditBandPics";

export default function EditConcert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const concertData = useSelector(
    (state) => state.concertDetail.concertDetailReducer[0]
  );
  const entireConcertDetail = useSelector(
    (state) => state.concertDetail.concertDetailReducer
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
    const editedConcertData = {
      date,
      venue,
      city,
      state: stateAbr,
      comments,
      concert_id: concertData.concert_id, // Include the ID for editing
      userConcertId: id,
    };
    // Dispatch an "EDIT_CONCERT" action with the updated data
    dispatch({ type: "EDIT_CONCERT", payload: editedConcertData });
    // Clear inputs and go back to home
    setDate("");
    setVenue("");
    setCity("");
    setStateAbr("");
    setComments("");
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
      <EditBandPics entireConcertDetail={entireConcertDetail} />
      <div>
        {entireConcertDetail &&
          entireConcertDetail.length > 0 &&
          entireConcertDetail.map((band, index) => (
            <div key={band.id}>
              {/* Render band details TODO: delete this */}
              <h2>{band.bands}</h2> {/* TODO: delete this */}
            </div>
          ))}
      </div>
    </div>
  );
}
