var http = require("http");
var url  = require("url");
var fs   = require('fs');
var staticModule = require("./static_module");

/*
function start(route, handle){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname
        console.log("Request for " + pathname + " received.");

        route(handle, pathname,response);
    }
    http.createServer(onRequest).listen(80);
    console.log("server has started.");
}
*/

function goIndex(response)
{
    var readPath = __dirname  + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(indexPage);
}

function start(route, handle)
{
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname
        console.log("Request for " + pathname + " received.");

        var pathname = url.parse(request.url).pathname
        var readPath = __dirname + '/static' + pathname;
        
        if (pathname == '/favicon.ico')
        {
            return;
        }
        else if (pathname == '/index' || pathname == '/')
        {
            goIndex(response);
        }
        else
        {
            staticModule.getStaticFile(pathname , response);
        }
    }
    http.createServer(onRequest).listen(80);
    console.log("server has started.");
}

exports.start = start;