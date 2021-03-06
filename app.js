const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const apiRouter = require('./routes/apiRouter.js');
const {
  handle400, handle404, handle405, handle422, handle500,
} = require('./errors/errorFunctions');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  next({ status: 404, message: 'Path not found!' });
});

app.use(handle400);
app.use(handle404);
app.use(handle405);
app.use(handle422);
app.use(handle500);


module.exports = app;
