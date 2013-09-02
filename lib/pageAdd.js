module.exports=function(param,callback){/*要求方法支持异步返回的参数*/
	/*原样输出*/
	/*根据param.name写个文件*/
	console.log("page Add param:"+JSON.stringify(param));
	//console.log("__dirname="+__dirname);
	var path=__dirname.substr(0,__dirname.lastIndexOf("\\"));
	//console.log("path="+path);
	var name=param.name;
	var file=path+"/pagedef/"+name+".json";
	var fs=require("fs-extra");

	if(name){
		fs.createFileSync(file);
		fs.writeJsonSync(file, param);
	}
	return {flag:true};
}