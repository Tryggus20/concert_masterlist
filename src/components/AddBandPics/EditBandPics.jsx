import React, {useState} from "react";
import PictureInput from "../PictureInput/PictureInput";
import Band from "../Band/Band";
import BandPicture from "../BandPicture/BandPicture";

export default function AddBandPics( concertData) {
    const [bands, setBands] = useState(concertData.bandpictures);

    console.log("addBandPics concertData:",concertData);

    const handleAddPicture = (bandIndex, url) => {
        if (bandIndex !== null) {
          const updatedBands = [...bands];
          updatedBands[bandIndex].pictures.push(url);
          setBands(updatedBands);
        }
      };
    
      const handleBandNameChange = (bandIndex, newName) => {
        const updatedBands = [...bands];
        updatedBands[bandIndex].band = newName;
        setBands(updatedBands);
      };
    
      const handlePictureUrlChange = (bandIndex, pictureIndex, newUrl) => {
        const updatedBands = [...bands];
        updatedBands[bandIndex].pictures[pictureIndex] = newUrl;
        setBands(updatedBands);
      };
      return (
        <div>
          {bands.map((band, bandIndex) => (
            <div key={bandIndex}>
              <Band band={band} onBandNameChange={(newName) => handleBandNameChange(bandIndex, newName)} />
              {band.pictureUrls &&
                band.pictureUrls.map((url, pictureIndex) => (
                  <BandPicture
                    key={pictureIndex}
                    url={url}
                    onPictureUrlChange={(newUrl) => handlePictureUrlChange(bandIndex, pictureIndex, newUrl)}
                  />
                ))}
              <PictureInput bandIndex={bandIndex} onAddPicture={handleAddPicture} />
              <button onClick={handleSubmitBands}>Update Band and Picture Info</button>
            </div>
          ))}
        </div>
      );
    }