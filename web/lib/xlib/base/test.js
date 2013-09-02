
function isNull(obj){return obj==null}/*包含了undefine 和null*/
function isEmpty(obj){
	if(obj==null)		return true;
	if(isStr(obj)&&obj.length==0)	return true;
	if(isArray(obj)&&obj.length==0)	return true;

	if(typeof(obj)=="object"){/*是对象且有值*/
		for(var p in obj){	return false;}	
		if(!isDate(obj))	return true;/*如果该对象没有任何可遍历的属性*/
	}
	return false;
}
function isNum(obj){return typeof(obj)=="number"&&isFinite(obj)}/*是数字且是有限的*/
function isInt(obj){return isNum(obj)&&obj.toString().indexOf(".")<0}
function isDate(obj){return obj instanceof Date}
function isStr(obj){return typeof(obj)=="string"}
function isArray(obj){return obj instanceof Array}
function isNodes(obj){return obj instanceof Array||obj instanceof NodeList};
function isFun(obj){return typeof(obj)=="function"}
function isDom(obj){return obj!=null&&obj.nodeType!=null&&obj.ownerDocument==document}/*是原始dom元素*/	


/*判断浏览器*//*执行一个匿名函数  运算出浏览器对象的状况*/
var ua = navigator.userAgent.toLowerCase(),
check = function(r){return r.test(ua);},
isChrome = check(/chrome/),
isWebKit = check(/webkit/),
isSafari = !isChrome && check(/safari/),
isGecko = !isWebKit && check(/gecko/),
isMoz=	isGecko&&check(/firefox/),
isIE=check(/msie/);
if(isIE)	isIE = ua.match(/msie (\d+)/)[1];/*ie的版本*/


