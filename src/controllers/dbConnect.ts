const mysql = require('mysql2')
const util = require('util')

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})


// mysql connection 
let mysqlconfig = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: 3306,
    database: process.env.DATABASE,
    multipleStatements: true
}
let pool = mysql.createPool(mysqlconfig);

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }
  
    if (connection) connection.release()
  
    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

export default pool