import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

export default function BandInput({ onAddBand }) {
  const [band, setBand] = useState("");

  const handleAddBand = () => {
    onAddBand(band);
    setBand("");
  };
  // Input fields for adding bands to the concert
  return (
    <div>
      <Form.Label>
        Add Band:
        <Form.Control
          className="control"
          type="text"
          placeholder="Band"
          value={band}
          onChange={(e) => setBand(e.target.value)}
        />
        <button onClick={handleAddBand}> Add Band</button>
      </Form.Label>
    </div>
  );
}
