window.onload=init;

function genTree(dom,option,data){
	/*每个data都应该有level	满足一定的功能*/
	/*data的数据结构要求 name level id  pid*/
	for(var i=0;i<data.length;i++){
		
	}
}

function init(){
	var tree=document.getElementById("tree");
	tree.onclick=clickHandler;
}

function clickHandler(evt){
	/*open close的转换*/
	//alert("click");
	var target=evt.target;
	/*判断target是否为node  node节点可以展开和收缩  leaf节点则不能*/
	var css=target.className;
	//alert(css.indexOf("open"));
	if(css.indexOf("open")>=0){/*收缩时要隐藏所有子孙节点*/
		target.className=css.replace("open","close");
		/*要把兄弟节点里的子节点给显示出来  参考level值*/
		//alert("level="+level);
		var childs=getSub(target,false,true);
		
		for(var i=0;i<childs.length;i++){
			var child=childs[i];
			var css=child.className;/*隐藏时先里后外*/
			child.style.transitionDelay=i*0.1+"s";
			var newCss=css.replace("show","hide");
			if(css.indexOf("open"))	newCss=newCss.replace("open","close");
			child.className=newCss;
			
		}
		//console.log(childs);
	}
	else{/*展开时只展开子节点*/
		target.className=css.replace("close","open");
		
		var childs=getSub(target,true);
		
		for(var i=0;i<childs.length;i++){
			var child=childs[i];
			var css=child.className;
			child.style.transitionDelay=(childs.length-i-1)*0.1+"s";

			child.className=css.replace("hide","show");
			
		}
	}
}

function getSub(target,onlySon,onlyShow){
	var childs=[];
	var node=target;
	var level=target.getAttribute("v");
	var flag=true;
	while(true){
		node=node.nextSibling;
		if(!node)	break;
		if(node.nodeType==3)	continue;/*下一循环*/
		if(onlyShow&&node.className.indexOf("show")<0)	continue;
		var level2=node.getAttribute("v");
		if(level2&&level2>level){
			if(!onlySon)	childs.push(node);
			if(onlySon&&(level2-level==1)){
				console.log("level1="+level+" level2="+level2);
				childs.push(node);
			}
		}
		if(level2<=level)	break;
	}
	return childs;
}