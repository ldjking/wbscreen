// JavaScript Document
var x={};
x.isNull=function(obj){return obj==null}/*包含了undefine 和null*/
x.isEmpty=function(obj){
	if(obj==null)		return true;
	if(x.isStr(obj)&&obj.length==0)	return true;
	if(x.isArray(obj)&&obj.length==0)	return true;

	if(typeof(obj)=="object"){/*是对象且有值*/
		for(var p in obj){	return false;}	
		if(!x.isDate(obj))	return true;/*如果该对象没有任何可遍历的属性*/
	}
	return false;
}
x.isNum=function(obj){return typeof(obj)=="number"&&isFinite(obj)}/*是数字且是有限的*/
x.isInt=function(obj){return x.isNum(obj)&&obj.toString().indexOf(".")<0}
x.isDate=function(obj){return obj instanceof Date}
x.isBool=function(obj){return typeof(obj)=="boolean"}
x.isStr=function(obj){return typeof(obj)=="string"}
x.isArray=function(obj){return obj instanceof Array}
x.isNodes=function(obj){return obj instanceof Array||obj instanceof NodeList};
x.isFun=function(obj){return typeof(obj)=="function"}
x.isDom=function(obj){return obj!=null&&obj.nodeType!=null&&obj.ownerDocument==document}/*是原始dom元素*/	


/*判断浏览器*//*执行一个匿名函数  运算出浏览器对象的状况*/
var ua = navigator.userAgent.toLowerCase(),check = function(r){return r.test(ua);};
x.isChrome = check(/chrome/);
x.isWebKit = check(/webkit/);
x.isSafari = !x.isChrome && check(/safari/);
x.isGecko = !x.isWebKit && check(/gecko/);
x.isMoz=	x.isGecko&&check(/firefox/);
if(!x.isOpera && check(/msie/))	x.isIE = ua.match(/msie (\d+)/)[1];
else							x.isIE = false;

/*xlib.12extend 扩展的方法  主要是扩展字符串、数组、日期函数、数组遍历each函数*/
x.strSub=function(str,num1,num2){/*子串*/
	var result=null;
	if(x.isStr(str)){
		if(x.isNum(num1)&&x.isNum(num2))	result=str.substr(num1,num2);
		else if(x.isNum(num1)){
			if(num1>=0) result=str.substr(num1);
			else		result=str.substr(str.length+num1);
		}
		else if(x.isStr(num1)){
			var p=str.indexOf(num1);
			if(p>=0){
				if(num2)	result= str.substr(p+1);
				else		 result= str.substr(0,p);
			}
			else{/*不存在该字符串*/
				if(num2)	return null;
				else		return str;
			}
		}
	}
	return result;
}
x.dtFormat=function(format,date,flag){/*格式化日期*/
	if(date==null)	date=new Date();
	var f=[	"yyyy-mm-dd","hh:MM:ss","SSS","yyyy-mm-dd hh:MM:ss","hh:MM:ss SSS","yyyy-mm-dd hh:MM:ss SSS"];
	if(format==null) 		format=f[5];
	else if(format==1) 		format=f[0];
	else if(format==2)		format=f[1];
	else if(format==3)		format=f[2];
	else if(format==12)		format=f[3];
	else if(format==23)		format=f[4];
	else if(format==123)	format=f[5];
	
	var o ={"y+" : date.getFullYear(), /*month   */
			"m+" : date.getMonth()+1, /*month   */
			"d+" : date.getDate(),    /*day   */
			"h+" : date.getHours(),   /*hour   */
			"M+" : date.getMinutes(), /*minute   */
			"s+" : date.getSeconds(), /*second   */
			"q+" : Math.floor((date.getMonth()+3)/3), 	/*quarter   */
			"S+" : date.getMilliseconds() /*millisecond   */}   
	for(var k in o)
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1, o[k]); 
		}
	return format;   
}
x.dtToday=function(){/*获取今日是哪一天 星期几*/
	var now=new Date();
	var date=new Date();
	var today=x.dtFormat("yyyy年mm月dd日");
	var num=date.getDay(date);
	var weekdays=["日","一","二","三","四","五","六"]
	return today+" 星期"+weekdays[num];
}
x.str2Num=function(str){
	if(x.isStr(str)){
		var str2=str.replace(/[^0-9|\.|\-]/g,"");//还要判断是否是数字格式
		//;////out("toNumStr:["+str+"]:["+str2+"]");
		var num=0;
		if(str2=="")	return 0;
		try{
			if(str2.indexOf(".")>0)	num=parseFloat(str2);
			else					num=parseFloat(str2);
		}catch(e){
			num=0;
		} 
		return num;
	}
	if(x.isNum(str))	return str;
	else				return 0;
}
x.numLimit=function(v,v_min,v_max){/*限制数据*/
	if(v_min>v_max){
		var temp=v_min;
		v_min=v_max;
		v_max=temp;
	}
	if(v<v_min)	return v_min
	else if(v>v_max)	return v_max;
	return v;
}
x.arrayCopy=function(array){
	var result=[];
	for(var i=0;i<array.length;i++){
		result.push(array[i]);
	}
	return result;
}
x.arrayAdd=function(array,obj,p,distinct){/*add本身并不具有去重功能*/
	if(distinct){
		var index=array.indexOf(obj);
		if(index<0)	array.push(obj);/*不存在则插入*/
	}
	else{
		if(x.isNum(p))	array.splice(p,0,obj);/*在指定位置插入*/
		else 			array.push(obj);/*在末尾插入*/
	}
	return array;
}
x.arrayMerge=function(array1,array2,distinct){/*合并两个数组 至数组A中*/
	for(var i=0;i<array2.length;i++){
		x.arrayAdd(array1,array2[i],null,distinct);
	}
	return array1;
}


