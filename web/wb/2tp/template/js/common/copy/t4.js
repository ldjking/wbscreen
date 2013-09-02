var formMode="detail";		/*formMode	页面模式  页面有三种模式 detail add modify*/
var panelType="form";		/*panelType	面板类型  form表单  search 查询  child 从表对象*/
var editIndex = undefined;	/*datagrid 编辑对象的行号*/
var dg1EditIndex = [];


var objName=label.objName;			/*页面管理对象名称*/
var lblDetailStr=label.detailStr;	/*在不同的语种下应该不同*/
var lblAddStr=label.addStr;		/*在不同的语种下应该不同*/
var lblEditStr=label.editStr;		/*在不同的语种下应该不同*/
var pageName=null;			/*根据pageName能够取得按钮定义*/

var pageHeight=0;			/*pageHeight	页面高度*/
var topHeight=366;			/*datagrid高度*/
var dgHeadHeight=28;		/*datagrid 收缩后高度*/
var downHeight=30;			/*底部高度*/
var paddingHeight=11;		/*页面内补丁高度	paddingTop+paddingBottom*/

var gridToolbar = null;		/*按钮定义 */
var dgConf=null;			/*dgConf配置信息*/
var dg1Conf=null;
var dg2Conf=null;
var dgCollapsed=false;		


function initConf(){}	/*在此初始化本页面的所有配置信息*/

function initButton(){
	for(var i=0;i<gridToolbar.length;i++){
		var b=gridToolbar[i];/*首次运行时所有按钮都是disable状态*/
		$("#"+b.id).linkbutton({iconCls: b.iconCls,text:b.text,disabled:true,handler:b.handler,plain:1});  
	}
}

function initBtnDisabled() {
	var btnDisabled=[{"id":"btn_add"},{"id":"btn_edit"},{"id":"btn_search"}];
	for(var i=0;i<btnDisabled.length;i++) {
		$('#'+btnDisabled[i].id).linkbutton('enable');
	}
}

function component() {
	initConf();

	if(window.innerHeight)	pageHeight=window.innerHeight;
	else					pageHeight=document.documentElement.clientHeight;  
	 
	if(dgCollapsed)	$('#middle').css("height",pageHeight-dgHeadHeight-downHeight-paddingHeight);
	else	$('#middle').css("height",pageHeight-topHeight-downHeight-paddingHeight);
	
	$('#tab').tabs({
		onSelect:tab_select,
		fit:true
	});
	
	/*这时候可能还没有key 所以不能直接绑定dom对象，只能使用dom id*/
	installKey("btn_collapse",Keys.f1,null,null,null);
	installKey("btn_edit",Keys.f2,null,null,null);
	installKey("btn_search",Keys.f3,null,null,null);
	installKey("btn_add",Keys.f4,null,null,null);
	installKey("btn_delete",Keys.del,null,null,null);
	installKey("btn2_save",Keys.s,true,null,null);
	installKey("btn2_search",Keys.q,true,null,null);
	installKey("btn2_edit",Keys.e,true,null,null);


	document.onhelp=function(){return false};   /*为了屏蔽IE的F1按键*/
	window.onhelp=function(){return false};  /*为了屏蔽IE的F1按键*/

	
	$('#btn2_save').linkbutton({iconCls: 'icon-save'}).click(btn2_save);  
	$('#btn2_edit').linkbutton({iconCls: 'icon-save'}).click(btn2_update),
	$('#btn2_search').linkbutton({iconCls: 'icon-search'}).click(btn2_search);
	$('#btn2_addItem').linkbutton({iconCls: 'icon-add'}).click(btn2_addItem);
	$('#btn2_editItem').linkbutton({iconCls: 'icon-edit'}).click(btn2_editItem);
	$('#btn2_rmItem').linkbutton({iconCls: 'icon-remove'}).click(btn2_rmItem);
	$('#btn2_ok').linkbutton({iconCls: 'icon-ok'}).click(btn2_ok);

	/*重新运算grid toolbar*/
	dgConf.toolbar='#tb';
	dgConf.onCollapse=dg_collapse;
	dgConf.onSelect=dg_select;
	dgConf.singleSelect=true;
	dgConf.onLoadSuccess=dg_load;
	dgConf.onClickRow=dg_click;
	dgConf.onDblClickRow=dg_dbl;
	dgConf.onExpand=dg_expand;
	dgConf.collapsible=true;
	dgConf.collapseID="btn_collapse";
	dgConf.pagination=true;
	dgConf.fit=true;
	dgConf.rownumbers=true;
	dgConf.singleSelect=true;

	dg1Conf.onClickRow=dg1_click;
	dg1Conf.onDblClickRow=dg1_dbl;
	
	dg2Conf.onClickRow=dg1_click;
	dg2Conf.onDblClickRow=dg1_dbl;
	$("#dg").datagrid(dgConf);
	
	initButton();
	initBtnDisabled();
	///*将@description	grid_container的height设置为auto  便于收缩展开的自动*/
	$('#top').css("height","auto");
	lov_init();
	
	$("#ff1 input").attr("readonly",1);	/*详细表单的输入框只读*/
}


