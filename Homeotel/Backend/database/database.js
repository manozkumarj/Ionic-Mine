//Connecting database
const mysql = require("mysql");
const config = require("./config");
//Creating connectionpool
var pool = mysql.createPool({
  connectionLimit: 100,
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  debug: false,
  dateStrings: "date",
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.log("Error, Connection was failed");
    console.log("sqlMessage => " + err.sqlMessage);
    console.log("errno => " + err.errno);
    console.log("code => " + err.code);
    // console.log(err);
    // console.log("Error, Connection was failed", err );
  } else {
    console.log("Successfully connected to MySQL's db --> " + config.database);
  }
});

function executeQuery(strQuery, params, res, responseSenderCallback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      //console.log("error -> " + err);
      res.json({
        code: 100,
        status: "Error in connection database",
        error: err,
      });
      return;
    }
    connection.query(strQuery, params, function (err, rows) {
      connection.release();
      if (!err) {
        //console.log("response -> " + JSON.stringify(rows));
        responseSenderCallback(rows, res);
      } else {
        //console.log("query -> " + strQuery + "; error -> " + err);
        res.json({
          error:
            "Something went wrong while running your request. Please contact admin.",
        });
      }
    });
  });
}

function sendResponseNormal(rows, res) {
  res.json(rows);
}
exports.executeQuery = executeQuery;
exports.sendResponseNormal = sendResponseNormal;
