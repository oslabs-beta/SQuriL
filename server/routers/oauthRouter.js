const express = require('express');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const router = express.Router();
require('dotenv').config();

// Get request to GitHub requesting the user's identity
router.get('/authorize', (req, res) => {
  const url = 'https://github.com/login/oauth/authorize?client_id=' + process.env.CLIENT_ID;
  return res.redirect(url);
})

// Redirect route after step 1 of GitHub OAuth
router.get('/callback', 
authController.getToken, 
authController.getProfile, 
sessionController.createSession, 
sessionController.verifySession, (req, res) => {
  return res.status(200).send('ending at /oauth/callback');
});
// sessionController.verifySession probabably doesn't need to be used here, and will probably be used as the first part in every middleware chain

module.exports = router;