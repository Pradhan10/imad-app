var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/fox.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'fox.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
// Three pages containing articles
app.get('/article-one.html', function (req, res) {
  res.send("This is where article one will be served");
});

app.get('/article-two.html', function (req, res) {
  res.send("This is where article TWO will be served");
});

app.get('/article-three.html', function (req, res) {
  res.send("This is where article 3 will be served");
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
