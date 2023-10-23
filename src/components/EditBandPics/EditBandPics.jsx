import React, {useState, useEffect} from "react";
import PictureInput from "../PictureInput/PictureInput";
import Band from "../Band/Band";
import BandPicture from "../BandPicture/BandPicture";

export default function EditBandPics( concertData) {
    const [bands, setBands] = useState(concertData.bandpictures);

    console.log("editBandPics concertData:",concertData.concertData);

    const handleSubmitBands = (event) => {
      event.preventDefault();
      console.log("clicked a button!");
  }
    
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

      useEffect(() => {
        if (concertData.concertData.bands) {
          setBands([...concertData.concertData.bands]);
        }
      }, [concertData.concertData.bands]);
    
      const handleAddPicture = (bandIndex, url) => {
        if (bandIndex !== null) {
          const updatedBands = [...bands];
          updatedBands[bandIndex].pictures.push(url);
          setBands(updatedBands);
        }
      };

      return (
        <div>
          {concertData.concertData.bands.map((band, bandIndex) => (
            <div key={bandIndex}>
              <Band
                band={band}
                onBandNameChange={handleBandNameChange}
                bandIndex={bandIndex}
              />
              {band.pictureUrls &&
                band.pictureUrls.map((url, pictureIndex) => (
                  <BandPicture
                    key={pictureIndex}
                    url={url}
                    onPictureUrlChange={handlePictureUrlChange}
                    bandIndex={bandIndex}
                    pictureIndex={pictureIndex}
                  />
                ))}
              <PictureInput bandIndex={bandIndex} onAddPicture={handleAddPicture} />
              <button onClick={handleSubmitBands}>Update Band and Picture Info</button>
            </div>
          ))}
        </div>
      );
    }