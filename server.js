var express = require('express');
var app = express();
var PORT = process.env.PORT || 3333;

app.set('port', PORT)
app.use(express.static(__dirname + '/public'));

//routes
app.get('/', function (req, res) {
  res.send('index.html');
});

app.listen(PORT);

console.log('App listening on port: ', PORT);
