/*form里面有几项重要的功能
	1.值列表
	2.子表的增加和删除
*/
(function(win){
var form={};
win.form=form;

form.init=function(){/*初始化表单  检查所有input元素  如果有lov属性  则指向某个值列表*/
	form.clear("#form1");
	var inputs=$("input");
	//alert(inputs.length);
	arrEach(inputs,function(e){
		var lov=e.getAttribute("lov");
		//console.log(lov);
		if(lov!=null){
			//alert(lov);
			bindClick(e,showLov);
			//bind(e,"focus",showLov);
		}
	})
	
	/*然后再处理子表  子表的规范*/
}

function showLov(){
	var input=this;
	var name=input.getAttribute("lov");
	lovManager.open(input,name);
}

form.genData=function(dom){/*取出一个form的数据*/
}

form.clear=function(dom){
	//console.log("clear form!");
	if(isStr)	dom=$(dom);
	var inputs=$("input",dom);

	arrEach(inputs,function(e){
			//console.log(e);
			e.value="";
		});
}

form.fillData=function(dom,obj){/*写一个表单的数据*/
	if(isStr)	dom=$(dom);
	
	for(var p in obj){
		var input=$("input[name="+p+"]",dom);
		if(input)	input.value=obj[p];
	}
}
})(window);