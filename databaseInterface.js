require("dotenv").config();

if (process.env.ENV === "local") {
  const mysql = require("mysql2/promise");

  // Create the connection pool
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  /**
   * Executes a query using the connection pool.
   * @param {string} sql - The SQL query string.
   * @param {Array} [params] - Parameters for the query.
   * @returns {Promise<object>} - Query result.
   */
  async function executeSql(sql, params = []) {
    const data = await pool.execute(sql, params);
    return data;
  }

  module.exports = {
    executeSql,
  };

} else {
  // For AWS Lambda, use RDS Data API
  const db = require("./awsRdsInterface");
  module.exports = { executeSql: db.executeSql };
}
