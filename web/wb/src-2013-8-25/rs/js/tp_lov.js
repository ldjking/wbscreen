/*lov里面有几项重要的功能
	1.鼠标移走事件
*/
(function(win){
var lovManager={};
win.lovManager=lovManager;
/*为每一个lov注册事件*/
lovManager.init=function(){/*初始化表单  检查所有input元素  如果有lov属性  则指向某个值列表*/
	var con=$("#lov_con");
	var lovAll=con.childNodes;/*在open的时候处理也是个好主意*/
	
}

lovManager.open=function(dom,name){
	//console.log($("#lov_"+name));
	var lov=$("#lov_"+name);
	lov.target=dom;
	/*显示控制*/
	lov.style.display="block";
	lov.style.left=dom.parentNode.getBoundingClientRect().left+"px";
	lov.style.top=dom.parentNode.getBoundingClientRect().bottom+"px";
	lov.style.width=dom.parentNode.getBoundingClientRect().width+1+"px";
	
	bind(dom,"mouseleave",hideLov,lov);	/*鼠标移走后1s 隐藏LOV*/
	bind(lov,"mouseleave",hideLov,lov);
	bind(dom,"mouseenter",showLov,lov);
	bind(lov,"mouseenter",showLov,lov);
	bind(lov,"click",selectLovValue,dom);
}

function selectLovValue(evt){
	var target=evt.target;
	var name=target.innerHTML
	var value=target.getAttribute("value");
	
	var dom=this;
	dom.value=name;
	dom.v=value;
	target.parentNode.style.display="none"
}

function showLov(){/*把定时器关闭*/
	var lov=this;
	if(lov.timer){
		clearTimeout(lov.timer);
		lov.timer=null;
	}
	//lov.style.display="block";
}
function hideLov(){/*一秒后关闭*/
	var lov=this;
	lov.timer=setTimeout(function(){lov.style.display="none"},1000);
	
	
}
})(window);