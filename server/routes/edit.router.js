
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


router.put("/:id", (req, res) => {
    const id = req.params.id;
  // changing POST to PUT ----- need t o change all of the insert to UPDATE and SET
  // I will have to re-think this. still see if band exists? idk
  outer.post("/add-concert/:id", async (req, res) => {
    const userId = req.params.id;
    const { venue, city, state, date, bandNames, comment, pictures } = req.body;
    console.log("req.body for /add-concert/:id", req.body);
  
    try {
      // Check if the bands exist and get their IDs
      const bandIds = [];
      for (const bandName of bandNames) {
        const result = await pool.query("SELECT id FROM bands WHERE name = $1", [
          bandName,
        ]);
        if (result.rows.length === 0) {
          // Band doesn't exist, so add it and get the id
          const insertBandResult = await pool.query(
            "INSERT INTO bands (name) VALUES ($1) RETURNING id",
            [bandName]
          );
          bandIds.push(insertBandResult.rows[0].id);
        } else {
          //Band does exist, so gt the id
          bandIds.push(result.rows[0].id);
        }
      }
  
      // Check if the concert exists
      const concertResult = await pool.query(
        "SELECT id FROM concerts WHERE venue = $1 AND date = $2",
        [venue, date]
      );
      let concertId;
      if (concertResult.rows.length === 0) {
        // Concert doesn't exist, so add it
        const insertConcertResult = await pool.query(
          "INSERT INTO concerts (venue, city, state, date) VALUES ($1, $2, $3, $4) RETURNING id",
          [venue, city, state, date]
        );
        concertId = insertConcertResult.rows[0].id;
      } else {
        concertId = concertResult.rows[0].id;
      }
  
      // Insert the bands and concert_band relationships
      let bandConcertIds = []; // Move the declaration outside the loop.
      for (const bandId of bandIds) {
        const result = await pool.query(
          "INSERT INTO band_concerts (band_id, concert_id) VALUES ($1, $2) RETURNING id",
          [bandId, concertId]
        );
        const bandConcertId = result.rows[0].id;
        bandConcertIds.push(bandConcertId);
  
        const bandName = bandNames[bandIds.indexOf(bandId)]; // Get band name using the index of bandId in bandIds array
        const urls = pictures[bandName];
  
        for (const url of urls) {
          await pool.query(
            "INSERT INTO pictures (user_id, band_concert_id, url) VALUES ($1, $2, $3)",
            [userId, bandConcertId, url]
          );
        }
      }
      // Insert the comment
      await pool.query(
        "INSERT INTO user_concerts (user_id, concert_id, comments) VALUES ($1, $2, $3)",
        [userId, concertId, comment]
      );
  
      res.status(201).json({ message: "Concert added successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  });




})



module.exports = router;
