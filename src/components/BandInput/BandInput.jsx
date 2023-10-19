import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function BandInput( {onAddBand}) {
    const [band, setBand] = useState('');

    const handleAddBand = () => {
        onAddBand(band);
        setBand('');
      };
  return (
    <div>
      <input
        type="text"
        placeholder="Band"
        value={band}
        onChange={(e) => setBand(e.target.value)}
      ></input>
      <button onClick={handleAddBand}>Add Band</button>
    </div>
  );
}
