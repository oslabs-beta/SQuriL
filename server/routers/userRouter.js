const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');

router.get('/allQueries', 
  sessionController.verifySession,
  userController.allQueries,
  (req, res) => {
  res.status(200).json(res.locals.allQueries)
});


module.exports = router;
