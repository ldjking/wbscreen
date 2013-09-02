// JavaScript Document
/*
	要求配置容器containr	默认为down
*/
var App={};
var curr=null;/*当前应用程序*/
var all={};/*全部应用程序*/
var allArray=[];
var lastDom=null;/*触发dom  值列表的展示*/
/*应用程序的结构
	header
	main
	footer		三部分
*/

App.run=function(app,dom){
	if(app.status=="active"){}	/*已处于激活状态 不做任何处理*/
	else if(app.status=="deactive"){
		renderApp(app);		/*呈现应用程序*/
	}
	else{					/*创建一个dom*/
		prepareApp(app);	/*准备应用程序*/
		app.run();			/*应用程序依然不可见*/
		renderApp(app);		/*呈现应用程序*/
	}
}
function hideApp(){
}
function loadApp(){/*先处理好结构*/
}
function prepareApp(){
	/*加载资源  创建DOM */
}
function showApp(){/*展示应用程序*/
}
function renderApp(app){/*呈现应用程序*/
	var callback=function(){
		renderApp(app);
	}
	if(app.type=="win"){
		hideApp(curr,callback);/*执行隐藏动画 完毕后执行展示动画*/
	}
	else if(app.type=="dialog"){
		callback();/*直接呈现  位置的问题*/
	}
	else if(app.type=="service"){/*service什么都不需要做*/
		
	}
}
var conf={
		container:"down"/*容器的id*/
	};


function run(app){/*am能够run 某个app*/
	/*判断app的状态*/
	if(app.status=="active"){
	}
	else if(app.status=="deactive"){
	}
	else{/*创建一个dom*/
		if(conf.activeApp){
			conf.activeApp.className="deactive";/*隐藏当前活动的应用*/
			/*打开加载进度条*/
		}
		var div=document.createElement("div");
		div.className="app";
		var con=document.getElementById(conf.container);
		con.appendChild(div);
		app.run(div);/*执行结束后再设置*/
		div.className="active";/*设置成active*/
	}
}


module.exports=App;