const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// "delete" specific concert (soft delete)
router.put("/delete/:id", (req, res) => {
  const id = req.params.id;
  const query = `UPDATE "user_concerts" 
  SET "is_deleted" = TRUE, 
      "deleted_date" = NOW() 
  WHERE id = $1;`;
  pool
    .query(query, [id])
    .then((result) => {
      res.sendStatus(202);
    })
    .catch((err) => {
      console.log("error in deleting concert", err);
      res.sendStatus(500);
    }); // end of delete for specific concert
});

// GET request for a specific user for LIST VIEW

// 11/08/2023 is the day I realized I could have saved 30 or so lines of code
// and an hour if I re-used the "Card View" GET for the list view... 
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT
  users.id AS userId,
  user_concerts.id AS userConcertId, -- Added this line
  concerts.date AS date,
  concerts.venue,
  concerts.city,
  concerts.state,
  json_agg(bands.name ORDER BY band_concerts.id ASC) AS bands
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
  AND user_concerts.is_deleted = false
GROUP BY
  users.id,
  user_concerts.id,  -- Added this line
  concerts.date,
  concerts.venue,
  concerts.city,
  concerts.state
ORDER BY
  concerts.date DESC;

  ;`;
  pool
    .query(query, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(
        "error in getting all concerts for a specific user LIST VIEW",
        err
      );
      res.sendStatus(500);
    }); // end of get request for a specific user
});

// GET request for cards view (has 1st picture) for a specific user.
router.get("/card/:id", (req, res) => {
  const id = req.params.id;

  const query = `
  WITH MinPicture AS (
    SELECT
        band_concerts.concert_id,
        MIN(pictures.id) as min_id
    FROM
        band_concerts
    LEFT JOIN
        pictures ON band_concerts.id = pictures.band_concert_id
    GROUP BY
        band_concerts.concert_id
)
SELECT
    user_concerts.id AS userConcertId, 
    users.id AS userId,
    concerts.date AS date,
    concerts.venue,
    concerts.city,
    concerts.state,
    ARRAY_AGG( bands.name ORDER BY band_concerts.id) AS bands,
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
    MinPicture ON concerts.id = MinPicture.concert_id
LEFT JOIN
    pictures ON MinPicture.min_id = pictures.id
WHERE
    users.id = $1
    AND user_concerts.is_deleted = false
GROUP BY
    user_concerts.id, 
    users.id,
    concerts.date,
    concerts.venue,
    concerts.city,
    concerts.state,
    pictures.url
    ORDER BY
    
    concerts.date DESC;
`;

  pool
    .query(query, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error in getting CardView for a specific user", err);
      res.sendStatus(500);
    });
});
// ####################################################################################################
//                _-_-_-_-_-_-_-_-_- POST REQUEST _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
//####################################################################################################
router.post("/add-concert/:id", async (req, res) => {
  const userId = req.params.id;
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
    let bandConcertIds = [];
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
      bandConcertIds.push(bandConcertId);

      for (const url of urls) {
        // Insert records into the pictures table
        await pool.query(
          "INSERT INTO pictures (user_id, band_concert_id, url) VALUES ($1, $2, $3)",
          [userId, bandConcertId, url]
        );
      }
    }

    // Insert the comment and seat_location into user_concerts table
    await pool.query(
      "INSERT INTO user_concerts (user_id, concert_id, comments) VALUES ($1, $2, $3)",
      [userId, concertId, comments]
    );

    res.status(201).json({ message: "Concert added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// ####################################################################################################
//                _-_-_-_-_-_-_-_-_- DETAIL GET _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
// GET request for detail view (has all pictures) for a specific concert and  user.
router.get("/detail/:id", (req, res) => {
  // ID should be user_concerts.id
  const id = req.params.id;

  const query = `
  WITH BandPictures AS (
    SELECT
        bands.id as band_id,
        bands.name as band_name,
        ARRAY_AGG(DISTINCT pictures.url) FILTER (WHERE pictures.url IS NOT NULL) AS pictureUrls
    FROM
        bands
    JOIN
        band_concerts ON band_concerts.band_id = bands.id
    LEFT JOIN
        pictures ON band_concerts.id = pictures.band_concert_id
    GROUP BY
        bands.id
  )
  SELECT
      users.id AS userId,
      concerts.date AS date,
      concerts.id AS concert_id,
      concerts.venue,
      concerts.city,
      concerts.state,
      ARRAY_AGG(DISTINCT bands.name) AS bands,
      ARRAY_AGG(json_build_object('band_id', bp.band_id, 'band', bp.band_name, 'pictureUrls', bp.pictureUrls)) AS bandPictures,
      band_concerts.id AS band_concert_id, 
      user_concerts.comments AS comments
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
  LEFT JOIN BandPictures AS bp ON bands.id = bp.band_id
  WHERE
      user_concerts.id = $1
      AND user_concerts.is_deleted = false
  GROUP BY
      users.id,  
      concerts.date,
      concerts.venue,
      concerts.city,
      concerts.state,
      concerts.id,
      user_concerts.comments,
      band_concerts.id;`;

  pool
    .query(query, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(
        "error in getting DETAIL VIEW FOR A SPECIFIC USER AND CONCERT",
        err, req.params
      );
      res.sendStatus(500);
    });
}); // end of detail GET for a Detailed View of a specific concert and user.

module.exports = router;
