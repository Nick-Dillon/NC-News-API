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
  console.log('caught here');
  next({ status: 405, message: 'Method not allowed!' });
});

app.use(handle400);
app.use(handle404);
app.use(handle405);
app.use(handle422);
app.use(handle500);

// ### `/api/articles`
//  - **status:405 invalid request method for end-point:** PUT, DELETE, PATCH methods all should respond with a 405. Can handle this with `articlesRouter.route('/').all(()=>{})`

module.exports = app;
