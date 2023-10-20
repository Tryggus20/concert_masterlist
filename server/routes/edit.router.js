const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// route is edit/concertId/userId
router.put("/:concert_id", async (req, res) => {
  try {
    const concertId = req.params.concert_id;
    // const { venue, city, state, date, comments } = req.body;
    console.log("Received request body:", req.body);
    // Update the concert information
    await pool.query(
      `
      UPDATE concerts AS c
      SET
        venue = $1,
        city = $2,
        state = $3,
        date = $4
      FROM user_concerts AS uc
      WHERE
        c.id = uc.concert_id
        AND uc.concert_id = $5`[(venue, city, state, date, concertId)]
    );

    // Update the comments in user_concerts table
    await pool.query(
      `
      UPDATE user_concerts
      SET comments = $1
      WHERE concert_id = $2
      RETURNING *
    `[(comments, concertId)]
    );

    res.status(200).json({ message: "Concert edited successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});
module.exports = router;
