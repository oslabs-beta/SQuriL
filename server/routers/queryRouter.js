const express = require('express');

const router = express.Router();

const queryController = require('../controllers/queryController');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

// ** change the naming of the query
// CRUD functionalities
router.post(
  '/createSchemas',
  sessionController.verifySession, // decording the cookie to get the userID
  userController.getUserID,
  queryController.createSchemas,
  (req, res) => {
    res.status(200).json(res.locals.newSchemas);
  }
);

router.get('/getSchemas/:id', queryController.getSchemas, (req, res) => {
  // console.log(res.locals.value)
  res.status(200).json(res.locals.schemas);
});

router.put('/updateSchemas/', queryController.updateSchemas, (req, res) => {
  res.status(200).json(res.locals.updatedSchemas);
});

router.delete('/deleteSchemas/:id', queryController.deleteSchemas, (req, res) => {
  res.status(200).json(res.locals.message);
});

module.exports = router;
