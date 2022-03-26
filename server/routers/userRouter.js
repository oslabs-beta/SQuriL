const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

router.get(
  '/allQueries',
  sessionController.verifySession,
  userController.allQueries,
  (req, res) =>
    // return res.status(200).send('reached the end of allqueries route') // Used for testing
    res.status(200).json(res.locals.allQueries) // Used with frontend
);

// check if the user has been logged in
router.get('/cookie', sessionController.verifySession, (req, res) => {
  let loggedIn = false;
  if (res.locals.username !== undefined) {
    loggedIn = true;
  }
  return res.status(200).send(loggedIn);
});

module.exports = router;
