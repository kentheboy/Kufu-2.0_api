const express = require('express');
const testRouter = require('./routes/testRouter');
// create the server and setup routes
const app = express();
app.use(testRouter);
app.get('/', (req, res) => res.send('Express Lambda Example Server'));
// run the server locally
module.exports = app;
