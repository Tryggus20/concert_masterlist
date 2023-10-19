
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


// route is edit/concertId/userId
router.put("/edit-concert/:concert_id", async (req, res) => {
  const concertId = req.params.concert_id;
  const { venue, city, state, date, comments, bands } = req.body;

  try {
    // Check if the bands exist and get their IDs
    const bandIds = [];
    for (const bandData of bands) {
      const bandName = bandData.band;
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
        // Band does exist, so get the id
        bandIds.push(result.rows[0].id);
      }
    }

    // Update the concert information
    await pool.query(
      "UPDATE concerts SET venue = $1, city = $2, state = $3, date = $4 WHERE id = $5",
      [venue, city, state, date, concertId]
    );

    // Delete existing band-concert relationships for this concert
    await pool.query(
      "DELETE FROM band_concerts WHERE concert_id = $1",
      [concertId]
    );

    // Insert the updated bands and concert_band relationships
    for (let i = 0; i < bandIds.length; i++) {
      const bandId = bandIds[i];

      // Handle pictures for each band
      const bandData = bands[i]; // Use the current index to access the correct band data
      const urls = bandData.pictures || []; // Use an empty array if no pictures exist for the band

      // Insert records into band_concerts table 
      const result = await pool.query(
        "INSERT INTO band_concerts (band_id, concert_id) VALUES ($1, $2) RETURNING id",
        [bandId, concertId]
      );
      const bandConcertId = result.rows[0].id;

      for (const url of urls) {
        // Insert records into the pictures table 
        await pool.query(
          "INSERT INTO pictures (user_id, band_concert_id, url) VALUES ($1, $2, $3)",
          [userId, bandConcertId, url]
        );
      }
    }

    // Update the comments in user_concerts table
    await pool.query(
      "UPDATE user_concerts SET comments = $1 WHERE concert_id = $2",
      [comments, concertId]
    );

    res.status(200).json({ message: "Concert edited successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;