// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res) => {
  let currentDate = Date.now();
  let utcDate = new Date(currentDate);
  res.json({"unix": currentDate, "utc": utcDate.toUTCString()});
})

app.get("/api/timestamp/:date_string", (req, res) => {
  let unixDate = parseInt(req.params.date_string);
  let utcDate = new Date(req.params.date_string);
  if (unixDate.toString().length < 13 && utcDate.toString()==='Invalid Date') {
    res.json({error : "Invalid Date" });
  } else if (utcDate.toString() != 'Invalid Date') {
    unixDate = utcDate.getTime();
    res.json({"unix": unixDate, "utc": utcDate.toUTCString()});
  } else {
    utcDate = new Date(unixDate);
    res.json({"unix": unixDate, "utc": utcDate.toUTCString()});
  };
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
