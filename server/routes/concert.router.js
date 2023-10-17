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

//                _-_-_-_-_-_-_-_-_- POST REQUEST _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
router.post("/add-concert/:id", async (req, res) => {
userId = req.params.id;
  const { venue, city, state, date, bandNames, comment, pictures } = req.body;

  
  try {
    // Check if the bands exist and get their IDs
    const bandIds = [];
    for (const bandName of bandNames) {
      const result = await pool.query('SELECT id FROM bands WHERE name = $1', [bandName]);
      if (result.rows.length === 0) {
        // Band doesn't exist, so add it and get the id
        const insertBandResult = await pool.query('INSERT INTO bands (name) VALUES ($1) RETURNING id', [bandName]);
        bandIds.push(insertBandResult.rows[0].id);
      } else {
        //Band does exist, so gt the id
        bandIds.push(result.rows[0].id);
      }
    }

    // Check if the concert exists
    const concertResult = await pool.query('SELECT id FROM concerts WHERE venue = $1 AND date = $2', [venue, date]);
    let concertId;
    if (concertResult.rows.length === 0) {
      // Concert doesn't exist, so add it
      const insertConcertResult = await pool.query(
        'INSERT INTO concerts (venue, city, state, date) VALUES ($1, $2, $3, $4) RETURNING id',
        [venue, city, state, date]
      );
      concertId = insertConcertResult.rows[0].id;
    } else {
      concertId = concertResult.rows[0].id;
    }

    // Insert the bands and concert_band relationships
    for (const bandId of bandIds) {
      await pool.query('INSERT INTO band_concerts (band_id, concert_id) VALUES ($1, $2)', [bandId, concertId]);
    }

    // Insert pictures for each band
    for (const [bandName, urls] of Object.entries(pictures)) {
      const bandIdResult = await pool.query('SELECT id FROM bands WHERE name = $1', [bandName]);
      if (bandIdResult.rows.length === 0) {
        return res.status(400).json({ error: `Band '${bandName}' not found for pictures.` });
      }
      const bandId = bandIdResult.rows[0].id;

      for (const url of urls) {
        await pool.query('INSERT INTO pictures (user_id, band_concert_id, url) VALUES ($1, $2, $3)', [userId, concertId, url]);
      }
    }

    // Insert the comment
    await pool.query('INSERT INTO user_concerts (user_id, concert_id, comments) VALUES ($1, $2, $3)', [userId, concertId, comment]);

    res.status(201).json({ message: 'Concert added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post("/", async (req, res) => {
      const { venue, city, state, date } = req.body;  
console.log(req.body, "req.body");
      try {
        pool.query(`INSERT INTO concerts (venue, city, state, date)
        VALUES ($1, $2, $3, $4);`, [venue, city, state, date] );
        res.sendStatus(201)
      } catch (err) {
        console.log("error in test", err);
        res.status(500).json({error: "an error occured in test"})
      }
    });

    router.post("/test", async (req, res) => {
        try{
           pool.query( `INSERT INTO users (username, password)
           VALUES ('hi', 'boo' )` )
    } catch (err) {console.log("error in test", err);
res.sendStatus(500)}
} )

module.exports = router;
