import React, { useState, useEffect } from "react";
import PictureInput from "../PictureInput/PictureInput";
import Band from "../Band/Band";
import BandPicture from "../BandPicture/BandPicture";
import { useDispatch } from "react-redux";

export default function EditBandPics({ entireConcertDetail }) {
  console.log("entireConcertDetail", entireConcertDetail.entireConcertData);
  const dispatch = useDispatch();
  console.log("editBandPics concertData:", entireConcertDetail);

  // const handleBandNameChange = (bandIndex, newName) => {
  //   const updatedBands = [...bands];
  //   updatedBands[bandIndex].band = newName; // Assuming 'band' is the name property
  //   setBands(updatedBands);
  // };

  return (
    <div>
      {entireConcertDetail.map((concertData, band_concert_id) => (
        <div>
          <Band concertData={concertData} band_concert_id={band_concert_id} />
        </div>
      ))}
    </div>
  );
}
