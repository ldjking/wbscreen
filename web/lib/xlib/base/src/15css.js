var x=require("14dom.js");
eval(expose(x,"x"));
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
		arrEach(dom,function(e){
				clsAdd(e,css1);
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
		arrEach(dom,function(e){
				clsToggle(e,css1,css2);
			});
	}
	else if(isDom(dom)){
		var css=dom.className.split(/\s+/g);
		if(arrContain(css,css1)){
			dom.className=arrReplace(css,css1,css2).join(" ");
		}
		else if(arrContain(css,css2)){
			dom.className=arrReplace(css,css2,css1).join(" ");
		}
	}
}
function clsRm(dom,css1){
	console.log("cls rm");
	if(isNodes(dom)){
		arrEach(dom,function(e){
				clsRm(e,css1);
			});
	}
	else if(isDom(dom)){
		if(isArray(css1)){
			arrEach(css1,function(e){
				clsRm(dom,e);
			});
		}
		else{
			var css=dom.className.split(/\s+/g);
			console.log(dom.id+" className:"+dom.className);
			if(arrContain(css,css1)){
				dom.className=arrReplace(css,css1,"").join(" ");
			}
		}
	}
}
function clsReplace(dom,css1,css2){/*样式替换*/
	if(isNodes(dom)){
		arrEach(dom,function(e){
				clsReplace(e,css1,css2);
			});
	}
	else if(isDom(dom)){
		var css=dom.className.split(" ");
		if(arrContain(css,css1)){
			if(css2)	dom.className=arrReplace(css,css1,css2).join(" ");
			else		dom.className=arrReplace(css,css1,"").join(" ");
		}
	}
}
function cssShowHide(dom,flag){/*根据开关变量  flag 来显示或者隐藏dom对象*/
	if(isNodes(dom))	arrEach(dom,function(e){cssShowHide(e,flag)})
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
	
module.exports=mix(x,{
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
		cssTrans:cssTrans
	});

	