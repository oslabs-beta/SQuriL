const express = require('express');
const apiController = require('../controllers/apiController.js');
const router = express.Router();

router.post('/createGqlSchema', 
  // grab all table values and their relations
  apiController.getTable,
  // map the table values to schema
  apiController.createGQL,
  (req, res) => {
  return res.status(200).send()
})

module.exports = router;