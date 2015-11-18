// ----------- Locations ----------- //
var locationData = [{
    name: 'Comedy Cellar',
    tag: 'comedy',
    lat: 40.730219,
    lng: -74.00057400000003,
    marker: null
}, {
    name: 'Carolines on Brodway',
    tag: 'comedy',
    lat: 40.761051,
    lng: -73.98407299999997,
    marker: null
}, {
    name: 'Ben\'s Pizzeria',
    tag: 'pizza',
    lat: 40.730392,
    lng: -74.00032399999998,
    marker: null
}, {
    name: 'Billy\'s Bakery',
    tag: 'bakery',
    lat: 40.717715,
    lng: -74.00447600000001,
    marker: null
}, {
    name: 'Asuka Sushi',
    tag: 'sushi',
    lat: 40.745232,
    lng: -73.99894899999998,
    marker: null
}, {
    name: 'Joe\'s Pizza',
    tag: 'pizza',
    lat: 40.730559,
    lng: -74.00216799999998,
    marker: null
}, {
    name: 'Bryant Park',
    tag: 'park',
    lat: 40.753596,
    lng: -73.98323299999998,
    marker: null
}, {
    name: 'Central Park',
    tag: 'park',
    lat: 40.782865,
    lng: -73.96535499999999,
    marker: null
}, {
    name: 'Prospect Park',
    tag: 'park',
    lat: 40.660204,
    lng: -73.96895599999999,
    marker: null
}, {
    name: 'Wythe Hotel',
    tag: 'hotel',
    lat: 40.721994,
    lng: -73.95792599999999,
    marker: null
}];


// ----------- View Model ----------- //
var viewModel = function() {
    // Create a reference to 'this'
    var self = this;

    // Constructor function for each venue
    function Venue(data) {
        var self = this;
        self.name = data.name;
        self.coordinates = {
            lat: data.lat,
            lng: data.lng
        };
        self.tag = data.tag;
        self.marker = null; // I don't think I really need these here
        self.infoWindow = null; // I don't think I really need these here
        //console.log(self.coordinates, self.tag, self.name, self.marker, self.infoWindow);
    }


    // Set the options for the map
    var mapOptions = {
        zoom: 17,
        center: {
            lat: 40.7289325,
            lng: -73.998362
        },
    };


    // Create the map
    self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Create the InfoWindow
    self.infoWindow = new google.maps.InfoWindow();


    // Create an array to hold each venue
    self.allLocations = [];
    locationData.forEach(function(venue) {
        self.allLocations.push(new Venue(venue));
    });
    //console.log(self.allLocations);

    self.allLocations.forEach(function(venue) {
        // Set the options for the marker
        var markerOptions = {
            map: self.map,
            position: venue.coordinates,
            animation: google.maps.Animation.DROP,
            title: venue.name
        };

        console.log(venue.coordinates.lat);
        // Create the marker
        venue.marker = new google.maps.Marker(markerOptions);

        // Add a 'click' event listener for each marker
        venue.marker.addListener('click', function(){
            self.clickHandler(venue);
            self.foursquare(venue);
        });




    });


    // Create a click handler function (helps keep things clean)
    self.clickHandler = function(venue) {

        // Zoom in a bit
        self.map.setZoom(18);

        // Pan to coordinates
        self.map.panTo(venue.coordinates);

        // Set the Info Window
        self.infoWindow.open(self.map, venue.marker);

        // Use an IIFE to make markers dance ^_^
        (function() {
            if (venue.marker.getAnimation() !== null) {
                venue.marker.setAnimation(null);
            } else {
                venue.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    venue.marker.setAnimation(null);
                }, 700); // Default timeout that Google Maps uses for it's markers
            }
            // Close Info Window Automatically after 2 seconds // UX Note: This might be annoying for some users
            setTimeout(function() {
                self.infoWindow.close();
            }, 2000);
        })();

    };




    // Beign with Knockout Stuff
    self.visibleVenues = ko.observableArray();

    self.allLocations.forEach(function(venue) {
        self.visibleVenues.push(venue);
    });

    self.userInput = ko.observable('');

    self.filterMarkers = function() {
        var searchInput = self.userInput().toLowerCase();
        self.visibleVenues.removeAll();

        self.allLocations.forEach(function(venue) {
            venue.marker.setVisible(false);

            if (venue.name.toLowerCase().indexOf(searchInput) !== -1 || venue.tag.toLowerCase().indexOf(searchInput) !== -1) {
                self.visibleVenues.push(venue);
            }
        });

        self.visibleVenues().forEach(function(venue) {
            venue.marker.setVisible(true);
        });
    };



    // ----------- AJAX ----------- //

    self.foursquare = function(venue) {
        // Foursquare
        // https://api.foursquare.com/v2/venues/search?client_id=C5SM22PLTAYUAFJZP0YGUJCL0KKHD4U2PAMFEEKF3KGNSTEL&client_secret=ZY0KAMOMLB13YYA55ZKJPZAUFL5L3O3HVKWCM2ZRIVW1GOZW&v=20130815%20&ll=40.7,-74%20&query=sushi

        var config = {
            clientId: 'C5SM22PLTAYUAFJZP0YGUJCL0KKHD4U2PAMFEEKF3KGNSTEL',
            clientSecret: 'ZY0KAMOMLB13YYA55ZKJPZAUFL5L3O3HVKWCM2ZRIVW1GOZW',
            authUrl: 'https://foursquare.com/',
            apiUrl: 'https://api.foursquare.com/v2/venues/search',
            version: 'v=20140806'
        };

        $.ajax({
            url: config.apiUrl,
            data: 'client_id=' + config.clientId + '&' + 'client_secret=' + config.clientSecret + '&' + config.version + '&' + 'll=' + venue.coordinates.lat + ',' + venue.coordinates.lng,
            dataType: 'json',

            success: function(data) {
                console.log(data.response.venues);
                results = data.response.venues;
                for (var i = 0; i < results.length; i++){
                    if (results[i].name === venue.name){
                        console.log(results[i].name);
                        console.log(results[i].url);
                        console.log(results[i].contact.formattedPhone);
                        console.log(results[i].location.address);
                        console.log(results[i].contact.twitter);

                    } else {
                        console.log("No Matches Found");
                    }

                }
            },
            error: function(data) {
                console.log(data);
            }

        });

    };

};




