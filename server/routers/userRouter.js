const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// this can be ignored i was testing db connection
router.get('/test', userController.addUser, (req, res) => {
  console.log(res.locals)
  return res.status(200).send('testing the user route');
})
=======
const userController = require('../controllers/userController.js');

router.get('/allQueries/:userid', 
  userController.allQueries,
  (req, res) => {
  res.status(200).json(res.locals.allQueries)
});

>>>>>>> dev

module.exports = router;
