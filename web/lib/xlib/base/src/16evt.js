var x=require("15css.js");
eval(expose(x,"x"));
function bind(dom,evt,fun,obj){/*obj是要绑定的数据对象*/
	if(isNodes(dom)) arrEach(dom,function(e){bind(e,evt,fun,obj)});
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
	if(isNodes(dom)) arrEach(dom,function(e){unbind(e,evt)});
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

module.exports=mix(x,{
		bind:bind,
		unbind:unbind,
		evtTarget:evtTarget,
		evtRelated:evtRelated,
		evtStop:evtStop,
		evtRolled:evtRolled
	});

