const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// TODO:
// current object getting passed here only has bandName and index number.

// will need band_concert.id
// Will need to check to see if "new band" exists and if so get that ID. 
// If not, create new band and add it where need be.


/*  
bands may need a new addition, if so get new ID
Would need to change band_id in from band_concerts,  
user_concerts is fine. no need to update.
*/
module.exports = router;
