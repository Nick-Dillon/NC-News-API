const express = require('express');
const app = require("./app");

const port = process.env.PORT || 9090;

app.listen(port)

module.exports = app;