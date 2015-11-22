# Neighborhood Map
This is an application that helps you find local business and places in your local neighborhood

API's

- Foursquare API
This returns the available venue information for a given location
- Wikipedia API
Returns a list of articles that closely match each venue

Requirements:
- Node
- Grunt


## How to run:
1. Clone the repository - `git clone repository_name.git`
2. To run the project run `grunt default`, This will build the project and launch it automatically for you in your default Browser
3. The application will open in a new window

Tip: If you need to stop the server hit "CTRL + C"
You can reactivate the server running the standalone task:
```
grunt connect
```

### Dependencies:
- KnockoutJS
- Google Maps API
- jQuery
- Bootstrap


### Acknowledgments

- [Live Search with Knockout.js](http://opensoul.org/2011/06/23/live-search-with-knockoutjs/)
- [Simple Search with KO by JohnMav](http://codepen.io/JohnMav/pen/OVEzWM/)
- [Define map variables outside of map function](https://discussions.udacity.com/t/getting-markers-to-display-on-google-maps/13736/4)
- [Relate markers to each location](https://discussions.udacity.com/t/i-cant-get-the-markers-to-change-based-on-the-search-query/15443/5)
- [Remove markers](https://developers.google.com/maps/documentation/javascript/examples/marker-remove)
- [Defining Locations for Map](https://discussions.udacity.com/t/defining-locations-for-map/33823/5)
- [Configure a persistent web server with Grunt](http://danburzo.ro/grunt/chapters/server/)
- [Customizing Google Maps: Custom Markers](https://developers.google.com/maps/tutorials/customizing/custom-markers#customize_marker_icons_for_different_markers)
- [Inspiration for click handler](https://github.com/tomsmoker/NeighbourhoodMap/blob/master/js/app.js)


### Questions 1 on 1 with Udacity Coach

- Separation of concerns, viewModel, map Function etc - KO Computed (when to use them)
- Markers, do I need to define a marker variable on each hardcoded location?
- Async scripts all have to be async, which ones do I want to defer?
- How to make the list appear over the MAP (css)?
