var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var fs = require('fs');

var mysql = require('mysql');

var pool  = mysql.createPool({
 connectionLimit : 10,
 host            : 'localhost',
 user            : 'root',
 password        : 'Liquid123',
 database        : 'test'
});

var name = 'Prueba';
//var word_Count = 2020;
//var lang = 'es';
var id_user = 'prueba@test.com';

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	/*
	var body = '<html>'+
				'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; '+
				'charset=UTF-8" />'+
				'</head>'+
				'<body>'+
				'<form action="/upload" method="post">'+
				'<textarea name="text" rows="20" cols="60"></textarea>'+
				'<input type="submit" value="Submit text" />'+
				'</form>'+
				'</body>'+
				'</html>';*/

	response.writeHead(200, {"Content-Type": "text/html"});
	fs.readFile('./public/index.html', null, function (error,data){

		if (error){
			response.writeHead(404);
			response.write('File not found!');
		} else{

			response.write(data);
		}

		response.end();

	});
	//response.write(body);
	//response.end();

}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");

	fs.readFile('./public/index2.html', null, function (error,data){

		if (error){
			console.log("No file found at location");
			response.writeHead(404);
			response.write('File not found!');
		} else{
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
		}

		response.end();

	});
}


function cssContent(response,postData, pathname){


	var fullpath = './public' + pathname;

	console.log("Request handler 'cssContent' was called. The file " + fullpath + " was requested.");

	fs.readFile(fullpath, null, function (error,data){

		if (error){
			console.log("No file found at:" + fullpath);
			response.writeHead(404);
			response.write('File not found!');
		} else{
			response.writeHead(200, {"Content-Type": "text/css"});
			response.write(data);
		}

		response.end();

	});


}

function jsContent(response,postData, pathname){
	console.log("Request handler 'jsContent' was called. The file " + pathname + " was requested.");

	var fullpath = './public' + pathname;

	fs.readFile(fullpath, null, function (error,data){

		if (error){
			console.log("No file found at:" + fullpath);
			response.writeHead(404);
			response.write('File not found!');
		} else{
			response.writeHead(200, {"Content-Type": "text/javascript"});
			response.write(data);
		}

		response.end();

	});


}

function piService(response,postData){


	console.log("Request handler 'piService' was called.");
	console.log("'piService' handler received: ");
	// + postData);

	var personality_insights = new PersonalityInsightsV3({
	    username: 'ebc5e198-5f1b-4353-ae47-810792af98d0',
	    password: 'hyh0VJTjfm1E',
	    version_date: '2017-10-13'
	});


	var params = {
		  // Get the content from the text file.
		  // Content: el texto a analizar
		  content: postData,
		  // Content-type: el tipo de archivo a analizar, en este caso plain text
		  content_type: 'text/plain;charset=utf-8'
    };

	// Envia los parametros a Personality Insights
	personality_insights.profile(params, function(error, json) {

		if (error){
			console.log('Error:', error);
			response.end();
		} else{

			 // Recibe la respuesta en la variable response en JSON
		//	console.log(JSON.stringify(json, null, 2));
			//var json = JSON.parse(response);
			//response.setHeader("Content-Type", "text/json");
        	//response.setHeader("Access-Control-Allow-Origin", "*");
			//response.write(json);

			//ESTO JALA
			/*
			response.writeHead(200, {"Content-Type": "application/json"});
			response.end(JSON.stringify(json));*/

			pool.query("INSERT INTO Profile (name,word_count,processed_Language,id_User) VALUES ('" + name + "','" + json.word_count + "','" + "en" + "','" + id_user + "');",function(err,rows){
		          if(err) throw err;
		          console.log('yuju');
		  });

			fs.writeFile('savedProfile.json', JSON.stringify(json, null, 2), function (err) {
				  if (err)
				  	throw err;
				  else{
				  	console.log('Saved!');
				  	response.writeHead (200, {"Content-Type": "text/html"});
					fs.readFile('./public/index.html', null, function (error,data){

						if (error){
							response.writeHead(404);
							response.write('File not found!');
						} else{

							response.write(data);
						}

						response.end();

					});

				  }
			});



		}
			//response.end();

	} );


}


function lastProfile(response,postData){

	console.log("Request handler 'lastProfile' was called.");
	fs.readFile('./savedProfile.json', null, function (error,data){

		if (error){
			response.writeHead(404);
			response.write('File not found!');
			response.end();
		} else{
			var json = JSON.parse(data);
			console.log("About to send the contents of the file savedProfile.json");
			console.log(JSON.stringify(json));
			response.writeHead(200, {"Content-Type": "application/json"});
			response.end(JSON.stringify(json));
		}


	});



}



exports.start = start;
exports.upload = upload;
exports.cssContent = cssContent;
exports.jsContent = jsContent;
exports.piService = piService;
exports.lastProfile = lastProfile;
