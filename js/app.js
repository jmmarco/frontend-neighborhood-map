// ----------- Locations ----------- //

var locationData = [{
    name: 'Comedy Cellar',
    tag: 'comedy',
    lat: 40.730219,
    lng: -74.00057400000003,
    marker: null
}, {
    name: 'Carolines on Broadway',
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
        // To be populated by Foursquare API
        self.address = null;
        self.phone = null;
        self.url = null;
        self.apiError = null;

    }


    // Set the options for the map
    var mapOptions = {
        zoom: 12,
        center: {
            lat: 40.7289325,
            lng: -73.998362
        },
        disableDefaultUI: true
    };


    // Create the map
    self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Create the Info Window
    self.infoWindow = new google.maps.InfoWindow();

    // Zoom out when Info Window is closed
    self.infoWindow.addListener('closeclick', function() {
        self.map.setZoom(12);
    });


    // Create an array to hold each venue
    self.allLocations = [];

    // Push all the venues into the new array
    locationData.forEach(function(venue) {
        self.allLocations.push(new Venue(venue));
    });

    // Create a marker for each venue
    self.allLocations.forEach(function(venue) {
        // Set the options for the marker
        var markerOptions = {
            map: self.map,
            position: venue.coordinates,
            animation: google.maps.Animation.DROP,
            title: venue.name
        };

        // Create the marker
        venue.marker = new google.maps.Marker(markerOptions);

        // Add event listener for each marker
        venue.marker.addListener('click', function() {
            self.clickHandler(venue);
        });
    });


    // Create a click handler function (helps keep things clean)
    self.clickHandler = function(venue) {

        // Zoom in a bit
        self.map.setZoom(16);

        // Pan to coordinates
        self.map.panTo(venue.coordinates);

        // Set the Info Window
        self.infoWindow.setContent(self.contentBox(venue));

        // Open the Info Window
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
            // Close Info Window Automatically after 5 seconds // UX Note: This might be annoying for some users
            setTimeout(function() {
                self.infoWindow.close();
                self.map.setZoom(12);
            }, 5000);
        })();
    };

    // Create a nice box for Info Window content
    self.contentBox = function(venue) {

        var details = [venue.name, venue.address, venue.phone, venue.url, venue.twitter, venue.apiError];
        var box;

        // Find any undefined fields and insert appropiate message
        for (var i = 0; i < details.length; i++) {
            if (details[i] === undefined) {
                details[i] = 'Not provided';
            }
        }

        // Check if the venue information was populated
        if (venue.apiError === null) {
            box = '<div id="box">';
            box += '<h2>' + details[0] + '</h2>';
            box += '<h5>' + 'Venue Information provided by: ' + '</h5>';
            box += '<img id="foursquare" src="images/foursquare-wordmark.png" alt="foursqaure logo">';
            box += '<h6>' + '<i class="fa fa-map-marker fa-lg"></i>' + '  ' + details[1] + '</h6>';
            box += '<h6>' + '<i class="fa fa-phone fa-lg"></i>' + '  ' + details[2] + '</h6>';
            box += '<h6>' + '<i class="fa fa-home fa-lg"></i></i>' + '  ' + details[3] + '</h6>';
            box += '<h6>' + '<i class="fa fa-twitter fa-lg"></i>' + '  ' + details[4] + '</h6>';
            box += '</div>';
        } else {
            box = box = '<div id="box">';
            box += '<h2>' + details[0] + '</h2>';
            box += '<img id="foursquare" src="images/foursquare-wordmark.png" alt="foursqaure logo">';
            box += '<h4>' + '<i class="fa fa-exclamation-triangle fa-lg"></i>' + venue.apiError + '</h4>';
            box += '<h5>' + 'Check your internet connection' + '</h5>';
            box += '</div>';
        }
        return box;
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

            if (venue.name.toLowerCase().indexOf(searchInput) !== -1) {
                self.visibleVenues.push(venue);
                venue.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    venue.marker.setAnimation(null);
                }, 700);
            }
        });

        self.visibleVenues().forEach(function(venue) {
            venue.marker.setVisible(true);
        });
    };

    // ----------- AJAX ----------- //

    (function() {

        self.allLocations.forEach(function(venue) {

            // Store the required configuration
            var config = {
                clientId: 'C5SM22PLTAYUAFJZP0YGUJCL0KKHD4U2PAMFEEKF3KGNSTEL',
                clientSecret: 'ZY0KAMOMLB13YYA55ZKJPZAUFL5L3O3HVKWCM2ZRIVW1GOZW',
                authUrl: 'https://foursquare.com/',
                apiUrl: 'https://api.foursquare.com/v2/venues/search',
                version: 'v=20140806',
                error: 'The Foursquare API could not be reached'
            };

            // Make the AJAX request
            $.ajax({
                url: config.apiUrl,
                data: 'client_id=' + config.clientId + '&' + 'client_secret=' + config.clientSecret + '&' + config.version + '&' + 'll=' + venue.coordinates.lat + ',' + venue.coordinates.lng,
                dataType: 'json',

                success: function(data) {
                    // Put Foursquare response into a variable
                    results = data.response.venues;

                    // Iterate through those results
                    for (var i = 0; i < results.length; i++) {

                        // Make names lowercase
                        orignalName = venue.name.toLowerCase();
                        foursquareName = results[i].name.toLowerCase();

                        console.log('Original name: ', orignalName);
                        console.log('Foursquare name: ', foursquareName);
                        // Venue validation
                        if (foursquareName === orignalName) {
                            name = results[i].name;
                            venue.url = results[i].url;
                            venue.phone = results[i].contact.formattedPhone;
                            venue.address = results[i].location.address;
                            venue.twitter = twitter = results[i].contact.twitter;

                        }
                    }
                },
                error: function(data) {
                    // Raise an error if Foursquare can not be reached
                    venue.apiError = config.error;
                }

            });

        });
    })();

};


// Make the viewModel go!
ko.applyBindings(new viewModel());
