const express = require('express');
const app = require("./app");

app.listen(process.env.NODE_ENV || 9090)