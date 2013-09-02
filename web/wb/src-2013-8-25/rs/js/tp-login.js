window.onload=init;
var currFile;
function init(){
	console.log("iframe init");
	iframeAutoHeight($("#app"));
	form.clear("#form1");
	steps.init();	/*初始化操作步骤*/
	btns.init();	/*初始化操作按钮*/
}


function edit(conf){
	//console.log("edit conf");
	//console.log(conf);
	currFile=conf;
	form.fillData("#form1",conf);
	btns.showOther();
	
	//alert("edit");
}
