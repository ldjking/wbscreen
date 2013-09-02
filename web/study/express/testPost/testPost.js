var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}


function handler(req,res){
  console.log(req);
  for(var p in req){
    console.log(p);
  }
}


app.use("/handler",handler);

//app.use("/page",express.static(__dirname + '/page'));
//app.use("/xlib_src",express.static(__dirname + '/xlib_src'));
//app.use("/xlib",express.static(__dirname + '/xlib'));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});

app.listen(80);
console.log("node is listening on 80 port!");