const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

// this can be ignored i was testing db connection
router.get('/test', userController.addUser, (req, res) => {
  console.log(res.locals)
  return res.status(200).send('testing the user route');
})

module.exports = router;
