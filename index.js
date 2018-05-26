var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/login"] = requestHandlers.login;
handle["/logout"] = requestHandlers.logout;
handle["/info"] = requestHandlers.info;
handle["/principal"] = requestHandlers.principal;
handle["/upload"] = requestHandlers.upload;
handle["/css"] = requestHandlers.cssContent;
handle["/js"]= requestHandlers.jsContent;
handle["/png"]= requestHandlers.pngContent;
handle["/pdf"]= requestHandlers.pdfService;
handle["/PIService"] = requestHandlers.piService;
handle["/LastProfile"] = requestHandlers.lastProfile;

server.start(router.route, handle);
