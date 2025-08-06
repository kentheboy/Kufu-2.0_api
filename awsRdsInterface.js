require('dotenv').config();
const {
  RDSDataClient,
  ExecuteStatementCommand,
} = require("@aws-sdk/client-rds-data");
const rdsDataClient = new RDSDataClient({ region: process.env.AWS_REGION });

/**
 * Executes a query using the connection pool.
 * @param {string} sql - The SQL query string.
 * @param {Array} [params] - Parameters for the query.
 * @returns {Promise<object>} - Query result.
 */
async function executeSql(sql, parameters) {
  const params = {
    resourceArn: process.env.AWS_RESOURCES_ARN, // ARN of your Aurora cluster
    secretArn: process.env.AWS_SECRET_ACCESS_KEY, // ARN of your database secret in Secrets Manager
    database: process.env.DB_NAME, // Database name
    sql: sql,
    parameters: parameters, // Optional: array of parameters for prepared statements
  };

  const command = new ExecuteStatementCommand(params);
  const data = await rdsDataClient.send(command);
  return data.records;
}

module.exports = {
  executeSql,
};
