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
	//response.write(body);
	//response.end();

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

      /*fs.writeFile('savedProfile.json', JSON.stringify(json, null, 2), function (err) {
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
			});*/
		}
			//response.end();
	} );
}


function lastProfile(response,postData){
  console.log("Request handler 'lastProfile' was called.");
  //Query SELECT con name y id_user
  var arraySelects = [];
  var currentID;
  pool.query("SELECT id FROM profile WHERE id_user='"+id_user+"' order by id desc LIMIT 1 ", function (err, result) {
      if (err) throw err;
      console.log(result);
      arraySelects = result;
      console.log(arraySelects[0].id);
      currentID = arraySelects[0].id;
      console.log(currentID);
      pool.query("select trait_id, percentile from trait t join profile p ON t.profile_id = p.id where (t.trait_id = 'big5_agreeableness' or t.trait_id = 'big5_openness' or t.trait_id = 'big5_conscientiousness' or t.trait_id = 'big5_extraversion' or t.trait_id = 'big5_neuroticism') and p.id = '"+currentID+"'order by t.trait_id ASC;", function (err, result, fields) {
          if (err) throw err;
          console.log(result);

          //var json = JSON.parse(result);
          //console.log(JSON.stringify(json)); //da error
          response.writeHead(200, {"Content-Type": "application/json"});
    			//response.end(JSON.stringify(json));

          var personalityArray = [];
          for (var i = 0;i < result.length; i++) {
              personalityArray.push({percentile: result[i].percentile});
          }
          //response.end(JSON.stringify(objs));


          //No cheque si esto jala, posiblemente si
          //var array = result[0];
          var json = JSON.stringify({
            personality: personalityArray
          });
          response.end(json);


          //ESTO FUNCIONA
          /*
          var objs = [];
          objs.push({percentile: result[0].percentile});
          response.end(JSON.stringify(objs));*/

        });
    });

  /*fs.readFile('./savedProfile.json', null, function (error,data){ //MAL
		if (error){
			response.writeHead(404);
			response.write('File not found!');
			response.end();
		} else{
			var json = JSON.parse(data);
			console.log("About to send the contents of the file savedProfile.json");
			//console.log(JSON.stringify(json));
			response.writeHead(200, {"Content-Type": "application/json"});
			response.end(JSON.stringify(json));
		}
    //response.writeHead(200, {"Content-Type": "application/json"});
    //response.end(JSON.stringify(json));
	});*/
}


exports.principal = principal;
exports.start = start;
exports.upload = upload;
exports.cssContent = cssContent;
exports.jsContent = jsContent;
exports.piService = piService;
exports.lastProfile = lastProfile;
