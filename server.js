var http = require("http");
var url = require("url");




function start(route, handle) {

	function onRequest(request, response) {

		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			//Texto que manda el POST request
			console.log("Received POST data chunk");
			// '"+ postDataChunk + "'.");
			console.log("\n Add listener data \n");

		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
			console.log("\n Add listener end \n");
		});
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}
exports.start = start;
