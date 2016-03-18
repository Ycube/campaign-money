var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testdb');

db.serialize(function() {
  
});

// db.close();
module.exports = db;