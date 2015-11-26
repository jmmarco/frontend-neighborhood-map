# Neighborhood Map
This is an application that helps you find local business and places in your local neighborhood

Initially you will see all the favorite locations listed. You can use the search bar to look for a specific venue.
Additionally you can search by typing keywords
Every time you highlight a venue, it will bounce on the map to help you pin point it's location.

API's

- Foursquare API
This returns the available venue information for a given location
The results can be visualized in a target Info Window

- Wikipedia API
Returns a list of articles that closely match each venue
The results will appear as a floating box that is scrollable

Requirements:
- [Node](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/getting-started/installing-node)


## Installation
1. Clone the repository: `git clone repository_name.git`
2. run: `npm install`
This will install all the required dependencies automatically for you

## How to run:
1. To run the project run `grunt`, This will build the project and launch it automatically for you in your default Browser
3. The application will open in a new window

Tip: If you need to stop the server hit "CTRL + C"
You can reactivate the server running the standalone task:
```
grunt connect
```

### Dependencies:
- Grunt
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
- [Add delay to Bootstrap popover events](http://stackoverflow.com/questions/19397636/popover-delay-at-bootstrap-doesnt-work)


### Questions 1 on 1 with Udacity Coach

- Separation of concerns, viewModel, map Function etc - KO Computed (when to use them)
- Markers, do I need to define a marker variable on each hardcoded location?
- Async scripts all have to be async, which ones do I want to defer?
- How to make the list appear over the MAP (css)?
