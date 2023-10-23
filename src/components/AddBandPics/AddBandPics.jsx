import React from "react";
import PictureInput from "../PictureInput/PictureInput";

export default function AddBandPics( concertData) {
    console.log("addBandPics concertData:",concertData);
    const handleAddPicture = (bandIndex, url) => {
        if (bandIndex !== null) {
          const updatedBands = [...bands];
          updatedBands[bandIndex].pictures.push(url);
          setBands(updatedBands);
        }
      };
      const handleSubmitBands = (event) => {
        event.preventDefault();
        console.log("clicked a button!");
    }
  return (
    <div>
      {concertData.concertData.bandpictures.map((band, bandIndex) => (
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
          <PictureInput bandIndex={bandIndex} onAddPicture={handleAddPicture} />
          {/* Set the current band index when adding pictures */}

          <button onClick={handleSubmitBands}>
            Update Band and Picture Info
          </button>
        </div>
      ))}
    </div>
  );
}
