
function webEngine(req,res){
	/*获取请求的路径和参数*/
	var path=req.path.replace("/handler/","");
	var param=req.query;

	//console.log(param);
	//for(var p in req){
		//console.log("req."+p);
	//}
	//console.log(Object.getOwnPropertyNames(req));
	//console.log(req);
	//console.log("method"+req.method);
	//console.log("header:");
	//console.log(req.header);
	//console.log("body:");
	//console.log(req.body);
	//if(req.body!=null)	param=req.body;
	//console.log("param:");
	//console.log(param);

	/*动态加载*/
	try{/*可以先检查文件是否存在*/
		var method=require("../handler/"+path);

		//console.log("method type:"+typeof(method));
		if(typeof(method=="function")){
			method(param,function(result){
				res.send("path:"+path+"<br/>param:"+JSON.stringify(param)+"<br/>result:"+JSON.stringify(result));
			});
		}
		else{
			res.send("path:"+path+"<br/>param:"+JSON.stringify(param)+"<br/>result:"+JSON.stringify(method));
		}
	}catch(ex){
		console.log("exception 调用方法不存在！");
		console.log(ex);
		res.send("您请求的方法不存在");
	}
}

module.exports=webEngine;