const express = require('express');

const router = express.Router();

const schemasController = require('../controllers/schemasController');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');

// CRUD functionalities
router.post(
  '/createSchemas',
  sessionController.verifySession, // decording the cookie to get the userID
  userController.getUserID,
  schemasController.createSchemas,
  (req, res) => {
    res.status(200).json(res.locals.newSchemas);
  }
);

router.get('/getSchemas/:id', schemasController.getSchemas, (req, res) => {
  // console.log(res.locals.value)
  res.status(200).json(res.locals.schemas);
});

router.put('/updateSchemas/', schemasController.updateSchemas, (req, res) => {
  res.status(200).json(res.locals.updatedSchemas);
});

router.delete('/deleteSchemas/:id', schemasController.deleteSchemas, (req, res) => {
  res.status(200).json(res.locals.message);
});

module.exports = router;
