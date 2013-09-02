var x=require("13core.js");
eval(expose(x,"x"));
function $in(dom1,dom2){/*判断元素是否在另一个元素内  */
	var flag=true;
	var temp=dom1;
	if(isDom(dom1)&&isDom(dom2)){
		do{	
			if(temp==dom2)	return true;
			else{
				if(temp==document.body||temp==document.body.parentNode)	return false;/*一直到最顶层了*/
				temp=temp.parentNode;
			}
		}while(true);
	}
	return false;
}

function $clear(dom){
	if(isDom(dom)){
		for(var i=0;i<dom.childNodes.length;){
			var ele=dom.removeChild(dom.childNodes[0]);
			ele=null;
		}
	}
}
function $add(dom,ele){/*插入节点*/
	if(isNodes(ele)){
		ele.forEach(function(e){dom.appendChild(e)})
	}
	else if(isDom(ele))	dom.appendChild(ele);
	return dom;
}

function $rm(dom){/*删除自身*/
	if(isNodes(dom)){
		for(var i=0;i<dom.length;i++){
			dom[i].parentNode.removeChild(dom[i]);
		}
		return dom;
	}
	return dom.parentNode.removeChild(dom);
}
function $insert(dom,target){/*在目标位置后面插入一个元素  如果是前面直接insertBefore就可以了*/
	if(isDom(target)){
		if(target.nextSibling!=null){
			target.parentNode.insertBefore(dom,target.nextSibling);
		}
		else{
			target.parentNode.appendChild(dom);
		}
	}
}
function $index(dom,container){/*获取自身在父元素中的位置  container不为空则获取自身在该容器的位置*/
	if(container){//如果容器不为空
		var _node=dom;
		while(true){
			if(_node.parentNode==container){
				//;//out(_node);
				return domIndex(_node);
			}
			_node=_node.parentNode;
			if(_node==document.body)	return -1;/*已经到了最顶层*/

		}
	}
	else{
		if(dom&&dom.parentNode){
			var childs=dom.parentNode.childNodes;
			var array=[];
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType==1)	array.push(childs[i]);
			}
			for(var i=0;i<array.length;i++){
				if(array[i]==dom)	return i;
			}
		}
	}
	return -1;
}

function $wrap(dom1,dom2){
	/*把dom1的内容用dom2包裹起来*/
	for(var i=0;i<dom1.childNodes.length;){
		dom2.appendChild(dom1.removeChild(dom1.childNodes[i]));
	}
	dom1.appendChild(dom2);
	return dom1;
}

function $(selector,context){/*dom选择器 只寻找一个符合条件的对象*/
	if(!context)	context=document;
	if(selector.indexOf("#")==0)	return context.querySelector(selector);
	else{
		var result=context.querySelectorAll(selector);
		if(result.length==0)	return null;
		else 	return result;
	}
}
function $1(selector,context){/*在上下文中查找符合条件的对象 返回结果应该是nodeList*/ 
	if(!context)	context=document;
	var result=context.querySelectorAll(selector);
	if(result.length==0)	return null;
	else	return result[0];
}

function $up(selector,context){
}

function matchQuery(dom,selector){/*匹配查询*/
	var tagName=strSub(selector,".");
	var css=strSub(selector,".",1);
	var cssNames=[];
	//;////out("tagName:"+tagName+" css:"+css);
	var flag=null;

	if(css!=null){
		css=css.split(",");/*多重样式使用,隔开*/
		cssNames=dom.className?dom.className.split(" "):[];
	}
	if(!isEmpty(tagName)){/*如果不为空 先匹配标签名*/
		if(dom.tagName.toLowerCase()==tagName)	flag=true;
		else									flag=false;
	}
	if((flag===null||flag===true)&&css!=null){/*再匹配样式*/
		flag=arrayContain(cssNames,css);
	}
	return flag;
}

function $up(selector,context){/*向上寻找一个符合条件的节点*/
	/*要判断这里面的几种条件  td.a2,a2*/
	var _node=context;
	while(true){
		if(matchQuery(_node,selector)){
			//;//out(_node);
			return	_node;
		}
		if(_node==document.body)	return null;/*已经到了最顶层 就直接不再处理*/
		_node=_node.parentNode;
	}
}

function $e(name,num){
	if(isNum(num)){
		var result=[];
		for(var i=0;i<num;i++){
			result.push(document.createElement(name));
		}
		return result;
	}
	return document.createElement(name);
}
/*快速创建元素*/
function $file(className){
	var file=document.createElement("input");
	file.type="file";
	if(className)	file.className=className;
	return file;
}
function $txt(className){
	var txt=document.createElement("input");
	txt.type="text";
	if(className)	txt.className=className;
	return txt;
}
function $text(className){
	var text=document.createElement("textarea");
	//txt.type="text";
	text.rows=1;
	text.className=className;
	//if(className)	text.className=className;
	return text;
}
function $table(rows,cols){/*创建一个table*/
	var table=$e("table")
	var tbody=$e("tbody");
	table.cellSpacing="0";
	table.cellPadding="0";
	//table.border="0";
	for(var i=0;i<rows;i++){
		var tr=$e("tr");
		for(var j=0;j<cols;j++){
			var td=$e("td");
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	return table;
}

function $div(id,className){
	var div=$e("div");
	if(className)	div.className=className;
	if(id)			div.id=id;
	return div;
}
function $radio(data,id,name,className){
	var ul=$e("ul");
	for(var i=0;i<data.length;){
		var name=data[i];
		var value=data[i+1];
		if(value==null)	value=name;
		var li=$e("li");
		var radio=$e("input");
		radio.name=name;
		radio.type="radio";
		var label=$e("label");
		label.innerHTML=name;
		li.value=value;

		li.appendChild(radio);
		li.appendChild(label);
		
		ul.appendChild(li);
		i+=2;
	}
	return ul;
}
function $check(id,className){
	var check=$e("input");	check.type="checkbox";
	if(className)	check.className=className;
	if(id)			check.id=id;
	return check;
}
function $span(id,className){
	var div=$e("span");
	if(className)	div.className=className;
	if(id)			div.id=id;
	return div;
}
var system_id_sequence=0;
function uidGet(prefix){/*如果是字符串或者为空  如果是dom*/
	if(isDom(prefix)){
		var dom=prefix;
		if(dom.id&&dom.id!="")	return 	dom.id;/*id为空*/
		else 							return	(dom.id=uidGet());
	}
	var id=system_id_sequence++;
	if(prefix)	id=prefix+"_"+id;
	else		id="xdom_"+id;
	return id;
}

function $def(array){
	var str="";
	for(var i=0;i<array.length;i++){
		var id=array[i];
		str+="var "+id.replace("-","_")+"=$('#"+id+"');";
	}
	console.log(str);
	return str;
}
module.exports=mix(x,{
		$:$,
		$1:$1,
		$add:$add,
		$in:$in,
		$def:$def,
		$rm:$rm,
		$insert:$insert,
		$wrap:$wrap,
		$clear:$clear,
		$childs:$childs,
		$index:$index,
		$up:$up,
		$sib:$sib,
		$pre:$pre,
		$next:$next,
		$div:$div,
		$span:$span,
		$e:$e,
		$table:$table,
		$radio:$radio,
		$check:$check,
		$txt:$txt,
		$text:$text
	});

	