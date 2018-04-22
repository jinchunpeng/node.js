var http = require("http");
var url  = require("url");
var fs   = require('fs');

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


function dealWithStatic(pathname, readPath, response)
{
    console.log("pathname:" + pathname + ", readPath:" + readPath);
    fs.exists(readPath, function(exists){        //判断文件是否存在
        if(!exists)
        {
            response.writeHead(404,  {"Content-Type": "text/plain"});
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        }
        else
        {
            var pointPosition = pathname.lastIndexOf('.'),
                mmineString   = pathname.substring(pointPosition+1),
                mmieType;
            switch(mmineString){
                case 'css': mmieType = 'text/css';
                    break;
                case 'png': mmieType = 'image/png';                                                                                                                                                                                                     
                    break;
                case 'jpg': mmieType = 'image/jpg';
                    break;
                default:
                    mmieType = 'text/plain'; 
            }

            fs.readFile(readPath, "binary", function(err, file){
                if (err){
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.end(err); 
                }
                else
                {
                    response.writeHead(200, {"Content-Type": mmieType});
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
}

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
            dealWithStatic(pathname, readPath, response);
        }
    }
    http.createServer(onRequest).listen(80);
    console.log("server has started.");
}

exports.start = start;