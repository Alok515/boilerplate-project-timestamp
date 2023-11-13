// index.js
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

app.get("/api/:date?", function (req, res) {
  const param = req.params.date;
  console.log(param);
  if(param === undefined || param === null){
    const date1 = new Date();
    res.json({
      unix: date1.getTime(),
      utc: date1.toUTCString()
    });
  }
  try {
    const date = new Date(param);
    if(typeof date === 'number'){
      res.json({unix: date.getTime()});
    }
    else if(typeof date === 'string'){
      res.json({utc: date.toUTCString()});
    }
    else {
      res.json({
        error: "Invalid Date"
      })
    }
  } catch (error) {
    res.json({error: "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
