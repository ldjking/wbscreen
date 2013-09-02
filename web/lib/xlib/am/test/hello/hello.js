var app={};
app.baseId="";
function $(id){
	return document.getElementById(app.baseId+id);
}

function run(dom){
	if(dom!=null){
		app.baseId=dom.id;
	}
	$("down").innerHTML+="第一个应用程序的加载成功了！";
	//dom.innerHTML="hello world! I am the first app!";
	//alert("");
}

app.run=run;

if(typeof(module)=="undefined") app.run();
else	module.exports=app;