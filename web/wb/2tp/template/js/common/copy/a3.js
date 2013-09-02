var formMode="detail";		/*formMode	页面模式  页面有三种模式 detail add modify*/
var panelType="form";		/*panelType	面板类型  form表单  search 查询  child 从表对象*/
var editIndex = undefined;	/*datagrid 编辑对象的行号*/
var dg1EditIndex = undefined;

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

function initConf(){}	/*在此初始化本页面的所有配置信息*/

function initButton(){
	for(var i=0;i<gridToolbar.length;i++){
		var b=gridToolbar[i];/*首次运行时所有按钮都是disable状态*/
		$("#"+b.id).linkbutton({iconCls: b.iconCls,text:b.text,disabled:true,handler:b.handler,plain:1});  
	}
}

function initBtnDisabled() {
	var btnDisabled=[{"id":"btn_refresh"},{"id":"btn_search"}];
	for(var i=0;i<btnDisabled.length;i++) {
		$('#'+btnDisabled[i].id).linkbutton('enable');
	}
}

function component() {
	initConf();

	if(window.innerHeight)	pageHeight=window.innerHeight;
	else					pageHeight=document.documentElement.clientHeight;   
	$('#middle').css("height",pageHeight-topHeight-downHeight-paddingHeight);
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
	$("#dg").datagrid(dgConf);
	
	initButton();
	initBtnDisabled();
	
	$('#top').css("height","auto");
	lov_init();
	
	$(".formChild").height(pageHeight-topHeight-downHeight-paddingHeight-dgHeadHeight-1);
	//$("#ff1 input").attr("readonly",1);	/*详细表单的输入框只读*/
}


function showChildGrid(param){/*dg 选中事件触发*/
	$("#dg1").datagrid(dg1Conf);
}
function showForm(row){/*dg 选中事件触发*/
	//$("#ff1").form("load",row);
	//$("#ff2").form("load",row);;
}

function dg_collapse(){/*收缩后  总是要修改tabs  会触发tab_select事件  那么前面就需要将panel的selected属性设为true*/
	var panel=$("#tab").tabs("getSelected");	/*先获取selected对象*/
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-dgHeadHeight-downHeight-paddingHeight);
	$(".formChild").height(pageHeight-dgHeadHeight-downHeight-paddingHeight-dgHeadHeight-1);

	$("#tab").tabs({fit:true,stopSelect:true});/*tab发生变化了 会触发tab_select事件 */
	
	if(panel!=null)	panel.panel({selected:0});
}

function dg_expand(){
	var panel=$("#tab").tabs("getSelected");
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-topHeight-downHeight-paddingHeight);
	$(".formChild").height(pageHeight-topHeight-downHeight-paddingHeight-dgHeadHeight-1);

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

function dg_search(){/*列表搜索事件  search模式不再禁用其他面板*/
	panelType="search";
	$('#tab').tabs("select",1);
}
function dg_click(index){
	/*切换回详细信息模式 首先判断tab的当前选项*/
	if(panelType=="search"){
		$('#tab').tabs("select",0);
	}
}

function dg_dbl(){/*列表双击事件	双击进入编辑模式*/
	document.getElementById("btn_edit").click();/*双击等同于点击编辑按钮*/
}
function tab_select(title,index){/*选项卡的切换 需要更改按钮的显示*/
	$('#down a').css("display","none");

	if(index==0){/*根据grid的状态来生成按钮  add  edit*/
		$('#btn2_addItem').css("display","inline-block");/*新增行按钮*/
		$('#btn2_editItem').css("display","inline-block");/*删除行按钮*/
		$('#btn2_rmItem').css("display","inline-block");/*删除行按钮*/
		$('#btn2_ok').css("display","inline-block");/*commit按钮*/
	}
	else if(index==1){/*查询选项卡  切换到查询页签等同于按钮 search被点击*/
		panelType="search";
		$('#btn2_search').css("display","inline-block");/*搜索按钮*/
	}
}
function useDetailMode(row){
	//formMode="detail";
		
	//$('#ff2').css("display","none");
	//$('#ff1').css("display","block");
	
	
	//if(panelType=="search")	$('#tab').tabs("select",0);
	//else 	tab_select();
}

function btn2_addItem(){
	if(dg1_endEditing()){/*结束编辑状态成功*/
		var p=$('#dg1').datagrid('getRowIndex',$('#dg1').datagrid('getSelected'));
		/*执行服务器请求，完成服务端数据的删除  然后完成前端的删除*/
		if (p == undefined){return}
		$('#dg1').datagrid('unselectAll');
						
		$('#dg1').datagrid('insertRow',{index:p+1,row:{}})
				 .datagrid('beginEdit', p+1)
				 .datagrid('selectRow', p+1);
	
		dg1EditIndex=p+1;
	}
	else{
		$('#dg1').datagrid('selectRow', dg1EditIndex);
	}
}

function btn2_editItem(){	
	var index=$('#dg1').datagrid('getRowIndex', $('#dg1').datagrid('getSelected'));
	if (dg1EditIndex != index){
		if (dg1_endEditing()){
			$('#dg1').datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			dg1EditIndex = index;
		} else {
			$('#dg1').datagrid('selectRow', dg1EditIndex);
		}
	}
}

function btn2_rmItem(){	
	var confirmBack=function(r){
		if(!r)	return;
		var p=$('#dg1').datagrid('getRowIndex',$('#dg1').datagrid('getSelected'));
	
		if (p == undefined){return}
		$('#dg1').datagrid('cancelEdit', p)
				 .datagrid('deleteRow', p);
	
		var currRows=$('#dg1').datagrid('getRows').length;
		if(p>=currRows)	p--;
		if(p>=0)	$('#dg1').datagrid('selectRow', p);/*如果已经到末尾则 选中p-1  */
	}
	var row=$('#dg1').datagrid('getSelected');
	if(row)	$.messager.confirm('确认提示', '您确认要删除这条数据吗?', confirmBack);
	else	$.messager.alert('选择提示', '请选择您要删除的数据!',"info");
}


function dg1_endEditing(){
	if (dg1EditIndex == undefined){return true}
	var flag=$('#dg1').datagrid('validateRow',dg1EditIndex);
	if(flag){/*如果校验通过 允许结束编辑状态*/
		$('#dg1').datagrid('endEdit', dg1EditIndex);
		dg1EditIndex = undefined;
		return true;
	}
	return false;
	
}

function dg1_click(index){/*从表单击事件  在编辑模式下打开编辑*/
	if (dg1EditIndex != index){
		dg1_endEditing();
	}
}
function dg1_dbl(index){/*从表双击事件	双击进入编辑模式*/
	document.getElementById("btn2_editItem").click();/*双击等同于点击编辑按钮*/
}

function useAddMode(){};
function useEditMode(){};
function form_change(type){}/*type= add|edit*/
function removeValidate(){}/*type= enable|remove*/
function btn2_save(){}
function btn2_update(){}
function btn2_search(){}
function btn2_ok(){}
function lov_init(){}/*绑定值列表*/
