import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import EditBandPics from "../EditBandPics/EditBandPics";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Row, Col, Button, Control } from "react-bootstrap";

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

  const handleCancel = (event) => {
    event.preventDefault();
    dispatch({ type: "FETCH_CARD_VIEW" });
    history.push(`/home`)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //Sweet Alert
    Swal.fire({
      title: 'Submit?',
      text: "You will be redirected!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, continue!'
    }).then((result) => {
      if (result.isConfirmed) {
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
        Swal.fire(
          'Updated!',
          'Your concert has been updated.',
          'success'
        )
      }
    })
  };

  if (!concertData) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className="inputs editForm">
      <h1>Edit Concert</h1>
      <Form>
      <Form.Label>
        Date:
        <Form.Control className="control"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Label>
      <br />
      <Form.Label>
        Venue:
        <Form.Control className="control"
          type="text"
          id="venue"
          value={venue}
          placeholder="Venue"
          onChange={(e) => setVenue(e.target.value)}
        ></Form.Control>
      </Form.Label>
      <br />
      <Form.Label>
        City :
        <Form.Control className="control"
          type="text"
          id="city"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Label>
      <br />
      <Form.Label>
        State:
        <Form.Control className="control"
          type="text"
          id="state"
          maxLength="2"
          value={stateAbr}
          placeholder="State Abbr."
          onChange={(e) => setStateAbr(e.target.value)}
        ></Form.Control>
      </Form.Label>
      <br />
      <Form.Control as="textarea" 
        rows="3"
        cols="30"
        placeholder="Comments"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      ></Form.Control>
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
            
              {/* <h2>{band.bands}</h2>  */}
            </div>
          ))}
      </div>
      <button onClick={handleCancel}>Cancel</button>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </Form>
    </div>
  );
}
