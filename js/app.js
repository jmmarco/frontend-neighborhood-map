// Store a couple of locations statically
var locations = [
{
	name: 'Comedy Cellar',
	address: '117 Macdougal St'
},
{
	name: 'Carolines on Broadway',
	address: '1626 Broadway'
}

];






// Write the View Model
var viewModel = function() {


};

// Activate knockout.js
ko.applyBindings(new viewModel());





// Put data into an observable array

// Wire data to the view

// Create the Map ^_^ and add map markers

var initMap = function() {
	var geocoder;
	var map;
	var address;
	for (var i in locations) {
		address = locations[i].address;
		console.log(address); // Check console for results
	}

	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(40.7033127, -73.979681);
	var myOptions = {
		zoom: 12,
		center: latlng,
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		mapTypeID: google.maps.MapTypeId.ROADMAP
	};


	map = new google.maps.Map(document.getElementById('map'), myOptions);
	if (geocoder) {
		for (var i in locations) {
		address = locations[i].address;
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
					map.setCenter(results[0].geometry.location);

					var infowindow = new google.maps.InfoWindow({
						content: '<h5>' + address + '</h5>',
						size: new google.maps.Size(150, 50)
					});

					var marker = new google.maps.Marker({
						position: results[0].geometry.location,
						map: map,
						title: address
					});

					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map, marker);
					});

				} else {
					alert("No results found");
				}
			} else {
				alert("Geocode was not successful for the following: " + status);
			}
		});
		}
	}
};

// I called initMap from the <script> tag in index.html, should I call it from within the viewModel instead?
