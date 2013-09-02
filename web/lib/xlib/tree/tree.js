//window.onload=init;
var activeLeaf;
var openNodes=[];
function formatData(data){
	for(var i=0;i<data.length;i++){
		var css=[];
		var obj=data[i];
		css.push(obj.type);/*node leaf*/
		css.push("lvl"+obj.level);
		if(obj.level<=2)	css.push("show");/*show hide  根目录是展开的 前两级默认显示*/
		else				css.push("hide");
		if(obj.level==1){
			css.push("open");
			openNodes[obj.level]=obj;
		}
		else if(obj.type=="node")	css.push("close");
		if(obj.type=="leaf")	css.push("normal");
		obj.css=css;
	}
}

function genTree(dom,conf,data){
	formatData(data);
	/*每个data都应该有level	满足一定的功能*/
	/*data的数据结构要求 name level id  pid  type{node leaf} level show hide open close*/
	dom.conf=conf;
	for(var i=0;i<data.length;i++){
		var div=document.createElement("div");
		div.innerHTML=data[i].name;
		div.className=data[i].css.join(" ");
		div.setAttribute("v",data[i].level);
		div.obj=data[i];
		div.onclick=clickHandler;
		dom.appendChild(div);
	}
}

function openNode(target,callback){
	if(!target)	return;
	var css=target.className;

	target.className=css.replace("close","open");
	
	openNodes[target.obj.level]=target;

	var childs=getSub(target,true);
	
	var step=0.8/childs.length;
	if(step>0.1)	step=0.1;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		var css=child.className;
		child.style.transitionDelay=(childs.length-i-1)*step+"s";

		child.className=css.replace("hide","show");
		
	}
	
	if(callback)	setTimeout(callback,childs.length*step*1000);

}

function closeNode(target,callback){
	if(!target)	return;
	var css=target.className;
	//console.log(target);
	target.className=css.replace("open","close");
	/*要把兄弟节点里的子节点给显示出来  参考level值*/
	//alert("level="+level);
	openNodes[target.obj.level]=null;
	var childs=getSub(target,false,true);
	
	var step=0.8/childs.length;
	if(step>0.1)	step=0.1;
	for(var i=0;i<childs.length;i++){
		var child=childs[i];
		var css=child.className;/*隐藏时先里后外*/
		child.style.transitionDelay=i*step+"s";/*保证在1s内完成，但是间隔又不允许大于0.1*/
		var newCss=css.replace("show","hide");
		if(css.indexOf("open"))	newCss=newCss.replace("open","close");
		child.className=newCss;
		
	}
	if(callback)	setTimeout(callback,childs.length*step*1000);
}

function clickHandler(evt){
	/*open close的转换*/
	//alert("click");
	var target=evt.target;
	var tree=this.parentNode;
	var conf=tree.conf;
	/*判断target是否为node  node节点可以展开和收缩  leaf节点则不能*/
	var css=target.className;
	//alert(css.indexOf("open"));
	if(css.indexOf("open")>=0){/*收缩时要隐藏所有子孙节点*/
		closeNode(target);
		//console.log(childs);
	}
	else{/*展开时只展开子节点  先自行关闭操作，需要回调事件*/
		/*先展开后关闭*/
		//var lastLevelNode=openNodes[target.obj.level];
		//if(lastLevelNode)		openNode(target,function(){closeNode(lastLevelNode)});
		//else	openNode(target);
		
		/*同时展开和关闭*/
		var lastLevelNode=openNodes[target.obj.level];
		closeNode(lastLevelNode);
		openNode(target);
		/*打开节点的同时 关闭同级别打开的节点，或者*/
	}
	if(target.obj.type=="leaf"){/*normal active样式*/
		if(activeLeaf&&activeLeaf!=target){
			activeLeaf.className=activeLeaf.className.replace("active","normal");
		}
		target.className=target.className.replace("normal","active");
		activeLeaf=target;
	}
	if(tree.conf.nodeClick)	tree.conf.nodeClick(target);
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

module.exports=genTree;