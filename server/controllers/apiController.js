const db = require('../db/db');
const fs = require('fs');
const { execSync } = require('child_process');

const { Pool } = require('pg');

const SQLTableInfo = fs.readFileSync('server/db/SQLTableInfo.sql', 'utf8');

const apiController = {};

apiController.getDBName = (req, res, next) => {
  const { link } = req.body;
  const db = new Pool({ connectionString: link });
  db.query('SELECT current_database();')
    .then((data) => {
      res.locals.DBname = data.rows[0].current_database;
      return next();
    })
    .catch((err) => {
      next({
        log: `apiController.getTableName: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {
          err: 'Error occurred in apiController.getTableName. Check server log for more details.',
        },
      });
    });
};

apiController.getTableInfo = (req, res, next) => {
  const { link } = req.body;
  const db = new Pool({ connectionString: link });
  db.query(SQLTableInfo)
    .then((data) => {
      // console.log(data.rows[0].tables.users.columns._id)
      res.locals.SQLSchema = data.rows[0]; // [ { tables: { users: [Object], queries: [Object] } } ]
      return next();
    })
    .catch((err) => {
      next({
        log: `apiController.getTableInfo: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {
          err: 'Error occurred in apiController.getTableInfo. Check server log for more details.',
        },
      });
    });
};

apiController.createGQLmeta = (req, res, next) => {
  try {
    res.locals.GQLmeta = {
      0: {
        name: res.locals.DBname,
        databaseName: 'PostgreSQL',
        tables: {},
      },
    };
    const { tables } = res.locals.SQLSchema;
    let tableCount = 0;
    let fieldCount = 0;

    for (const table in tables) {
      const tableCache = (res.locals.GQLmeta[0].tables[tableCount] = {
        type: table,
        fields: {},
      });

      const tableFields = tables[table].columns;

      /* LOOP THROUGH FIELDS OF TABLE AND POPULATE res.locals.preppedForGQL WITH APPROPRIATE DATA */
      for (const field in tableFields) {
        tableCache.fields[fieldCount] = {
          name: field,
          type: tableFields[field].dataType === 'integer' ? 'Number' : tableFields[field].dataType,
          primaryKey: tables[table].primaryKey === field,

          // DEFAULTED TO TEMPREF.js
          required: false,
          multipleValues: false,
          relation: {
            tableIndex: -1,
            fieldIndex: -1,
            refType: '',
          },
          refBy: {},
        };
        fieldCount += 1;
      }

      fieldCount = 0;
      tableCount += 1;
    }
    // console.log(res.locals.GQLmeta[0])
    next();
  } catch (err) {
    next({
      log: `apiController.createGQLmeta: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: {
        err: 'Error occurred in apiController.createGQLmeta. Check server log for more details.',
      },
    });
  }
};

apiController.codegen = (req, res, next) => {
  console.log('in the codegen middleware');
  execSync('npm run codegen');
  return next();
};

apiController.emptyInput = (req, res, next) => {
  fs.writeFileSync('server/schemas/input/inputSchema.graphql', '', (err) => {
    if (err) console.log(err);
    else console.log('Written successfully');
  });
  return next();
};

apiController.readFile = (req, res, next) => {
  const output = fs.readFileSync('server/schemas/output/outputSchema.ts', 'utf8');
  res.locals.output = output;
  return next();
};

module.exports = apiController;
