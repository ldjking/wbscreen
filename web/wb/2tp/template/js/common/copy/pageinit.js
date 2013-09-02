$(function(){ /*启动后注册事件*/
	layout(); //初始化布局
	locale(); //初始化语言包
	validate(); //初始化校验规则，调用common.js文件代码
	component(); //初始化页面组件，调用pagename.js文件代码
	unmask(); //加载完毕取消遮罩
});

function layout() {
	//if(window.innerHeight)	pageHeight=window.innerHeight;
//	else					pageHeight=document.documentElement.clientHeight;   
//	$('#middle').css("height",pageHeight-366-32-14);
//	$('#tab').tabs({
//		onSelect:tab_select,
//		fit:true
//	});/*@description	下部的选项卡是手动创建的*/
	//$('#top').css("height","auto");

}

function locale() {
	easyloader.locale = 'zh_CN';
}

function unmask() {
	$('#mask').css("display","none");
}

window.onresize=function(){component()}/*resize后重新运算大小*/