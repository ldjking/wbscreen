// JavaScript Document
(function(win){
	win.initForm=function(){/*确保lov的点击事件被正确处理*/
	}
	
	win.fillForm=function(dom,data){/*  */
		if(isStr(dom))	dom=$(dom);
		var inputs=$("input",dom);
		for(var i=0;i<inputs.length;i++){
			var ipt=inputs[i];
			var name=ipt.name;
			if(data[name])	ipt.value=data[name];
		}
	}
	
	win.clearForm=function(dom){
		if(isStr(dom))	dom=$(dom);

		var inputs=$("input",dom);
		for(var i=0;i<inputs.length;i++){
			var ipt=inputs[i];
			ipt.value="";
		}
	}
	
	win.collectForm=function(dom){
		if(isStr(dom))	dom=$(dom);
		var obj={};
		var inputs=$("input",dom);
		for(var i=0;i<inputs.length;i++){
			var ipt=inputs[i];
			var name=ipt.name;
			var value=ipt.value;
			if(value!="")	obj[name]=value;
		}
		return obj;
	}
})(window);