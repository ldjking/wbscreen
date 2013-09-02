var steps={};
/*步骤的单击事件处理 切换到不同表单*/

steps.init=function(){
	/*这个是tp.html的切换效果*/
	bindNav("#steps","#form");
	//bindNav("#step2","#form2");
	//bindNav("#step3","#form3");


}

function bindNav(a,b){
	var domA=$(a);
	var domB=$(b);
	for(var i=0;i<domA.children.length;i++){
		var a1=domA.children[i];
		var b1=domB.children[i];
		bind(a1,"click",doNav,{a:a1,b:b1});
	}
	
}

function doNav(){/*导航组件*/
	var nav=this.a;
	var domB=this.b;

	var navs=nav.parentNode.children;
	for(var i=0;i<navs.length;i++){
		if(navs[i]!=nav)	cssReplace(navs[i],"active","normal");
	}
	cssReplace(nav,"normal","active");
	
	var doms=domB.parentNode.children;
	for(var i=0;i<doms.length;i++){
		if(doms[i]!=domB)	cssReplace(doms[i],"active","normal");
	}
	
	cssReplace(domB,"normal","active");
	
}