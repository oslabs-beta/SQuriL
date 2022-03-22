const express = require('express');
const router = express.Router();

const queryController = require('../controllers/queryController.js');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');

// ** change the naming of the query
// CRUD functionalities
router.post('/createQuery', 
  sessionController.verifySession, //decording the cookie to get the userID
  userController.getUserID,
  queryController.createQuery,
  (req, res) => {
  res.status(200).json(res.locals.query)
});

router.get('/getQuery/:id', 
  queryController.getQuery,
  (req, res) => {
  // console.log(res.locals.value)
  res.status(200).json(res.locals.value)
});

router.put('/updateQuery/',
  queryController.updateQuery,
  (req, res) => {
  res.status(200).json(res.locals.updatedQuery)
});

router.delete('/deleteQuery/:id', 
  queryController.deleteQuery,
  (req, res) => {
  res.status(200).json(res.locals.message)
});


module.exports = router;