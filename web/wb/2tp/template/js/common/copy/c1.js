function initConf(){/*初始化页面组件配置参数*/
	gridToolbar = [btnAdd,btnEdit,btnDel,btnRefresh,btnSearch];			
	dgConf={
			url:'data1.json',
			title:label.dg_title,
			iconCls: 'icon-edit', 
			columns:[[
				{field:'ck',checkbox:true},
				{field:'itemid',width:80,editor:'text',title:'aa',halign:'center'},
				{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
				{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
				{field:'attr1',width:280,editor:'text',title:'aa',halign:'center'},
				{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
			]],
			checkOnSelect:true,
			selectOnCheck:false
		};
		
	/*高度不足的情况下如何处理*/
}

function doSave(callback){
	alert("doSave 请添加您的代码！");
	return true;
}

function doUpdate(callback){
	alert("doUpdate 请添加您的代码！");

	return true;
}

function doDelete(callback){
	alert("doDelete 请添加您的代码！");

	return true;
}

function doSearch(callback){
	alert("doSearch 请添加您的代码！");

}

$(pageLoad);