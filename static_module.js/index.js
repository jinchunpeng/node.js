var server = require("./server");
var router = require("./router");
var requireHandlers = require("./requestsHandlers.js");

var handle = {}
handle["/"] = requireHandlers.start;
handle["/start"] = requireHandlers.start;
handle["/upload"] = requireHandlers.upload;
handle["/show"] = requireHandlers.show

server.start(router.route, handle);
