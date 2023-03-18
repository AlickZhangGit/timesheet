const { Pool } = require('pg')
const util = require('util')

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})


// mysql connection 
let dbconfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE
}
const pool = new Pool(dbconfig);

// Ping database to check for common exception errors.
pool.connect((err, client, release) => {
  if (err) {
    console.error(err)
  }

  if (client) release();
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

export default {pool}