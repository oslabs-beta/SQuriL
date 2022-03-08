const express = require('express');
const router = express.Router();

const queryController = require('../controllers/queryController.js');

// CRUD functionalities
router.post('/createQuery', 
  (req, res) => {
  res.status(200).json()
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


module.exports = router;