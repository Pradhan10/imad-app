var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto - require('crypto');


var config ={
	user: 'pradhanrishi10',
	database: 'pradhanrishi10',
	host: 'db.imad.hasura-app.io', 
	port: '5432', 
	password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));

var pool = new Pool(config);

function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	
	var htmlTemplate = `
	<html>
	<head>
	    <link href=ui/style.css rel="stylesheet"/>
	        <title>
	         ${title}
	        </title>
	    </head>
	    <body>
	        <div>
	      <a href="/">Home</a>
	    </div>
	    <hr/>
	    <h3>
	        ${heading}
	    </h3>
	    <div>
	        ${date.toDateString()}
	    </div>
	    <div>
	    <p>
	         ${content}
	    </p>
	    </div>
	    </body>
	</html>
	`;
	return htmlTemplate;
}


function hash(input, salt) {
    // How do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return hashed.toString('hex');
}

/*CREATE end point for password hashing*/
app.get('/hash/:input', function(req, res){
    
    var hashedString = hash(req.params.input, 'thisissomerandomstring');
    res.send(hashedString);
    
});

var counter=0;
app.get('/counter', function (req, res) {
	counter+=1;
  res.send(counter.toString());
});

// we have put the code of names here since article was executing first
 var names= [];
 app.get('/submit-name', function (req, res) { //url: submit-name?query regarding name
   var name = req.query.name; //also provided by xpress framework
   names.push(name);
   //JSON 
   res.send(JSON.stringify(names));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/test-db',function(req,res)
{
	//make a query
		//return a response
	pool.query('select * from test',function(err,result) 
    { 
		if(err)
        {
			res.status(500).send(err.toString());
		}
		else
        {
			res.send(JSON.stringify(result.rows)); 
		}
	});

});

app.get('/articles/:articleName', function (req, res){
  // articleName == article-one
  // articles[articleName] == {} content object for article one
  
  
  
  pool.query("SELECT * FROM article WHERE title = $1" + [req.params.articleName], function (err, result){
  
    if(err){
      res.status(500).send(err.toString());
    } else {
    	if (result.rows.length === 0){
    		res.status(404).send("Article not found");
    	} else {
    		var articleData = result.rows[0];
    		res.send(createTemplate(articleData));
    	 }
     }
  });
  
});
 

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
}); 