function showChildGrid(param){/*重绘*/
	dg1EditIndex=[];

	$("#dg1").datagrid(dg1Conf);
	$("#dg2").datagrid(dg2Conf);
}
function showForm(row){/*dg 选中事件触发*/
	$("#ff1").form("clear")
			 .form("load",row);
	$("#ff2").form("clear")
			 .form("load",row);;
}

function dg_collapse(){/*收缩后  总是要修改tabs  会触发tab_select事件  那么前面就需要将panel的selected属性设为true*/
	dgCollapsed=true;

	var panel=$("#tab").tabs("getSelected");
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-dgHeadHeight-downHeight-paddingHeight);
	$("#tab").tabs({fit:true,stopSelect:true});/*tab发生变化了 会触发tab_select事件 */
	
	if(panel!=null)	panel.panel({selected:0});
}

function dg_expand(){
	dgCollapsed=false;

	var panel=$("#tab").tabs("getSelected");
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-topHeight-downHeight-paddingHeight);
	$("#tab").tabs({fit:true,stopSelect:true});
	
	if(panel!=null)	panel.panel({selected:0});	
}

function dg_load(){/*选中第一行*/
	$('#mask').css('display', "none");
	$('#dg').datagrid('selectRow', 0);
}

function dg_select(rowIndex, rowData){/*选中事件  填充ff1 ff2  dg1*/
	showChildGrid(rowData);/*子表模式下，重绘子表列表*/
	showForm(rowData,"add");
	//alert("userDetailMode");
	useDetailMode();
}

function dg_add(){/*列表新增按钮事件*/
	useAddMode();
}

function dg_edit(){/*列表编辑按钮触发事件*/
	var row=$('#dg').datagrid('getSelected');
	if(row){
		useEditMode();
	}
	else	$.messager.alert('选择提示', '请选择您编辑的数据!',"info");
}

function dg_delete(){/*列表删除按钮触发事件*/
	var confirmBack=function(r){
		if(!r)	return;
		var p=$('#dg').datagrid('getRowIndex',$('#dg').datagrid('getSelected'));
		/*执行服务器请求，完成服务端数据的删除  然后完成前端的删除*/
		if (p == undefined){return}
		$('#dg').datagrid('cancelEdit', p)
				.datagrid('deleteRow', p);
		/*删除成功后应该刷新页面  并把下一条选中*/
		var currRows=$('#dg').datagrid('getRows').length;
		if(p>=currRows)	p--;
		if(p>=0)	$('#dg').datagrid('selectRow', p);/*如果已经到末尾则 选中p-1  */
		
	}
	var row=$('#dg').datagrid('getSelected');
	if(row)	$.messager.confirm('确认提示', '您确认要删除这条数据吗?', confirmBack);
	else	$.messager.alert('选择提示', '请选择您要删除的数据!',"info");
}

