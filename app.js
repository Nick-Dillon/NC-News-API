const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const apiRouter = require('./routes/apiRouter.js');
const handle404 = require('./errors/errorFunctions');

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.all('/*', (err, req, res, next) => {
  console.log('in app.all');
  res.status(404).send({ message: 'Page not found!' });
});

app.use(handle404);

// app.use((err, req, res, next) => {
//   res.status(404).send({ message: err.message });
// });

module.exports = app;
