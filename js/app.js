// ----------- Locations ----------- //
var locationData = [
{
	name: 'Comedy Cellar',
	lat: 40.730219,
	lng: -74.00057400000003,
	marker: null
},
{
	name: 'Carolines on Brodway',
	lat: 40.761051,
	lng: -73.98407299999997,
	marker: null
},
{
	name: 'Ben\'s Pizzeria',
	lat: 40.730392,
	lng: -74.00032399999998,
	marker: null
},
{
	name: 'Billy\'s Bakery',
	lat: 40.717715,
	lng: -74.00447600000001,
	marker: null
},
{
	name: 'Asuka Sushi',
	lat: 40.745232,
	lng: -73.99894899999998,
	marker: null
},
{
	name: 'Joe\'s Pizza',
	lat: 40.730559,
	lng: -74.00216799999998,
	marker: null
},
{
	name: 'Bryant Park',
	lat: 40.753596,
	lng:  -73.98323299999998,
	marker: null
},
{
	name: 'Central Park',
	lat: 40.782865,
	lng: -73.96535499999999,
	marker: null
},
{
	name: 'Prospect Park',
	lat: 40.660204,
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

	mapOptions = {
		zoom: 12,
		center: {lat: 40.7127, lng: -74.0059},
	};

	self.map = new google.maps.Map(document.getElementById('map'), mapOptions);



	self.allLocations = [];
	locationData.forEach(function(venue) {
		self.allLocations.push(new Venue(venue));
		//console.log(self.allLocations);
		});


	self.allLocations.forEach(function(venue) {
		var markerOptions = {
			map: self.map,
			position: venue.LatLng,
			animation: google.maps.Animation.DROP,
			title: '<p>' + locationData.name + '</p>'
		};
		// Add event listener
		venue.marker = new google.maps.Marker(markerOptions);
		venue.marker.addListener('click', toggleBounce);

		// Add Google's toggle Bounce
		function toggleBounce() {
			if (venue.marker.getAnimation() !== null) {
				venue.marker.setAnimation(null);
			} else {
				venue.marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}

	});

	self.visibleVenues = ko.observableArray();

	self.allLocations.forEach(function(venue) {
		self.visibleVenues.push(venue);
	});

	self.userInput = ko.observable('');

	self.filterMarkers = function() {
		var searchInput =  self.userInput().toLowerCase();
		self.visibleVenues.removeAll();

		self.allLocations.forEach(function(venue) {
			venue.marker.setVisible(false);

			if (venue.name.toLowerCase().indexOf(searchInput) !== -1) {
				self.visibleVenues.push(venue);
			}
		});

		self.visibleVenues().forEach(function(venue) {
			venue.marker.setVisible(true);
		});
	};

	function Venue(dataObj) {
		this.name = dataObj.name;
		console.log(this.name);
		this.LatLng = { lat: dataObj.lat, lng: dataObj.lng };
		console.log(this.LatLng);

		// save  a reference to venue's map marker

		this.marker = null;
	}



	/*
	console.log(markersArray);
	self.markers = ko.observableArray(markersArray);
	console.log(self.markers());
	Notes: When I run the code above markersArray appears empty
	*/


	/*
	self.query = ko.observable('');

	self.search = ko.computed(function() {
		if(!self.query()) {
			mapMarker.setVisible(false);
			return self.locations();
		} else {
			console.log("Evaluating Search..");
			mapMarker.setVisible(true);
			return ko.utils.arrayFilter(self.locations(), function(location) {
				return location.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
			});
		}
	});
	*/
};

// Make the viewModel go!
ko.applyBindings(new viewModel());


/*
// ----------- Map ----------- //
var map, infowindow, marker, mapOptions;
var markersArray = [];
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

function initMarkers() {
	var self = this;
	self.markers = ko.observableArray();

	for (var i = 0; i < locationData.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locationData[i].lat, locationData[i].lng),
			animation: google.maps.Animation.DROP,
			title: '<p>' + locationData[i].name + '</p>',
			visible: true,
			map: map
		});
		self.markers.push(marker);
		marker.addListener('click', toggleBounce);
		console.log(self.markers);
	}

	function toggleBounce() {
		if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

}

initMarkers();


	/*
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
		console.log(markersArray);
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
	});

};
*/

// ----------- AJAX ----------- //

// Foursquare


/*
var config = {
    apiKey: 'XXXXXXXXXXXXXX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/'
  };

 */





// Uber
var uberClientID = 'cjKN8yPx-XUsLw1Z77bywimofddFMaDQ',
uberServerToken = 'fOLxOsSYP0wFnCeJE8mV1KZSS5643TNaWuqnuPWT';



// Store the latitude and longitude
var userLatitude, userLongitude,
partyLatitude, partyLongitude;

userLongitude = 40.7127;
userLongitude = -74.0059;

partyLatitude = locationData[0].lat;
partyLongitude = locationData[0].lng;




	//Query UBER API if needed
	getEstimatesForUserLocation(userLatitude, userLongitude);


function getEstimatesForUserLocation(latitude, longitude) {
	$.ajax({
		url: "https://api.uber.com/v1/estimates/price",
		headers: {
			Authorization: "Token " + uberServerToken
		},
		dataType: "jsonp",
		data: {
			start_latitude: latitude,
			start_longitude: longitude,
			end_latitude: partyLatitude,
			end_longitude: partyLongitude
		},
		success: function(result) {
			console.log(result);
		}
	});
}

/*
$.ajax({
	dataType: "json",
	url: 'https://api.uber.com/v1/products',
	data: {latitude: 40.7127 , longitude: -74.0059},
	sucess: success
});

function loadData() {
	var $uber = $('#uber');

	// clear out data
	$uber.text('');

	baseURL = 'https://api.uber.com/v1/products?';


	// load UBER API
	var xhr = new XMLHttpRequest();
	xhr.setRequestHeader('Authorization', 'Token fOLxOsSYP0wFnCeJE8mV1KZSS5643TNaWuqnuPWT');
	xhr.open('GET', 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823');

	$getJSON();


}*/