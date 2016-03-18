var express = require('express');
var app = express();
var PORT = process.env.PORT || 3333;
var db = require('./sqlite.js');

app.set('port', PORT)
app.use(express.static(__dirname + '/../public'));

app.get('/', function (req, res) {
  db.serialize(function() {
      db.all('SELECT a.first_last_party name, SUM(b.amount) as value from CANDIDATES a INNER JOIN CONTRIBUTIONS b on a.cid = b.cid GROUP BY a.cid, a.first_last_party ORDER BY VALUE DESC limit 100;', function(err, row) {
        if (err) { 
          console.log(err); 
        } else {
          res.send(row); 
        }
    })
  })
});

app.get('/contributions', function (req, res) {
  db.serialize(function() {
      db.all('SELECT * from CONTRIBUTIONS LIMIT 10', function(err, row) {
        if (err) { 
          console.log(err); 
        } else {
          res.json(row); 
        }
    })
  })
});

//return top 10 states by contributions
app.get('/topStates', function (req,res) {
  db.serialize(function () {
    db.all('SELECT substr(dist,1,2) as district, sum(b.amount) as value FROM candidates a INNER JOIN contributions b on a.cid = b.cid GROUP BY district ORDER BY value DESC;', function(err, row) {
        if (err) {
          console.log(err);
        } else {
          res.json(row);
        }
    })
  })
});

//returns top 10 candidates by contributions
app.get('/topCandidates', function (req, res) {
  db.serialize(function() {
    db.all('SELECT a.first_last_party name, SUM(b.amount) as value from CANDIDATES a INNER JOIN CONTRIBUTIONS b on a.cid = b.cid GROUP BY a.cid, a.first_last_party ORDER BY VALUE DESC limit 10;', function(err, row) {
      if (err) {
        console.log(err); 
      } else {
        res.json(row);
      }
    })
  })
})

app.listen(PORT);
console.log('App listening on port: ', PORT);
