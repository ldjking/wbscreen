(function(win){/*闭包*/
	var forms=document.forms;
	for(var i=0;i<forms.length;i++){
		initForm(forms[i]);	
	}
	
	
	function initForm(form){
		var childTables=form.querySelectorAll("table.childTable");
		for(var i=0;i<childTables.length;i++){
			initChildTable(childTables[i]);
		}
		var inputs=form.querySelectorAll("input");
		for(var i=0;i<inputs.length;i++){
			bindClick(inputs[i],inputClick);
		}
	}
	
	function initChildTable(t){/*初始化子table*/
		for(var i=0;i<t.rows.length;i++){
			//console.dir(t.rows[i]);
			var tr=t.rows[i];
			var td_first=tr.cells[0];
			var td_last=tr.cells[tr.cells.length-1];

			//console.log(td_first);
			if(i>0)	bindClick(td_first,removeChildRow);
			bindClick(td_last,addChildRow);
			
		}
		var rows=t.getAttribute("rows");
		if(!rows)	rows=3;
		for(var i=0;i<rows;i++){
			var row1=t.rows[0];
			row1.cells[row1.cells.length-1].click();
		}
	}
	
	function addChildRow(){
		//alert("addRow");
		/*复制隐藏的单元格*/
		var td=this;
		var tr=td.parentNode;
		var table=td.parentNode.parentNode.parentNode;
		var copy=table.rows[1].cloneNode(true);
		copy.style.display="";
		if(tr.nextSibling&&tr!=table.rows[0]){
			tr.parentNode.insertBefore(copy,tr.nextSibling);
		}else{
			tr.parentNode.appendChild(copy);
		}
		/*需要重新注册新增和删除事件*/
		//console.dir(copy.children)
		/*里面每一个input的click事件都要交给*/
		var inputs=copy.querySelectorAll("input");
		for(var i=0;i<inputs.length;i++){
			bindClick(inputs[i],inputClick);
		}
		bindClick(copy.children[0],removeChildRow);
		bindClick(copy.children[copy.children.length-1],addChildRow);
		
		//console.log(table);
	}
	
	function removeChildRow(){
		var td=this;
		var tr=td.parentNode;
		tr.parentNode.removeChild(tr);
		tr=null;
	}
	
	function inputClick(evt){
		var input=this;
		var lov=input.getAttribute("lov")
		if(lov){
			lovManager.open(input,lov);
		}
	}
	
	
	function collectFormValue(form){/*生成表单的数据*/
		var inputs=$(".tbl input",form);
		var obj={};
		for(var i=0;i<inputs.length;i++){
			var input=inputs[i],name=input.name,value=input.value;
			if(input.v!=null)	value=input.v;
			//console.log("input name="+input.name+" value="+value);
			if(input.type=="checkbox"){
				if(obj[name]==null)	obj[name]=[];
				if(input.checked)	obj[name].push(input.value);
			}
			else{
				obj[name]=value;
			}
		}
		
		var childs=$(".childTable",form);
		for(var i=0;i<childs.length;i++){
			var name=childs[i].getAttribute("name");
			obj[name]=collectChildValue(childs[i]);
		}
		return obj;
	}
	
	function collectChildValue(table){
		var result=[];
		for(var i=2;i<table.rows.length;i++){
			var obj={};
			var row=table.rows[i];
			var inputs=$("input",row);
			for(var j=0;j<inputs.length;j++){
				var input=inputs[j],name=input.name,value=input.value;
				if(input.v!=null)	value=input.v;
				if(input.type=="checkbox"){
					if(input.checked)	obj[name]=true;
				}
				else{
					obj[name]=value;
				}
			}
			//if()
			/*如果这条数据是空  暂不处理*/
			result.push(obj);
		}
		
		return result;
	}
	
	win.collect=collectFormValue;
	
})(window);