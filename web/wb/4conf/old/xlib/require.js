// JavaScript Document
(function(){
	var cache={};/*缓存所有的模块*/
	function require(src){/*src要求是相对路径 可以使用别名 需要在某个地方定义别名*/
		if(cache[src])	return cache[src];
		else{
			var startTime=new Date();
			var text=getJS(src);
			/*text要做额外的处理*/
			text=cleanText(text)
			var fn=new Function(text);
			cache[src]=fn();
			var endTime=new Date();
			console.log("require cost time="+(endTime.getTime()-startTime.getTime()));
			return cache[src];
		}
	}
	
	function cleanText(text){
		//text=text.replace(/\/\/[^\n]*/g,"");/*所有单行注释*/
		//text=text.replace(/\/\*[\s\S]*?\*\//g,"");/*所有多行注释*/
		//text=text.replace(/\n/g,"");
		return text;
	}
	
	function getJS(src){/*加载js内容*/
		var base="http://localhost/xlib_src/";
		var req=new XMLHttpRequest();
		req.open("get",base+src,false);
		req.send();
		var str=req.responseText;
		return str;
	}
	
	
	window.require=require;
})();