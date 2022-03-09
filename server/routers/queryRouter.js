const express = require('express');
<<<<<<< HEAD
const router = express.Router();

const queryController = require('../controllers/queryController.js');

// CRUD functionalities
router.post('/createQuery', 
  queryController.createQuery,
  (req, res) => {
  res.status(200).json(res.locals.message)
});

router.get('/getQuery', 
  (req, res) => {
  res.status(200).json()
});

router.put('/updateQuery', 
  (req, res) => {
  res.status(200).json()
});

router.delete('/deleteQuery', 
  (req, res) => {
  res.status(200).json()
});
=======
const queryController = require('../controllers/queryController.js');
const router = express.Router();
>>>>>>> dev


module.exports = router;