// require db
const db = require('../db/db');

const schemasController = {};

schemasController.createSchemas = async (req, res, next) => {
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
      log: `schemasController.createSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in schemasController.createSchemas. Check server log for more details.',
      },
    });
  }
};

schemasController.getSchemas = async (req, res, next) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT gqlSchema, tsSchema FROM schemas WHERE _id=$1';
  try {
    const value = await db.query(sqlQuery, [id]);
    res.locals.schemas = value.rows[0];
    next();
  } catch (err) {
    next({
      log: `schemasController.getSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in schemasController.getSchemas. Check server log for more details.',
      },
    });
  }
};

schemasController.updateSchemas = async (req, res, next) => {
  const { _id, gqlSchema, tsSchema } = req.body;
  const sqlQuery = 'UPDATE schemas SET gqlSchema=$1, tsSchema=$2 WHERE _id=$2 RETURNING *';
  try {
    const updatedQuery = await db.query(sqlQuery, [gqlSchema, tsSchema, _id]);
    res.locals.updatedSchemas = updatedQuery.row[0];
    next();
  } catch (err) {
    next({
      log: `schemasController.updateSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in schemasController.updateSchemas. Check server log for more details.',
      },
    });
  }
};

schemasController.deleteSchemas = async (req, res, next) => {
  const { id } = req.params;
  const sqlQuery = 'DELETE FROM schemas WHERE _id=$1';
  try {
    const query = await db.query(sqlQuery, [id]);
    res.locals.message = 'Schemas were deleted from schemas table';
    next();
  } catch (err) {
    next({
      log: `schemasController.deleteSchemas: ERROR: ${err}`,
      message: {
        err: 'Error occurred in schemasController.deleteSchemas. Check server log for more details.',
      },
    });
  }
};

// export the schemasController
module.exports = schemasController;