function dg_refresh(){/*列表刷新按钮事件*/
}

function dg_search(){/*列表搜索事件*/
	panelType="search";

	$('#tab').tabs("select",1);
}
function dg_click(){
	if(panelType=="search"){
		$('#tab').tabs("select",0);
	}
}
function dg_dbl(){/*列表双击事件	双击进入编辑模式*/
	document.getElementById("btn_edit").click();/*双击等同于点击编辑按钮*/
}
function tab_select(title,index){/*选项卡的切换 需要更改按钮的显示*/
	if(index)	$('#down a').css("display","none");

	if(index==0){/*根据grid的状态来生成按钮  add  edit*/
		panelType="form";
		if(formMode=="add")			$('#btn2_save').css("display","inline-block");/*搜索按钮*/
		if(formMode=="edit")		$('#btn2_edit').css("display","inline-block");/*搜索按钮*/
	}
	else if(index==1){/*查询选项卡  切换到查询页签等同于按钮 search被点击*/
		panelType="search";
		$('#btn2_search').css("display","inline-block");/*搜索按钮*/
	}
	else if(index>1){/*进入从表管理模式*/
		panelType="child";
		$('#btn2_addItem').css("display","inline-block");/*新增行按钮*/
		$('#btn2_editItem').css("display","inline-block");/*删除行按钮*/
		$('#btn2_rmItem').css("display","inline-block");/*删除行按钮*/
		$('#btn2_ok').css("display","inline-block");/*commit按钮*/
	}
}
function useDetailMode(row){
	formMode="detail";
		
	$('#ff2').css("display","none");
	$('#ff1').css("display","block");
	
	var tab = $('#tab').tabs('getTab',0);
	$('#tab').tabs('update', {tab: tab,options: {title: objName+label.detailStr}});
	
	if(panelType=="search")	$('#tab').tabs("select",0);
	else 	tab_select();

	$('#tab').tabs('enableTab', 0)
			 .tabs('enableTab', 2)
			 .tabs('enableTab', 3);
}

function useAddMode(){
	formMode="add";
	$('#ff1').css("display","none");
	$('#ff2').css("display","block")
			 .form("clear");;

	var tab = $('#tab').tabs('getTab',0);
	$('#tab').tabs("select",0)
			 .tabs('enableTab', 0)
			 .tabs('disableTab', 2)
			 .tabs('disableTab', 3)
			 .tabs('update', {tab: tab,options: {title: label.addStr+objName}});
	
	$('#dg').datagrid('unselectAll');/*取消所有选中*/
	form_change("add");
}
function useEditMode(){
	formMode="edit";

	$('#ff1').css("display","none");
	$('#ff2').css("display","block");

	var tab = $('#tab').tabs('getTab',0);
	$('#tab').tabs('update', {tab: tab,options: {title: label.editStr+objName}})
			 .tabs('enableTab', 0)
			 .tabs('enableTab', 2)
			 .tabs('enableTab', 3); //t1中注释掉
	
	if(panelType=="child"){
		/*要选中当前选中对象*/
		var index=$('#tab').tabs("getTabIndex",$('#tab').tabs("getSelected"));
		$('#tab').tabs("select",index);
	}
	else				$('#tab').tabs("select",0);
	
	form_change("edit");
}

function btn2_addItem(){
	var index =_getTabIndex();
	var childGrid=$("#dg"+index);
	var childEditIndex=dg1EditIndex[index];
	
	if(dg1_endEditing(index)){/*结束编辑状态成功*/
		var p=childGrid.datagrid('getRowIndex',childGrid.datagrid('getSelected'));
		/*执行服务器请求，完成服务端数据的删除  然后完成前端的删除*/
		if (p == undefined){return}
		childGrid.datagrid('unselectAll');
						
		childGrid.datagrid('insertRow',{index:p+1,row:{}})
				 .datagrid('beginEdit', p+1)
				 .datagrid('selectRow', p+1);
	
		dg1EditIndex[index]=p+1;
	}
	else{
		childGrid.datagrid('selectRow', childEditIndex);
	}
}

