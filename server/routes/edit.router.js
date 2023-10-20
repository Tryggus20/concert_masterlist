const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// route is edit/concertId/userId
router.put("/:user_concert_id", async (req, res) => {
  try {
    const userConcertId = req.params.user_concert_id;
    const { venue, city, state, date, comments, concert_id } = req.body;
    // Update the concert information
    await pool.query(
      `
      UPDATE "concerts"
      SET
        "venue" = $1,
        "city" = $2,
        "state" = $3,
        "date" = $4
      WHERE id = $5;`, [venue, city, state, date, concert_id]
    );

    console.log(userConcertId, venue, city, state, date, comments, concert_id)

    // Update the comments in user_concerts table
    const query2 =  `
    UPDATE user_concerts
    SET comments = $1
    WHERE id = $2
    RETURNING *
  `
    await pool.query(query2, [comments, userConcertId]);

    res.status(200).json({ message: "Concert edited successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;
