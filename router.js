

function route(handle, pathname, response, postData, cookieJar) {

	var emailCookie = cookieJar.get("email");

	console.log("About to route a request for " + pathname);
	console.log("Email in the cookie: " + emailCookie);


	if (typeof handle[pathname] === 'function') {

		if (pathname != "/login" && pathname != "/" && pathname != "/start"){

			if (emailCookie != null){
				handle[pathname](response, postData, cookieJar);
			} else{
				console.log("REDIRECCIONADO A LA PAGINA LOGIN. NO HAY COOKIE GUARDADA.");
				handle["/"](response, postData, cookieJar);
			}

		} else {

			if (emailCookie != null)
			{
				handle["/principal"](response, postData, cookieJar);
			} else{

				handle[pathname](response, postData, cookieJar);
				/*
				if (pathname == "/login")
					handle["/login"](response, postData, cookieJar);
				else
					handle["/logout"](response, postData, cookieJar);*/
			}
			

		}

	} else if (/^\/[a-zA-Z0-9\/\.\-]*.css$/.test(pathname.toString())) {

		handle["/css"](response,postData, pathname);

	} else if (/^\/[a-zA-Z0-9\/\.\-]*.js$/.test(pathname.toString())){

		handle["/js"](response,postData, pathname);

	} else if (/^\/[a-zA-Z0-9\/\.\_\-]*.png$/.test(pathname.toString())){
			handle["/png"](response,postData, pathname);

	}  else if (/^\/[a-zA-Z0-9\/\.\_\-]*.pdf$/.test(pathname.toString())){
			handle["/pdf"](response,postData, pathname);
	}
	else {

		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;
