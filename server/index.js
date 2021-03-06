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

//loaderio-f75653a35c0e232847013ae1a71d54b5

app.get('/loaderio-f75653a35c0e232847013ae1a71d54b5', (req, res) => {
  const filePath = path.join(__dirname, './loaderio-f75653a35c0e232847013ae1a71d54b5  .txt');
  res.sendFile(filePath);
});

// video carousel
const videoCarouselOptions = {
  target: 'http://ec2-13-57-213-223.us-west-1.compute.amazonaws.com:8000',
  changeOrigin: true,
};
const videoCarouselProxy = proxy(videoCarouselOptions);
app.use('/videos', videoCarouselProxy);


const castCrewOptions = {
  target: 'http://ec2-13-57-198-90.us-west-1.compute.amazonaws.com:8000',
  // target: 'http://localhost:2002',

  changeOrigin: true,
};
const castCrewProxy = proxy(castCrewOptions);
app.use('/actors', castCrewProxy);


const movieInfoOptions = {
  target: 'http://ec2-54-161-202-111.compute-1.amazonaws.com:8000',
  changeOrigin: true,
};
const movieInfoProxy = proxy(movieInfoOptions);
app.use('/main', movieInfoProxy);
