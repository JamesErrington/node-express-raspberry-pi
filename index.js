var express = require('express');
var GoogleImages = require('google-images');
var auth = require('./auth');
var config = require('./config.json');

var app = express();
app.set('view engine', 'ejs');
app.use(auth);

var client = new GoogleImages(config.searchKey, config.apiKey);

app.use('/', function(req, res, next) {
  client.search('Jeff Goldblum', { size: 'xxlarge', page: 1 })
    .then(function(images) {
      var image = images[Math.floor(Math.random() * images.length)];
      res.render('index.ejs', {
        imageUrl: image.url,
        width: image.width,
        height: image.height
      })
    })
});

app.listen(config.port, function() {
  console.log('Server running on port ' + config.port);
});
