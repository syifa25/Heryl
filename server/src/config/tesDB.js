import pool from './db.js';

pool.query("SELECT NOW()")
  .then(result => {
    console.log("DB Time:", result.rows[0]);
    pool.end();
  })
  .catch(err => console.error("Query error:", err));
