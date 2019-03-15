const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const apiRouter = require('./routes/apiRouter.js');
const {
  handle400, handle404, handle405, handle500,
} = require('./errors/errorFunctions');

app.use(bodyParser.json());
app.use('/api', apiRouter);


app.use(handle400);
app.use(handle404);
app.use(handle405);

app.all('/*', handle500);

module.exports = app;
