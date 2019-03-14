const express = require('express');


const handle400 = (err, req, res, next) => {
  if (err.status === 400) res.status(400).send({ message: err.message });
  else {
    next(err);
  }
};

const handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: err.message });
  else {
    next(err);
  }
};

module.exports = { handle400, handle404 };
