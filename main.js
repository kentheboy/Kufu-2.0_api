require('dotenv').config();
const express = require('express');
const testRouter = require('./routes/testRouter');
// create the server and setup routes
const app = express();
app.use(testRouter);
app.get('/', (req, res) => res.send('Express Lambda Example Server'));

if (process.env.ENV === 'local') {
    // run the server locally
    app.listen(3030, () => console.log('Server listening at http://localhost:3030'));
} else {
    module.exports = app;
}
