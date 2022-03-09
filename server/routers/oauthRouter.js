const express = require('express');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const router = express.Router();
require('dotenv').config();

// Get request to GitHub requesting the user's identity
router.get('/authorize', (req, res) => {
  const url = 'https://github.com/login/oauth/authorize?client_id=' + process.env.CLIENT_ID;
  console.log(url)
  return res.redirect(url);
})

// Redirect route after step 1 of GitHub OAuth
router.get('/callback', authController.getToken, authController.getProfile, (req, res) => {
  console.log('in the callback route')
  console.log(res.locals.profile)
  return res.status(200).send('ending at /oauth/callback');
});

module.exports = router;