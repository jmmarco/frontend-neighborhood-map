var locationData=[{name:"Comedy Cellar",tag:"comedy",lat:40.730219,lng:-74.00057400000003,type:"comedy"},{name:"Carolines on Broadway",tag:"comedy",lat:40.761051,lng:-73.98407299999997,type:"comedy"},{name:"Ben's Pizzeria",tag:"pizza",lat:40.730392,lng:-74.00032399999998,type:"food"},{name:"Billy's Bakery",tag:"bakery",lat:40.717715,lng:-74.00447600000001,type:"food"},{name:"Asuka Sushi",tag:"sushi",lat:40.745232,lng:-73.99894899999998,type:"food"},{name:"Joe's Pizza",tag:"pizza",lat:40.730559,lng:-74.00216799999998,type:"food"},{name:"Bryant Park",tag:"park",lat:40.753596,lng:-73.98323299999998,type:"park"},{name:"Central Park",tag:"park",lat:40.782865,lng:-73.96535499999999,type:"park"},{name:"Prospect Park",tag:"park",lat:40.660204,lng:-73.96895599999999,type:"park"},{name:"Wythe Hotel",tag:"hotel",lat:40.721994,lng:-73.95792599999999,type:"hotel"}],viewModel=function(){function a(a){var b=this;b.name=a.name,b.coordinates={lat:a.lat,lng:a.lng},b.type=a.type,b.address=null,b.phone=null,b.url=null,b.apiError=null}var b,c,d,e,f=this,g={zoom:12,center:{lat:40.7236458,lng:-73.9500978},disableDefaultUI:!0,scaleControl:!1},h="http://maps.google.com/mapfiles/ms/icons/",i={hotel:{name:"Hotel",icon:h+"pink-dot.png"},food:{name:"Food",icon:h+"orange-dot.png"},park:{name:"Parks",icon:h+"green-dot.png"},comedy:{name:"Comedy Clubs",icon:h+"purple-dot.png"}},j=document.getElementById("legend");for(var k in i)b=i[k],c=b.name,d=b.icon,e=document.createElement("div"),e.innerHTML='<img src="'+d+'"> '+c,j.appendChild(e);f.map=new google.maps.Map(document.getElementById("map"),g),f.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(j),f.infoWindow=new google.maps.InfoWindow,f.infoWindow.addListener("closeclick",function(){f.map.setZoom(12)}),f.allLocations=[],locationData.forEach(function(b){f.allLocations.push(new a(b))}),f.allLocations.forEach(function(a){var b={map:f.map,position:a.coordinates,animation:google.maps.Animation.DROP,title:a.name,icon:i[a.type].icon};a.marker=new google.maps.Marker(b),a.marker.addListener("click",function(){f.clickHandler(a)})}),f.clickHandler=function(a){f.map.setZoom(16),f.map.panTo(a.coordinates),f.infoWindow.setContent(f.contentBox(a)),f.infoWindow.open(f.map,a.marker),f.wikipedia(a),function(){null!==a.marker.getAnimation()?a.marker.setAnimation(null):(a.marker.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){a.marker.setAnimation(null)},700)),setTimeout(function(){f.infoWindow.close(),f.map.setZoom(12),f.map.panTo(g.center),$("#wikipedia").empty()},5e3)}()},f.contentBox=function(a){for(var b,c=[a.name,a.address,a.phone,a.url,a.twitter,a.apiError],d=0;d<c.length;d++)void 0===c[d]&&(c[d]="Not provided");return null===a.apiError?(b='<div id="box">',b+="<h2>"+c[0]+"</h2>",b+="<h5>Venue Information provided by: </h5>",b+='<img id="foursquare" src="images/foursquare-wordmark.png" alt="foursqaure logo">',b+='<h6><i class="fa fa-map-marker fa-lg"></i>  '+c[1]+"</h6>",b+='<h6><i class="fa fa-phone fa-lg"></i>  '+c[2]+"</h6>",b+='<h6><i class="fa fa-home fa-lg"></i></i>  '+c[3]+"</h6>",b+='<h6><i class="fa fa-twitter fa-lg"></i>  '+c[4]+"</h6>",b+="</div>"):(b=b='<div id="box">',b+="<h2>"+c[0]+"</h2>",b+='<img id="foursquare" src="images/foursquare-wordmark.png" alt="foursqaure logo">',b+='<h4><i class="fa fa-exclamation-triangle fa-lg"></i>'+a.apiError+"</h4>",b+="<h5>Check your internet connection</h5>",b+="</div>"),b},f.visibleVenues=ko.observableArray(),f.allLocations.forEach(function(a){f.visibleVenues.push(a)}),f.userInput=ko.observable(""),f.filterMarkers=function(){var a=f.userInput().toLowerCase();f.visibleVenues.removeAll(),f.allLocations.forEach(function(b){b.marker.setVisible(!1),-1!==b.name.toLowerCase().indexOf(a)&&(f.visibleVenues.push(b),b.marker.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){b.marker.setAnimation(null)},700))}),f.visibleVenues().forEach(function(a){a.marker.setVisible(!0)})},f.wikipedia=function(a){wHeader='<li class="list-group-item">Wikipedia Articles<i class="fa fa-wikipedia-w fa-2x"></i></li>',$("#wikipedia").append(wHeader);var b="http://en.wikipedia.org/w/api.php?action=opensearch&search="+a.name+"&format=json&callback=wikiCallback";$.ajax({timeout:1e3,error:function(){console.log("The request timed out"),$("#wikipedia").text("Failed to get Wikipedia resources")},url:b,dataType:"jsonp",success:function(a){var b,c=a[1];if(console.log(c.length),0!==c.length)for(var d=0;d<c.length;d++){b=c[d];var e="http://en.wikipedia.org/wiki/"+b;wResults='<li class="list-group-item"><a href="'+e+' target="_blank">'+b+"</a></li>",$("#wikipedia").append(wResults)}else console.log("ITS ALIVE"),$("#wikipedia").append('<li class="list-group-item">No results available</li>')}})},function(){f.allLocations.forEach(function(a){var b={clientId:"C5SM22PLTAYUAFJZP0YGUJCL0KKHD4U2PAMFEEKF3KGNSTEL",clientSecret:"ZY0KAMOMLB13YYA55ZKJPZAUFL5L3O3HVKWCM2ZRIVW1GOZW",authUrl:"https://foursquare.com/",apiUrl:"https://api.foursquare.com/v2/venues/search",version:"v=20140806",error:"The Foursquare API could not be reached"};$.ajax({url:b.apiUrl,data:"client_id="+b.clientId+"&client_secret="+b.clientSecret+"&"+b.version+"&ll="+a.coordinates.lat+","+a.coordinates.lng,dataType:"json",success:function(b){results=b.response.venues;for(var d=0;d<results.length;d++)orignalName=a.name.toLowerCase(),foursquareName=results[d].name.toLowerCase(),foursquareName===orignalName&&(c=results[d].name,a.url=results[d].url,a.phone=results[d].contact.formattedPhone,a.address=results[d].location.address,a.twitter=twitter=results[d].contact.twitter)},error:function(c){a.apiError=b.error}})})}()};ko.applyBindings(new viewModel);