function initConf(){/*初始化页面组件配置参数*/
	gridToolbar = [{
			id:'btn_add',
			text:'新增',
			iconCls:'icon-add',
			handler:dg_add,
			disabled:false
		},{
			id:'btn_edit',
			text:'修改',
			iconCls:'icon-edit',
			handler:dg_edit,
			disabled:false
		},{
			id:'btn_delete',
			text:'删除',
			iconCls:'icon-remove',
			handler:dg_delete,
			disabled:false
		},'-',{
			id:'btn_refresh',
			text:'刷新',
			iconCls:'icon-reload',
			handler:dg_refresh
		},{
			id:'btn_search',
			text:'查询',
			id:"btn_search",
			iconCls:'icon-search',
			handler:dg_search
		}];	
		
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
	dg1Conf={
		url:'data2.json',
		fit:true,
		rownumbers:true,
		singleSelect:true,
		border:false,
		columns:[[
			{field:'itemid',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
			{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'attr1',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
		]]
	};
	
	//$("#itemid").validatebox({required:true,validType:'email'});
}

function btn2_save(){/*保存提交事件*/
	var confirmBack=function(r){
		if(!r)	return;
		$.messager.alert('提示信息', '数据新增成功!',"info",function(){
				var rowsNum=$("#dg").datagrid("getRows").length-1;
				$("#dg").datagrid("selectRow",rowsNum);
				dg_click();	
			});
	}
	
	$.messager.confirm('确认提示', '您确认新增数据吗?', confirmBack);
}

function btn2_update(){/*修改提交事件*/
	var confirmBack=function(r){
		if(!r)	return;
		$.messager.alert('提示信息', '数据修改成功!',"info",function(){
				/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
			});
	}
	$.messager.confirm('确认提示', '您确认修改数据吗?', confirmBack);
}

function btn2_search(){/*执行查询事件*/
	$.messager.alert('提示信息', '正在为您执行查询，请稍候!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
			$("#dg").datagrid("load");;
		});
}

function btn2_ok(){/*子表更改提交事件*/
	$.messager.alert('提示信息', '从表数据提交事件，请处理!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
		});
}

var pageDefPath="../";
