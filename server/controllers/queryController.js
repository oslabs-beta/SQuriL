// require db 
const db = require('../db/db');

const queryController = {};

queryController.createQuery = async (req, res, next) => {
  const { value, user_id } = req.body;
  console.log(req.body)
  const sqlQuery = 'INSERT INTO queries (value, user_id) VALUES ($1, $2) RETURNING *'
  try {
    const query = await db.query(sqlQuery, [value, user_id])
    // const table = await pool.query('SELECT * FROM queries');
    // console.log(table);
    console.log(query)
    res.locals.query = query.rows[0];
    next()
  } catch (err) {
    next({
      log: `queryController.createQuery: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in queryController.createQuery. Check server log for more details.'},
    })
  }
}

queryController.getQuery = async (req, res, next) => {
  const { id } = req.params;
  const sqlQuery = 'SELECT value FROM queries WHERE _id=$1';
  try {
    const value = await db.query(sqlQuery, [id])
    res.locals.value = value.rows[0];
    next();
  } catch (err) {
    next({
      log: `queryController.getQuery: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in queryController.getQuery. Check server log for more details.'},
    })
  }
}

queryController.updateQuery = async (req, res, next) => {
  const { _id, value } = req.body;
  const sqlQuery = 'UPDATE queries SET value=$1 WHERE _id=$2 RETURNING *';
  try {
    const updatedQuery = await db.query(sqlQuery, [value, _id]);
    res.locals.updatedQuery = updatedQuery.row[0];
    next();
  } catch (err) {
    next({
      log: `queryController.updateQuery: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in queryController.updateQuery. Check server log for more details.'},
    })
  }
 }


queryController.deleteQuery = async (req, res, next) => {
  const { id } = req.params;
  const sqlQuery = 'DELETE FROM queries WHERE _id=$1';
  try {
    const query = await db.query(sqlQuery, [id]);
    res.locals.message = 'Query was deleted from queries table'
    next();
  } catch (err) {
    next({
      log: `queryController.deleteQuery: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in queryController.deleteQuery. Check server log for more details.'},
    })
  }
}

// export the queryController
module.exports = queryController;