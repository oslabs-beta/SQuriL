const express = require('express');

const router = express.Router();

const apiController = require('../controllers/apiController');
const typeDefController = require('../controllers/typeDefController');
const resolverController = require('../controllers/resolverController');

router.post(
  '/createGqlSchema',
  // grab all table values and structures
  // apiController.emptyInput,
  apiController.getDBName, // res.locals.DBname
  apiController.getTableInfo, // res.locals.SQLSchema
  typeDefController.generateTypeDef, // res.locals.typeDefs
  resolverController.generateResolvers, // res.locals.resolvers
  (req, res) => {
    res.status(200).json(res.locals.schema);
  }
);

router.get('/codegen', apiController.codegen, apiController.readFile, (req, res) => {
  res.status(200).json(res.locals.output);
});

// router.get('/reset', apiController.emptyInput, (req, res) => {
//   res.status(200).send('i did it');
// });

module.exports = router;
