
var formidable = require('formidable');
var fs = require('fs');

exports.upload = function (request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
			fs.readFile('templates/upload.html', function(err, html) {
        fs.renameSync(files.upload.path, files.upload.name);
        response.writeHead(200, {"Content-Type": "text/html"});
				response.write(html);
				response.write("<img class='img' src='/show' />");
        response.end();
				exports.show = function(request, response) {
						fs.readFile(files.upload.name, "binary", function(error, file) {
								response.writeHead(200, {"Content-Type": "image/png"});
								response.write(file, "binary");
								response.end();
				});
			}
		});
	});
}

exports.welcome = function (request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/index.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function (request, response) {
	console.log('@#!%err!@##!or!##@');
	response.write('404 :(');
	response.end();
}
