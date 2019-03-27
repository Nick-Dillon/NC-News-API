const express = require('express');


const handle400 = (err, req, res, next) => {
  const codes = {
    42703: 'Cannot sort by nonexistent column!',
    23502: 'Missing information from the post request!',
    "22P02": 'Article ID must be a number!'
  };
  if (codes[err.code] || err.status === 400) {
    res.status(400).send({ message: codes[err.code] || err.message })
  } else {
    next(err);
  }
};

const handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: err.message });
  else {
    next(err);
  }
};

const handle405 = (err, req, res, next) => {
  if (err.status === 405) res.status(405).send({ message: err.message });
  else {
    next(err);
  }
};

const handle422 = (err, req, res, next) => {
  const codes = {
    23503: 'Cannot post from a nonexistent user!',
    23505: 'Sorry, that already exists!',
  };
  if (codes[err.code]) res.status(422).send({ message: codes[err.code] });
  else {
    next(err);
  }
};

const handle500 = (err, req, res, next) => {
  res.status(500).send({ message: 'Something went wrong on our end, sorry!' });
};

module.exports = {
  handle400, handle404, handle405, handle422, handle500,
};
