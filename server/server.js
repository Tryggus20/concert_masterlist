const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
require('dotenv').config();

dotenv.config()
const app = express();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const concertRouter = require('./routes/concert.router')
const editRouter = require('./routes/edit.router')
const bandRouter = require('./routes/band.router')
const spotifyRouter = require('./routes/spotify.router')
const cloudinaryRouter = require('./routes/cloudinary.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/users', userRouter);
app.use('/api/concerts', concertRouter);
app.use('/api/edit', editRouter);
app.use('/api/update', bandRouter);
app.use('/api/spotify/', spotifyRouter);
app.use('/api/cloudinary', cloudinaryRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});


/* 
TODO: Add new router to handle spotify requests


*/