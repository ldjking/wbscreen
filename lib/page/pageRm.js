module.exports=function(param,callback){/*要求方法支持异步返回的参数*/
	/*原样输出*/
	/*根据param.name写个文件*/
	//console.log("page rm param:"+JSON.stringify(param));
	var result;
	//console.log("__dirname="+__dirname);
	try{
		var path=param.base;
		var name=param.name;
		var file=path+"/file/pagedef/"+name+".json";
		var page=path+"/web/page/"+name+".html";
		var fs=require("fs-extra");


		if(name){
			fs.unlinkSync(file);/*删除一个页面定义，需要相应地删除页面*/
			fs.unlinkSync(page);
		
			var scan=require("../../lib/ejs/scanPage.js");
			scan(path);/*重新扫描生成页面索引字典*/

			result={flag:true};
			console.log("页面"+name+"删除成功");
		}
		else{
			console.log("删除页面时name属性不允许为空");
			result={flag:false};
		}
	}catch(err){
		console.log(err);
		result={flag:false,error:err};
	}
	if(callback&&typeof(callback)=="function") callback(result);
	else 		 return result;
}