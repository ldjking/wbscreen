var express = require('express');
var app = express();
//console.log("server base path:"+__dirname);

process.on('uncaughtException', function(e) {
	console.log("server on error");
　　 console.log(e);
});



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

function cb(res){
  return function(result){
    var resultStr=JSON.stringify(result);
    res.send(resultStr);
  }
}
function handler(req,res){/*处理所有服务请求*/
    var method=req.path;
	console.log("hander path:"+method);
    var param={};
    var str;
	/*根据请求方式 如果是xhr则返回json，如果不是则返回字符串*/
	/*根据请求方式，如果是xhr则直接解析p参数，如果不是则解析query的所有值和body的所有值*/
	if(req.xhr){
		console.log("isXHR");
		console.log(req.query);
		console.log(req.body);
		if(req.query&&req.query.p) 	str=req.query.p;
		if(req.body&&req.body.p)  	str=req.body.p;/*query和body里面的内容只取其一*/
		if(str) param=JSON.parse(str);/*要求客户端发送的内容是JSON格式的*/
	}
    else{
		console.log("requrest is not XHR");
		param=req.query;
		console.log(req.query);
		console.log(req.body);
		
		if(req.query&&req.query.p) str=req.query.p;
		if(req.body&&req.body.p)  str=req.body.p;/*query和body里面的内容只取其一*/
		if(str) param=JSON.parse(str);/*要求客户端发送的内容是JSON格式的*/
	}
    var sysParam={};/*系统参数  文件根目录  当前用户*/
	sysParam.base=__dirname;

	try{
    	var fn=require("./handler"+method+".js");
		console.log("fn+++++++++++");
		console.log(fn);
		var result=fn(param,sysParam,cb(res));/*也允许异步返回*/
		if(result!=null)	cb(res)(result);/*直接返回结果*/
	}catch(e){
		//console.log(req.xhr);
		console.log(e);
		var result={flag:false,code:"501",err:"方法不存在"};
		if(req.xhr)	res.send(result);
		else		res.send(JSON.stringify(result));
	}
	
		
	
}
var conf={maxAge: 86400000};

app.use(express.compress());
//app.all('*', function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//	res.header("Cache-Control",' max-age:86400000');
//    res.header("X-Powered-By",' 3.2.1');
//    //if(req.method=="OPTIONS") res.send(200);/*让options快速返回*/
//    //else  next();
//	next();
//});
app.use("/handler",handler);/*服务处理程序 handler*/
app.use("/web",express.static(__dirname + '/web'),conf);/*静态资源web*/


app.listen(80);
console.log("node is listening on 80 port!");


/*cache自动化维护*/
var watch = require('watch')

watch.watchTree(__dirname+"/handler/",handlerChange);/*handler文件发生变化清除改项缓存*/


function handlerChange(f,curr,prev){/*服务变化*/
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // f is a new file
	 	// var rs=require(f);
    } else if (curr.nlink === 0) {
		console.log("handler file delete "+  f);
	  	delete require.cache[f];	/*删除*/

    } else {
		console.log("handler file change "+ f);
		delete require.cache[f];
		var rs=require(f);/*重新加载改资源  确保下次使用能快速*/
		//console.log(rs.toString());
    }
}
