const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');

router.get('/allQueries', 
  sessionController.verifySession,
  userController.allQueries,
  (req, res) => {
  // return res.status(200).send('reached the end of allqueries route') // Used for testing
  return res.status(200).json(res.locals.allQueries) // Used with frontend
});

router.get('/test', 
  sessionController.verifySession, 
  // userController.checkUser,
  // userController.addUser,
  (req, res) => {
  return res.status(200).send('reached the end of the test route');
})
module.exports = router;
