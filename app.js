const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const apiRouter = require('./routes/apiRouter.js');
const {
  handle400, handle404, handle405, handle422, handle500,
} = require('./errors/errorFunctions');

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  next({ status: 404 });
});

app.use(handle400);
app.use(handle404);
app.use(handle405);
app.use(handle422);
app.use(handle500);


module.exports = app;
