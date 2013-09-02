// JavaScript Document
function parseApp(path){
	var html=window.require(path);
	var dir=getDir(path);
	/*首先是样式要扫描出来*/
	var app={};
	var links=[];	
	/*可以循环利用*/
	/*再有就是script内部的标签*/
	var cssAll=html.match(/<link[^\>]+>/g);
	if(cssAll){
		cssAll.forEach(function(css){
				var href=css.match(/href="[^"]+/)[0];
				
				//console.log("href:"+href);
				var href=dir+href.substr(href.indexOf("\"")+1);
				links.push(href);
			}
		);
	}
	var jsAll=html.match(/<script[^>]+><\/script>/ig);/**/
	
	if(jsAll&&jsAll.length>1){
		var appJs=jsAll.pop();
	
		/*最底部的就是要加载的应用程序*/
		var src=appJs.replace(/[\s\S]+src=\"([^"]+)[\s\S]+/,"$1");
		app=window.require(dir+src);
		
		//console.log(src);
		//console.log(app);/*此时方得到app*/
	}
	
	var content=html.match(/<body[\s\S]+?<\/body>/g)[0];
	var doc=html2Json(content);
	
	//console.log("doc:");
	//console.log(doc);
	
	app.dir=dir;
	app.html=doc.doms.app.html;/*内容*/
	app.class=doc.doms.app.class;/*样式*/
	app.links=links;
	
	return app;
}

function html2Json(html){
	/*解析哦 中间的内容   对象分割  body内容解析  仅仅是解析body里的内容 */
	/*空标签
	area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr*/
	var selfClose=["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
	
	var pieces=[];
	var rest=html;
	var reg=/<[^>]+>/;
	var result=reg.exec(rest);
	//console.log("html2json");
	//console.log(result);
	while(result){/*result是可以*/
		if(result.index>0){
			var text=rest.substr(0,result.index);
			if(text.trim()!="")	pieces.push(text);
		}
		pieces.push(result[0]);

		rest=rest.substr(result.index+result[0].length);
		result=reg.exec(rest);
	}
	//console.log("rest=["+rest+"]");
	//var pieces=html.match(/<[^>]+>/g);/*每个片段  最终如何整合起来  tagName  内容被不知不觉干掉了*/
	//console.dir(pieces);
	
	var doc={};
	doc.path="";
	doc.title="";
	doc.cssAll=[];
	doc.js=[];
	doc.body=null;
	doc.doms={};
	var nodes=[];
	var sum=0;
	
	for(var i=0;i<pieces.length;i++){
		//var node=new Node();
		//var pNode=
		var str=pieces[i];
		var endTag=(str.indexOf("</")==0);
		var rp=1;
		var tag;
		
		if(str.indexOf("<")!=0){
			rp=0;
			tag="text";
		}
		else if(endTag){
			rp=-1;
			//console.log("endTag:"+str);
		}
		else if(str.match(/\/>$/)){
			rp=0;/*自闭合的标签*/
		}
		else{
			tag=str.match(/^<[a-z|0-9]+/i);
			if(tag)	tag=tag[0].substr(1);
			if(selfClose.indexOf(tag)>=0){
				rp=0;
				//console.log("tag:"+tag);
			}
		}
		
		var pNode=null;
		if(nodes.length>0) pNode=nodes[nodes.length-1];/*最后一个*/
		
		if(rp==1){
			var node=new Node();
			node.tag=tag;
			node.startStr=str;
			node.pNode=pNode;
			if(str.match(/id=["|']([a-z|0-9|_|$]+)['|"]/ig)){
				//console.log("id="+RegExp.$1);
				node.id=RegExp.$1;
				doc.doms[node.id]=node;
			}
			if(str.match(/class=["|']([a-z|0-9|_|$]+)['|"]/ig)){
				//console.log("class="+RegExp.$1);
				node.class=RegExp.$1;
			}
			
			if(pNode)	pNode.childs.push(node);
			else		doc.body=node;
			nodes.push(node);/*加入到节点数组中*/
		}
		else if(rp==0){
			var node=new Node();
			node.tag=tag;
			node.str=str;/*已经闭合*/
			node.pNode=pNode;
			if(pNode)	pNode.childs.push(node);
		}
		else if(rp==-1){/*结对*/
			if(pNode){
				pNode.endStr=str;
				pNode.str=pNode.startStr;
				pNode.html="";
				for(var j=0;j<pNode.childs.length;j++){
					pNode.html+=pNode.childs[j].str;
				}
				pNode.str+=pNode.html+pNode.endStr;
				//console.log(pNode.str);
			}
			nodes.pop(pNode);/*结对完成*/
		}
		//var piece={str:};
		
		//console.log("第"+i+"个片段:"+piece);
	}
	return doc;;
}

function Node(){
	this.tag="";
	this.id=null;
	this.class=null;
	this.startStr="";
	this.endStr="";
	this.str="";
	this.childs=[];
	this.pNode;
	this.html=function(){
		
	}
}


module.exports=parseApp;