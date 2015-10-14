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
	self.locations = ko.observableArray(locations); // make the locations an obs array

	self.query = ko.observable(''); // this reads the stuff you type in the search bar

	self.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.locations(), function(location) {
			return location.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
		});
	});

	/*self.search = function(value) {
		// remove all locations from the view
		self.locations.removeAll();

		for (var i in locations().length) {
			console.log(locations[0]);
			if (locations[i].name().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				self.locations().push(locations[i]);
				console.dir(self.people);
			}
		}
	};*/

};

// Make the viewModel go! - AKA Activate knockout.js!
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