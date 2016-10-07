// Modèle objet : personnage//
function Personnage(name, age, race, job, local){
	this.name = name;
	this.age = age;
	this.race = race;
	this.job = job;
	this.local = local;
}
var judy = new Personnage("Judy", 20, "rabbit", "police officier", "48.44161, 1.48616");//rue de Chateaudun
var nick = new Personnage("Nick", 22, "fox", "con artist", "48.4469, 1.49898");//rue d'Ablis
var koslov = new Personnage("Koslov", 30, "polar bear", "bodyguard", "48.43905, 1.51095");// 5 avenue François Mitterand
var bellwether = new Personnage("Bellwether", 28, "sheep", "assistant mayor", "48.44473, 1.48175");//10 Rue de Babylone
var duke = new Personnage("Duke", 20, "weasel", "robber", "48.44782, 1.48583");//9 rue henry IV
var doug = new Personnage("Doug", 30, "sheep", "chimist", "48.45195, 1.48606");//1 avenue d'Alsace Lorraine
//Lancement de la page
var tabPerso = [judy, nick, koslov, bellwether, duke, doug];

$(document).ready(function(){

	//api meteo//
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?id=3026467&APPID=77a1e1e03567dd2bb3bf59e8080ea04c",
		datatype:"Json",
		success: function (meteo){

			if (meteo.weather[0].main == 'Rain'){
				$('#meteo').text('renard');
				$('#icon').attr('src','img/pluie.png')
			}else{
				$('#meteo').text('lapin')
				$('#icon').attr('src','img/soleil.png')
			}
			console.log(meteo);
			temps(meteo.weather[0].main);
			console.log(meteo.weather[0].main);
		} 
	})
	
	var myMarker = null;
	// Des coordonnées de départ
	var myLatlng = new google.maps.LatLng(48.440028, 1.482639);
 
	// Les options de notre carte
	var myOptions = {
		zoom: 15,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
 
	// On créé la carte
	var myMap = new google.maps.Map(
		document.getElementById('carte'),
		myOptions
	);

	//On déplace le personnage à l'endroit indiqué
	($('#rechercher input')).keypress(function(e) {
		if(e.which == 13) {
			//console.log('jquery ready');
			//console.log(($('#rechercher input').val()));
		// Une variable pour contenir notre future marker
			
	 
			// Des coordonnées de départ
			var myLatlng = new google.maps.LatLng(48.440028, 1.482639);
		 	// Les options de notre carte
			var myOptions = {
				zoom: 15,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		 
			// On créé la carte
			var myMap = new google.maps.Map(
				document.getElementById('carte'),
				myOptions
			);
		 
			// L'adresse que nous allons rechercher
			var GeocoderOptions = {
			    'address' : ($('#rechercher input').val())+ '28000 Chartres',
			    'region' : 'FR'
			}
		 	var myMarker = null;
		 	 this.lattitude = null;
		 	  this.longitude = null;
			// Notre fonction qui traitera le resultat
			function GeocodingResult( results , status )
			{
			  // Si la recher à fonctionné
			  if( status == google.maps.GeocoderStatus.OK ) {
		 
			    // S'il existait déjà un marker sur la map,
			    // on l'enlève
			    if(myMarker != null) {
			      myMarker.setMap(null);
			    }
		 
			    // On créé donc un nouveau marker sur l'adresse géocodée
			    myMarker = new google.maps.Marker({
			      position: results[0].geometry.location,
			      map: myMap,
			      title: "Tu es ici"
			    });
		 
			    // Et on centre la vue sur ce marker
			    myMap.setCenter(results[0].geometry.location);
		 		lattitude = results[0].geometry.location.lat();
		 		longitude = results[0].geometry.location.lng();
		 		$('#lat').val(parseFloat(lattitude));
		 		$('#lng').val(parseFloat(longitude));
			  } // Fin si status OK
		 
			} // Fin de la fonction
		 	for(var i=2;i<tabPerso.length;i++){
			//console.log(($('#lat').val()+ ', ' + $('#lng').val()))
			console.log("Localisation méchant : " +tabPerso[i].local);
			if ((tabPerso[i].local) == (Math.round(($('#lat').val())*100000))/100000 + ', ' + (Math.round(($('#lng').val())*100000))/100000){
				console.log(tabPerso[i] + "a été localisé à l'adresse " + ($('#rechercher input').val()))
				$("#message").html("<p style='color:black;'>" + tabPerso[i].name + " a été localisé à l'adresse " + ($('#rechercher input').val())+ "</p>");
			}
		}
			// Nous pouvons maintenant lancer la recherche de l'adresse
			var myGeocoder = new google.maps.Geocoder();
			myGeocoder.geocode( GeocoderOptions, GeocodingResult );
		}
		
		

		console.log((Math.round(($('#lat').val())*100000))/100000 + ', ' + (Math.round(($('#lng').val())*100000))/100000);	
		//console.log(tabPerso[0].local);

		
	})

});