x.arrayDistinct=function(array){/*应该是直接删除这个位置的元素*/
	var data=[];
	if(x.isArray(array)&&array.length>0){
		for(var i=0;i<array.length;i++){
			var obj=array[i];
			if(data.indexOf(obj)<0)	data.push(obj);
		}
	}
	return data;
}
x.arrayContain=function(array1,array2,full){/*两个数组是否存在包含关系  全包含  包含 两种*/
	if(x.isArray(array1)&&x.isArray(array2)){
		for(var i=0;i<array2.length;i++){
			if(full){
				if(array1.indexOf(array2[i])<0)	return false;/*在B中发现不被A包含的的元素*/
			}
			else{
				if(array1.indexOf(array2[i])>=0)	return true;/*在B中发现被A包含的的元素*/
			}
		}
		if(full)	return true;
		else		return false;
	}
	return false;
}
x.arraySort=function(array,attr){/*按照属性来对数据进行排序   只能按照一个属性进行排序  能否按照多个属性进行排序  能否指定 desc和asc*/
	var compare=function(a,b){
		for(var p in attr){
			var value1=a[p];
			var value2=b[p];
			var asc=attr[p];
			if(value1>value2){
				if(asc)	return 1;
				else 	return -1;
			}
			else if(value1==value2){/*如果最终没有返回呢*/
				continue;
			}
			else{
				if(asc)	return -1;
				else	return 1;
			}
		}
		return 0;
	}
	return array.sort(compare);
}
x.arrayRm=function(array,obj){/*删除数组中的某个元素*/
	var p=array.indexOf(obj);/*寻找一个元素然后把它删掉*/
	while(p>=0){
		array.splice(p,1);
		p=array.indexOf(obj);
	}
	return obj;/*即便删除不成功 依然返回此元素  删除的可能不止一个元素啊*/
}
x.arrayEach=function(array,fun){/*对数组内所有元素执行fun函数  直到fun函数返回true为止*/
	if(x.isFun(fun)){
		for(var i=0;i<array.length;i++){
			var result=fun(array[i],i,array);/*标准调用格式  element index  array*/
			if(result===true)	break;
		}
	}
	return array;/*each执行完返回array*/
}

