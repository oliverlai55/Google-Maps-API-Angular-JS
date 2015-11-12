//Angular App Module and controller
angular.module('myApp',[]).controller('mapCtrl',function($scope){

	var mapOptions = {
		zoom: 4,
		//center of the us
		center: new google.maps.LatLng(40.0000, -98.0000)
	};

	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	$scope.markers = [];

	var infoWindow = new google.maps.InfoWindow();

	// createMarker Function

	var createMarker = function(city, index){
	

		var latLon = city.latLon.split(',');
		var lat = latLon[0];
		var lon = latLon[1];
		console.log(latLon);
		console.log(lat);
		console.log(lon);

		var marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(lat, lon),
			title: city.city,
			icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFE7569'
		});

	   markerContentHTML = '<div class="infoWindowContent">';
       markerContentHTML += '<div class="total-pop">Total Population: ' + city.yearEstimate + '</div>';
       markerContentHTML += '<div class="pop-dens-last-year">2010 Census: ' + city.lastCensus + '</div>';
       markerContentHTML += '<div class="pop-change">Population Change %: ' + city.change + '</div>';
       markerContentHTML += '<div class="pop-dens">Population Density: ' + city.lastPopDensity + '</div>';
       markerContentHTML += '<div class="state">State: ' + city.state + '</div>';
       markerContentHTML += '<div class="land-area">Land Area: ' + city.landArea + '</div>';
       markerContentHTML += '<a href="#" onclick="getDirections('+lat+','+lon+')">Get directions</a>';
       markerContentHTML += '</div>';

       marker.content = markerContentHTML;

       google.maps.event.addListener(marker, 'click', function(){
       		infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
       		infoWindow.open($scope.map, marker);
       });
	}
	$scope.cities = cities;
	for (i = 0; i < cities.length; i++){
		createMarker(cities[i],i)
	}
});