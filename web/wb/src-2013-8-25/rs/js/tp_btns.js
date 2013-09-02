var btns={};
/*步骤的单击事件处理 切换到不同表单*/

btns.showOther=function(){
	cssRm("#btn_preview","hide");
	cssRm("#btn_delete","hide");
}
btns.hideOther=function(){
	cssAdd("#btn_preview","hide");
	cssAdd("#btn_delete","hide");
}
btns.init=function(){
	/*这个是tp.html的切换效果*/
	bindClick("#btn_save",doSave);
	bindClick("#btn_preview",doPreview);
	bindClick("#btn_delete",doDelete);

}

function doSave(){
	//alert("doSave");
	var data=collect($("#form"));
	data.module=1;
	data.template="new1";
	console.log(data);
	var result=ajax("page/pageAdd",data);
	console.log(result);
	if(result.flag){/*新增页面成功 打开预览和删除功能*/
		currFile=data;/*fileName readOnly*/
		$("#pageName").readOnly=true;/*只读属性*/
		cssAdd($("#pageName").parentNode,"disable");
		btns.showOther();
	}
}

function doPreview(){
	//alert("doView");
	var path="http://localhost";
	window.open(path+"/web/page/"+currFile.name+".html");
}

function doDelete(){
	//alert("doDelete");

}