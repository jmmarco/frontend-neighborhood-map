// Store a couple of locations statically
var locations = [
{
	name: 'Comedy Cellar',
	address: { lat: 40.730219, lng:-74.0005736 }
},
{
	name: 'Carolines on Brodway',
	address: { lat: 40.7610514, lng: -73.9840729 }
},
];





// Write the View Model
var viewModel = function() {
	'use strict';
	var self = this;
	var markersArray = [];
	this.locations = ko.observableArray(locations);
	console.log(locations.slice(0));
	self.query = ko.observable('');
	self.search = function(value) {
		// remove all locations from the view
		self.locations.removeAll();
		for (var i in locations) {
			console.log(locations[0]);
			if (locations[i].name().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				self.locations().push(locations[i]);
				console.dir(self.people);
			}
		}
	};

};

// Activate knockout.js
ko.applyBindings(new viewModel());



// Put data into an observable array

// Wire data to the view

// Create the Map ^_^
var initMap = function() {
	'use strict';

	var map;
	var infowindow;

	// Asign the specific lat and lon of NYC to newYorkCity
	var newYorkCity = new google.maps.LatLng(40.7033127,-73.979681);

	// Create the map and attach it to the ID 'map'
	map = new google.maps.Map(document.getElementById('map'), {
		center: newYorkCity,
		zoom: 12
	});

	// Assign the function InfoWindow to infowindow
	infowindow = new google.maps.InfoWindow();
};