var app={};

function run(dom){
	if(dom==null){
		dom=document.getElementById("app");
	}
	dom.innerHTML="hello world! I am the first app!";
	//alert("");
}

app.run=run;

if(typeof(module)=="undefined") app.run();
else	module.exports=app;