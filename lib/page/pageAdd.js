module.exports=function(param,sysParam,callback){/*要求方法支持异步返回的参数*/
	var result;
	try{
		var path=sysParam.base;
		var name=param.name;
		var file=path+"/file/pagedef/"+name+".json";
		var page=path+"/web/page/"+name+".html";
		var fs=require("fs-extra");

		if(name){
			fs.createFileSync(file);
			fs.writeJsonSync(file, param);/*保存完文件后应自动结合模板生成对应html文件*/
			
			/*模板的格式重新制作	每个模板需要一个专门的解析程序，将JSON数据转变成 文件格式字符串
				难点在于几个方面 1.模板的表单定义部分要生成，
				              2.模板的标签定义部分要生成 类似spring的代码
			*/
			var build=require("../../lib/ejs/build.js");
			build(path,name);/*生成页面*/
			
			//fs.createFileSync(page);
			//fs.writeFileSync(page,JSON.stringify(param));

			result={flag:true};
			console.log("页面"+name+"新增成功");
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


function makeHtml(page){
	var str='<!doctype html><html><head><meta charset="utf-8"><title>普通应用程序</title><link rel="stylesheet" type="text/css" href="css/app.css"></head><body class="app flex"><div class="top"><table cellpadding="0" cellspacing="0"><tr><td><span class="slt"><label>常用查询</label><ul><li>查询条件1</li><li>查询条件2</li><li>查询条件3</li><li>查询条件4</li><li>查询条件5</li><li>查询条件6</li></ul></span></td><td><label class="lbl-query">查找:</label></td><td><input type="text" class="txt"></td><td><div class="btn-query"></div></td><td><div class="icon-gap"></div></td><td><div class="icon-more"></div></td><td><span class="slt"><label>选择操作</label><ul><li>停用</li><li>启用</li><li>转移</li><li>报废</li><li>折旧</li><li>收货</li></ul></span></td><td class="btns"><span class="group"><span class="add"></span><span class="save"></span><span class="edit"></span></span><span class="group"><span class="pre"></span><span class="next"></span></span><span class="group"><span class="workflow"></span></span></td></tr></table><div class="tabs"><span id="list" class="active"> 列表 </span><span id="form"> 对象 </span></div></div><iframe id="main" src="grid.html" class="main" frameborder="0"  allowtransparency="true"></iframe><script type="text/javascript">var list=$("list");var form=$("form");var main=$("main");list.onclick=function(){main.src="grid.html";list.className="active";form.className="";}form.onclick=function(){main.src="form5.html";list.className="";form.className="active";}function $(id){return document.getElementById(id);}</script></body></html>';
	return str;
}