/*xlib.13core		核心函数 hitch绑定函数上下文  mix复合数据  clone克隆数据  jsonStr*/
x.hitch=function(){/*连接函数  绑定上下文  绑定参数*//*参数  第一个应该是一个函数 要求该函数符合规范的写法  后面紧跟着各个参数*/
	var args=arguments;
	var obj=args[0];
	var fn=args[1];
	if(!x.isFun(fn))	return;/*如果该值不是函数  直接返回 false*/
	var merge=function(args1,args2){
		var result=[];
		for(var i=2,j=0;i<args1.length+args2.length;i++){
			if(args1[i]===undefined){/*如果该参数未定义*/
				if(j<args2.length)	result.push(args2[j]);/*使用第二个实参来填充*/
				j++;
			}
			else{
				if(i<args.length)	result.push(args1[i]);
				else{ 
					if(j<args2.length){/*第二个实参还没遍历完*/
						result.push(args2[j]);
						j++;
					}
				}
			}
		}
		return result;
	}
	return function(){
		var args2=arguments;
		var argsArray=merge(args,args2);
		return fn.apply(obj,argsArray);
	}
}
x.objTrans=function(obj,attrMap){/*对对象进行变换，得到的是一个新对象*/
	var obj2=x.mix(null,obj);/*数据的变形*/
	if(attrMap!=null){
		var attrs=attrMap.split(/\,|\:/g);/*这里应该是一个键值对*/
		for(var i=0;i<attrs.length;i=i+2){
			var attr1=attrs[i];
			var attr2=attrs[i+1];
			delete obj2[attr1];/*删除旧属性*/
			obj2[attr2]=obj[attr1]/*添加新属性*/
		}
	}
	return obj2;
}

/*数据部分  主要负责数据格式转换  数据对比*/
x.mix=function(obj1,obj2,override){/*复制一个对象到另外一个对象  只复制数据部分   要求两个参数是普通对象*/
	/*1	如果obj1是数组  
		1.1	obj2是对象	将obj2加进来数组中  
		1.2	obj2是数组	将obj2逐个加进数组
		1.3	obj2是直接值	不处理
	  2 如果obj1是对象
	  	2.1	obj2是对象	将obj2的每个属性加进obj1
		2.2	obj2是数组	将obj2逐个加进
		2.3	obj2是直接值	不处理*/
	if(x.isArray(obj2)){
		x.arrayEach(obj2,function(e,i,array){x.mix(obj1,e,override,refAttrs);});
	}
	else if(obj2 instanceof Object){
		if(obj1==null) obj1={};/*mix总会返回一个数据*/			
		if(x.isArray(obj1)){/*如果是数组*/
			obj1.push(obj2)
		}
		else if(obj1 instanceof Object){
			for(var p in obj2){
				if(obj1[p]==null||override){/*如果自身没有  或者要求重载 */
					obj1[p]=obj2[p];/*直接引用这个值*/
				}
			}
		}
	}
	return obj1;
}

x.clone=function(obj,datas,clones){/*克隆一个对象*/
	datas=datas?datas:[];clones=clones?clones:[];
	var result=null;
	if(datas.indexOf(obj)>=0){/*如果已经包含这个对象   这时候不应该返回obj   而应该返回obj克隆出来的对象*//*;////out("发现重复！");*/
		var i=datas.indexOf(obj); /*IE8 不支持 indexof 不支持这个方法 你妈的*/
		return clones[i];/**/
	}
	
	if(obj){/*如果不为空*/
		if(x.isArray(obj)){/*如果是数组*/
			result=[];
			datas.push(obj);
			clones.push(result);

			for(var i=0;i<obj.length;i++)	result[i]=x.clone(obj[i],datas,clones);
		}
		else if(obj instanceof Object){/*如果是简单对象*/
			result={};
			datas.push(obj);
			clones.push(result);
			
			for(var p in obj)	result[p]=x.clone(obj[p],datas,clones);
		}
		else{/*如果是dom相关的  或者是简单数值  返回直接值  不需要再做保存*/
			result=obj;
		}
	}
	return result;
}

