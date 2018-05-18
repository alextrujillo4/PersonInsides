var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var fs = require('fs');
var mysql = require('mysql');
var pool  = mysql.createPool({
 connectionLimit : 10,
 host            : 'den1.mysql1.gear.host',
 user            : 'proyectoflashdb',
 password        : 'Mostla12345?',
 database        : 'proyectoflashdb'
});

var name = 'Predefinido';
var id_user = 'predefinido@test.com';
var valuesFromSelection = [];
var id = 0;
var querystring = require('querystring');

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.readFile('./public/login.html', null, function (error,data){

		if (error){
			response.writeHead(404);
			response.write('File not found!');
		} else{

			response.write(data);
		}

		response.end();

	});
}

function info(response, postData) {
	console.log("Request handler 'info' was called.");
	response.writeHead(200, {"Content-Type": "text/html"});
	fs.readFile('./public/info.html', null, function (error,data){

		if (error){
			response.writeHead(404);
			response.write('File not found!');
		} else{

			response.write(data);
		}

		response.end();

	});
}

function principal(response, postData) {
	console.log("Request handler 'principal' was called.");
  //Get name and email from login (for execution of queries)
  name = querystring.parse(postData).text;
  id_user = querystring.parse(postData).email;
  var nextPage = "";
  pool.query("SELECT id FROM Profile WHERE id_user = '"+id_user+"' order by id desc LIMIT 1;",function(err,rows){
            if(err) throw err;
            //console.log(rows == NULL);
            console.log(rows.length);

            if(rows.length == 0){
              console.log("\nNO EXISTOOOO\n");
              fs.readFile('./public/index2.html', null, function (error,data){

                if (error){
                  console.log("No file found at location ... index2");
                  response.writeHead(404);
                  response.write('File not found! index2');
                } else{
                  response.writeHead(200, {"Content-Type": "text/html"});
                  response.write(data);
                }

                response.end();

              });
            }
            else{
              console.log("\nSI EXISTOOOOO\n");
              fs.readFile('./public/index.html', null, function (error,data){

                if (error){
                  console.log("No file found at location ... index");
                  response.writeHead(404);
                  response.write('File not found! index');
                } else{
                  response.writeHead(200, {"Content-Type": "text/html"});
                  response.write(data);
                }

                response.end();

              });
            }
    });

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

function pngContent(response,postData, pathname){
	console.log("Request handler 'pngContent' was called. The file " + pathname + " was requested.");

	var fullpath = './public' + pathname;

	fs.readFile(fullpath, null, function (error,data){

		if (error){
			console.log("No file found at:" + fullpath);
			response.writeHead(404);
			response.write('File not found!');
		} else{
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(data);
		}

		response.end();

	});
}

function pdfService(response,postData, pathname){
  console.log("Request handler 'pdfService' was called. The file " + querystring.parse(postData).pdfNombre + " was requested.");
 
  var fullpath = './documents/' +  querystring.parse(postData).pdfNombre;
 
  var file = fs.createReadStream(fullpath);
  var stat = fs.statSync(fullpath);
  response.setHeader('Content-Length', stat.size);
  response.setHeader('Content-Type', 'application/pdf');
  response.setHeader('Content-Disposition', 'attachment; filename=casosdeuso.pdf');
  file.pipe(response);


}


function piService(response,postData){
	console.log("Request handler 'piService' was called.");
	console.log("'piService' handler received: ");
  console.log(querystring.parse(postData).textAreaContent);

	var personality_insights = new PersonalityInsightsV3({
	    username: 'ebc5e198-5f1b-4353-ae47-810792af98d0',
	    password: 'hyh0VJTjfm1E',
	    version_date: '2017-10-13'
	});

	var params = {
		  // Get the content from the text file.
		  // Content: el texto a analizar
		  content: querystring.parse(postData).textAreaContent,
		  // Content-type: el tipo de archivo a analizar, en este caso plain text
		  content_type: 'text/plain;charset=utf-8'
    };

	// Envia los parametros a Personality Insights
	personality_insights.profile(params, function(error, json) {
		if (error){
			console.log('Error:', error);
			response.end();
		} else{


      //Guarda el json en un archivo .txt dentro del servidor que este corriendo esta aplicacion web
      fs.exists('documents/analisisPI.txt', function(exists){
        if(exists){
            console.log("yes file exists");
            //fs.appendFile('analisisPI.txt', json);
              
             fs.appendFile('documents/analisisPI.txt', '\r\n', function (err) {
                if (err) return console.log(err);
                console.log('successfully appended new line');
             });

             fs.appendFile('documents/analisisPI.txt', JSON.stringify(json), function (err) {
                if (err) return console.log(err);
                console.log('successfully appended json info');
            });
         } else {
            console.log("file not exists")
            //fs.appendFile('analisisPI.txt', json);
            fs.appendFile('documents/analisisPI.txt', JSON.stringify(json), function (err) {
                if (err) return console.log(err);
                console.log('successfully appended json info');
            });
         }
      });


      //Create profile in database
      pool.query("INSERT INTO Profile (name,word_count,processed_Language,id_User,fecha) VALUES ('" + name + "','" + json.word_count + "','" + json.processed_language + "','" + id_user + "', NOW());",function(err,rows){
              if(err) throw err;
              console.log('PERFIL CREADO');

              //Sacar el id
              pool.query("SELECT id FROM profile WHERE id_User = '" + id_user + "' ORDER BY id desc LIMIT 1;",function(err,rows){
                        var papasCreados = 0;
                        if(err) throw err;
                        valuesFromSelection = rows;
                        //console.log(valuesFromSelection[0].id); //Imprime id
                        id = valuesFromSelection[0].id;
                        //Insertar los 5 big_5
                        for (var iA = 0; iA < 5; iA++) {
                          pool.query("INSERT INTO Trait (trait_id,name,percentile,category,profile_id, child_Of) VALUES ('" + json.personality[iA].trait_id + "','" +  json.personality[iA].name + "','" + json.personality[iA].percentile + "','" +  json.personality[iA].category+ "'," + id + ", NULL);",function(err,rows){
                    		          if(err) throw err;
                    		          console.log("Big Five Creado");
                                  papasCreados++; //papa = 1 big_5
                                  console.log(papasCreados);
                                  //Inserta los hijos de cada big_5, una vez que estos 5 ya fueron creados
                                  if(papasCreados>=5){
                                    console.log("YA VOY A CREAR LOS HIJOS");
                                      for(iA = 0; iA<5; iA++){
                                      for (var iB = 0; iB < json.personality[iA].children.length; iB++) {
                                        console.log("\n"+json.personality[iA].name+"\n");
                                        console.log( json.personality[iA].children[iB].trait_id );
                                        console.log( json.personality[iA].children[iB].name);
                                        console.log( json.personality[iA].children[iB].percentile);
                                        console.log( json.personality[iA].children[iB].category);
                                        console.log( json.personality[iA].trait_id);

                                      pool.query("INSERT INTO Trait (trait_id,name,percentile,category,profile_id, child_Of) VALUES ('" + json.personality[iA].children[iB].trait_id
                                      + "','" +  json.personality[iA].children[iB].name + "','" + json.personality[iA].children[iB].percentile + "','" +  json.personality[iA].children[iB].category
                                      + "'," + id + ",'" + json.personality[iA].trait_id + "');",function(err,rows){
                                                if(err) throw err;
                                                console.log('Children Created');
                                        });
                                      }
                                    }
                                }
                    		  });
                        }
                        //Save needs in database
                        for (var iC = 0; iC < json.needs.length; iC++) {
                          pool.query("INSERT INTO Trait (trait_id,name,percentile,category,profile_id, child_Of) VALUES ('" + json.needs[iC].trait_id
                          + "','" +  json.needs[iC].name + "','" + json.needs[iC].percentile + "','" +  json.needs[iC].category
                          + "'," + id + ", NULL);",function(err,rows){
                                    if(err) throw err;
                                    console.log('NEED Created');
                            });
                        }

                        //Save values in database
                        for (var iD = 0; iD < json.values.length; iD++) {
                          pool.query("INSERT INTO Trait (trait_id,name,percentile,category,profile_id, child_Of) VALUES ('" + json.values[iD].trait_id
                          + "','" +  json.values[iD].name + "','" + json.values[iD].percentile + "','" +  json.values[iD].category
                          + "'," + id + ", NULL);",function(err,rows){
                                    if(err) throw err;
                                    console.log('VALUE Created');
                            });
                        }
                });
      });

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
	} );
}


function lastProfile(response,postData){
  console.log("Request handler 'lastProfile' was called.");
  //Query SELECT con name y id_user
  var arraySelects = [];
  var currentID;
  pool.query("SELECT id FROM profile WHERE id_user='"+id_user+"' order by id desc LIMIT 1 ", function (err, result) {
      if (err) throw err;
      arraySelects = result;
      currentID = arraySelects[0].id;
      pool.query("select trait_id, percentile from trait t join profile p ON t.profile_id = p.id where (t.trait_id = 'big5_agreeableness' or t.trait_id = 'big5_openness' or t.trait_id = 'big5_conscientiousness' or t.trait_id = 'big5_extraversion' or t.trait_id = 'big5_neuroticism') and p.id = '"+currentID+"'order by t.trait_id ASC;", function (err, result, fields) {
          if (err) throw err;
          response.writeHead(200, {"Content-Type": "application/json"});
          var personalityArray = [];
          for (var i = 0;i < result.length; i++) {
              personalityArray.push({percentile: result[i].percentile});
          }

          pool.query("select trait_id, percentile from trait t join profile p ON t.profile_id = p.id where t.category='needs' and p.id = '"+currentID+"'order by t.trait_id ASC;", function (err, result, fields) {
              if (err) throw err;
              var needsArray = [];
              for (var i = 0;i < result.length; i++) {
                  needsArray.push({percentile: result[i].percentile});
              }
              pool.query("select trait_id, percentile from trait t join profile p ON t.profile_id = p.id where t.category='values' and p.id = '"+currentID+"'order by t.trait_id ASC;", function (err, result, fields) {
                  if (err) throw err;
                  var valuesArray = [];
                  for (var i = 0;i < result.length; i++) {
                      valuesArray.push({percentile: result[i].percentile});
                  }

                  var json = JSON.stringify({
                    personality: personalityArray,
                    needs: needsArray,
                    values: valuesArray
                  });
                  response.end(json);
                });
            });
        });
    });
}


exports.principal = principal;
exports.info = info;
exports.start = start;
exports.upload = upload;
exports.cssContent = cssContent;
exports.jsContent = jsContent;
exports.pngContent = pngContent;
exports.piService = piService;
exports.pdfService = pdfService;
exports.lastProfile = lastProfile;
