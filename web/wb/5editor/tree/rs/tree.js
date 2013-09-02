(function(win){
	var cfg={gap:20};
	var lastOpen=null;
	function genTree(dom,url,handler){
		if(typeof(dom)=="string")	dom=document.getElementById(dom);
		var data=JSON.parse(ajax(url));
		//console.log(data);
		var str="";
		data.forEach(function(e){
				str+="<div v="+e.v+" path="+e.path+">"+e.name+"</div>";
			})
		dom.innerHTML=str;
		makeTree(dom,handler);
	}
	function makeTree(dom,handler){/*把一个dom 变成tree*/
		for(var i=0;i<dom.childNodes.length;){
			var c=dom.childNodes[i];
			if(c.nodeType==3)	dom.removeChild(c);
			else 	i++;
		}
		var len=dom.children.length;
		for(var i=0;i<len;i++){
			var node=dom.children[i];
			var v=parseInt(node.getAttribute("v"));
			node.v=v;
			node.c=0;
			if(v>2)	node.c=v-2;
			/*要压缩的级别 compress  第三级进入可视区域要把所有都压缩一级  第四级压缩两级  以此类推*/
			node.style.marginLeft=v*cfg.gap+"px";
			if(v>1)	cssAdd(node,"hide");/*默认只显示第一级别子节点*/
			
			if(i>0&&dom.children[i-1].v==node.v-1){
				dom.children[i-1].className="node";
				dom.children[i-1].isNode=true;
				dom.children[i-1].onclick=function(evt){nodeClick(evt,handler);};
			}
			else if(i>0){
				dom.children[i-1].className="leaf";
				dom.children[i-1].onclick=handler;
			}
		}
		dom.children[len-1].className="leaf";/*最后一个必定是叶节点*/
		dom.children[0].click();
	}
	
	function nodeClick(evt,handler){/*展示子节点*/
		var node=evt.target;
		if(node.className=="node open"&&lastOpen==node){
			node.className="node collapse";
			collapse(node);
			lastOpen=nulll;
		}
		else{
			node.className="node open";
			lastOpen=node;
			up(node);
			down(node);
		}
		handler(evt);
	}
	
	function up(node){/*需要重新运算marginLeft的值*/
		var target=node,v=node.v,c=node.c,flag=1;
		var ifCollapse=(node.className=="node collapse");
		if(ifCollapse)	c=c-1;
		while(target!=null){
			target=target.previousSibling;
			if(target==null)	return;
			
			var rv=target.v-c;/*当显示该节点 需不需要压缩 重新调整margin间距*/
			if(rv<1)	rv=1;
			target.style.marginLeft=rv*cfg.gap+"px";
			
			if(target.v==v-1)	v--;	/*祖先部分*/
			else{
				if(target.isNode)	target.className="node collapse";
				if(target.v==node.v&&target.v==v)	;/*是兄弟节点*/
				else	cssAdd(target,"hide");
			}
		}
	}
	
	function down(node){/*需要重新运算marginLeft的值*/
		var target=node,flag=1,v=node.v,c=node.c;
		
		if(v>1)	target.style.marginLeft=2*cfg.gap+"px";

		while(target!=null){
			target=target.nextSibling;
			if(target==null)	return;
			
			var rv=target.v-c;/*重新调整margin间距*/
			if(rv<1)	rv=1;
			target.style.marginLeft=rv*cfg.gap+"px";
			
			if(target.isNode)	target.className="node collapse";

			if(flag==1&&target.v==v+1)	cssRm(target,"hide");/*子部分*/
			if(flag==1&&target.v>v+1)	cssAdd(target,"hide");/*孙部分*/
			if(flag<=2&&target.v==v)	flag=2;/*兄弟部分*/
			if(flag==2&&target.v>v)		cssAdd(target,"hide");/*兄弟分支部分*/
			if(flag<=3&&target.v<v)		flag=3;/*不在一条线上*/
			if(flag==3)				cssAdd(target,"hide");/*不在一条线上的元素*/
		}
	}
	
	function collapse(node){
		var target=node,flag=1,v=node.v;
		
		while(target!=null){
			target=target.nextSibling;
			if(target==null)	return;
		 	
			if(target.v==v+1)	cssAdd(target,"hide");/*子部分*/
			if(target.v<=v)		break;
		}
	}
	
	function cssAdd(dom,css1){/*给元素添加样式*/
		if(dom&&dom.className!=null){
			var css=dom.className.split(/\s+/g);
			if(css.indexOf(css1)<0){/*如果没有该样式 方添加*/
				css.push(css1);
				dom.className=css.join(" ").trim();
			}
		}
		else	dom.className=css1;
	}
	function cssRm(dom,css1){
		if(dom&&dom.className!=null){
			var css=dom.className.split(/\s+/g);
			var p=css.indexOf(css1);
			if(p>=0)	dom.className=css.splice(p-1,1).join(" ");
		}
	}
	
	function ajax(url){
		var xhr=new XMLHttpRequest();
		xhr.open("get",url,false);
		xhr.send();
		var text=xhr.responseText;
		return text;
	}
	win.makeTree=makeTree;
	win.genTree=genTree;
	win.ajax=ajax;
})(window)