var storage={};
/*如果使用的是对象  应该把对象给Json化吗*/
x.memory=function(fn,fnName){/*记忆函数  返回一个新函数  带有记忆的功能  哈哈*/
	return function(){
		var key=fnName+"_"+arguments.length+"+"+JSON.stringify(arguments);
		if(storage[key]!=null){
			console.log("exist:"+key);
			return storage[key];
		}
		else{
			return storage[key]=fn.apply(this,arguments);
		}
	}
}


/*xlib.14dom  文档对象辅助  包括筛选器 $  等函数*/
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
	

	/*xlib.15css		样式控制相关函数*/
	/*依赖关系	引用core.js*/
	x.rectGet=function(dom){/*获取页面元素的位置*/
		if(x.isIE<9){
				var rect=dom.getBoundingClientRect();
				var obj={top:rect.top,left:rect.left,right:rect.right,bottom:rect.bottom}
				obj.width=rect.right-rect.left;
				obj.height=rect.bottom-rect.top;
				return obj;
		}
		if(dom&&dom.getBoundingClientRect){
			return dom.getBoundingClientRect();
		}
		else return {};
	}
	x.rect2Get=function(dom){
		/*向上寻找 直到找到一个position为reletive的元素*/
		var d2=dom;
		var flag=true;
		while(flag){
			d2=d2.parentNode;
			flag=x.getStyle(d2).position!="relative";
			if(d2==document.body)	flag=false;
		}
		var rect1=x.getRect(dom);
		var rect2=x.getRect(d2);
		var obj={};
		obj.left=rect1.left-rect2.left;
		obj.top=rect1.top-rect2.top;
		obj.width=rect1.width;
		obj.height=rect1.height;
		return obj;
	}
	
	x.styleCurr=function(dom){/*读取或者摄者属性值*/
		if(x.isDom(dom)){
			if(window.getComputedStyle)		return window.getComputedStyle(dom);
			else	return 	dom.currentStyle;
		}
	}
	x.classHave=function(dom,css1){/*判断是否包含此样式*/
		if(x.isDom(dom)){
			var css=dom.className.split(/\s+/g);
			if(x.arrayContain(css,css1)){/*如果没有该样式 方添加*/
				return true;
			}
		}
		return false;
	}
	
	x.classAdd=function(dom,css1){/*给元素添加样式*/
		if(x.isNodes(dom)){
			x.arrayEach(dom,function(e){
					x.classAdd(e,css1);
				});
		}
		else if(x.isDom(dom)){
			if(dom.className!=null){
				var css=dom.className.split(/\s+/g);
				if(!x.arrayContain(css,css1)){/*如果没有该样式 方添加*/
					css.push(css1);
					dom.className=css.join(" ").trim();
				}
			}
			else	dom.className=css1;
		}
	}
	
	x.classToggle=function(dom,css1,css2){/*开关样式*/
		if(x.isNodes(dom)){
			x.arrayEach(dom,function(e){
					x.classToggle(e,css1,css2);
				});
		}
		else if(x.isDom(dom)){
			var css=dom.className.split(/\s+/g);
			if(x.arrayContain(css,css1)){
				dom.className=x.replaceObj(css,css1,css2).join(" ");
			}
			else if(x.arrayContain(css,css2)){
				dom.className=x.replaceObj(css,css2,css1).join(" ");
			}
		}
	}
	x.classRm=function(dom,css1){
		if(x.isNodes(dom)){
			x.arrayEach(dom,function(e){
					x.classRm(e,css1);
				});
		}
		else if(x.isDom(dom)){
			if(x.isArray(css1)){
				x.arrayEach(css1,function(e){
					x.classRm(dom,e);
				});
			}
			else{
				var css=dom.className.split(/\s+/g);
				if(x.arrayContain(css,css1)){
					dom.className=x.replaceObj(css,css1,"").join(" ");
				}
			}
		}
	}
	x.classReplace=function(dom,css1,css2){/*样式替换*/
		if(x.isNodes(dom)){
			x.arrayEach(dom,function(e){
					x.classReplace(e,css1,css2);
				});
		}
		else if(x.isDom(dom)){
			var css=dom.className.split(" ");
			if(x.arrayContain(css,css1)){
				if(css2)	dom.className=x.replaceObj(css,css1,css2).join(" ");
				else		dom.className=x.replaceObj(css,css1,"").join(" ");
			}
		}
	}
	x.cssShowHide=function(dom,flag){/*根据开关变量  flag 来显示或者隐藏dom对象*/
		if(x.isNodes(dom))	x.arrayEach(dom,function(e){x.cssShowHide(e,flag)})
		else if(x.isDom(dom)){
			if(flag===true)		dom.style.display="block";
			if(flag===false)	dom.style.display="none";
		}	
	}
	
	x.css=function(dom,attr,value){/*获取或者设置dom 样式属性  按理说是不应该轻易地修改属性 而是变更样式  所以css的设置仅限于开关 尺寸 动画*/
		if(arguments.length>1){
			dom.style[attr]=value;
		}
		/*获取值*/
		return dom.style[attr];
	}
	
	x.cssScale=function(dom,dx,dy,p){
		if(argumnets.length>1){
			if(isFF){/*火狐的缩放*/
				if(x==null){
					dom.style.MozTransform="";
					dom.style.MozTranformOrigin="";
				}
				dom.style.MozTransform="scale("+dx+","+dy+")";
				dom.style.MozTransformOrigin="left top";
				//alert(dom.style.MozTranformOrigin);
			}
			else if(isChrome){/*谷歌的缩放*/
				dom.style.webkitTransform="scale("+dx+","+dy+")";
				if(p)	dom.style.webkitTransformOrigin=p;
			}
			else if(x.isIE){/*IE浏览器 使用filter*/
				var rad = 0;
				var scale=x;
				if(scale==null||scale=="")	dom.style.filter ="";
				else{
					if(isIE>9){
						dom.style.transform="scale("+dx+","+dy+")";
						dom.style.transformOrigin="0 0";
					}
					else{
						var m11 = Math.cos(rad) * scale, m12 = -1 * Math.sin(rad) * scale, m21 = Math.sin(rad) * scale, m22 = m11;
						dom.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+ m11 +",M12="+ m12 +",M21="+ m21 +",M22="+ m22 +",SizingMethod='auto expand')";/用filter矩阵/
					}
				}
			}
			return dom;
		}
		
		/*如果是取scale的值  这里还没有处理完   not_complete*/
		var result;
		if(isFF)			result=dom.style.MozTransform;
		else if(isChrome)	result=dom.style.webkitTransform;
		else if(isIE)		result=dom.style.msTransform;
		//result=x.capture1(result,/scale\(([ |\d|\.|-]+)/g);
		if(result==null)	result=1;
		return  Math.round(result);
	}
	
	x.cssRotate=function(dom,degree){/*degree旋转度数  旋转中心*/
		if(degree){
			if(isFF){/*火狐的缩放*/
				dom.style.MozTransform="rotate("+degree+"deg)";
			}
			else if(isChrome){/*谷歌的缩放*/
				dom.style.webkitTransform="rotate("+degree+"deg)";
			}
			else if(isIE){/*IE浏览器 使用filter*/
				dom.style.msTransform="rotate("+degree+"deg)";
			}
			return dom;
		}
		
		var result;
		if(isFF)			result=dom.style.MozTransform;
		else if(isChrome)	result=dom.style.webkitTransform;
		else if(isIE)		result=dom.style.msTransform;
		//result=x.capture1(result,/rotate\(([ |\d|\.|-]+)/g);
		if(result==null)	result=0;
		return Math.round(result);
	}
	
	x.cssTransform=function(dom,to,ts){/**/
		/*transform-origin*/
		/*transform 里有很多内容  translate 偏移  scale 缩放  rotate旋转  scew扭曲  martix矩阵 perspective 视角*/
		//console.log("cssTransform");
		var toName=null,tsName=null,tsValue="";
		if(x.isIE){
			toName="transformOrigin";
			tsName="transform";
		}
		else if(x.isChrome||x.isSafari){
			toName="webkitTransformOrigin";
			tsName="webkitTransform";
		}
		else if(x.isMoz){
			//console.log("is firefox!");
			toName="MozTransformOrigin";
			tsName="MozTransform";
		}
		
		if(to)	dom.style[toName]=to;
		if(ts){
			for(var p in ts){
				tsValue+=p+"("+ts[p]+") ";
			}
		}
		//console.log("tsValue:"+tsValue);
		dom.style[tsName]=tsValue;
	}
	
	


	/*xlib.18evt		事件相关函数*/
