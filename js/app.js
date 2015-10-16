// Locations
var locations = [
{
	name: 'Comedy Cellar',
	lat: 40.730219,
	lng: -74.0005736,
	marker: "A"
},
{
	name: 'Carolines on Brodway',
	lat: 40.7610514,
	lng: -73.9840729,
	marker: "B"
},
{
	name: 'Ben\'s Pizzeria',
	lat: 40.730636,
	lng: -74.000335,
	marker: "C"
},
{
	name: 'Billy\'s Bakery',
	lat: 40.745533,
	lng: -74.001901,
	marker: "D"
},
{
	name: 'Asuka Sushi',
	lat: 40.7452362,
	lng: -74.0011433,
	marker: "E"
},
{
	name: 'Joe\'s Pizzeria',
	lat: 40.7305589,
	lng: -74.0026389,
	marker: "F"
},
{
	name: 'Bryant Park',
	lat: 40.7536005,
	lng: -73.9854266,
	marker: "G"
},
{
	name: 'Central Park',
	lat: 40.7828687,
	lng: -73.9675491,
	marker: "H"
},
{
	name: 'Prospect Park',
	lat: 40.6805138,
	lng: -73.9609889,
	marker: "I"
},
{
	name: 'Wythe Hotel',
	lat: 40.7203352,
	lng: -73.9575497,
	marker: "J"
}
];




// Write the View Model
var viewModel = function() {
	var self = this;
	self.locations = ko.observableArray(locations); // make the locations an obs array

	self.query = ko.observable('');


	self.locations.removeAll(this);
	self.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.locations(), function(location) {
			return location.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
		});
	});

};

// Make the viewModel go!
ko.applyBindings(new viewModel());



// Map Stuff ^_^
var map;
var infowindow;
var markersArray = [];

var initMap = function() {

	// Asign the specific lat and lng of NYC
	var newYorkCity = {lat: 40.7033127, lng: -73.979681};

	map = new google.maps.Map(document.getElementById('map'), {
		// Map Options
		center: newYorkCity,
		fitbounds: true,
		zoom: 12
	});

	// Info Windows
	infowindow = new google.maps.InfoWindow();


	// push markers into the markers array
	for (var i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[0].lat, locations[0].lng),
			title: '<p>' + locations[0].name + '</p>',
			map: map
		});
	}

	markersArray.push(marker);

	/*marker = new google.maps.Marker({
	map: map,
	draggable: true,
	animation: google.maps.Animation.DROP,
	position: newYorkCity //
	});
	marker.addListener('click', toggleBounce);
	function toggleBounce() {
		if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}*/
};