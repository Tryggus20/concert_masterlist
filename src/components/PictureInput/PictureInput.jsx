import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from 'axios'; 

export default function PictureInput({ bandIndex }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getPresignedUrl = async (file) => {
    console.log("aws lets go!!!!");
    const response = await axios.post('/api/aws', {
      fileName: file.name,
      fileType: file.type,
    });
    return response.data;
  };

  const uploadFileToS3 = async (file, signedUrl) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
    await axios.put(signedUrl, file, options);
  };

  const handleAddPicture = async () => {
    if (!file) {
      return;
    }
    setIsLoading(true);

    try {
      const { signedRequest, url } = await getPresignedUrl(file);
      await uploadFileToS3(file, signedRequest);

      // Dispatch the action with the URL of the image in S3
      dispatch(uploadPictureRequest(bandIndex, url));

      setFile(null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading image', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form.Label>
        Add a Picture
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Label>
      <button onClick={handleAddPicture} style={{ marginLeft: "10px" }} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Add Picture'}
      </button>
    </div>
  );
}