// Uber
var uberClientID = 'cjKN8yPx-XUsLw1Z77bywimofddFMaDQ',
    uberServerToken = 'fOLxOsSYP0wFnCeJE8mV1KZSS5643TNaWuqnuPWT';

//Query UBER API if needed

$.ajax({
    url: "https://api.uber.com/v1/products",
    headers: {
        Authorization: "Token " + uberServerToken
    },
    dataType: "json",
    data: {
        latitude: locationData[0].lat,
        longitude: locationData[0].lng
    },
    success: function(result) {
        result = result.products;
        var uberResults = '';
        for (var i = 0; i < result.length; i++) {
            name = result[i].display_name;
            console.log(name);
            image = result[i].image;

            if (result[i].price_details !== null) {
                var priceDetails = result[i].price_details;
                var costMin = priceDetails.cost_per_minute;
                var costDistance = priceDetails.cost_per_distance;
                var minFare = priceDetails.minimum;

                //zaraza += name + image + costMin + costDistance + minFare;
            }
        }
    },
    error: function(error) {
        zaraza += '<h4>' + 'Uber API could not be loaded' + '</h4>';
        console.log("Uber cannot be contacted" + error);
    }

});







// Make the viewModel go!
ko.applyBindings(new viewModel());



function callback(result) {
    result = result.products;
    var uberResults = [];
    for (var i = 0; i < result.length; i++) {
        name = result[i].display_name;
        console.log(name);
        image = result[i].image;

        if (result[i].price_details !== null) {
            var priceDetails = result[i].price_details;
            var costMin = priceDetails.cost_per_minute;
            var costDistance = priceDetails.cost_per_distance;
            var minFare = priceDetails.minimum;

            uberResults = [name, image, costMin, costDistance, minFare];
            $('#uber').html(uberResults);
        }
    }
    return uberResults;
}
