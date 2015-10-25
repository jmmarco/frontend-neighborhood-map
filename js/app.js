// Locations
// LatLng object literals are not supported in the Geometry library (Google Maps). Specfied them separately
var locationData = [
{
	name: 'Comedy Cellar',
	lat: 40.730219,
	lng: -74.0027623,
	marker: null
},
{
	name: 'Carolines on Brodway',
	lat: 40.7610514,
	lng: -73.9862616,
	marker: null
},
{
	name: 'Ben\'s Pizzeria',
	lat: 40.7272897,
	lng: -74.0012167,
	marker: null
},
{
	name: 'Billy\'s Bakery',
	lat: 40.7453376,
	lng: -74.0040787,
	marker: null
},
{
	name: 'Asuka Sushi',
	lat: 40.7452322,
	lng: -74.001138,
	marker: null
},
{
	name: 'Joe\'s Pizza',
	lat: 40.7272897,
	lng: -74.0012167,
	marker: null
},
{
	name: 'Bryant Park',
	lat: 40.7535965,
	lng: -73.9854213,
	marker: null
},
{
	name: 'Central Park',
	lat: 40.7828647,
	lng: -73.9675438,
	marker: null
},
{
	name: 'Prospect Park',
	lat: 40.6510946,
	lng: -73.981447,
	marker: null
},
{
	name: 'Wythe Hotel',
	lat: 40.7219936,
	lng: -73.9601151,
	marker: null
}
];


// Write the View Model
var viewModel = function() {
	var self = this;
	self.locations = ko.observableArray(locationData);

	self.query = ko.observable('');

	self.search = ko.computed(function() {
		if(!self.query()) {
			return self.locations();
		} else {
			console.log("Evaluating Search..");
			return ko.utils.arrayFilter(self.locations(), function(location) {
				return location.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
				});
		}
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
	var newYorkCity = {lat: 40.7080936, lng: -73.9941321};

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
	for (var i = 0; i < locationData.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locationData[i].lat, locationData[i].lng),
			animation: google.maps.Animation.DROP,
			title: '<p>' + locationData[i].name + '</p>',
			visible: true,
			map: map
		});
	}

	markersArray.push(marker);

	// Markers get pushed into the map, however they're not connected to KO's
	// I'm not sure how to approach this.
	//

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