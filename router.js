
function route(handle, pathname, response, postData) {

	console.log("About to route a request for " + pathname);

	if (typeof handle[pathname] === 'function') {

		handle[pathname](response, postData);

	} else if (/^\/[a-zA-Z0-9\/\.\-]*.css$/.test(pathname.toString())) {

		handle["/css"](response,postData, pathname);

	} else if (/^\/[a-zA-Z0-9\/\.\-]*.js$/.test(pathname.toString())){

		handle["/js"](response,postData, pathname);

	} else{

		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found lizzie");
		response.end();
	}
}

exports.route = route;
