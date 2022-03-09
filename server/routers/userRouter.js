const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js');

router.get('/allQueries/:userid', 
  userController.allQueries,
  (req, res) => {
  res.status(200).json(res.locals.allQueries)
});


module.exports = router;
