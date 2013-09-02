console.log("master is running!");
var server = require('child_process').fork('server.js', ['normal']);/*子进程启动server*/
//var ide = require('child_process').fork('ide.js', ['normal']);/*子进程启动server*/

//setTimeout(killServer,8000);

function killServer(){
	try{
		process.kill(server.pid);
		//console.log("server is killed!");
	}catch(ex){
		//console.log("kill server error");
		console.log(ex);
	}
}

process.on('exit', function () {
　　console.log('master will not run');
　　console.log('Bye.');
});

process.on('uncaughtException', function(e) {
	console.log("master on error");
　　 console.log(e);
	serverChange();
});

var fs=require("fs");
var watch = require('watch')

fs.watchFile("server.js",serverChange);/*server文件发生变化则重启服务器*/
watch.watchTree(__dirname+"/lib/",libChange);/*lib文件发生变化则清除所有缓存*/

function libChange(f,curr,prev){/**/
	 if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // f is a new file
    } else if (curr.nlink === 0) {
		console.log("lib file delete "+  f);

    } else {
		console.log("lib file change "+ f);
		serverChange();
		//console.log(rs.toString());
    }
}

function serverChange(){
	console.log("server change!");
	killServer();

	server = require('child_process').fork('server.js', ['normal']);
	console.log("new server is built!");

}
