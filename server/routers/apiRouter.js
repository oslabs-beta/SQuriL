const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController.js');
const typeDefController = require('../controllers/typeDefController.js');
const resolverController = require('../controllers/resolverController.js');

router.post(
  '/createGqlSchema',
  // grab all table values and structures
  apiController.getDBName, // res.locals.DBname
  apiController.getTableInfo, //res.locals.SQLSchema
  typeDefController.generateTypeDef, // res.locals.typeDefs
  resolverController.generateResolvers, //res.locals.resolvers
  (req, res) => {
    res.status(200).json(res.locals.schema);
  }
);

module.exports = router;
