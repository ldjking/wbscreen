window.onload=init;
var currFile;
var mode="add";
function init(){
	iframeAutoHeight($("#app"));
	//form.clear("#form1");
	form.init();
	steps.init();	/*初始化操作步骤*/
	btns.init();	/*初始化操作按钮*/
}


function edit(conf){
	//console.log("edit conf");
	//console.log(conf);
	currFile=conf;

	if(conf==null){
		form.clear("#form1");
		btns.hideOther();
	}
	else{
		form.fillData("#form1",conf);
		btns.showOther();
	}
	
	//alert("edit");
}
