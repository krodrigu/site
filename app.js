var static = require('node-static');
var http = require('http')

var fileServer = new static.Server('./static', { indexFile: "home.html" });

http.createServer(function (request, response) {
  console.log(request.url)
    request.addListener('end', function () {
        fileServer.serve(request, response, function(err, res) {
          if(err && (err.status == 404)){
            fileServer.serveFile('/notfound.html', 404, {}, request, response)
          }
        });
    }).resume();
}).listen(process.env.PORT || 8080);
