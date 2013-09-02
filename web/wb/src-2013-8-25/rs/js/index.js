window.onload=init;
window.onscroll=scrollHandler;

function init(){	
	initNav();			/*初始化页面目录*/
	tpManager.init();	/*初始化所有模板*/
	bindClick("#logo",logoClick);
}

function logoClick(){/*先帮用户保存或者提示用户保存信息*/
	cssActive("#tpAll");
	
}
	//window.onresize=layout;

function scrollHandler(){
	var goTop=document.getElementById("wGotop");
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	
	if(scrollTop>=100){
		goTop.style.display="block";
	}
	else{
		goTop.style.display="none";
	}
}