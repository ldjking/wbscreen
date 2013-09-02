/*xlib.18evt		事件相关函数*/
var x=require("base/15css.js");
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
return x;

