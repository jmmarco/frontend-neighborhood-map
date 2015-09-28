// Store a couple of locations statically
var locations = [
{
	name: 'coffee code',
	address: 'Monroe 2211'
},
{
	name: 'pizza palace',
	address: 'Olazabal 3001'
},
{
	name: 'ice cream heaven',
	address: 'Cabildo 2800'
},

];






// Write the View Model
var viewModel = function() {
	var self = this;

	this.name = ko.observable('CafeCode');
	this.address = ko.observable('Av. Cabildo 3000');
	this.locations = ko.observableArray(locations);

};

// Activate knockout.js
ko.applyBindings(new viewModel());





// Put data into an observable array

// Wire data to the view

// Create the Map ^_^ and add map markers

var initMap = function() {

	var map;
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.6158238, lng: -58.4333203},
		zoom: 12
	});

	google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
	});
};

