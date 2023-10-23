const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// TODO:
// current object getting passed here only has bandName and index number.

// will need concertID, prev band ID to remove from concert?? 
// Will need to check to see if "new band" exists and if so get that ID. 
// If not, create new band and add it where need be.


// so it would need a PUT, GET, and DELETE all rolled into one with potential to POST 
// if band does not exist... gross!

/*  Would need to delete from band_concerts, need to add back into band_concerts, 
user_concerts is fine. no need to update.
bands may need a new addition
may mess some things up with pictures linking back to band_concerts
*/
module.exports = router;
