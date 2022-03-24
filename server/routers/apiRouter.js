const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController.js');
const gqlController = require('../controllers/gqlController.js');

router.post('/createGqlSchema', 
  // grab all table values and their relations
  apiController.getDBName,
  apiController.getTableInfo,
  // apiController.createGQLmeta,
  gqlController.convertToGQLSchema,
  (req, res) => {
  return res.status(200).send(res.locals.DBname)
})

module.exports = router;