x.bind=function(dom,evt,fun,obj){/*obj是要绑定的数据对象*/
	if(x.isNodes(dom)) x.arrayEach(dom,function(e){x.bind(e,evt,fun,obj)});
	else if(x.isDom(dom)){
		if(obj==null) obj=dom;
		if(x.isIE>0&&x.isIE<9){
			var fun2=function(){
				var fn=x.hitch(obj,fun,event);
				fn();
			}
			if(x.isStr(evt)){
				dom["on"+evt]=fun2;/*只能注册这一个事件*/
			}
		}
		else{
			var flag=(document.body.onmouseleave===undefined)||(document.body.onmouseenter===undefined);
			//out("flag",flag);
			var fun2=x.hitch(obj,fun);
			if(x.isStr(evt)){
				dom["on"+evt]=fun2;				
				if(evt=="mouseleave"&&flag){/*再次修正  对于不支持mouseleave的用mouseout监听*/
					var outFix=function(evt){
						//console.log("outFix");
						//console.dir(evt);
						//console.dir(target);
						//console.dir(dom);
						var target	=x.evtRelated(evt);
						if(!target){
							console.log("target is null");
							return;
						}
						var flag	=x.domIn(target,dom);
						if(!flag)	dom.onmouseleave(evt);
					}
					dom["onmouseout"]=outFix;
				}else if(evt=="mouseenter"&&flag){
					var enterfix=function(evt){
						var target=x.evtRelated(evt);
						var flag=x.domIn(target,this);
						if(!flag)	dom.onmouseenter(evt);
					}
					dom["onmouseover"]=enterfix;
				}else if(evt=="mousewheel"&&x.isFF){
					dom.addEventListener('DOMMouseScroll',fun2, false);
				}
			}
		}
	}
	return dom;
}

