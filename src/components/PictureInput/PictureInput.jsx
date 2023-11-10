import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";

export default function PictureInput({ bandIndex, onAddPicture }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleAddPicture = () => {
    if (!file) {
      return;
    }

    dispatch(uploadPictureRequest(bandIndex, file));
    setFile(null);
  };
// add pictures associated to a specific band
  return (
    <div>
      <Form.Label>
        {" "}
        Add a Picture
        <Form.Control
          className="control"
          type="text"
          placeholder="Upload Picture"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Label>
      <button onClick={handleAddPicture} style={{ marginLeft: "10px" }}>
        Add Picture
      </button>
    </div>
  );
}
