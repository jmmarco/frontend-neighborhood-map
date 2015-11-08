// ----------- Locations ----------- //
var locationData = [{
  name: 'Comedy Cellar',
  lat: 40.730219,
  lng: -74.00057400000003,
  marker: null
}, {
  name: 'Carolines on Brodway',
  lat: 40.761051,
  lng: -73.98407299999997,
  marker: null
}, {
  name: 'Ben\'s Pizzeria',
  lat: 40.730392,
  lng: -74.00032399999998,
  marker: null
}, {
  name: 'Billy\'s Bakery',
  lat: 40.717715,
  lng: -74.00447600000001,
  marker: null
}, {
  name: 'Asuka Sushi',
  lat: 40.745232,
  lng: -73.99894899999998,
  marker: null
}, {
  name: 'Joe\'s Pizza',
  lat: 40.730559,
  lng: -74.00216799999998,
  marker: null
}, {
  name: 'Bryant Park',
  lat: 40.753596,
  lng: -73.98323299999998,
  marker: null
}, {
  name: 'Central Park',
  lat: 40.782865,
  lng: -73.96535499999999,
  marker: null
}, {
  name: 'Prospect Park',
  lat: 40.660204,
  lng: -73.96895599999999,
  marker: null
}, {
  name: 'Wythe Hotel',
  lat: 40.721994,
  lng: -73.95792599999999,
  marker: null
}];


// ----------- View Model ----------- //
var viewModel = function() {
  var self = this;

  mapOptions = {
    zoom: 12,
    center: {
      lat: 40.7127,
      lng: -74.0059
    },
  };

  self.map = new google.maps.Map(document.getElementById('map'), mapOptions);


  self.allLocations = [];
  locationData.forEach(function(venue) {
    self.allLocations.push(new Venue(venue));
  });


  self.allLocations.forEach(function(venue) {
    var contentString = '<div>' + venue.name + '</div>';
    contentString += '<h3>API stuff goes here..</h3>';
    contentString += '<h6>' + venue.coordinates.lat + ',' + venue.coordinates.lng + '</h6>';
    // This is not over yet! -_-
    contentString += getUberForUserLocation(venue.coordinates.lat, venue.coordinates.lng); // <-- Why is this undefined?
    console.log(getUberForUserLocation(venue.coordinates.lat, venue.coordinates.lng)); // <-- Why is this undefined?



    venue.infowindow = new google.maps.InfoWindow({
      position: venue.coordinates,
      content: contentString
    });


    var markerOptions = {
      map: self.map,
      position: venue.coordinates,
      animation: google.maps.Animation.DROP,
      title: venue.name
    };
    // Add event listener
    venue.marker = new google.maps.Marker(markerOptions);
    venue.marker.addListener('click', toggleBounce);

    // Add Google's toggle Bounce
    function toggleBounce() {
      if (venue.marker.getAnimation() !== null) {
        venue.marker.setAnimation(null);
      } else {
        venue.infowindow.close(); // This doesn't work - FIX
        venue.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          venue.marker.setAnimation(null);
          venue.infowindow.setContent(contentString);
          venue.infowindow.open(self.map, venue.marker);
        }, 1000);
      }
    }

  });

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
      }
    });

    self.visibleVenues().forEach(function(venue) {
      venue.marker.setVisible(true);
    });
  };

  // Helper function to create each venue
  function Venue(data) {
    this.name = data.name;
    //console.log(this.name);
    this.coordinates = {
      lat: data.lat,
      lng: data.lng
    };
    //console.log(this.coordinates);

    // save  a reference to venue's map marker
    this.marker = null;
  }

};


// ----------- AJAX ----------- //

// Uber
var uberClientID = 'cjKN8yPx-XUsLw1Z77bywimofddFMaDQ',
  uberServerToken = 'fOLxOsSYP0wFnCeJE8mV1KZSS5643TNaWuqnuPWT';

//Query UBER API if needed
//getUberForUserLocation(locationData[0].lat, locationData[0].lng); // Passing in lat and lng of one location for test purposes

function getUberForUserLocation(latitude, longitude) {
  $.ajax({
    url: "https://api.uber.com/v1/products",
    headers: {
      Authorization: "Token " + uberServerToken
    },
    dataType: "json",
    data: {
      latitude: latitude,
      longitude: longitude
    },
    success: function(result) {
      //console.log(result);
      callback(result.products);
      console.log(callback(result.products)); // <-- Up to here I get the results I need
      //console.log(result.products);
    },
    error: function(error) {
      console.log("Uber cannot be contacted");
    }

  });

  function callback(result) {
    //console.log(result.length);
    var uberResults = '';
    for (var i = 0; i < result.length; i++) {
      name = result[i].display_name;
      image = result[i].image;

      if (result[i].price_details !== null) {
        priceDetails = result[i].price_details;
        costMin = priceDetails.cost_per_minute;
        costDistance = priceDetails.cost_per_distance;
        minFare = priceDetails.minimum;
        //console.log(name, image, costMin, costDistance, minPrice);
      }
      uberResults += '<div>';
      uberResults += '<h6>' + 'Service: ' + name + '</h6>';
      uberResults += '<img src="'+ image + '">';
      uberResults += '<h6>' + 'Cost per minute: $' + costMin + '</h6>';
      uberResults += '<h6>' + 'Cost per mile: $' + costDistance + '</h6>';
      uberResults += '<h6>' + 'Minimumin Fare: $'+ minFare + '</h6>';
      uberResults += '</div>';
      //console.log(uberResults);
    }
    //console.log(uberResults);
    return(uberResults);
  }
}

// Make the viewModel go!
ko.applyBindings(new viewModel());
