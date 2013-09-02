// JavaScript Document
var app={};
app.baseId="";
function $(id){
	return document.getElementById(app.baseId+id);
}
app.run=function(dom,cfg){
	if(!cfg)	cfg={};
	$("conf").innerHTML+=JSON.stringify(cfg);
	$("conf").onclick=cfg.handler;
}


if(typeof(module)=="undefined")	app.run();
else	module.exports=app;

