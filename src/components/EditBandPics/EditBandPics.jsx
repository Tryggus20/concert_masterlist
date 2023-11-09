import React, { useState, useEffect } from "react";
import Band from "../Band/Band";

export default function EditBandPics({ entireConcertDetail }) {
  return (
    <div>
      {entireConcertDetail.map((concertData, band_concert_id) => (
        <div>
          <br />
          <Band concertData={concertData} band_concert_id={band_concert_id} />
        </div>
      ))}
    </div>
  );
}
