var http = require('http');
var url = require('url');

function start(route, handle) {
	function onRequest(request, response){
		var postData,
			pathname = url.parse(request.url).pathname;

		if(pathname != '/favicon.ico'){
			console.log("Request for " + pathname + " received");
			request.setEncoding('utf8');

			request.addListener('data', function(postDataChunk){
				postData += postDataChunk;
				console.log("Recieved POST data chunk '" + postDataChunk + "'.");
			});

			request.addListener('end', function(){
				console.log('inside end listener')
				route(handle, pathname, response);
			});
		}
	}

	http.createServer(onRequest).listen(8888);
	console.log("server has started");
}

exports.start = start;

