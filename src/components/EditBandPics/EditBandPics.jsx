import React, {useState, useEffect} from "react";
import PictureInput from "../PictureInput/PictureInput";
import Band from "../Band/Band";
import BandPicture from "../BandPicture/BandPicture";
import { useDispatch } from "react-redux";


export default function EditBandPics( concertData) {
    const [bands, setBands] = useState(concertData.bandpictures);
const dispatch = useDispatch()
    console.log("editBandPics concertData:",concertData.concertData);
      // console.log("Updated Bands Data:", updatedBands);
    


    // const handleSubmitBands = (event) => {
    //   event.preventDefault();
    //   console.log("clicked a button!", updatedBands);
    //   dispatch({ type: "EDIT_BAND", payload: newName });
    // }
    
      const handleBandNameChange = (bandIndex, newName) => {
        const updatedBands = [...bands];
        updatedBands[bandIndex].band = newName;
        setBands(updatedBands);
        console.log("New band name:", bands);
      };
    
      // const handlePictureUrlChange = (bandIndex, pictureIndex, newUrl) => {
      //   const updatedBands = [...bands];
      //   updatedBands[bandIndex].pictures[pictureIndex] = newUrl;
      //   setBands(updatedBands);
      // };

      useEffect(() => {
        if (concertData.concertData.bands) {
          setBands([...concertData.concertData.bands]);
        }
      }, [concertData.concertData.bands]);
    
      // const handleAddPicture = (bandIndex, url) => {
      //   if (bandIndex !== null) {
      //     const updatedBands = [...bands];
      //     updatedBands[bandIndex].pictures.push(url);
      //     setBands(updatedBands);
      //   }
      // };

      return (
        <div>
          {concertData.concertData.bands.map((band, bandIndex) => (
            <div key={bandIndex}>
              <Band
                band={band}
                onBandNameChange={handleBandNameChange}
                bandIndex={bandIndex}
              />
              {/* {band.pictureUrls &&
                band.pictureUrls.map((url, pictureIndex) => (
                  <BandPicture
                    key={pictureIndex}
                    url={url}
                    onPictureUrlChange={handlePictureUrlChange}
                    bandIndex={bandIndex}
                    pictureIndex={pictureIndex}
                  />
                ))} */}
              {/* <PictureInput bandIndex={bandIndex} onAddPicture={handleAddPicture} /> */}
              {/* <button onClick={handleSubmitBands}>Update Band Name</button> */}
            </div>
          ))}
        </div>
      );
    }