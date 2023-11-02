const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const router = express.Router();

const app = express();


// POST for spotify token.
async function getAppToken() {
  // call env here
    const encodedCredentials = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
    const headers = {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      const data = querystring.stringify({
        grant_type: 'client_credentials'
      });
      try {
        const response = await axios.post('https://accounts.spotify.com/api/token', data, { headers });
        return response.data.access_token;
      } catch (error) {
        console.error('Error fetching Spotify token:', error.response ? error.response.data : error.message);
        throw error;
      }
    }
// search using the band name to get the first result's id from Spotify
    router.get("/search-artist/:artistName", async (req, res) => {
        try {
          const token = await getAppToken();
          const headers = {
            Authorization: `Bearer ${token}`,
          };
     
          const artistResponse = await axios.get(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(req.params.artistName)}&type=artist&limit=1`,
            { headers }
          );

          if (artistResponse.data.artists.items.length) {
            const artistId = artistResponse.data.artists.items[0].id;
            res.json({ artistId });
          } else {
            res.status(404).send("Artist not found");
          }
        } catch (error) {
          console.error("Error fetching artist ID", error);
          res.status(500).send("Internal Server Error");
        }
     });

module.exports = router;
