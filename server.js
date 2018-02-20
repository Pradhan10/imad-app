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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
// Three pages containing articles
app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;    
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name/:name', function(req, res) {

	//Get the name from request
	var name = req.params.name;
	
	names.push(name);
	// use JSON to convert list to string
	res.send(JSON.stringify(names));
	
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
