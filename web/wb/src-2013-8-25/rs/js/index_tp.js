var tpManager={};
tpManager.frames={};

tpManager.init=function(){/*根据模板配置显示模板*/
	var main=$("#tpAll_main");
	main.innerHTML="";
	for(var i=0;i<tpAll.length;i++){
		var area=$div(null,"w-area");
		var img=$div();
		var text=$div(null,"w-area-text");
		
		area.appendChild(img);
		area.appendChild(text);
		text.innerHTML=tpAll[i].name;
		area.obj=tpAll[i];
		//area.onclick=tpClick;
		bindClick(area,tpClick);
		main.appendChild(area);
		
		loadIframe(tpAll[i]);
	}
	/*把所有模板的iframe一次性加载*/
}

function loadIframe(tp){
	var iframe=$e("iframe");
	iframe.frameBorder=0;
	iframe.src=tp.guide;
	$("#w_right").appendChild(iframe);
	tpManager.frames[tp.id]=iframe;
	iframe.className="hide";
}

function tpClick(){
	//console.log(this.obj);
	var tp=this.obj;
	if(tpManager.frames[tp.id]!=null){/*创建tp的frame*/
		/*隐藏所有兄弟节点*/
		activeTp(tpManager.frames[tp.id]);
		/*进入新增*/
	}
	else{
		alert("未找到对应模板配置向导页面！");
	}
}
function activeTp(iframe){
	//console.log(iframe.contentWindow);
	//edit();
	cssActive(iframe);
} 

tpManager.edit=function(conf){/*加载*/
	var tpid=conf.template;	
	var iframe=tpManager.frames[tpid];	
	if(iframe){
		activeTp(iframe);
		var conf=json("pagedef/"+conf.name);
		iframe.contentWindow.edit(conf);
	}
}