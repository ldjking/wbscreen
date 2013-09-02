var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/index2', function (req, res) {
  res.sendfile(__dirname + '/index2.html');
});
app.get('/socket_io.js', function (req, res) {
  res.sendfile(__dirname + '/socket_io.js');
});
app.get('/jquery.min.js',function(req,res){
    res.sendfile(__dirname + '/jquery.min.js');
    //console.log(realpath);
    //res.writeHead(200,{'Content-Type':mime.lookup(realpath)});
   // res.end(fs.readFileSync(realpath));
});
var getCurrTime = function(){
    var d  = new Date();
    return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
};
io.sockets.on('connection', function (socket) {
	console.log("server connection:");
	//console.log(socket);
  	socket.on('msg', function(msg){
     var data = {username:socket.name,time:getCurrTime(),msg:msg};
     //socket.emit('msg',data);
     socket.broadcast.emit('msg',data);
	 //console.log("server recieve msg:");
	 //console.log(msg);
  });
  socket.on('login', function(username){
     socket.name = username;
     var data = {username:'SYSTEM',time:getCurrTime(),msg:'welcome '+socket.name+' in...'};
     socket.broadcast.emit('msg',data);
     socket.emit('msg',data);
  });
  socket.on('logout', function(username){
     var data = {username:'SYSTEM',time:getCurrTime(),msg:'bye, '+socket.name+' leave...'};
     socket.broadcast.emit('msg',data);
     socket.emit('msg',data);
  });
  socket.on('disconnect', function () {
        socket.send(getCurrTime()+' '+socket.name+ " out...");
  });
});
var i=1;
setInterval(sendEveryone,1000);
function sendEveryone(){
	i++;
  //console.log("system info every sencod! "+i+"  time:"+getCurrTime());
	var data = {username:'SYSTEM',time:getCurrTime(),msg:'system info every sencod!'+i};
  	//io.sockets.emit('msg',data);
	//io.emit('msg',data);
}
