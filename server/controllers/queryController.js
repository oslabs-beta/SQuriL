const queryController = {};
// require db 
const db = require('../db/db.js');

// Put pg functionality in this file because it wasn't working when imported?????? Will need to look into why it isn't working later on
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

queryController.createQuery = async (req, res, next) => {
  const { value, user_id } = req.body;
  const sqlQuery = 'INSERT INTO queries (value, user_id) VALUES ($1, $2) RETURNING *'
  try {
    const query = await pool.query(sqlQuery, [value, user_id])
    // const table = await pool.query('SELECT * FROM queries');
    // console.log(table);

    // can be also res.locals.query = sqlQuery
    res.locals.message = "Saved the query successfully" 
    next()
  } catch (err) {
    next({
      log: `queryController.createQuery: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: 'Error occurred in queryController.createQuery. Check server log for more details.'},
    })
  }
}


// export the queryController
module.exports = queryController;