x.unbind=function(dom,evt){
	if(x.isNodes(dom)) x.arrayEach(dom,function(e){x.unbind(e,evt)});
	else if(x.isDom(dom)){
		if(x.isStr(evt)){
			dom["on"+evt]=null;
		}
	}
	return dom;
}

x.evtTarget=function(evt){
	if(evt==null&&x.isIE){/*如果evt为空*/
		evt=event;
		return evt.srcElement;
	}
	if(evt.target!=null)	return evt.target;
	else					return evt.srcElement;
}
x.evtRelated=function(evt){
	if (evt.relatedTarget) {
		return evt.relatedTarget;
	} else if (evt.toElement) {
		return evt.toElement;
	} else if (evt.fromElement) {
		return evt.fromElement;
	} else {
		return null;
	}
}
x.evtStop=function(evt){
	if(evt==null&&x.isIE)	evt=event;
	evt.cancelBubble=true;
	if(evt.preventDefault)	evt.preventDefault();
	evt.returnValue=false;
}
x.evtRolled=function(evt){
	evt=evt?evt:event;
	var rolled = 0; 
	if (evt.wheelDelta) rolled = evt.wheelDelta/120*10; 
	else rolled = -evt.detail/3*10; 
	return rolled;
}


/*xlib.19ajax	服务器交互函数*/
var sid=1;

