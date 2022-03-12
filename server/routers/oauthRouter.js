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
sessionController.verifySession,
userController.checkUser,
userController.addUser,
(req, res) => {
  // return res.redirect('http://localhost:8080'); // When the frontend is running redirect back to homepage
  return res.status(200).send('finished oauth callback route') // Testing in the backend, clean up later
});


module.exports = router;