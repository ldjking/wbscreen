// JavaScript Document
(function(){/*除了提供模块注册功能，还应该提供原始地址加载功能【分布式加载】*/
	/*需要获取require的路径*/
	var modules={},cache={},reqDir=getCurrPath(),
	regist={/*模块注册 注册的模块可直接通过注册名使用  1代表是类库*/
		base:[1,"常用扩展","base/all.js"],
		ajax:[1,"服务器交互","ajax/ws.js"],	
		tree:[1,"树","tree/tree.js","tree/tree.css"],
		chart:[1,"图表","chart/chart.js","tree/tree.css"],
		form:[1,"表单","form/form.js","form/form.css"],
		am:[1,"am","am/am.js"],
		hello:[2,"Hello","apps/hello/hello.js"],
		scroll:[2,"scroll","scroll/scroll.js","scroll/scroll.css"]
	}
		
	window.g=modules;
	window.require=require;
	window.expose=expose;/*属性暴露 返回成字符串 使用eval处理*/
	window.mix=mix;/*对象扩展*/
	window.getDir=getDir;
	
	for(var p in regist){/*赋值给g  确保注册过的模块可以通过注册名使用 按需加载*/
		Object.defineProperty(modules,p,{get:getModule(p),enumerable:true});
	}
	
	function expose(obj,name){
		var str="";
		for(var p in obj){
			str+="var "+p+"="+name+"."+p+";";
		}
		//console.log(str);
		return str;
	}
	
	
	
	function mix(obj1,obj2,override){
		if(!obj1)	obj1={};
		for(var p in obj2){
			if(obj1[p]===undefined||override)	obj1[p]=obj2[p];
		}
		return obj1;
	}
	
	/*@description 获取注册模块*/
	function getModule(name){/*获取注册模块 注册模块的时候就可以立刻加载资源文件吗  to-think*/
		return function(){
			var reg=regist[name];
			var src=reg[2];
			console.log("reqDir:"+reqDir);
			for(var i=3;i<reg.length;i++){
				require(reg[i],reqDir);/*如果有样式引用，直接加载*/
			}
			return require(src,reqDir);
		}
	}
	function isAbsPath(src){
		return src.indexOf("http")==0;
	}
	function getDir(path){
		return path.substr(0,path.lastIndexOf("/")+1);
	}
	function getCurrPath(){
		var scripts=document.getElementsByTagName("script");
		for(var i=0;i<scripts.length;i++){
			var script=scripts[i];
			var str=script.outerHTML;
			if(str.indexOf("require.js")>=0){
				var src=str.replace(/[\s\S]+?src="([^"]+)[\s\S]+/g,"$1");
				var path=src.replace("require.js","");
				//alert(path);
				return path;
			}
		}
	}
	function mergePath(src,base){
		/*正常情况下 应该返回base+src  但是src的书写方法可以是 ../../*/
		var array1=base.split(/\//);
		var array2=src.split(/\//);
		for(var i=0;i<array2.length;i++){
			if(array2[i]==".."){
				array1.pop();/*删除一个元素*/
			}
		}
	}
	function clearPath(path){/*对路径进行清理,如果内部存在a/../这种*/
		//console.log("path:"+path);
		return path.replace(/[^\/^\.][^\/|]*?\/\.\.\//g,"");
	}
	/*@description 同步加载资源*/
	function require(src,base){/*src要求是相对路径 可以使用别名 需要在某个地方定义别名*/
		/*src里并不一定是绝对路径  
			引用模块资源有三种情况   1.引用已注册的资源,通过g.base引用
								 2.引用未注册的资源,base没有值，根据document.location生成
								 		2.1 绝对路径 src中包含http  不需要base
								 3.模块引用其他模块,base是该模块的路径
								 		3.1	绝对路径 src中包含http  不需要base
								 4.模块引用css资源，不会产生返回值
								 
			要在module对象中增加一个dir属性
			require仅仅特指模块化的js资源  如果要加载
		*/
		//console.log("require "+src+" base:"+base);
		var path,dir;
		if(!base)	base="";
		if(isAbsPath(src))	path=src;
		else	path=base+src;
		path=clearPath(path);
		dir=getDir(path);
		
		//console.log("require path=["+path+"]");
		

		
		
		if(cache[path]){/*缓存是按照路径来，实际是有一定问题*/
			if(path.match(/css$/)){/*如果是css资源 要把该css的优先级提高  其他资源则都已缓存*/
				//cache[path]=loadCss(path);
			}
			return cache[path];
		}
		else{
			var startTime=new Date();
			if(path.match(/css$/)){
				cache[path]=loadCss(path);
			}
			else if(path.match(/[html|txt]$/)){
				cache[path]=getRS(path);
			}
			else if(path.match(/json$/)){
				var temp=getRS(path);
				cache[path]=JSON.parse(temp);
			}
			else{
				var text=getRS(path);
				var fn=new Function("module","require",text),obj={};
				fn(obj,newRequire(dir));
				cache[path]=obj.exports;
			}
			


			var endTime=new Date();
			var cost=(endTime.getTime()-startTime.getTime());
			console.log("require "+name+" path="+path+" cost time="+cost);
			return cache[path];
		}
	}
	function newRequire(base){
		return function(src){
			return require(src,base);
		}
	}
	
	/*@description 使用XMLHttpRequest来获取资源内容*/
	function getRS(path){/*获取资源内容*/
		try{
			var req=new XMLHttpRequest();
			req.open("get",path,false);
			req.send();
			var str=req.responseText;
			
			return str;
		}catch(e){
			console.log(e);
		}
	}
	
	var cssLinks=null;
	var cssAll=null;
	/*@description 加载样式表*/
	function loadCss(path){/*重复的样式不要再加载*/
		if(!cssAll)	getAllCss();
		//console.log("cssAll:"+cssAll);
		var p=cssAll.indexOf(path);
		//console.log(path+" index "+p);
		
		if(p>=0)	return cssLinks[p];
		var style=document.createElement("link");
		style.rel="stylesheet";
		style.type="text/css";
		style.href=path;
		var head=document.getElementsByTagName("head")[0];
		head.appendChild(style);/*增加css样式 一般来说应该处于较低的优先级*/
		return style;/*得到一个style的dom*/
	}
	
	function getAllCss(){
		if(cssAll==null){
			cssAll=[];
			cssLinks=[];

			var links=document.getElementsByTagName("link");
			for(var i=0;i<links.length;i++){
				var obj=links[i];
				if(obj.rel=="stylesheet"){

					console.log(links[i].outerHTML);
					var href=links[i].outerHTML.match(/href="[^"]+/)[0].substr(6);
					console.log("href:"+href);
					cssAll.push(href);
					cssLinks.push(obj);
					//var currDir=window.location.href.replace("");
				}
				//console.log("links["+i+"]");
				//console.log("href:");
				//console.log(window.location.href);
			}
		}
	}
	
	/*测试了IE10 Chrome firefox  所有浏览器均可以使用怪异的相对地址  a/../b/==b/*/
})();

