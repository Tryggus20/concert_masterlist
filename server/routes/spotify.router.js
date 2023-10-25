const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const router = express.Router();

const app = express();

// call env here:
const CLIENT_ID = "YOUR_SPOTIFY_CLIENT_ID";
const CLIENT_SECRET = "YOUR_SPOTIFY_CLIENT_SECRET";
const REDIRECT_URI = "http://localhost:3000/callback";


// POST for spotify token
async function getAppToken() {
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
        console.log("token: ", response.data.access_token);
        return response.data.access_token;
      } catch (error) {
        console.error('Error fetching Spotify token:', error.response ? error.response.data : error.message);
        throw error;
      }
    }

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
          console.log('Spotify Response:', artistResponse);

          if (artistResponse.data.artists.items.length) {
            const artistId = artistResponse.data.artists.items[0].id;
            res.json({ artistId });
            console.log("artistId",artistId);
          } else {
            res.status(404).send("Artist not found");
          }
        } catch (error) {
          console.error("Error fetching artist ID", error);
          res.status(500).send("Internal Server Error");
        }
     });

module.exports = router;