﻿
function strSub(str,num1,num2){/*子串*/
	var result=null;
	if(isStr(str)){
		if(isNum(num1)&&isNum(num2))	result=str.substr(num1,num2);
		else if(isNum(num1)){
			if(num1>=0) result=str.substr(num1);
			else		result=str.substr(str.length+num1);
		}
		else if(isStr(num1)){
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
function dtFormat(format,date,flag){/*格式化日期*/
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
function dtToday(){/*获取今日是哪一天 星期几*/
	var now=new Date();
	var date=new Date();
	var today=dtFormat("yyyy年mm月dd日");
	var num=date.getDay(date);
	var weekdays=["日","一","二","三","四","五","六"]
	return today+" 星期"+weekdays[num];
}
function str2Num(str){
	if(isStr(str)){
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
	if(isNum(str))	return str;
	else				return 0;
}
function numLimit(v,v_min,v_max){/*限制数据*/
	if(v_min>v_max){
		var temp=v_min;
		v_min=v_max;
		v_max=temp;
	}
	if(v<v_min)	return v_min
	else if(v>v_max)	return v_max;
	return v;
}
function arrCopy(array){
	var result=[];
	for(var i=0;i<array.length;i++){
		result.push(array[i]);
	}
	return result;
}
function arrAdd(array,obj,p,distinct){/*add本身并不具有去重功能*/
	if(distinct){
		var index=array.indexOf(obj);
		if(index<0)	array.push(obj);/*不存在则插入*/
	}
	else{
		if(isNum(p))	array.splice(p,0,obj);/*在指定位置插入*/
		else 			array.push(obj);/*在末尾插入*/
	}
	return array;
}
function arrMerge(array1,array2,distinct){/*合并两个数组 至数组A中*/
	for(var i=0;i<array2.length;i++){
		arrAdd(array1,array2[i],null,distinct);
	}
	return array1;
}

function arrayReplace(array,obj,obj2){
	var result=[];
	for(var i=0;i<array.length;i++){
		if(array[i]==obj){
			if(obj2)	result.push(obj2);
		}
		else{
			result.push(array[i]);
		}
	}
	return result;
}
function arrDistinct(array){/*应该是直接删除这个位置的元素*/
	var data=[];
	if(isArray(array)&&array.length>0){
		for(var i=0;i<array.length;i++){
			var obj=array[i];
			if(data.indexOf(obj)<0)	data.push(obj);
		}
	}
	return data;
}
function arrContain(array1,array2,full){/*两个数组是否存在包含关系  全包含  包含 两种*/
	if(isArray(array1)&&isArray(array2)){
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
	else if(isArray(array1)){
		return array1.indexOf(array2)>=0;
	}
	return false;
}
function arrSort(array,attr){/*按照属性来对数据进行排序   只能按照一个属性进行排序  能否按照多个属性进行排序  能否指定 desc和asc*/
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
function arrRm(array,obj){/*删除数组中的某个元素*/
	var p=array.indexOf(obj);/*寻找一个元素然后把它删掉*/
	while(p>=0){
		array.splice(p,1);
		p=array.indexOf(obj);
	}
	return obj;/*即便删除不成功 依然返回此元素  删除的可能不止一个元素啊*/
}
function arrEach(array,fun){/*对数组内所有元素执行fun函数  直到fun函数返回true为止*/
	if(isFun(fun)){
		for(var i=0;i<array.length;i++){
			var result=fun(array[i],i,array);/*标准调用格式  element index  array*/
			if(result===true)	break;
		}
	}
	return array;/*each执行完返回array*/
}



﻿function hitch(){/*连接函数  绑定上下文  绑定参数*//*参数  第一个应该是一个函数 要求该函数符合规范的写法  后面紧跟着各个参数*/
	var args=arguments;
	var obj=args[0];
	var fn=args[1];
	if(!isFun(fn))	return;/*如果该值不是函数  直接返回 false*/
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
function objTrans(obj,attrMap){/*对对象进行变换，得到的是一个新对象*/
	var obj2=mix(null,obj);/*数据的变形*/
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

function clone(obj,datas,clones){/*克隆一个对象*/
	datas=datas?datas:[];clones=clones?clones:[];
	var result=null;
	if(datas.indexOf(obj)>=0){/*如果已经包含这个对象   这时候不应该返回obj   而应该返回obj克隆出来的对象				 		//out("发现重复！");*/
		var i=datas.indexOf(obj); /*IE8 不支持 indexof 不支持这个方法 你妈的*/
		return clones[i];/**/
	}
	
	if(obj){/*如果不为空*/
		if(isArray(obj)){/*如果是数组*/
			result=[];
			datas.push(obj);
			clones.push(result);

			for(var i=0;i<obj.length;i++)	result[i]=clone(obj[i],datas,clones);
		}
		else if(obj instanceof Object){/*如果是简单对象*/
			result={};
			datas.push(obj);
			clones.push(result);
			
			for(var p in obj)	result[p]=clone(obj[p],datas,clones);
		}
		else{/*如果是dom相关的  或者是简单数值  返回直接值  不需要再做保存*/
			result=obj;
		}
	}
	return result;
}

var storage={};
/*如果使用的是对象  应该把对象给Json化吗*/
function memory(fn,fnName){/*记忆函数  返回一个新函数  带有记忆的功能  哈哈*/
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
		arrayEach(ele,function(e){dom.appendChild(e)})
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
			for(var i=0;i<childs.length;i++){
				if(childs[i]==dom)	return i;
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

function $(selector,context,upFlag){/*dom选择器 只寻找一个符合条件的对象*/
	if(upFlag)	return $domUp(selector,context);
	if(isDom(context))	return context.querySelector(selector);
	else						return document.querySelector(selector);
}
function $1(selector,context){/*在上下文中查找符合条件的对象 返回结果应该是nodeList*/ 
	if(isDom(context))	return context.querySelectorAll(selector);
	else						return document.querySelectorAll(selector);
}

function $childs(){
}

function $sib(){
}

function $pre(){
}

function $next(){
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




	function rect(dom){/*获取页面元素的位置*/
	if(isIE<9){
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
function rect2(dom){
	/*向上寻找 直到找到一个position为reletive的元素*/
	var d2=dom;
	var flag=true;
	while(flag){
		d2=d2.parentNode;
		flag=getStyle(d2).position!="relative";
		if(d2==document.body)	flag=false;
	}
	var rect1=getRect(dom);
	var rect2=getRect(d2);
	var obj={};
	obj.left=rect1.left-rect2.left;
	obj.top=rect1.top-rect2.top;
	obj.width=rect1.width;
	obj.height=rect1.height;
	return obj;
}

function style(dom){/*读取或者摄者属性值*/
	if(isDom(dom)){
		if(window.getComputedStyle)		return window.getComputedStyle(dom);
		else	return 	dom.currentStyle;
	}
}
function clsHave(dom,css1){/*判断是否包含此样式*/
	if(isDom(dom)){
		var css=dom.className.split(/\s+/g);
		if(arrContain(css,css1)){/*如果没有该样式 方添加*/
			return true;
		}
	}
	return false;
}

function clsAdd(dom,css1){/*给元素添加样式*/
	if(isNodes(dom)){
		arrayEach(dom,function(e){
				classAdd(e,css1);
			});
	}
	else if(isDom(dom)){
		if(dom.className!=null){
			var css=dom.className.split(/\s+/g);
			if(!arrContain(css,css1)){/*如果没有该样式 方添加*/
				css.push(css1);
				dom.className=css.join(" ").trim();
			}
		}
		else	dom.className=css1;
	}
}

function clsToggle(dom,css1,css2){/*开关样式*/
	if(isNodes(dom)){
		arrayEach(dom,function(e){
				clsToggle(e,css1,css2);
			});
	}
	else if(isDom(dom)){
		var css=dom.className.split(/\s+/g);
		if(arrContain(css,css1)){
			dom.className=replaceObj(css,css1,css2).join(" ");
		}
		else if(arrContain(css,css2)){
			dom.className=replaceObj(css,css2,css1).join(" ");
		}
	}
}
function clsRm(dom,css1){
	console.log("cls rm");
	if(isNodes(dom)){
		arrayEach(dom,function(e){
				clsRm(e,css1);
			});
	}
	else if(isDom(dom)){
		if(isArray(css1)){
			arrayEach(css1,function(e){
				clsRm(dom,e);
			});
		}
		else{
			var css=dom.className.split(/\s+/g);
			console.log(dom.id+" className:"+dom.className);
			if(arrContain(css,css1)){
				dom.className=replaceObj(css,css1,"").join(" ");
			}
		}
	}
}
function clsReplace(dom,css1,css2){/*样式替换*/
	if(isNodes(dom)){
		arrayEach(dom,function(e){
				clsReplace(e,css1,css2);
			});
	}
	else if(isDom(dom)){
		var css=dom.className.split(" ");
		if(arrContain(css,css1)){
			if(css2)	dom.className=replaceObj(css,css1,css2).join(" ");
			else		dom.className=replaceObj(css,css1,"").join(" ");
		}
	}
}
function cssShowHide(dom,flag){/*根据开关变量  flag 来显示或者隐藏dom对象*/
	if(isNodes(dom))	arrayEach(dom,function(e){cssShowHide(e,flag)})
	else if(isDom(dom)){
		if(flag===true)		dom.style.display="block";
		if(flag===false)	dom.style.display="none";
	}	
}

function css(dom,attr,value){/*获取或者设置dom 样式属性  按理说是不应该轻易地修改属性 而是变更样式  所以css的设置仅限于开关 尺寸 动画*/
	if(arguments.length>1){
		dom.style[attr]=value;
	}
	/*获取值*/
	return dom.style[attr];
}

function cssScale(dom,dx,dy,p){
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
		else if(isIE){/*IE浏览器 使用filter*/
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
	//result=capture1(result,/scale\(([ |\d|\.|-]+)/g);
	if(result==null)	result=1;
	return  Math.round(result);
}

function cssRotate(dom,degree){/*degree旋转度数  旋转中心*/
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
	//result=capture1(result,/rotate\(([ |\d|\.|-]+)/g);
	if(result==null)	result=0;
	return Math.round(result);
}

function cssTrans(dom,to,ts){/**/
	/*transform-origin*/
	/*transform 里有很多内容  translate 偏移  scale 缩放  rotate旋转  scew扭曲  martix矩阵 perspective 视角*/
	//console.log("cssTransform");
	var toName=null,tsName=null,tsValue="";
	if(isIE){
		toName="transformOrigin";
		tsName="transform";
	}
	else if(isChrome||isSafari){
		toName="webkitTransformOrigin";
		tsName="webkitTransform";
	}
	else if(isMoz){
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
	


	function bind(dom,evt,fun,obj){/*obj是要绑定的数据对象*/
	if(isNodes(dom)) arrayEach(dom,function(e){bind(e,evt,fun,obj)});
	else if(isDom(dom)){
		if(obj==null) obj=dom;
		if(IE>0&&IE<9){
			var fun2=function(){
				var fn=hitch(obj,fun,event);
				fn();
			}
			if(isStr(evt)){
				dom["on"+evt]=fun2;/*只能注册这一个事件*/
			}
		}
		else{
			var flag=(document.body.onmouseleave===undefined)||(document.body.onmouseenter===undefined);
			//out("flag",flag);
			var fun2=hitch(obj,fun);
			if(isStr(evt)){
				dom["on"+evt]=fun2;				
				if(evt=="mouseleave"&&flag){/*再次修正  对于不支持mouseleave的用mouseout监听*/
					var outFix=function(evt){
						//console.log("outFix");
						//console.dir(evt);
						//console.dir(target);
						//console.dir(dom);
						var target	=evtRelated(evt);
						if(!target){
							console.log("target is null");
							return;
						}
						var flag	=domIn(target,dom);
						if(!flag)	dom.onmouseleave(evt);
					}
					dom["onmouseout"]=outFix;
				}else if(evt=="mouseenter"&&flag){
					var enterfix=function(evt){
						var target=evtRelated(evt);
						var flag=domIn(target,this);
						if(!flag)	dom.onmouseenter(evt);
					}
					dom["onmouseover"]=enterfix;
				}else if(evt=="mousewheel"&&isFF){
					dom.addEventListener('DOMMouseScroll',fun2, false);
				}
			}
		}
	}
	return dom;
}

function unbind(dom,evt){
	if(isNodes(dom)) arrayEach(dom,function(e){unbind(e,evt)});
	else if(isDom(dom)){
		if(isStr(evt)){
			dom["on"+evt]=null;
		}
	}
	return dom;
}

function evtTarget(evt){
	if(evt==null&&isIE){/*如果evt为空*/
		evt=event;
		return evt.srcElement;
	}
	if(evt.target!=null)	return evt.target;
	else					return evt.srcElement;
}
function evtRelated(evt){
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
function evtStop(evt){
	if(evt==null&&isIE)	evt=event;
	evt.cancelBubble=true;
	if(evt.preventDefault)	evt.preventDefault();
	evt.returnValue=false;
}
function evtRolled(evt){
	evt=evt?evt:event;
	var rolled = 0; 
	if (evt.wheelDelta) rolled = evt.wheelDelta/120*10; 
	else rolled = -evt.detail/3*10; 
	return rolled;
}



module.exports={

		isNum:isNum,
		isInt:isInt,
		isDate:isDate,
		isStr:isStr,
		isArray:isArray,
		isNodes:isNodes,
		isDom:isDom,
		isWebKit:isWebKit,
		isChrome:isChrome,
		isSafari:isSafari,
		isGecko:isGecko,
		isMoz:isMoz,
		isIE:isIE,

		strSub:strSub,
		dtFormat:dtFormat,
		dtToday:dtToday,
		str2Num:str2Num,
		numLimit:numLimit,
		arrayCopy:arrCopy,
		arrAdd:arrAdd,
		arrMerge:arrMerge,
		arrDistinct:arrDistinct,
		arrReplace:arrReplace,
		arrContain:arrContain,
		arrSort:arrSort,
		arrRm:arrRm,
		arrEach:arrEach,

		hitch:hitch,
		clone:clone,
		memory:memory,

		$:$,
		$1:$1,
		$add:$add,
		$in:$in,
		$rm:$rm,
		$insert:$insert,
		$wrap:$wrap,
		$clear:$clear,
		$childs:$childs,
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
		$text:$text,

		rect:rect,
		rect2:rect2,
		style:style,
		clsHave:clsHave,
		clsAdd:clsAdd,
		clsRm:clsRm,
		clsToggle:clsToggle,
		clsReplace:clsReplace,
		css:css,
		cssRotate:cssRotate,
		cssScale:cssScale,
		cssTrans:cssTrans,

		bind:bind,
		unbind:unbind,
		evtTarget:evtTarget,
		evtRelated:evtRelated,
		evtStop:evtStop,
		evtRolled:evtRolled,
};