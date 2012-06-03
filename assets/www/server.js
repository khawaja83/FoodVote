var http = require('http');
var fs = require('fs');
var url = require('url');

var port = 8888;
var jsonpFile = 'votes.dat';

function logRequest(request) {
    var date = new Date();
    console.log(request.method + " request");
    console.log("at " + date.toString());
    console.log("by " + request.headers['user-agent']);
}

http.createServer(function(request, response) {
    logRequest(request);

    fs.readFile(jsonpFile, 'utf-8', function(err, jsonp) {
	if (request.method === 'GET') {
	    var GET = url.parse(request.url, true).query;

	    var name = GET['name'];
	    var restaurant = GET['restaurant'];
	    var time = GET['time'];

	    if (name != undefined && restaurant != undefined && time != undefined) {
		var votes = JSON.parse(jsonp);

		var newVote = {"name": name,
			       "restaurant": restaurant,
			       "time": time};
		var foundAlready = false;
		for (var i = 0; i < votes.length; i++) {
		    if (votes[i].name == name) {
			votes[i] = newVote;
			foundAlready = true;
		    }
		}
		
		if (!foundAlready) {
		    votes.push(newVote);
		}

		jsonp = JSON.stringify(votes);

		fs.writeFileSync(jsonpFile, jsonp);
	    }

	    var finalData = "handleResponse(\'" + jsonp + "\')";

	    response.writeHead(200,{'Content-Type' : 'text/plain'});
	    response.write(finalData);
	} else {
	    
	}

	response.end();

	console.log("Response body: " + finalData);
	console.log("Request handled");
	console.log("---------------------");
    });
    
}).listen(port);

(function() {
  var currentDay = new Date().getDate();

  setInterval(function() {  
      console.log(currentDay);
      if (new Date().getDate() != currentDay) {
	  currentDay = new Date().getDate();
	  fs.writeFileSync(jsonpFile, "[]");
	  console.log("Votes.dat cleared");
      }
  }, 1000*60*60*1)
})();

console.log("Food vote server running at " + port);