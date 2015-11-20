a = getUberForUserLocation(locationData[0].lat, locationData[0].lng); // Passing in lat and lng of one location for test purposes
console.log(a);

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
      result = result.products;
      var uberResults = '';
      for (var i = 0; i < result.length; i++) {
        name = result[i].display_name;
        image = result[i].image;

        if (result[i].price_details !== null) {
          priceDetails = result[i].price_details;
          costMin = priceDetails.cost_per_minute;
          costDistance = priceDetails.cost_per_distance;
          minFare = priceDetails.minimum;
          //console.log(name, image, costMin, costDistance, minFare);
        }
        uberResults += '<div>';
        uberResults += '<h6>' + 'Service: ' + name + '</h6>';
        uberResults += '<img src="'+ image + '">';
        uberResults += '<h6>' + 'Cost per minute: $' + costMin + '</h6>';
        uberResults += '<h6>' + 'Cost per mile: $' + costDistance + '</h6>';
        uberResults += '<h6>' + 'Minimumin Fare: $'+ minFare + '</h6>';
        uberResults += '</div>';
      }
      console.log(uberResults);
      return result; // This is my return statment for the callback function

    },
    error: function(error) {
      console.log("Uber cannot be contacted");
    }

  });

  function callback(result) {
    //erase this!
  }
  return latitude, longitude;
}
