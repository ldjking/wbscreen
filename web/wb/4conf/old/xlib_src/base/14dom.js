/*xlib.14dom  文档对象辅助  包括筛选器 $  等函数*/
var x=require("base/13core.js");
	x.domIn=function(dom1,dom2){/*判断元素是否在另一个元素内  */
		var flag=true;
		var temp=dom1;
		if(x.isDom(dom1)&&x.isDom(dom2)){
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
	
	x.domClear=function(dom){
		if(x.isDom(dom)){
			for(var i=0;i<dom.childNodes.length;){
				var ele=dom.removeChild(dom.childNodes[0]);
				ele=null;
			}
		}
	}
	x.domAdd=function(dom,ele){/*插入节点*/
		if(x.isNodes(ele)){
			x.arrayEach(ele,function(e){dom.appendChild(e)})
		}
		else if(x.isDom(ele))	dom.appendChild(ele);
		return dom;
	}

	x.domRm=function(dom){/*删除自身*/
		if(x.isNodes(dom)){
			for(var i=0;i<dom.length;i++){
				dom[i].parentNode.removeChild(dom[i]);
			}
			return dom;
		}
		return dom.parentNode.removeChild(dom);
	}
	x.domInsert=function(dom,target){/*在目标位置后面插入一个元素  如果是前面直接insertBefore就可以了*/
		if(x.isDom(target)){
			if(target.nextSibling!=null){
				target.parentNode.insertBefore(dom,target.nextSibling);
			}
			else{
				target.parentNode.appendChild(dom);
			}
		}
	}
	x.domIndex=function(dom,container){/*获取自身在父元素中的位置  container不为空则获取自身在该容器的位置*/
		if(container){//如果容器不为空
			var _node=dom;
			while(true){
				if(_node.parentNode==container){
					//;//out(_node);
					return x.domIndex(_node);
				}
				_node=_node.parentNode;
				if(_node==document.body)	return -1;/*已经到了最顶层*/

			}
		}
		else{
			if(dom&&dom.parentNode){
				var childs=dom.parentNode.childNodes;
				for(var i=0;i<childs.length;i++){
					if(childs[i]==dom)	return i;
				}
			}
		}
		return -1;
	}
	
	x.domWrap=function(dom1,dom2){
		/*把dom1的内容用dom2包裹起来*/
		for(var i=0;i<dom1.childNodes.length;){
			dom2.appendChild(dom1.removeChild(dom1.childNodes[i]));
		}
		dom1.appendChild(dom2);
		return dom1;
	}

	x.$dom=function(selector,context,upFlag){/*dom选择器 只寻找一个符合条件的对象*/
		if(upFlag)	return $domUp(selector,context);
		if(x.isDom(context))	return context.querySelector(selector);
		else						return document.querySelector(selector);
	}
	x.$doms=function(selector,context){/*在上下文中查找符合条件的对象 返回结果应该是nodeList*/ 
		if(x.isDom(context))	return context.querySelectorAll(selector);
		else						return document.querySelectorAll(selector);
	}
	
	function matchQuery(dom,selector){/*匹配查询*/
		var tagName=x.strSub(selector,".");
		var css=x.strSub(selector,".",1);
		var cssNames=[];
		//;////out("tagName:"+tagName+" css:"+css);
		var flag=null;

		if(css!=null){
			css=css.split(",");/*多重样式使用,隔开*/
			cssNames=dom.className?dom.className.split(" "):[];
		}
		if(!x.isEmpty(tagName)){/*如果不为空 先匹配标签名*/
			if(dom.tagName.toLowerCase()==tagName)	flag=true;
			else									flag=false;
		}
		if((flag===null||flag===true)&&css!=null){/*再匹配样式*/
			flag=x.arrayContain(cssNames,css);
		}
		return flag;
	}
	
	function $domUp(selector,context){/*向上寻找一个符合条件的节点*/
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
	
	x.$e=function(name,num){
		if(x.isNum(num)){
			var result=[];
			for(var i=0;i<num;i++){
				result.push(document.createElement(name));
			}
			return result;
		}
		return document.createElement(name);
	}
	/*快速创建元素*/
	x.$file=function(className){
		var file=document.createElement("input");
		file.type="file";
		if(className)	file.className=className;
		return file;
	}
	x.$txt=function(className){
		var txt=document.createElement("input");
		txt.type="text";
		if(className)	txt.className=className;
		return txt;
	}
	x.$text=function(className){
		var text=document.createElement("textarea");
		//txt.type="text";
		text.rows=1;
		text.className=className;
		//if(className)	text.className=className;
		return text;
	}
	x.$table=function(rows,cols){/*创建一个table*/
		var table=x.$e("table")
		var tbody=x.$e("tbody");
		table.cellSpacing="0";
		table.cellPadding="0";
		//table.border="0";
		for(var i=0;i<rows;i++){
			var tr=x.$e("tr");
			for(var j=0;j<cols;j++){
				var td=x.$e("td");
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		return table;
	}

	x.$div=function(id,className){
		var div=x.$e("div");
		if(className)	div.className=className;
		if(id)			div.id=id;
		return div;
	}
	x.$checkbox=function(id,className){
		var check=x.$e("input");	check.type="checkbox";
		if(className)	check.className=className;
		if(id)			check.id=id;
		return check;
	}
	x.$span=function(id,className){
		var div=x.$e("span");
		if(className)	div.className=className;
		if(id)			div.id=id;
		return div;
	}
	var system_id_sequence=0;
	x.uidGet=function(prefix){/*如果是字符串或者为空  如果是dom*/
		if(x.isDom(prefix)){
			var dom=prefix;
			if(dom.id&&dom.id!="")	return 	dom.id;/*id为空*/
			else 							return	(dom.id=x.uidGet());
		}
		var id=system_id_sequence++;
		if(prefix)	id=prefix+"_"+id;
		else		id="xdom_"+id;
		return id;
	}
	return x;

	