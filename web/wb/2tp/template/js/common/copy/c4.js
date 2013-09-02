function initConf(){/*初始化页面组件配置参数*/
	pageName="";
	gridToolbar = [btnAdd,btnEdit,btnDel,btnRefresh,btnSearch];			
	dgConf={
			url:'data1.json',
			title:label.dg_title,
			columns:[[
				{field:'itemid',width:80,editor:'text',title:'aa',halign:'center'},
				{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
				{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
				{field:'attr1',width:280,editor:'text',title:'aa',halign:'center'},
				{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
			]]
		};
	dg1Conf={
		url:'data2.json',
		columns:[[
			{field:'itemid',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
			{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'attr1',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
		]]
	};
}
function rowChange(rowData){
}
function doSave(callback){
	return true;
}

function doUpdate(callback){
	return true;
}

function doDelete(callback){
	return true;
}

function doSearch(callback){
	
}

function doCommit(){
	return true;
}

$(pageLoad);