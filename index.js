const express = require("express");
const req = require("express/lib/request");
const app = express();
const fs = require('fs');
morgan = require('morgan');
path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
  
  let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
  };

  app.use(express.static('public'));
  app.use(morgan('combined', {stream:accessLogStream}));
  app.use(requestTime);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.get('/', (req, res) => {
    let responseText = "Welcome to my API!";
    responseText += '<small>\nRequested at: ' + req.requestTime + '</small>';
  res.send(responseText);
   
})
app.get('/movies', (req, res) => {
    let responseText = "List o' movies";
    responseText += '<small>\nRequested at: ' + req.requestTime + '</small>';
  res.send(responseText);
   
})
app.get('/favorites', (req, res) => {
    let responseText = "List o' Favorites";
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
   
})

app.listen(8080, () => {
    console.log('Listening to port 8080.')
})