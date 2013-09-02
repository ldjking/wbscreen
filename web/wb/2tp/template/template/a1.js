btns = [btnAdd,btnEdit,btnDel,btnReload,btnSearch];
btn2s=[btn2Save,btn2Update,btn2Search,btn2AddItem,btn2EditItem,btn2RmItem,btn2Ok];
dgConf={
		url:'data3.json',
		title:label.dg_title,
		columns:[[
			{field:'itemid',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
			{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'attr1',width:280,editor:'text',title:'aa',halign:'center'},
			{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
		]],
		pagerConf:{onBeforeRefresh:pager_refresh}
	};


childAddLimit[1]=1;

function doBeforeEdit(index,data){
	
	//alert(index);
	//alert(JSON.stringify(data));
	//var editor=$("#dg1").datagrid("getEditor",{index:1,field:"productid"});
	//alert("editor="+editor);
	//$(editor.target).attr("disable","true");
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