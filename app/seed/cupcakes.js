var Cupcake = require('../models/cupcakes');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopps');

var cupcakes = [
	new Cupcake({
		imageURL: 'https://media1.popsugar-assets.com/files/thumbor/ff8p9auzCaj0N65n3_uJVQOYk0E/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2013/02/05/5/192/1922664/287ecc02d7caca67_StrawberryLavaFudge/i/Georgetown-Cupcakes-Strawberry-Lava-Fudge-Cupcake-Recipe.jpg',
		Name: 'Chocolate cupcake',
		description: 'Freegan normcore vegan twee hell of. Trust fund vape edison bulb, health goth chartreuse pabst prism DIY tumeric distillery humblebrag normcore blue bottle coloring book.',
		price: 2.00
	}),
	new Cupcake({
		imageURL: 'http://cdn.shopify.com/s/files/1/0871/3756/products/DSC_6410-cc43_large.jpg?v=1448993140',
		Name: 'Recess Peices cupcake',
		description: 'Freegan normcore vegan twee hell of. Trust fund vape edison bulb, health goth chartreuse pabst prism DIY tumeric distillery humblebrag normcore blue bottle coloring book.',
		price: 2.50
	}),
	new Cupcake({
		imageURL: 'http://assets.marthastewart.com/styles/wmax-520-highdpi/d19/parade-cupcake-0798/parade-cupcake-0798_vert.jpg?itok=q7ANQdby',
		Name: 'Rassberry cupcake',
		description: 'Freegan normcore vegan twee hell of. Trust fund vape edison bulb, health goth chartreuse pabst prism DIY tumeric distillery humblebrag normcore blue bottle coloring book.',
		price: 2.00
	}),
	new Cupcake({
		imageURL: 'http://scrumpscupcakes.com/wp-content/uploads/2015/03/maple-bacon-cupcake.png',
		Name: 'Bacon cupcake',
		description: 'Freegan normcore vegan twee hell of. Trust fund vape edison bulb, health goth chartreuse pabst prism DIY tumeric distillery humblebrag normcore blue bottle coloring book.',
		price: 2.50
	}),
	new Cupcake({
		imageURL: 'http://cdn-image.myrecipes.com/sites/default/files/styles/420x420/public/image/recipes/su/11/07/vegan-cupcake-su-x.jpg?itok=aZD0aRdo',
		Name: 'Strawberry cupcake',
		description: 'Freegan normcore vegan twee hell of. Trust fund vape edison bulb, health goth chartreuse pabst prism DIY tumeric distillery humblebrag normcore blue bottle coloring book.',
		price: 2.00
	}),
	new Cupcake({
		imageURL: 'http://www.justcupcakes.net/images/cupcakes/grasscupcake.jpg',
		Name: 'M&M cupcake',
		description: 'Freegan normcore vegan twee hell of. Trust fund vape edison bulb, health goth chartreuse pabst prism DIY tumeric distillery humblebrag normcore blue bottle coloring book.',
		price: 2.50
	}),
	new Cupcake({
		imageURL: 'http://0x0800.github.io/2048-CUPCAKES/style/img/1024.jpg',
		Name: 'Cherry cupcake',
		description: 'Freegan normcore vegan twee hell of. Trust fund vape edison bulb, health goth chartreuse pabst prism DIY tumeric distillery humblebrag normcore blue bottle coloring book.',
		price: 2.00
	})
];

var done = 0;
for (var i=0; i < cupcakes.length; i++){
	cupcakes[i].save(function(err, result){
		done++;
		if(done === cupcakes.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}
