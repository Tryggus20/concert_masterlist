import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import AWS from 'aws-sdk';

export default function PictureInput({ bandIndex }) {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddPicture = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(uploadPictureRequest(bandIndex, response.data.imageUrl));
      setFile(null);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };
// add pictures associated to a specific band
  return (
    <div>
      <Form.Label>
        {" "}
        Add a Picture
        <Form.Control
            type="file"
            onChange={handleFileChange}
          />
      </Form.Label>
      <button onClick={handleAddPicture} style={{ marginLeft: "10px" }}>
        Add Picture
      </button>
    </div>
  );
}
