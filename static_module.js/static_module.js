var BASE_DIR = __dirname,
    CONF = BASE_DIR + '/conf/',
    STATIC = BASE_DIR + '/static',
    mmieConf;

var sys = require('util'),
	    http = require('http'), 
	    fs    = require('fs'),
	    url   = require('url'),
	    path  = require('path');
	    mmieConf = getMmieConf();



function getMmieConf(){
    var routerMsg={}
    try{
        var str = fs.readFileSync(CONF + 'mmine_type.json', 'utf-8');
        routerMsg = JSON.parse(str);
    }
    catch(e){
        sys.debug("JSON parse fails");
    }
    return routerMsg;
}