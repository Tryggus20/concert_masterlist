const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET request for a specific user
router.get("/:id", (req, res) => {
    const query = ` ;`;
    pool.query(query).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        console.log("error in getting all concerts for a specific user", err);
        res.sendStatus(500);
    }); // end of get request for a specific user
})















module.exports = router;