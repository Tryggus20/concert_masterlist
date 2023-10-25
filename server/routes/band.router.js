const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.put("/", async (req, res) => {
    try {
        const { bandIndex, newName, bandConcertId } = req.body;

        // 1. Check if band exists
        const checkBandQuery = 'SELECT id FROM bands WHERE name = $1';
        const result = await pool.query(checkBandQuery, [newName]);
        
        let bandId;
        if (result.rows.length) {
            // Band exists, get its ID
            bandId = result.rows[0].id;
        } else {
            // 2. Band doesn't exist, insert new band
            const insertBandQuery = 'INSERT INTO bands (name) VALUES ($1) RETURNING id';
            const insertResult = await pool.query(insertBandQuery, [newName]);
            bandId = insertResult.rows[0].id;
        }

        // 3. Update the band_concerts table with the retrieved band's ID
        const updateQuery = 'UPDATE band_concerts SET band_id = $1 WHERE id = $2';
        await pool.query(updateQuery, [bandId, bandConcertId]);

        res.send({ message: 'Band name updated successfully!' });
    } catch (error) {
        console.error('Error updating band name:', error);
        res.status(500).send({ message: 'Internal Server Error' });
}});




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
