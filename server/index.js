const relic = require('newrelic');
const express = require('express');
const path = require('path');
const axios = require('axios');
//const morgan = require('morgan');

const app = express();
const port = 3000;

//app.use(morgan('dev'));
//app.use('/rooms/:listingid', express.static(path.resolve(__dirname, '../')));

app.get('/api/:listingid/reviews', (req, res) => {
  axios.get(`http://localhost:3004/api/${req.params.listingid}/reviews`)
    .then(({data}) => {
      res.send(data);
    });
});

app.post('/api/:listingId/reviews', (req, res) => {
  axios.post(`http://localhost:3004/api/${req.params.listingid}/reviews`)
  .then(() => res.status(200).end())
  .catch(err => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`listening on ${port}`)
});