var $callBack=function(xh,callBack){
	if(xh.readyState==4&&xh.status==200){
		var resultStr=xh.responseText;
		var resultObj=$myEval(resultStr);
		callBack(resultObj);
	}
}
var $myEval=function(str){
	if(str==null)	return null;
	if(str=="{}")	return {};
	if(!isStr(str))	return;
	var obj=null;
	try{
		obj=eval("("+str+")");
	}
	catch(e){/*eval发生异常*/
		console.log("eval发生异常"+str);
	}
	return obj;
}


x.$$=function(method,param,post,callback,base_url){
	post=true;
	if(base_url==null){ 
		var url=document.URL;
		if(url.indexOf("http")==0)	base_url="http://localhost/eam/handler/";
		else	base_url="http://localhost/eam/handler/";
	}
	var resultStr;
	var resultObj={};
	var url=base_url+method;
	var paramStr=x.jsonStr(param,false);//参数转换
	var now=new Date();
	var nowStr= now.toLocaleTimeString()+now.getMilliseconds();
	
	var xh=window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	if(callback!=null){
		if(post){//如果是post请求
			content = "p="+paramStr+"&now="+nowStr+"&t=2";
			
			xh.open("POST", url, true);
			xh.setRequestHeader("Content-Length",content.length);
			xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
			//xh.open("post",url,true);
			xh.send(content);
			xh.onreadystatechange=function(){$callBack(xh,callback);};
			
		}
		else{
			var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
			xh.open("get",url2,true);
			xh.send(null);
			xh.onreadystatechange=function(){$callBack(xh,callback)};
		}
	}
	else{
		try{
			if(post){//如果是post请求
				content = "p="+paramStr+"&now="+nowStr+"&t=2";
				
				xh.open("POST", url, false);
				xh.setRequestHeader("Content-Length",content.length);
				xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
				//xh.open("post",url,true);
				xh.send(content);
				resultStr=xh.responseText;
			}
			else{
				var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
				xh.open("get",url2,false);
				xh.send(null);
				resultStr=xh.responseText;
			}
		
			resultObj=$myEval(resultStr);
		}catch(e){
			//alert("json解析失败！");
			resultObj.flag=false;
			resultObj.msg="请检查数据内容！"+resultStr;
		}
		return resultObj;
	}
}


/*xlib.21animation		动画类*/
function am_rate(b,g){/*b是时间 总次数//引入v和s的概念*/
	var s=b*g/4*b;//平均速度乘以时间
	var s2=[];
	var r=[];
	for(var t=1;t<=b;t++){
		if(t<=b/2)	{s2[t]=g*t*t/2;}
		else{
			var d=t-b/2;
			s2[t]=g*b*b/8+g*b*d/2-g*d*d/2;
		}
		r[t]=s2[t]/s;
	}
	return r;
}

