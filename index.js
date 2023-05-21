const express = require("express");
const req = require("express/lib/request");
const app = express();
morgan = require('morgan');
path = require('path');

  let movieList = [
    {title: 'Rio', year: 2011},
    {title: 'Top Gun Maverick', year: 2022},
    {title: 'Dunkirk', year: 2019},
    {title: 'Kung-Fu Panda', year: 2008},
  ]
  let requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
  };

  app.use(express.static('public'));
  app.use(morgan('combined'));
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
    let responseText = JSON.stringify(movieList, null, 2);
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