var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var fs = require('fs');
var mysql = require('mysql');
var querystring = require('querystring');

var pool  = mysql.createPool({
 connectionLimit : 10,
 host            : 'den1.mysql1.gear.host',
 user            : 'proyectoflashdb',
 password        : 'Mostla12345?',
 database        : 'proyectoflashdb'
});

//var name = 'Predefinido';
//var id_user = 'predefinido@test.com';
//var valuesFromSelection = [];
//var id = 0;


function start(response, postData, cookieJar) {
	console.log("Request handler 'start' was called.");
	fs.readFile('./public/login.html', null, function (error,data){

		if (error){
			response.writeHead( 302, { "Location": "./public/error.html" } );
			//response.write('File not found!');
		} else{
      response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
		}

		response.end();

	});
}

function info(response, postData, cookieJar) {
	console.log("Request handler 'info' was called.");
  
  //Incrementa en media hora la fecha de caducidad de la cookie que ya estaba guardada
  var name = cookieJar.get("name");
  var id_user = cookieJar.get("email");
  
  var someDate = new Date();
  someDate.setTime(someDate.getTime() + (30*60*1000) ) ; // 30 minutes in milliseconds

  cookieJar.set( "email", id_user , { httpOnly: false, expires: someDate} );
  cookieJar.set( "name", name , { httpOnly: false, expires: someDate} );


	fs.readFile('./public/info.html', null, function (error,data){

		if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
			//response.write('File not found!');
		} else{

      response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
		}

		response.end();

	});
}


function login(response, postData, cookieJar){

  console.log("Request handler 'login' was called.");

  //Crea por primera vez las cookies, o reemplaza los valores que habia en las cookies ya guardadas por los valores ingresados por el usuario
  var id_user = querystring.parse(postData).email;
  var name = querystring.parse(postData).text;

  if (id_user != null){

    var someDate = new Date();
    someDate.setTime(someDate.getTime() + (30*60*1000) ) ; // 30 minutes in milliseconds
    //someDate =  someDate.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //document.cookie = 'foo=bar;path=/;expires='+d.toGMTString()+';';

    cookieJar.set( "email", id_user , { httpOnly: false, expires: someDate} );
    cookieJar.set( "name", name , { httpOnly: false, expires: someDate } );

    var nextPage = "";
    pool.query("SELECT id FROM Profile WHERE id_user = '"+id_user+"' order by id desc LIMIT 1;",function(err,rows){
              if(err) throw err;
              //console.log(rows == NULL);
              console.log(rows.length);

              if(rows.length == 0){
                console.log("\nNO EXISTOOOO\n");
                fs.readFile('./public/index2.html', null, function (error,data){

                  if (error){
                    response.writeHead( 302, { "Location": "./public/error.html" } );
                    console.log("No file found at location ... index2");
                    //response.write('File not found! index2');
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
                    response.writeHead( 302, { "Location": "./public/error.html" } );
                    console.log("No file found at location ... index");
                    //response.write('File not found! index');
                  } else{
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data);
                  }

                  response.end();

                });
              }
      });

    } else {

        console.log("NO SE INGRESO NINGUN CORREO. LOGIN NO REALIZADO.");
        fs.readFile('./public/login.html', null, function (error,data){

        if (error){
          response.writeHead( 302, { "Location": "./public/error.html" } );
          //response.write('File not found!');
        } else{
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data);
        }

        response.end();

      });


    }

}


function logout(response, postData, cookieJar){

  console.log("Request handler 'logout' was called.");


  //Destruye la cookie dandole una fecha de expiracion ya pasada
  var someDate = new Date();
  someDate.setTime(someDate.getTime() - 500000 ) ; 

  cookieJar.set( "email", "dummy", { httpOnly: false, expires: someDate} );
  cookieJar.set( "name", "dummy" , { httpOnly: false, expires: someDate} );
  
  fs.readFile('./public/login.html', null, function (error,data){

    if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
      //response.write('File not found!');
    } else{
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data);
    }

    response.end();

  });


}


function principal(response, postData, cookieJar) {
	console.log("Request handler 'principal' was called.");
  //Get name and email from login (for execution of queries)
  
  var name = cookieJar.get("name");
  var id_user = cookieJar.get("email");
  
  var someDate = new Date();
  someDate.setTime(someDate.getTime() + (30*60*1000) ) ; // 30 minutes in milliseconds

  cookieJar.set( "email", id_user , { httpOnly: false, expires: someDate} );
  cookieJar.set( "name", name , { httpOnly: false, expires: someDate} );


  var nextPage = "";
  pool.query("SELECT id FROM Profile WHERE id_user = '"+id_user+"' order by id desc LIMIT 1;",function(err,rows){
            if(err) throw err;
            //console.log(rows == NULL);
            console.log(rows.length);

            if(rows.length == 0){
              console.log("\nNO EXISTOOOO\n");
              fs.readFile('./public/index2.html', null, function (error,data){

                if (error){
                  response.writeHead( 302, { "Location": "./public/error.html" } );
                  console.log("No file found at location ... index2");
                  //response.write('File not found! index2');
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
                  response.writeHead( 302, { "Location": "./public/error.html" } );
                  console.log("No file found at location ... index");
                  //response.write('File not found! index');
                } else{
                  response.writeHead(200, {"Content-Type": "text/html"});
                  response.write(data);
                }

                response.end();

              });
            }
    });

}


