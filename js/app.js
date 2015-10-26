// ----------- Locations ----------- //
var locationData = [
{
	name: 'Comedy Cellar',
	lat: 40.730219 ,
	lng: -74.00057400000003,
	marker: null
},
{
	name: 'Carolines on Brodway',
	lat: 40.761051 ,
	lng: -73.98407299999997,
	marker: null
},
{
	name: 'Ben\'s Pizzeria',
	lat: 40.730392 ,
	lng: -74.00032399999998,
	marker: null
},
{
	name: 'Billy\'s Bakery',
	lat: 40.717715 ,
	lng: -74.00447600000001,
	marker: null
},
{
	name: 'Asuka Sushi',
	lat: 40.745232 ,
	lng: -73.99894899999998,
	marker: null
},
{
	name: 'Joe\'s Pizza',
	lat: 40.730559 ,
	lng: -74.00216799999998,
	marker: null
},
{
	name: 'Bryant Park',
	lat: 40.753596 ,
	lng:  -73.98323299999998,
	marker: null
},
{
	name: 'Central Park',
	lat: 40.782865 ,
	lng: -73.96535499999999,
	marker: null
},
{
	name: 'Prospect Park',
	lat: 40.660204 ,
	lng: -73.96895599999999,
	marker: null
},
{
	name: 'Wythe Hotel',
	lat: 40.721994,
	lng: -73.95792599999999,
	marker: null
}
];


// ----------- View Model ----------- //
var viewModel = function() {
	var self = this;
	self.locations = ko.observableArray(locationData);

	self.markers = ko.observableArray(markersArray);

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



// ----------- Map ----------- //
var map;
var infowindow;
var markersArray = [];
var marker;
var mapOptions;

var initMap = function() {

	// Asign the specific lat and lng of NYC
	var newYorkCity = {lat: 40.7127, lng: -74.0059};

	// Map Options
	mapOptions = {
		center: newYorkCity,
		fitbounds: true,
		zoom: 13,
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var marker = new google.maps.Marker({
		position: newYorkCity,
    	map: map,
    	animation: google.maps.Animation.DROP,
    	title: 'Hello World!'
  	});

  	// To remove a marker uncomment line below
  	// marker.setMap(null);






	// push markers into the markers array
	//var bounds = new google.maps.LatLngBounds();

	for (var i = 0; i < locationData.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locationData[i].lat, locationData[i].lng),
			animation: google.maps.Animation.DROP,
			title: '<p>' + locationData[i].name + '</p>',
			visible: true,
			map: map
		});
		markersArray.push(marker);
		marker.addListener('click', toggleBounce);
	}


	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}


	/*google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});*/



};

// ----------- AJAX ----------- //

