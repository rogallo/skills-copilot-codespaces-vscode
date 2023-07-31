// Create web server
// Run: node comments.js

var http = require('http');
var fs = require('fs');
var url = require('url');

var comments = [];

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true);
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;
    var method = request.method;

    if (path === '/new') {
        var comment = query.comment;
        comments.push(comment);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('New comment added: ' + comment);
    } else if (path === '/show') {
        var html = '';
        for (var i in comments) {
            html += '<h4>' + comments[i] + '</h4>';
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html);
    } else {
        fs.readFile('comments.html', function(error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    }
});

server.listen(3000, function() {
    console.log('Server is running...');
});
