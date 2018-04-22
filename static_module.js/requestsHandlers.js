var querystring = require("querystring"),
fs = require("fs");

function start(response)
{
    console.log("Request handler 'start' was called.");
    //response.writeHead(200, {"Content-Type": "text/html"});
    //response.write(body);
    //response.end();
}

function upload(response)
{
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Hello Upload");
    response.end();
}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/root/study/node.js/server/pic/hong.jpg", "binary", function(error, file) {
    
    if(error) {
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write(error + "\n");
    response.end();
    } else {
    response.writeHead(200, {"Content-Type": "image/jpg"});
    response.write(file, "binary");
    response.end();
    }
    });
}

/*
function show(response){
    response.writeHead(200, {'content-type': 'text/html'});
    response.end(
    '<div class="ui-flex justify-center center" style="border: green solid 1px; width: 500px; height: 200px;">' + 
    '<div class="cell">' +
    '<img src="./pic/pic.JPG" style="" />'+
    '</div>'+
    '</div>')
}
*/

exports.start = start
exports.upload = upload
exports.show = show