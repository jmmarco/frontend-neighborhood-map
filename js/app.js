// ----------- Locations ----------- //

var locationData = [{
    name: 'Comedy Cellar',
    lat: 40.730219,
    lng: -74.00057400000003,
    type: 'comedy'
}, {
    name: 'Carolines on Broadway',
    lat: 40.761051,
    lng: -73.98407299999997,
    type: 'comedy'
}, {
    name: 'Ben\'s Pizzeria',
    lat: 40.730392,
    lng: -74.00032399999998,
    type: 'food'
}, {
    name: 'Billy\'s Bakery',
    lat: 40.717715,
    lng: -74.00447600000001,
    type: 'food'
}, {
    name: 'Asuka Sushi',
    lat: 40.745232,
    lng: -73.99894899999998,
    type: 'food'
}, {
    name: 'Joe\'s Pizza',
    lat: 40.730559,
    lng: -74.00216799999998,
    type: 'food'
}, {
    name: 'Bryant Park',
    lat: 40.753596,
    lng: -73.98323299999998,
    type: 'park'
}, {
    name: 'Central Park',
    lat: 40.782865,
    lng: -73.96535499999999,
    type: 'park'
}, {
    name: 'Prospect Park',
    lat: 40.660204,
    lng: -73.96895599999999,
    type: 'park'
}, {
    name: 'Wythe Hotel',
    lat: 40.721994,
    lng: -73.95792599999999,
    type: 'hotel'
}];


// Wrap the View Model in a function for async load
function initMap() {

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
            self.type = data.type;

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
                lat: 40.7236538,
                lng: -73.9595663
            },
            disableDefaultUI: true,
            scaleControl: false
        };

        // Create a icon storage for markers
        var iconBase = 'http://maps.google.com/mapfiles/ms/icons/';
        var icons = {
            hotel: {
                name: 'Hotel',
                icon: iconBase + 'pink-dot.png'
            },
            food: {
                name: 'Food',
                icon: iconBase + 'orange-dot.png'
            },
            park: {
                name: 'Parks',
                icon: iconBase + 'green-dot.png'
            },
            comedy: {
                name: 'Comedy',
                icon: iconBase + 'purple-dot.png'
            }
        };

        // Append each legend type to the div
        var legend = document.getElementById('legend');
        var type, name, icon, div;
        for (var key in icons) {
            type = icons[key];
            name = type.name;
            icon = type.icon;
            div = document.createElement('div');
            div.innerHTML = '<img src="' + icon + '"> ' + name;
            legend.appendChild(div);
        }

        // Display popover tip
        $(document).ready(function() {
            $('[data-toggle="popover"]').popover();
        });


        $('input').popover({
            title: 'Search hint:',
            content: 'Search by typing the name of a venue or a keyword like: "food" or "park"',
            placement: 'bottom',
            html: true,
            trigger: 'hover', //<--- you need a trigger other than manual
            delay: {
                show: "100",
                hide: "2500"
            }
        });

        $('input').on('shown.bs.popover', function() {
            setTimeout(function() {
                $('input').popover('hide');
            }, 2500);
        });

        $('#legend').popover({
            title: 'Venue Type',
            content: 'These are the types of venues you can search for',
            placement: 'bottom',
            html: true,
            trigger: 'hover', //<--- you need a trigger other than manual
            delay: {
                show: "100",
                hide: "2500"
            }
        });


        // Create the map
        self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Place the legend inside the map
        self.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);

        // Create the Info Window
        self.infoWindow = new google.maps.InfoWindow();

        // Zoom out when Info Window is closed
        self.infoWindow.addListener('closeclick', function() {
            self.map.setZoom(12);
            self.map.panTo(mapOptions.center);
            $('#wikipedia').empty();

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
                title: venue.name,
                icon: icons[venue.type].icon
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

            // Clear the wikipedia entry from DOM
            $('#wikipedia').empty();

            // Zoom in a bit
            self.map.setZoom(16);

            // Pan to coordinates
            self.map.panTo(venue.coordinates);

            // Set the Info Window
            self.infoWindow.setContent(self.contentBox(venue));

            // Open the Info Window
            self.infoWindow.open(self.map, venue.marker);

            // Call the Panoramio API
            self.wikipedia(venue);

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
                if (details[3] === 'Not provided') {
                    box += '<h6>' + '<i class="fa fa-home fa-lg"></i></i>' + '  ' + details[3] + '</h6>';
                } else {
                    box += '<h6>' + '<i class="fa fa-home fa-lg"></i></i>' + '  ' + '<a href="' + details[3] + '" target="_blank">' + details[3] + '</a>' + '</h6>';
                }
                if (details[4] === 'Not provided') {
                    box += '<h6>' + '<i class="fa fa-twitter fa-lg"></i>' + '  ' + details[4] + '</h6>';
                } else {
                    box += '<h6>' + '<i class="fa fa-twitter fa-lg"></i>' + '  ' + '<a href="http://www.twitter.com/' + details[4] + '" target="_blank">' + details[4] + '</a>' + '</h6>';
                }
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


        // ----------- Knockout JS ----------- //

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

                if ((venue.name.toLowerCase().indexOf(searchInput) !== -1) || (venue.type.toLowerCase().indexOf(searchInput) !== -1)) {
                    $('input').popover('hide');
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

        // ----------- End of Knockout JS ----------- //

        // ----------- AJAX ----------- //

        // Wikipedia API
        self.wikipedia = function(venue) {
            wHeader = '<li class="list-group-item">Wikipedia Articles<i class="fa fa-wikipedia-w fa-2x"></i></li>';
            $('#wikipedia').append(wHeader);

            var wikipediaURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + venue.name + '&format=json&callback=wikiCallback';

            // Make the AJAX request
            $.ajax({
                timeout: 5000, // Cleaner way to handle timeouts. See http://stackoverflow.com/questions/3543683/determine-if-ajax-error-is-a-timeout
                error: function() {
                    console.log("The request timed out");
                    $('#wikipedia').text("Failed to get Wikipedia resources");
                },
                url: wikipediaURL,
                dataType: "jsonp",
                success: function(response) {
                    var articleList = response[1];
                    var articleStr;
                    if (articleList.length !== 0) {
                        for (var i = 0; i < articleList.length; i++) {
                            articleStr = articleList[i];
                            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                            wResults = '<li class="list-group-item"><a href="' + url + ' " ' + ' target="_blank">' + articleStr + '</a></li>';
                            $('#wikipedia').append(wResults);
                        }
                    } else {
                        $('#wikipedia').append('<li class="list-group-item">No results available</li>');
                    }


                }
            });

        };

        // Foursquare API
        (function() {

            self.allLocations.forEach(function(venue) {

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
                            originalName = venue.name.toLowerCase();
                            foursquareName = results[i].name.toLowerCase();

                            // Venue validation
                            if (foursquareName === originalName) {
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

        // ----------- End of AJAX ----------- //

    };
    // ----------- End of View Model ----------- //

    // Make the viewModel go!
    ko.applyBindings(new viewModel());
}
