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
{
	name: 'Ben\'s Pizzeria',
	address: { lat: 40.730636, lng: -74.000335 }
},
{
	name: 'Billy\'s Bakery',
	address: { lat: 40.745533, lng: -74.001901 }
},
{
	name: 'Asuka Sushi',
	address: { lat: 40.7452362, lng: -74.0011433 }
},
{
	name: 'Joe\'s Pizzeria',
	address: { lat: 40.7305589, lng: -74.0026389 }
},
{
	name: 'Bryant Park',
	address: { lat: 40.7536005, lng: -73.9854266 }
},
{
	name: 'Central Park',
	address: { lat: 40.7828687, lng: -73.9675491 }
},
{
	name: 'Prospect Park',
	address: { lat: 40.6805138, lng: -73.9609889 }
},
{
	name: 'Wythe Hotel',
	address: { lat: 40.7203352, lng: -73.9575497 }
},
];




// Write the View Model
var viewModel = function() {
	'use strict';
	var self = this;
	var markersArray = [];
	self.locations = ko.observableArray(locations); // make the locations an obs array

	self.query = ko.observable(''); // this reads the stuff you type in the search bar

	//self.locations.removeAll();
	self.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.locations(), function(location) {
			return location.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
		});
	});

};

// Make the viewModel go!
ko.applyBindings(new viewModel());



// Put data into an observable array

// Wire data to the view

// Create the Map ^_^
var initMap = function() {
	'use strict';

	var map;
	var infowindow;
	var marker;

	// Asign the specific lat and lon of NYC to newYorkCity
	var newYorkCity = new google.maps.LatLng(40.7033127,-73.979681);

	// Create the map and attach it to the ID 'map'
	map = new google.maps.Map(document.getElementById('map'), {
		center: newYorkCity,
		fitbounds: true,
		zoom: 12
	});

	// Assign the function InfoWindow to infowindow
	infowindow = new google.maps.InfoWindow();

	marker = new google.maps.Marker({
	map: map,
	draggable: true,
	animation: google.maps.Animation.DROP,
	position: newYorkCity // Drop the pin in NYC
	});
	marker.addListener('click', toggleBounce);
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}
};