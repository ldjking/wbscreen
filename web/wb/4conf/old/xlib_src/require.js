// JavaScript Document
(function(){
	var cache={};/*缓存所有的模块*/
	var base="http://localhost:81/";

	function require(src){/*src要求是相对路径 可以使用别名 需要在某个地方定义别名*/
		if(cache[src])	return cache[src];
		else{
			var startTime=new Date();
			var text=getJS(src);
			var fn=new Function(text);
			cache[src]=fn();
			var endTime=new Date();
			console.log("require cost time="+(endTime.getTime()-startTime.getTime()));
			return cache[src];
		}
	}
	
	function getJS(src){/*加载js内容*/
		var req=new XMLHttpRequest();
		req.open("get",base+src,false);
		req.send();
		var str=req.responseText;
		return str;
	}
	
	function loadCss(src){
		var css=document.createElement("link");
		css.rel="";
		css.type="";
		css.href=base+src;
		document.head.appendChild(css);/*增加css样式*/
	}
	
	window.require=require;
	window.loadCss=loadCss;
})();