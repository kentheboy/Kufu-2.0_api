const { Router } = require('express');
const testRouter = Router();
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
module.exports = testRouter;