function Animation(conf){/*高级动画，允许执行自定义函数 自定义函数能够产生效果并判断是否中止  这个动画的run操作里可以自定义自身*/
	this.runState=false;
	this.timer=null;	/*一个动画只能保持一个定时器*/
	this.tasks=[];		/*一个动画里可以有多项任务 每个task里是*/	
	var _interval=23;	/*执行间隔*/
	this.conf=conf;		/*配置文件  可以配置的属性包括执行间隔  执行完的回调函数*/
	if(conf&&conf._interval)	_interval=conf._interval;
	this.run=function(cfg){/*run方法要求提供 fun*/
		//console.log("animate start running!");
		this.runState=true;
		if(cfg){
			cfg.excuteTime=null;
			if(cfg.time==null)	cfg.time=600;
			//if(isIE)	var _time=cfg.time*0.5;
	
			cfg.totalTime=Math.floor(cfg.time/_interval);
			cfg.rates=am_rate(cfg.totalTime,10);//总次数 和加速度
			/*总执行次数*/
			this.tasks.push(cfg);/*将动画参数装到任务中去*/
			if(this.timer==null){
				var _this=this;
				this.timer=setInterval(function(){_this.run()},_interval);/*按照间隔执行*/
			}
			return this;
		}
		var cfg=this.tasks[0];/*获取第一项任务*/
		if(cfg.excuteTime==null){/*首次执行该任务*/
			cfg.excuteTime=0;
			cfg._delay=cfg.delay;//另外保存一个延迟			
		}
		if(x.isNum(cfg._delay)){
			cfg._delay-=_interval;
			if(cfg._delay>0){/*仍然处于延迟期间*/
				return this;
			}
		}
		cfg.excuteTime++;/*每次执行事件增加*///然后执行用户自定义函数，fun能够自动执行
		if(x.isFun(cfg.fun)){
			var result=cfg.fun(cfg);//执行这个特效
			if(result==true){//返回true代表终结/
				cfg.excuteTime=null;
				this.tasks.shift();//删除掉顶部
				if(cfg.callBack){//如果执行完还有触发事件
					cfg.callBack();
				}
			}
		}
		if(this.tasks.length==0){/*结束任务*/
			clearInterval(this.timer);
			this.timer=null;
			this.runState=false;
		}
		return this;
	}
	this.pause=function(){/*暂停事件的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
	}
	this.start=function(){/*启动事件*/
		var _this=this;
		this.timer=setInterval(function(){_this.run()},_interval);
	}
	this.clear=function(){/*清除动画的执行*/
		if(this.timer!=null)	clearInterval(this.timer);
		this.timer=null;
		this.tasks=[];
	}
}


function _getDegree(value){
	/*单位分为几种  1 deg  2px  3 %  4 rgb*/
	if(value==null)	return "";
	var degree=value.replace(/[0-9|\.|\-]/g,"");
	//("degree"+degree);
	return degree;
}


function fnSetCss(cfg){/*暂时不支持颜色  不支持transform  如何支持transform,rotateY*/
	var rate=cfg.rates[cfg.excuteTime];
	for(var p in cfg.endCss){
		if(p=="transform"){/*变形的处理	*/
			var startTr=cfg.startCss[p];/*需要知道起始值和结束值*/
			var endTr=cfg.endCss[p];

			var currTr={};
			for(var z in endTr){/*又是各种值*/
				var value1=startTr[z];
				var value2=endTr[z];
				/*每个属性都可以变化*/
				var degree=_getDegree(value1);
				var v1=x.str2Num(value1);
				var v2=x.str2Num(value2);
	
				var value=v2-v1;/*gap*/
				var currValue=value*rate+v1;
				//console.log("transform["+z+"] currValue="+currValue+" degree:"+degree);
				currTr[z]=currValue+degree;
			}
			x.cssTransform(cfg.dom,null,currTr);
		}
		else{
			var value1=cfg.startCss[p];
			var value2=cfg.endCss[p];
			/*每个属性都可以变化*/
			var degree=_getDegree(value1);
			var v1=x.str2Num(value1);
			var v2=x.str2Num(value2);

			var value=v2-v1;/*gap*/
			var currValue=value*rate+v1;
			//console.log("style["+p+"]currValue:"+currValue);
			cfg.dom.style[p]=currValue+degree;
			/*对象的变化	引发layout change事件*/
			if(x.layoutChange)	x.layoutChange(cfg.dom);
		}
	}
	if(rate>=1){
		return true;//隐藏
	}
}
x.cssAnimate=function(dom,startCss,targetCss,duration,delay,fn){/*固定时间的动画与循环动画*/
	console.log("css animate");
	var a=dom._animate;
	if(a==null)	dom._animate=a=new Animation();
	var currCss={};
	for(var p in targetCss){
		currCss[p]=x.styleCurr(dom)[p];
	}
	if(startCss!=null){/*利用额外的做补充*/
		for(var p in startCss){
			currCss[p]=startCss[p];
		}
	}
	var cfg={dom:dom,fun:fnSetCss,startCss:currCss,endCss:targetCss,delay:delay,time:duration,callBack:fn};
	a.run(cfg);
	return dom;
}

x.Animation=Animation;

return x;