function btn2_editItem(){/*首先要知道目标grid*/	
	var tab_index =_getTabIndex();
	var childGrid=$("#dg"+tab_index);
	var childEditIndex=dg1EditIndex[tab_index];
	
	var index=childGrid.datagrid('getRowIndex', childGrid.datagrid('getSelected'));
	if (childEditIndex != index){
		if (dg1_endEditing(tab_index)){
			childGrid.datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			dg1EditIndex[tab_index] = index;
		} else {
			childGrid.datagrid('selectRow', childEditIndex);
		}
	}
}


function btn2_rmItem(){	
	var tab_index =_getTabIndex();
	var childGrid=$("#dg"+(tab_index));
	
	var confirmBack=function(r){
		if(!r)	return;
		//alert(tab_index);
		var p=childGrid.datagrid('getRowIndex',childGrid.datagrid('getSelected'));
			/*执行服务器请求，完成服务端数据的删除  然后完成前端的删除*/
		if (p == undefined){return}
		childGrid.datagrid('cancelEdit', p)
				.datagrid('deleteRow', p);
		/*删除成功后应该刷新页面  并把下一条选中*/
		var currRows=childGrid.datagrid('getRows').length;
		if(p>=currRows)	p--;
		if(p>=0)	childGrid.datagrid('selectRow', p);/*如果已经到末尾则 选中p-1  */
	}
	
	var row=childGrid.datagrid('getSelected');
	if(row)	$.messager.confirm('确认提示', '您确认要删除这条数据吗?', confirmBack);
	else	$.messager.alert('选择提示', '请选择您要删除的数据!',"info");
}
/*@end region evt_btn	按钮相关事件结束*/

/**region dg1	表单中子表相关事件开始*/

function dg1_endEditing(tab_index){
	var childDg=$("#dg"+tab_index);
	var childEditIndex=dg1EditIndex[tab_index];
	//alert("tab_index:"+tab_index);
	//alert("childEditIndex:"+childEditIndex);
	
	if (childEditIndex == undefined){return true}
	var flag=childDg.datagrid('validateRow',childEditIndex);
	if(flag){/*如果校验通过 允许结束编辑状态*/
		//var ed = $('#dg1').datagrid('getEditor', {index:dg1EditIndex,field:'productid'});
		childDg.datagrid('endEdit', childEditIndex);
		dg1EditIndex[tab_index] = undefined;
		return true;
	}
	return false;
	
}

function dg1_click(index){/*从表单击事件  在编辑模式下打开编辑*/
	var tab_index =_getTabIndex();
	
	var childGrid=$("#dg"+(tab_index));
	var childEditIndex=dg1EditIndex[tab_index];
	
	if (childEditIndex !=null&&childEditIndex!= index){
		dg1_endEditing(tab_index);
	}
}
function dg1_dbl(index){/*从表双击事件	双击进入编辑模式*/
	var tab_index =_getTabIndex();
	//alert("index");
	var childGrid=$("#dg"+(tab_index));
	var childEditIndex=dg1EditIndex[tab_index];
	
	if (childEditIndex != index){
		if (dg1_endEditing(tab_index)){
			$(this).datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			dg1EditIndex[tab_index] = index;
		} else {
			$(this).datagrid('selectRow', childEditIndex);
		}
	}
	//alert("after dbl:"+dg1EditIndex[tab_index]);
	//}
}

function _getTabIndex(){/*获取当前选项卡的序号*/
	var tab = $('#tab').tabs('getSelected');
	var index = $('#tab').tabs('getTabIndex',tab);
	//alert("index="+index);
	return index-1;
}

function form_change(){}
function btn2_save(){}
function btn2_update(){}
function btn2_search(){}
function btn2_ok(){}
function lov_init(){}/*绑定值列表*/


