// Locations
// LatLng object literals are not supported in the Geometry library (Google Maps). Specfied them separately
var locations = [
{
	name: 'Comedy Cellar',
	lat: 40.730219,
	lng: -74.0027623,
	marker: "A"
},
{
	name: 'Carolines on Brodway',
	lat: 40.7610514,
	lng: -73.9862616,
	marker: "B"
},
{
	name: 'Ben\'s Pizzeria',
	lat: 40.7272897,
	lng: -74.0012167,
	marker: "C"
},
{
	name: 'Billy\'s Bakery',
	lat: 40.7453376,
	lng: -74.0040787,
	marker: "D"
},
{
	name: 'Asuka Sushi',
	lat: 40.7452322,
	lng: -74.001138,
	marker: "E"
},
{
	name: 'Joe\'s Pizza',
	lat: 40.7272897,
	lng: -74.0012167,
	marker: "F"
},
{
	name: 'Bryant Park',
	lat: 40.7535965,
	lng: -73.9854213,
	marker: "G"
},
{
	name: 'Central Park',
	lat: 40.7828647,
	lng: -73.9675438,
	marker: "H"
},
{
	name: 'Prospect Park',
	lat: 40.6510946,
	lng: -73.981447,
	marker: "I"
},
{
	name: 'Wythe Hotel',
	lat: 40.7219936,
	lng: -73.9601151,
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
var marker;

var initMap = function() {

	// Asign the specific lat and lng of NYC
	var newYorkCity = {lat: 40.7029741, lng: -74.259865};

	map = new google.maps.Map(document.getElementById('map'), {
		// Map Options
		center: newYorkCity,
		fitbounds: false,
		zoom: 12
	});

	// Info Windows
	infowindow = new google.maps.InfoWindow();


	//var contentString = '<div>' + marker.name + '</div>';


	// push markers into the markers array
	for (var i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
			title: '<p>' + locations[i].name + '</p>',
			visible: true,
			map: map
		});
	}

	markersArray.push(marker);

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});

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