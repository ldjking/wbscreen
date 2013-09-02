// JavaScript Document
/*更加智能的scroll*/
var base=g.base;/*对dom的常用操作*/

eval(expose(base,"base"));

var cfg_default={
	color:"",
	borderRadius:2,
	scrollHandler:scrollHandler
}
/*结构
dom
	x-con
		x-content
		x-scroll-x
		x-scroll-y
*/
function genScroll(dom,cfg){
	/*第一步先处理dom结构*/
	var con=$(".x-con",dom);/*寻找dom下的元素*/
	console.log("genScroll");
	//console.log(con);
	if(con.length==0)	dealDom(dom);
	
}

function dealDom(dom){
	var con=$div(null,"x-con");
	var content=$div(null,"x-content");
	var scrollX=$div(null,"x-scroll-x");
	var scrollY=$div(null,"x-scroll-y");
	$wrap(dom,con);
	$wrap(con,content);
	$add(con,[scrollX,scrollY]);
	console.log(dom);
	
	bind(dom,"mousewheel",e_mouse_wheel);
	
}

function e_mouse_wheel(evt){/*鼠标滚轮事件 能够使内容上下滚动*/
	console.log("mouse wheel");
	var target=this,content=$(".x-content",target);
	if(!target.scrollY)	return;
	var rolled = getEvtRolled(evt)*5;
	console.log("rolled:"+rolled);
	var top=x.toNum(getStyle(content).top);
	var clientHeight=target.clientHeight,scrollHeight=content.scrollHeight;
	var minTop=clientHeight-scrollHeight;
	if(target.scrollX)	minTop-=15;
	var maxTop=0;
	
	top=limitValue(top+rolled,minTop,maxTop);
	content.style.top=top+"px";
	//fixScroll(target);
	stopEvt(evt);
}
function scrollHandler(){
}


module.exports=genScroll;