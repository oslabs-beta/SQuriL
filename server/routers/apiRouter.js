const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController.js');
const gqlController = require('../controllers/gqlController.js');

router.post(
  '/createGqlSchema',
  // grab all table values and structures
  apiController.getDBName,
  apiController.getTableInfo,
  gqlController.generateTypeDef,
  (req, res) => {
    res.status(200).json(res.locals.schema);
  }
);

module.exports = router;
