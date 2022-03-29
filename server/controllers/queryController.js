// require db
const db = require('../db/db');

const queryController = {};

queryController.createSchemas = async (req, res, next) => {
  const { gqlSchema, tsSchema } = req.body;
  const { userid } = res.locals;
  // console.log(req.body)
  const sqlQuery = 'INSERT INTO schemas (gqlSchema, tsSchema, user_id) VALUES ($1, $2, $3) RETURNING *';
  try {
    const query = await db.query(sqlQuery, [gqlSchema, tsSchema, userid]);
    res.locals.newSchemas = query.rows[0];
    next();
  } catch (err) {
    next({
      log: `queryController.createSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in queryController.createSchemas. Check server log for more details.',
      },
    });
  }
};

queryController.getSchemas = async (req, res, next) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT gqlSchema, tsSchema FROM schemas WHERE _id=$1';
  try {
    const value = await db.query(sqlQuery, [id]);
    res.locals.schemas = value.rows[0];
    next();
  } catch (err) {
    next({
      log: `queryController.getSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in queryController.getSchemas. Check server log for more details.',
      },
    });
  }
};

queryController.updateSchemas = async (req, res, next) => {
  const { _id, gqlSchema, tsSchema } = req.body;
  const sqlQuery = 'UPDATE schemas SET gqlSchema=$1, tsSchema=$2 WHERE _id=$2 RETURNING *';
  try {
    const updatedQuery = await db.query(sqlQuery, [gqlSchema, tsSchema, _id]);
    res.locals.updatedSchemas = updatedQuery.row[0];
    next();
  } catch (err) {
    next({
      log: `queryController.updateSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in queryController.updateSchemas. Check server log for more details.',
      },
    });
  }
};

queryController.deleteSchemas = async (req, res, next) => {
  const { id } = req.params;
  const sqlQuery = 'DELETE FROM schemas WHERE _id=$1';
  try {
    const query = await db.query(sqlQuery, [id]);
    res.locals.message = 'Schemas were deleted from schemas table';
    next();
  } catch (err) {
    next({
      log: `queryController.deleteSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in queryController.deleteSchemas. Check server log for more details.',
      },
    });
  }
};

// export the queryController
module.exports = queryController;
