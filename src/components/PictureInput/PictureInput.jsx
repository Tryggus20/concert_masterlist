import React, { useState } from "react";

export default function PictureInput({ onAddPicture }) {
  const [url, setUrl] = useState('');

  const handleAddPicture = () => {
    onAddPicture(url);
    setUrl('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Picture URL only"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <button onClick={handleAddPicture}>Add Picture</button>
    </div>
  );
}