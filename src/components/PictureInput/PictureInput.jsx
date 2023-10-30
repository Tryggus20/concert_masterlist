import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

export default function PictureInput({ bandIndex, onAddPicture }) {
  const [url, setUrl] = useState("");

  const handleAddPicture = () => {
    onAddPicture(bandIndex, url);
    setUrl("");
  };

  return (
    <div>
      <Form.Label>
        {" "}
        Add a Picture
        <Form.Control className="control"
          type="text"
          placeholder="Picture URL only"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Label>
      <button onClick={handleAddPicture} style={{marginLeft:"10px"}}>Add Picture</button>
    </div>
  );
}
