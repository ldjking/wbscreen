module.exports=function(param,callback){/*要求方法支持异步返回的参数*/
	/*原样输出*/
	/*根据param.name写个文件*/
	//console.log("page update param:"+JSON.stringify(param));
	var result;
	//console.log("__dirname="+__dirname);
	try{
		var path=param.base;
		var name=param.name;
		var file=path+"/file/pagedef/"+name+".json";
		var fs=require("fs-extra");

		delete param.base;		/*移除不需要保存的属性*/
		delete param.person;	/*移除不需要保存的属性*/

		if(name){
			//fs.createFileSync(file);
			fs.writeJsonSync(file, param);/*保存完文件后应自动结合模板生成对应html文件*/
			var build=require("../../lib/ejs/build.js");
			build(path,name);/*生成页面*/

			var scan=require("../../lib/ejs/scanPage.js");
			scan(path);/*重新扫描生成页面索引字典*/
			result={flag:true};
			console.log("页面"+name+"修改成功");
		}
		else{
			console.log("新增页面时name属性不允许为空");
			result={flag:false};
		}
	}catch(err){
		console.log(err);
		result={flag:false,error:err};
	}
	if(callback&&typeof(callback)=="function") callback(result);
	else 		 return result;
}