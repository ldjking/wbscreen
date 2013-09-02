var editor={};
editor.openEditor=function(obj){
	/*把iframe的内容调整到*/
		var tp=$("#tp");		
		var conf=json("pagedef/"+obj.name);
		/*获取conf的模板向导页面*/
		var guidePage="tp.html";
		//var obj=
		//if(tp.src.substr(tp.src.lastIndexOf("/")+1)!=guidePage){
			tp.src=guidePage;
			tp.onload=function(){
				if(tp.contentWindow.edit)	tp.contentWindow.edit(conf);
			}
		//}
		//else{
		//	if(tp.contentWindow.edit)	tp.contentWindow.edit(conf);
		//}

}
editor.edit=function(obj){
	/*调用iframe tp的操作接口*/

	/*直接获取到json格式的文件内容，根据文件配置内容 选用不同的模板向导页面  然后*/
	
	editor.openEditor(obj);
}