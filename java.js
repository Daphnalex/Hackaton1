


$(document).ready(function(){
	$.ajax({
	url: "http://api.openweathermap.org/data/2.5/weather?id=3026467&APPID=77a1e1e03567dd2bb3bf59e8080ea04c",
	datatype:"Json",
	success: function (meteo){

		if (meteo.weather[0].main == 'Rain' || meteo.weather[0].main == 'Clouds'){
			$('#meteo').text('renard');
			$('#icon').attr('src','img/pluie.png');
			$('#lapin').css('display','none');

		}else{

			$('#meteo').text('lapin');
			$('#icon').attr('src','img/soleil.png');
			$('#renard').css('display','none');

		}




		console.log(meteo)
		
		console.log(meteo.weather[0].main)



	} 



})

})





