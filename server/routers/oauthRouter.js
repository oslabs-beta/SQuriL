const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

const router = express.Router();
require('dotenv').config();

// Get request to GitHub requesting the user's identity
router.get('/authorize', (req, res) => {
  const url = 'https://github.com/login/oauth/authorize?client_id=' + process.env.CLIENT_ID;
  return res.redirect(url);
});

// Redirect route after step 1 of GitHub OAuth
router.get(
  '/callback',
  authController.getToken,
  authController.getProfile,
  sessionController.createSession,
  sessionController.verifySession,
  (req, res) => res.redirect('/oauth/userDatabase') // When the frontend is running redirect back to homepage
  // return res.status(200).send('finished oauth callback route') // Testing in the backend, clean up later
);

// Redirect route after cookie is created, Adds the user to the database
router.get(
  '/userDatabase',
  sessionController.verifySession, // to get the username from the cookies
  userController.checkUser,
  userController.addUser,
  (req, res) => {
    console.log('Ended at the /oauth/userDatabase');
    return res.redirect('https://squril.netlify.app/'); // Change this to website homepage
  }
);

module.exports = router;
