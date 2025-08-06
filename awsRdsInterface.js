const {
  RDSDataClient,
  ExecuteStatementCommand,
} = require("@aws-sdk/client-rds-data");
const rdsDataClient = new RDSDataClient({ region: "ap-northeast-1" });

/**
 * Executes a query using the connection pool.
 * @param {string} sql - The SQL query string.
 * @param {Array} [params] - Parameters for the query.
 * @returns {Promise<object>} - Query result.
 */
async function executeSql(sql, parameters) {
  const params = {
    resourceArn: "arn:aws:rds:ap-northeast-1:471029525890:cluster:khufu-v2", // ARN of your Aurora cluster
    secretArn:
      "arn:aws:secretsmanager:ap-northeast-1:471029525890:secret:rds!cluster-cd4cb6f6-6cb5-4546-8aa2-e118e7493962-OZnVrD", // ARN of your database secret in Secrets Manager
    database: "khufu_db_v2",
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
