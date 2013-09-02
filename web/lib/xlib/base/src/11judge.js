
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

module.exports={
		isNum:isNum,
		isInt:isInt,
		isDate:isDate,
		isStr:isStr,
		isArray:isArray,
		isNodes:isNodes,
		isDom:isDom,
		isChrome:isChrome,
		isSafari:isSafari,
		isMoz:isMoz,
		isIE:isIE
	};
