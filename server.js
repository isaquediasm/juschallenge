/*
 * Author: Isaque Dias
 * License: MIT license
 */

// call the dependencies
var express      = require('express');       
var app          = express();                 
var bodyParser   = require('body-parser');
var path         = require('path');
var mongoose     = require('mongoose');
var Article      = require('./app/models/article');

// connect to database
var db = process.env.MONGODB_URI || 'mongodb://localhost/jusbrasil';
mongoose.connect(db); 

// configure the public directory
app.use('/', express.static(path.join(__dirname, 'public')));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the port
var port = process.env.PORT || 8080;        

// =============================================================================
// ROUTES FOR THE API
// =============================================================================
var router = express.Router();  

router.post('/articles', function(req, res) {

		var article = new Article(); // get the instance of Article object

		// get the data from request
		article.title = req.body.title;
		article.type = req.body.type;

		// save to database
		article.save(function(err){
			if (err)
				res.status(500).send(err);

			res.status(201).json({ msg: 'Article created'});
		})

	});

router.get('/articles', function(req, res) {

	var query   = req.query.q || '',
			type    = req.query.entity_type || req.query.q;


	// create the query parameters
	var search  = { $or: [ { "title" : {'$regex' : query, $options: '-i' } }, { "type" : {'$regex': type,  $options: '-i'  } } ]};

	// if the search is filtered by entity, change the logic operator to AND instead of OR
	if ( req.query.entity_type )
		search  = { $and: [ { "title" : {'$regex' : query, $options: '-i'  } }, { "type" : {'$regex':type, $options: '-i'  } } ]};

	// Make the search
	Article.find(
		search,
		function(err, articles) {
				
			if (err)
				res.status(500).send(err);

			// if there's result so return 200
			var statusCode = (articles.length > 0) ? 200 : 204;

			res.status(statusCode).json(articles);
		}
	);

});

router.get('/types', function(req, res) {
		Article.find({}, {type: 1}, function(err, articles) {

			var statusCode = (articles.length > 0) ? 200 : 204;

			res.status(statusCode).json(articles);
		})
	});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running on port ' + port);

module.exports = app;