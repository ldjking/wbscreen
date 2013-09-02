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
	}
	
	function addChildRow(){
		//alert("addRow");
		/*复制隐藏的单元格*/
		var td=this;
		var tr=td.parentNode;
		var table=td.parentNode.parentNode.parentNode;
		var copy=table.rows[1].cloneNode(true);
		copy.style.display="";
		if(tr.nextSibling){
			tr.parentNode.insertBefore(copy,tr.nextSibling);
		}else{
			tr.parentNode.appendChild(copy);
		}
		/*需要重新注册新增和删除事件*/
		//console.dir(copy.children)
		bindClick(copy.children[0],removeChildRow);
		bindClick(copy.children[copy.children.length-1],addChildRow);
		
		console.log(table);
	}
	
	function removeChildRow(){
		var td=this;
		var tr=td.parentNode;
		tr.parentNode.removeChild(tr);
		tr=null;
	}
	
})(window);