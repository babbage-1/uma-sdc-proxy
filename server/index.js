require('newrelic');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
// serve up static file
const staticPath = `${__dirname}/../public`;
console.log(staticPath);

// app.use('/fandangit/:id', express.static(staticPath));
app.use('/fandangit/:id', express.static(path.join(__dirname, '/../public')));

// app.use('/*/styles.css', express.static('public/styles.css'));
// app.use('/*', express.static('public'));

//
// app.use(express.static(__dirname + '/../client/dist'));
// app.use('/*/styles.css', express.static(__dirname + '/../client/dist/styles.css'));
// app.use('/*', express.static(__dirname + '/../client/dist'));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});



// video carousel
// const videoCarouselOptions = {
//   target: 'http://localhost:3333',
//   // changeOrigin: true
// };
// const videoCarouselProxy = proxy(videoCarouselOptions);


// app.use('/associatedVideos', videoCarouselProxy);


const castCrewOptions = {
  target: 'http://127.0.0.1:2002',
  secure: false,
  changeOrigin: true,
  headers: {
    "Connection": "keep-alive"
  }
};
const castCrewProxy = proxy(castCrewOptions);
app.use('/actors', castCrewProxy);


// const movieInfoOptions = {
//   target: 'http://localhost:2000',
//   changeOrigin: true,
// };
// const movieInfoProxy = proxy(movieInfoOptions);
// app.use('/info', movieInfoProxy);
