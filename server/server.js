var express = require('express');
var app = express();
var PORT = process.env.PORT || 3333;
var db = require('../sqlite.js');

app.set('port', PORT)
app.use(express.static(__dirname + '/../public'));

app.get('/', function (req, res) {

  db.serialize(function() {
      db.all('SELECT * from CANDIDATES LIMIT 10', function(err, row) {
        if (err) { console.log(err); 
        } else {
          console.log(row) 
          res.send(row); 
        }
    })
  })
})

app.get('/contributions', function (req, res) {

  db.serialize(function() {
      db.all('SELECT * from CONTRIBUTIONS LIMIT 10', function(err, row) {
        if (err) { console.log(err); 
        } else {
          console.log(row) 
          res.json({"row" : row}); 
        }
    })
  })
})

app.get('/totalContributions', function (req, res) {

  db.serialize(function() {
    // http://stackoverflow.com/questions/9574721/using-sum-in-an-sql-query
      db.all('select candidates.cid, contributions.cid from candidates, contributions where candidates.cid = contributions.cid LIMIT 10', function(err, row) {
        if (err) { console.log(err); 
        } else {
          console.log(row) 
          res.json({"row" : row}); 
        }
    })
  }))




app.listen(PORT);
console.log('App listening on port: ', PORT);
