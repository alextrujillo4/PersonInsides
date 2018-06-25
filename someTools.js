var fs = require('fs'); //modulo para accesar, crear, modificar, borrar archivos de extension .txt entre otros

//FUNCION PARA GUARDAR EN LA BD EL 'PROFILE' JSON DEVUELTO POR EL SERVICIO DE IBM PERSONALITY INSIGHTS
function saveProfileJsonIntoBD(pool,json,name,id_user){

	   var valuesFromSelection = [];
  	   var id = 0;

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
                                  //console.log("Big Five Creado");
                                  papasCreados++; //papa = 1 big_5
                                  //console.log(papasCreados);

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

}


//FUNCION PARA GUARDAR EN UN ARCHIVO .TXT EL 'PROFILE' JSON DEVUELTO POR EL SERVICIO DE IBM PERSONALITY INSIGHTS 
function saveJsonIntoFile (json) {


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


}



//NO SE ESTA UTILIZANDO
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

exports.parseCookies = parseCookies;