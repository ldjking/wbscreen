// JavaScript Document
var am={};
var parser=require("html2json.js");

function loadApp(path){
	var app=parser(path);
	return app;
}

function runApp(dom,app,cfg){
	if(typeof(app)=="string"){
		app=loadApp(app);
	}
	
	if(!dom)	dom=document.body;
	var id=dom.id;
	app.baseId=id;
	if(app.html){
		var html=app.html.replace(/id="([a-z|0-9|_|$]+)"/g,"id=\""+id+"$1\"");/*id的动态替换*/
		dom.innerHTML=html;
	}
	if(app.class)	dom.className=app.class;
	for(var i=0;i<app.links.length;i++){
		window.require(app.links[i]);
	}
	if(app.run)	app.run(dom,cfg);
}
am.load=loadApp;
am.run=runApp;

module.exports=am;