var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/css"] = requestHandlers.cssContent;
handle["/js"]= requestHandlers.jsContent;
handle["/PIService"] = requestHandlers.piService;
handle["/LastProfile"] = requestHandlers.lastProfile;

server.start(router.route, handle);