const express = require('express');
const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;