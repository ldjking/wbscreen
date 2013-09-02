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
return x;