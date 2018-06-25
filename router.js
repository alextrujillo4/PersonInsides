//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Proposito de este modulo: averiguar qué recurso o accion esta solicitando el cliente para determinar a qué funcion encomendarle atender la solicitud del cliente 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function route(handle, pathname, response, postData, cookieJar) {

	var emailCookie = cookieJar.get("email");

	console.log("About to route a request for " + pathname);
	console.log("Email in the cookie: " + emailCookie);

    //Si el cliente solicita algun recurso o accion llamados de una manera especifica (ej. '/Informacion'), entonces la solicitud se puede atender
	if (typeof handle[pathname] === 'function') {

		//Si el usuario solicita un recurso o accion solo disponibles mediante una sesion activa, entonces valida que el usuario en efecto tenga una sesion activa
		if (pathname != "/LoginAction" && pathname != "/" && pathname != "/Autenticacion"){

			//Si el usuario tiene una sesion activa, entregale lo que pide
			if (emailCookie != null){
				handle[pathname](response, postData, cookieJar);

			//Si el usuario NO tiene una sesion activa, envialo a la view para iniciar sesion
			} else{
				console.log("REDIRECCIONADO A LA PAGINA LOGIN. NO HAY COOKIE GUARDADA.");
				handle["/"](response, postData, cookieJar);
			}
		//Si el usuario solicita un recurso o accion para los cuales NO ES NECESARIO tener una sesion activa (pagina para iniciar sesion, accion de iniciar sesion)
		} else {

			//si el usuario tiene una sesion activa, entonces no le entregues la pagina para iniciar sesion, sino la pagina principal o homepage 
			if (emailCookie != null)
			{
				handle["/Inicio"](response, postData, cookieJar);

			//Si el usuario NO tiene una sesion activa, entregale lo que pide (pagina para iniciar sesion, accion de iniciar sesion)
			} else{

				handle[pathname](response, postData, cookieJar);
				
			}
			

		}

	//Si el cliente solicita un archivo css (como sea que se llame dicho archivo), dicha solicitud se puede atender 
	} else if (/^\/[a-zA-Z0-9\/\.\-]*.css$/.test(pathname.toString())) {

		handle["/css"](response,postData, pathname);

	//Si el cliente solicita un archivo js (como sea que se llame dicho archivo), dicha solicitud se puede atender  
	} else if (/^\/[a-zA-Z0-9\/\.\-]*.js$/.test(pathname.toString())){

		handle["/js"](response,postData, pathname);

    //Si el cliente solicita un archivo png (como sea que se llame dicho archivo), dicha solicitud se puede atender  
	} else if (/^\/[a-zA-Z0-9\/\.\_\-]*.png$/.test(pathname.toString())){
			handle["/png"](response,postData, pathname);
    
    //Si el cliente solicita un archivo pdf (como sea que se llame dicho archivo), dicha solicitud se puede atender  
	}  else if (/^\/[a-zA-Z0-9\/\.\_\-]*.pdf$/.test(pathname.toString())){
			handle["/pdf"](response,postData, pathname);
	}

	//No se pudo identificar que es lo que el cliente esta tratando de solicitar, por lo cual la solicitud NO se puede atender
	else {

		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;
