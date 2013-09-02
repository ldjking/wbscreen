module.exports=function(param,sysParam,cb){
	

	
	var fs=require("fs-extra");
	var dir=sysParam.base;
	var path=param.path;
	var content=param.content;
	
	
	console.log("save file param:*****path="+dir+path);
	console.log(param);
	fs.writeFileSync(dir+path,content);
	
	return {flag:true};
}