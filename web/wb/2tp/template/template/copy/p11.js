function initConf(){/*初始化页面组件配置参数*/
	gridToolbar = [btnAdd,btnEdit,btnDel,btnRefresh,btnSearch];			
	dgConf={
			url:'data1.json',
			title:label.dg_title,
			iconCls: 'icon-edit', 
			columns:[[
				{field:'itemid',width:80,editor:'text',title:'aa',halign:'center'},
				{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
				{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
				{field:'attr1',width:280,editor:'text',title:'aa',halign:'center'},
				{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
			]]
		};
	
	
}

function doSave(callback){
	alert("请在doSave 函数中添加代码！");
	return true;
}

function doUpdate(callback){
	alert("请在doUpdate 函数中添加代码！");

	return true;
}

function doDelete(callback){
	alert("请在doDelete 函数中添加代码！");

	return true;
}

function doSearch(callback){
	alert("doSearch 请添加您的代码！");

}

$(pageLoad);