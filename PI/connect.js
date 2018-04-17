//TEST NODE.JS APP
//Define el uso de Personality Insights Version 3
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
// Define la autenticacion con nuestro servicio 
var personality_insights = new PersonalityInsightsV3({
  username: 'ebc5e198-5f1b-4353-ae47-810792af98d0',
  password: 'hyh0VJTjfm1E',
  version_date: '2017-10-13'
});
// Variable para leer archivos
var fs = require('fs'), filename = 'profile.txt';

//Se lee el archivo almacenado
fs.readFile(filename, 'utf8', function(err, data) {
	//define los parametros que recibe Watson PI
	var params = {
	  // Get the content from the text file.
	  // Content: el texto a analizar
	  content: data,
	  // Content-type: el tipo de archivo a analizar, en este caso plain text
	  content_type: 'text/plain;charset=utf-8'
	};

	// Envia los parametros a Personality Insights
	personality_insights.profile(params, function(error, response) {
	  if (error)
		console.log('Error:', error);
	  else
		  // Recibe la respuesta en la variable response en JSON 
		console.log(JSON.stringify(response, null, 2));
	  }
	);
});