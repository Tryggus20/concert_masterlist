import React, {useState, useEffect} from "react";
import PictureInput from "../PictureInput/PictureInput";
import Band from "../Band/Band";
import BandPicture from "../BandPicture/BandPicture";
import { useDispatch } from "react-redux";


export default function EditBandPics( concertData) {
  console.log("concertData", concertData.entireConcertData);
    const [bands, setBands] = useState(concertData.entireConcertData.bandpictures);
const dispatch = useDispatch()
    console.log("editBandPics concertData:",concertData.entireConcertData);
      // console.log("Updated Bands Data:", updatedBands);
    let bandConcertId = concertData.entireConcertData.band_concert_id
console.log("bandConcertId", bandConcertId);
console.log("concert data a EditBandPics: ", concertData);
    // const handleSubmitBands = (event) => {
    //   event.preventDefault();
    //   console.log("clicked a button!", updatedBands);
    //   dispatch({ type: "EDIT_BAND", payload: newName });
    // }
    
    const handleBandNameChange = (bandIndex, newName) => {
      const updatedBands = [...bands];
      updatedBands[bandIndex].band = newName; // Assuming 'band' is the name property
      setBands(updatedBands);
  };
  // TODO: Working on editing all band names in one  


      // const handlePictureUrlChange = (bandIndex, pictureIndex, newUrl) => {
      //   const updatedBands = [...bands];
      //   updatedBands[bandIndex].pictures[pictureIndex] = newUrl;
      //   setBands(updatedBands);
      // };

      useEffect(() => {
        if (concertData.entireConcertData.bands) {
          setBands([...concertData.entireConcertData.bands]);
        }
      }, [concertData.entireConcertData.bands]);
    
      // const handleAddPicture = (bandIndex, url) => {
      //   if (bandIndex !== null) {
      //     const updatedBands = [...bands];
      //     updatedBands[bandIndex].pictures.push(url);
      //     setBands(updatedBands);
      //   }
      // };

      return (
        <div>
          {concertData.entireConcertData.bands.map((band, bandIndex) => (
            <div key={bandIndex}>
             <> <Band
                band={band}
                onBandNameChange={handleBandNameChange}
                bandIndex={bandIndex}
                bandConcertId={bandConcertId}
              /> 
</>
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