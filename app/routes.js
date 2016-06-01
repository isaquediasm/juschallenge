var Article    = require('./models/article');

module.exports = function(app) {


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

	router.post('/articles', function(req, res) {

			var article = new Article();
			article.title = req.body.title;
			article.type = req.body.type;

			article.save(function(err){
				if (err)
					res.status(500).send(err);

				res.status(201).json({ msg: 'Article created'});
			})
		});

	router.get('/teste', function(req, res) {

		var query   = req.query.q || '',
				type    = req.query.entity_type || req.query.q;

		var search  = { $or: [ { "title" : {'$regex' : query, $options: '-i' } }, { "type" : {'$regex': type,  $options: '-i'  } } ]};

		if ( req.query.entity_type )
			search  = { $and: [ { "title" : {'$regex' : query, $options: '-i'  } }, { "type" : {'$regex':type, $options: '-i'  } } ]};

		  Article.find(
				search,
				function(err, articles) {
					
					if (err)
						res.status(500).send(err);


					var statusCode = (articles.length > 0) ? 200 : 204;

					res.status(statusCode).json(articles);
				});
	});


	// more routes for our API will happen here

	// REGISTER OUR ROUTES -------------------------------
	// all of our routes will be prefixed with /api
	app.use('/api', router);

};