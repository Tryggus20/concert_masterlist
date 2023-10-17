const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET request for all users
router.get("/", (req, res) => {
  const query = `SELECT
  user_concerts.user_id,
  concerts.date,
  concerts.venue,
  concerts.city,
  concerts.state,
  json_agg(bands.name) AS bands
FROM
  user_concerts
JOIN
  concerts ON user_concerts.concert_id = concerts.id
JOIN
  band_concerts ON concerts.id = band_concerts.concert_id
JOIN
  bands ON band_concerts.band_id = bands.id
GROUP BY
  user_concerts.user_id,
  concerts.date,
  concerts.venue,
  concerts.city,
  concerts.state;
`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in getting all concerts for a specific user", err);
      res.sendStatus(500);
    }); // end of get request for all users
});

// GET request for a specific user
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT
    users.id AS userId,
    concerts.date AS date,
    concerts.venue,
    concerts.city,
    concerts.state,
    json_agg(bands.name) AS bands
FROM
    users
JOIN
    user_concerts ON users.id = user_concerts.user_id
JOIN
    concerts ON user_concerts.concert_id = concerts.id
JOIN
    band_concerts ON concerts.id = band_concerts.concert_id
JOIN
    bands ON band_concerts.band_id = bands.id
WHERE
    users.id = $1
GROUP BY
    users.id,
    concerts.date,
    concerts.venue,
    concerts.city,
    concerts.state;

  ;`;
  pool
    .query(query, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in getting all concerts for a specific user", err);
      res.sendStatus(500);
    }); // end of get request for a specific user
});

// GET request for cards view (has 1st picture) for a specific user.
router.get("/card/:id", (req, res) => {
  const id = req.params.id;

  const query = `
  WITH MinPicture AS (
    SELECT
        band_concert_id,
        MIN(id) as min_id
    FROM
        pictures
    GROUP BY
        band_concert_id
)
SELECT
    users.id AS userId,
    concerts.date AS date,
    concerts.venue,
    concerts.city,
    concerts.state,
    json_agg(bands.name) AS bands,
    MinPicture.min_id AS pictureId,
    pictures.url AS pictureUrl
FROM
    users
JOIN
    user_concerts ON users.id = user_concerts.user_id
JOIN
    concerts ON user_concerts.concert_id = concerts.id
JOIN
    band_concerts ON concerts.id = band_concerts.concert_id
JOIN
    bands ON band_concerts.band_id = bands.id
LEFT JOIN
    MinPicture ON band_concerts.id = MinPicture.band_concert_id
LEFT JOIN
    pictures ON MinPicture.min_id = pictures.id
WHERE
    users.id = $1
GROUP BY
    users.id,
    concerts.date,
    concerts.venue,
    concerts.city,
    concerts.state,
    pictures.url,
    MinPicture.min_id; 

`;

  pool
    .query(query, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in getting all concerts for a specific user", err);
      res.sendStatus(500);
    });
});

//                _-_-_-_-_-_-_-_-_- POST REQUEST _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
router.post("/add-concert/:id", async (req, res) => {
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
module.exports = router;
