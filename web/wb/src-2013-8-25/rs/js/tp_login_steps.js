var steps={};
/*步骤的单击事件处理 切换到不同表单*/

steps.init=function(){
	/*这个是tp.html的切换效果*/
	bindNav("#step1","#form1");
	//bindNav("#step2","#form2");
	//bindNav("#step3","#form3");


}

function bindNav(a,b){
	var domA=$(a);
	var domB=$(b);
	
	domA.onclick=function(){
		doNav(domA,domB);
	}
}

function doNav(domA,domB){/*导航组件*/
	var nav=domA;
	var navs=nav.parentNode.childNodes;
	for(var i=0;i<navs.length;i++){
		if(navs[i]!=nav)	cssReplace(navs[i],"active","normal");
	}
	cssReplace(nav,"normal","active");
	
	var doms=domB.parentNode.childNodes;
	for(var i=0;i<doms.length;i++){
		if(doms[i]!=domB)	cssReplace(doms[i],"active","normal");
	}
	
	cssReplace(domB,"normal","active");
	
}