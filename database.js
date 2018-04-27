var mysql = require('mysql');

var pool  = mysql.createPool({
 connectionLimit : 10,
 host            : 'localhost',
 user            : 'root',
 password        : 'Liquid123',
 database        : 'test'
});

var name = 'Lizzie';
//var word_Count = 2020;
//var lang = 'es';
var id_user = 'tedupu@gmail.com';


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

console.log(json.wordcount);


//
// $.ajax({
//
//         url: "/LastProfile",
//         cache : false,
//         type : "POST",
//         crossDomain: true,
//         dataType : "json",
//
//         error : function(errorMessage, textStatus, errorThrown) {
//             console.log(errorMessage);
//             console.log(textStatus);
//             console.log(errorThrown);
//             console.log("Mal Mal" );
//
//         },
//
//         success: function(dataReceived){
//
//                 //console.log("Data that was received from the server: " + dataReceived.personality[0].name);
//                 console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n: " );
//
//                 //openness = dataReceived.personality[0].percentile;
//                 //var trait_id = dataReceived.personality[0].trait_id;
//                 var word_Count = dataReceived.word_count;
//                 var lang = dataReceived.processed_language;
//               }
//       });

/*//Establish connection
pool.getConnection(function(err, connection) {
  if(err){
    return console.error('error'+err.message);
  }
  console.log('connected, eureka');
  //Execute query

  //Release connection
  connection.release();
});
*/

pool.query("INSERT INTO Profile (name,word_count,processed_Language,id_User) VALUES ('" + name + "','" + word_Count + "','" + lang + "','" + id_user + "');",function(err,rows){
        if(err) throw err;
        console.log('yuju');
});
