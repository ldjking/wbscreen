var objName="商品";/*页面管理对象名称*/
var pageName="purchaseorder";/*根据pageName能够取得按钮定义*/
var pageDefPath="../";

var gridToolbar = [{
			id:'btn_edit',
			text:'修改',
			iconCls:'icon-edit',
			handler:dg_edit
		},{
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
		
var dgConf={
		url:'data1.json',
		title:"商品清单",
		iconCls: 'icon-edit', 
		columns:[[
			{field:'itemid',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
			{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'attr1',width:280,editor:'text',title:'aa',halign:'center'},
			{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
		]]
	};

var dg1Conf={
		url:'data2.json',
		fit:true,
		rownumbers:true,
		singleSelect:true,
		border:false,
		columns:[[
			{field:'itemid',width:80,editor:'text',title:'aa',halign:'center',editor:{
							type:'text',
							options:{
								valueField:'itemid',
								textField:'itemid',
								required:true
							}
						}},
			{field:'productid',width:160,editor:'text',title:'aa',halign:'center'},
			{field:'unitcost',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'attr1',width:80,editor:'text',title:'aa',halign:'center'},
			{field:'listprice',width:160,editor:'text',title:'aa',halign:'center'}
		]]
	};

function btn2_save(){/*保存提交事件*/
	$.messager.alert('提示信息', '数据新增成功!',"info",function(){
			var rowsNum=$("#dg").datagrid("getRows").length-1;
			$("#dg").datagrid("selectRow",rowsNum);
			dg_click();	
		});
}

function btn2_update(){/*修改提交事件*/
	$.messager.alert('提示信息', '数据修改成功!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
		});
}

function btn2_search(){/*执行查询事件*/
	$.messager.alert('提示信息', '正在为您执行查询，请稍候!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
		});
}

function btn2_ok(){/*子表更改提交事件*/
	$.messager.alert('提示信息', '从表数据提交事件，请处理!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
		});
}
