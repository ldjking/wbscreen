var Keys={};
var keyMap=[];
for(var i=65;i<=90;i++){  //A-Z
	Keys[String.fromCharCode(i).toLowerCase()]=i;
}
for(var i=1;i<=12;i++){//F1-F12
	Keys["f"+i]=111+i;
}
for(var i=0;i<=9;i++){//0-9
	Keys["n"+i]=48+i;
}
Keys.del=46;/*删除按键*/
Keys.space=32;/*空格按键*/
Keys.enter=13;/*回车按键*/
Keys.esc=27;/*ESC按键*/


window.onkeydown=keyDownHandler;
function keyDownHandler(evt){
	var keyCode=evt.keyCode;
	for(var i=0;i<keyMap.length;i++){/*热键遍历*/
		var hk=keyMap[i];
		if(hk.ctrl^evt.ctrlKey)	continue;/*要求的ctrl不一致*/
		if(hk.alt^evt.altKey)	continue;/*要求的alt不一致*/
		if(hk.shift^evt.shiftKey)	continue;/*要求的shift不一致*/
		if(hk.key==evt.keyCode){/*按键一致 触发事件*/
			var dom=document.getElementById(hk.dom);
			if(dom){
				/*要判断按钮是否disable掉*/
				if(dom.style.display=="none"||dom.className.indexOf("disable")>=0){
					
				}
				else{
					dom.click();
				}
			}
			evt.preventDefault();
			evt.stopPropagation();
			evt.cancelBubble=true;
			evt.returnValue=false;
		}
	}
}

function HotKey(dom,key,ctrl,alt,shift,handler,context){
	this.dom=dom;
	this.key=key;
	this.ctrl=ctrl;
	this.alt=alt;
	this.shift=shift;
	this.handler=handler;
	this.context=context;
}

function installKey(dom,key,ctrl,alt,shift,handler,context){/*安装快捷键*/
	var hk=new HotKey(dom,key,ctrl,alt,shift,handler,context);
	keyMap.push(hk);
}