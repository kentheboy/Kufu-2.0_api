const { Router } = require('express');
const testRouter = Router();
const db = require('../databaseInterface');
// endpoint to get all posts
testRouter.get('/hello', (req, res) => {
  res.json({
    message: 'Hello, World!',
    status: 'success',
    data: {
      greeting: 'Welcome to the Kufu-2.0 API!'
    }
  });
});

testRouter.get('/test', async(req, res) => {
  var posts = await db.executeSql('SELECT * FROM products', []);
  console.log(posts);
  res.json(posts);
});

module.exports = testRouter;