function upload(response, postData, cookieJar) {
	console.log("Request handler 'upload' was called.");
  

  //Incrementa en media hora la fecha de caducidad de la cookie que ya estaba guardada
  var name = cookieJar.get("name");
  var id_user = cookieJar.get("email");
  
  var someDate = new Date();
  someDate.setTime(someDate.getTime() + (30*60*1000) ) ; // 30 minutes in milliseconds

  cookieJar.set( "email", id_user , { httpOnly: false, expires: someDate} );
  cookieJar.set( "name", name , { httpOnly: false, expires: someDate} );


	fs.readFile('./public/index2.html', null, function (error,data){

		if (error){
      response.writeHead( 302, { "Location": "./public/error.html" } );
			console.log("No file found at location");
			//response.write('File not found!');
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
  //console.log("Request handler 'pdfService' was called. The file " + querystring.parse(postData).pdfNombre + " was requested.");
  console.log("Request handler 'pdfService' was called. The file " + pathname + " was requested.");
 
  //var nombrePDF =  querystring.parse(postData).pdfNombre;
  //var fullpath = './documents' +  nombrePDF;
  var fullpath = './documents' +  pathname;


 
  var file = fs.createReadStream(fullpath);
  var stat = fs.statSync(fullpath);
  response.setHeader('Content-Length', stat.size);
  response.setHeader('Content-Type', 'application/pdf');

  if (pathname == "/Casos-y-hallazgos-in.pdf")
    response.setHeader('Content-Disposition', 'attachment; filename=Casos-y-hallazgos-in.pdf');
  else if (pathname == "/CaracteristicasPersonalidad.pdf")
    response.setHeader('Content-Disposition', 'attachment; filename=CaracteristicasPersonalidad.pdf');
  file.pipe(response);


}


function piService(response,postData, cookieJar){
	console.log("Request handler 'piService' was called.");
	console.log("'piService' handler received: ");

  console.log(querystring.parse(postData).textAreaContent);




  //Incrementa en media hora la fecha de caducidad de la cookie que ya estaba guardada
  var name = cookieJar.get("name");
  var id_user = cookieJar.get("email");
  
  var someDate = new Date();
  someDate.setTime(someDate.getTime() + (30*60*1000) ) ; // 30 minutes in milliseconds

  cookieJar.set( "email", id_user , { httpOnly: false, expires: someDate} );
  cookieJar.set( "name", name , { httpOnly: false, expires: someDate} );



  var valuesFromSelection = [];
  var id = 0;


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
          response.writeHead( 302, { "Location": "./public/error.html" } );
          //response.write('File not found!');
        } else{
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data);
        }
        response.end();
      });
		}
	} );
}


function lastProfile(response,postData, cookieJar){
  console.log("Request handler 'lastProfile' was called.");



  //Incrementa en media hora la fecha de caducidad de la cookie que ya estaba guardada
  var name = cookieJar.get("name");
  var id_user = cookieJar.get("email");
  
  var someDate = new Date();
  someDate.setTime(someDate.getTime() + (30*60*1000) ) ; // 30 minutes in milliseconds
 //someDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')
  cookieJar.set( "email", id_user , { httpOnly: false, expires: someDate} );
  cookieJar.set( "name", name , { httpOnly: false, expires: someDate} );


  //Query SELECT con name y id_user
  var arraySelects = [];
  var currentID;
  pool.query("SELECT id FROM profile WHERE id_user='"+id_user+"' order by id desc LIMIT 1 ", function (err, result) {
      if (err) throw err;
      arraySelects = result;
      currentID = arraySelects[0].id;
      pool.query("select trait_id, percentile from trait t join profile p ON t.profile_id = p.id where (t.trait_id = 'big5_agreeableness' or t.trait_id = 'big5_openness' or t.trait_id = 'big5_conscientiousness' or t.trait_id = 'big5_extraversion' or t.trait_id = 'big5_neuroticism') and p.id = '"+currentID+"'order by t.trait_id ASC;", function (err, result, fields) {
          if (err) throw err;
          
          //response.writeHead(200, {"Content-Type": "application/json"});
          
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

                  response.writeHead(200, {"Content-Type": "application/json"});
                  response.end(json);
                });
            });
        });
    });
}

exports.login = login;
exports.logout = logout;
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
