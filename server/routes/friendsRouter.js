const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// TODO: will need GET route for pending and blocked as well.
// blocked is more of a stretch right now

// GET FOR ALL ACCEPTED FRIENDS
router.get("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  console.log("req.body", req.params.userId);

  try {
    console.log("you've got a friend in me");
    const query = `
      SELECT DISTINCT u.id, u.username
      FROM users u
      INNER JOIN friends f ON u.id = f.user_2 OR u.id = f.user_1
      WHERE (f.user_1 = $1 OR f.user_2 = $1)
      AND f.status = 'accepted'
      AND u.id != $1;
      `;
    pool.query(query, [userId]).then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    });
  } catch (error) {
    console.error("Error getting friends list", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
