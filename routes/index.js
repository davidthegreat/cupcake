var express = require('express');
var router = express.Router();

var Cupcake = require('../app/models/cupcakes');
var Cart = require('../app/models/cart');
var Order = require('../app/models/order')
/* GET home page. */
router.get('/', function(req, res, next) {
	var successMsg = req.flash('success')[0];
	Cupcake.find(function(err, cupcakes){
		if(!err){
  			res.render('index', { 
  				title: 'muffinlicious', 
  				cupcakes: cupcakes,
  				successMsg: successMsg,
  				noMessage: !successMsg 
  			});
			// console.log(cupcakes);
		}else{
			return console.log(err);
		}
	});
});

router.get('/cupcake/:id', function(req, res, next) {
	var cupcake_id = req.param('id')
	console.log(typeof cupcake_id)
	console.log(cupcake_id)
	Cupcake.findOne({'_id': cupcake_id},function(err, cupcakes){
		if(!err){
			var cupcake =[];
			var c = cupcakes
			cupcake.push(c);
  			res.render('show', { 
  				title: 'muffinlicious', 
  				cupcake: cupcake 
  			});
			// console.log("dfafsdsasdafdsagsd", cupcake);
		}else{
			return console.log(err);
		}
	});
});

router.get('/add-cart/:id',function(req, res, next){
	var productId = req.param('id')
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	
		console.log('0000000000000000000000000000000000',productId)
	Cupcake.findById(productId, function(err, product){
		 
		if(err){

			return res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/cupcake/'+ product.id);
	});
});

router.get('/reduce/:id', function(req, res, next){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.reduceByOne(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});

router.get('/add/:id', function(req, res, next){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.addOne(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res, next){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.removeItem(productId);
	req.session.cart = cart;
	res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res, next){
	if(!req.session.cart){
		return res.render('shopping-cart', {cupcakes: null});
	}
	var cart = new Cart(req.session.cart);
	console.log("12345678901234567890",cart.generateArray())
	res.render('shopping-cart', {cupcakes: cart.generateArray(), totalPrice: cart.totalPrice, title: 'muffinlicious'})
});	

router.get('/checkout',isLoggedIn, function(req, res, next){
	if(!req.session.cart){
		return res.redirect('/shopping-cart')
	}
	var cart = new Cart(req.session.cart);
	var errMsg = req.flash('error')[0];
	res.render('checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout',isLoggedIn, function(req, res, next){
	if(!req.session.cart){
		return res.redirect('/shopping-cart')
	}
	var cart = new Cart(req.session.cart);
	var stripe = require("stripe")(
  		"sk_test_xaO6ICGgZkSwtU8aMLVve1OS"
	);

	stripe.charges.create({
  		amount: cart.totalPrice * 100,
  		currency: "usd",
  		source: req.body.stripeToken, // obtained with Stripe.js
  		description: "Charge for muffinlicious"
	}, function(err, charge) {
  		if(err){
  			req.flash('error', err.message);
  			return res.redirect('/checkout')
  		}
  		var order = new Order({
  			user: req.user,
  			cart: cart,
  			address: req.body.address,
  			name: req.body.name,
  			paymentId: charge.id
  		});
  		order.save(function(err, result){
  			if(err){
  				req.flash('error', err.message);
  				return res.redirect('/checkout')
  			}
  		req.flash('success', 'Thankyou For shopping at muffinlicious!');
  		req.session.cart = null;
  		res.redirect('/')
  		});
	});

})

module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.session.oldUrl = req.url
	res.redirect('/users/signin');
}
