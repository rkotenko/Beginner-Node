var querystring = require('querystring'),
	fs = require('fs'),
	formidable = require('formidable');

function start(response) {
	console.log("Request handler 'start' was called.");

	var html = '<html>' + 
	'<head>' + 
		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
	'</head>' + 
	'<body>' + 
		'<form action="/upload" method="post" enctype="multipart/form-data">' +
			'<input type="file" name="upload" />' + 
			'<input type="submit" value="Submit text" />' + 
		'</form>' +  
	'</body>' +  
'</html>';

	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(html);
	response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log('about to parse');
	form.parse(request, function(error, fields, files){
		console.log('parsing done');
		fs.rename(files.upload.path, '/tmp/test.jpg');
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write('received image: <br />');
		response.write('<img src="/show" />');
		response.end();
	});
	
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/jpeg"});
	fs.createReadStream("/tmp/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;


