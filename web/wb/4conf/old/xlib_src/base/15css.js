/*xlib.15css		样式控制相关函数*/
var x=require("base/14dom.js");
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
	
	return x;


	