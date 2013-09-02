var btnAdd={
				id:'btn_add',
				text:'新增',
				iconCls:'icon-add',
				handler:dg_add,
				disabled:false
			},
btnEdit={
		id:'btn_edit',
		text:'修改',
		iconCls:'icon-edit',
		handler:dg_edit,
		disabled:false
	},
btnDel={
		id:'btn_delete',
		text:'删除',
		iconCls:'icon-remove',
		handler:dg_delete,
		disabled:false
	},
btnRefresh={
		id:'btn_refresh',
		text:'刷新',
		iconCls:'icon-reload',
		handler:dg_refresh
	},
btnSearch={
		id:'btn_search',
		text:'查询',
		id:"btn_search",
		iconCls:'icon-search',
		handler:dg_search
	};
	

function pageLoad(){
	layout();
	initLabel();/*初始化标签*/

	initConf();/*初始化配置参数*/
	regKeys();
	initButton();
	initBtnDisabled();

	$("#ff1 input").attr("readonly",1);	/*详细表单的输入框只读*/

	renderGrid();
	
	lov_init();	/*初始化值列表定义  和校验定义*/

}	

function initLabel(){
	label = {
			dg_title:'页面元素',
			page_code:'页面编码',
			page_desc:'页面名称',
			objName:"合同",
			detailStr:"详细信息",
			addStr:"新增",
			editStr:"修改"
		};
	objName=label.objName;			/*页面管理对象名称*/
	lblDetailStr=label.detailStr;	/*在不同的语种下应该不同*/
	lblAddStr=label.addStr;			/*在不同的语种下应该不同*/
	lblEditStr=label.editStr;		/*在不同的语种下应该不同*/
	pageName=null;					/*根据pageName能够取得按钮定义*/
}

function layout(){
	if(window.innerHeight)	pageHeight=window.innerHeight;
	else					pageHeight=document.documentElement.clientHeight;   
	$('#middle').css("height",pageHeight-topHeight-downHeight-paddingHeight);
	$('#tab').tabs({
		onSelect:tab_select,
		fit:true
	});
}

function regKeys(){
	/*这时候可能还没有key 所以不能直接绑定dom对象，只能使用dom id*/
	document.onhelp=function(){return false};   /*为了屏蔽IE的F1按键*/
	window.onhelp=function(){return false};  /*为了屏蔽IE的F1按键*/
	installKey("btn_collapse",Keys.f1,null,null,null);
	installKey("btn_edit",Keys.f2,null,null,null);
	installKey("btn_search",Keys.f3,null,null,null);
	installKey("btn_add",Keys.f4,null,null,null);
	installKey("btn_delete",Keys.del,null,null,null);
	installKey("btn2_save",Keys.s,true,null,null);
	installKey("btn2_search",Keys.q,true,null,null);
	installKey("btn2_edit",Keys.e,true,null,null);
}

function initButton(){
	for(var i=0;i<gridToolbar.length;i++){
		var b=gridToolbar[i];/*首次运行时所有按钮都是disable状态*/
		var cfg={iconCls: b.iconCls,text:b.text,disabled:true,handler:b.handler,plain:1};
		$("#"+b.id).linkbutton(cfg);  
	}
	
	$('#btn2_save').linkbutton({iconCls: 'icon-save'}).click(btn2_save);  
	$('#btn2_edit').linkbutton({iconCls: 'icon-edit'}).click(btn2_update),
	$('#btn2_search').linkbutton({iconCls: 'icon-search'}).click(btn2_search);
}

function initBtnDisabled() {
	var btnDisabled=[{"id":"btn_add"},{"id":"btn_edit"},{"id":"btn_search"},{"id":"btn_delete"},{"id":"btn_refresh"}];
	for(var i=0;i<btnDisabled.length;i++) {
		$('#'+btnDisabled[i].id).linkbutton('enable');
	}
}

function renderGrid() {
	dgConf.toolbar='#tb';
	dgConf.onCollapse=dg_collapse;
	dgConf.onSelect=dg_select;
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

	$("#dg").datagrid(dgConf);
	$('#top').css("height","auto");/*加载完以后，把top的高度设为自动*/
}

function dg_load(){/*选中第一行*/
	$('#mask').css('display', "none");	/*遮罩隐藏*/
	$('#dg').datagrid('selectRow', 0);	/*选中第一条数据*/
	
	//FormSupport.dgChksBind = function (dgName) {
	//var dgName="dg";
//    var panel = $('#' + dgName).datagrid('getPanel');
//    var rows = panel.find('tr[datagrid-row-index]');
//    var checkboxs = rows.find('div.datagrid-cell-check input[type=checkbox]');
//	alert(checkboxs);
//    checkboxs.unbind().bind('click', function () {
//    });
	//alert("load");
	//}
}

function showForm(row){/*dg 选中事件触发*/
	$("#ff1").form("load",row);			
	$("#ff2").form("load",row);			
}

function dg_collapse(){/*收缩后  总是要修改tabs  会触发tab_select事件  
那么前面就需要将panel的selected属性设为true*/
	var panel=$("#tab").tabs("getSelected");	/*先获取selected对象*/
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-dgHeadHeight-downHeight-paddingHeight);
	$("#tab").tabs({fit:true,stopSelect:true});/*tab发生变化了 会触发tab_select事件 */
	
	if(panel!=null)	panel.panel({selected:0});
}

function dg_expand(){
	var panel=$("#tab").tabs("getSelected");
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-topHeight-downHeight-paddingHeight);
	$("#tab").tabs({fit:true,stopSelect:true});
	
	if(panel!=null)	panel.panel({selected:0});
}



function dg_select(rowIndex, rowData){/*选中事件  填充ff1 ff2  dg1*/		
	//alert("lockFlag:"+lockFlag);
	var confirmBack=function(r){
		if(!r){
			/*取消选中*/
			$('#dg').datagrid('unselectAll');	/*选中第一条数据*/
			return;
		}
		unLock();
		if(panelType=="search"){
			$('#tab').tabs("select",0);
		}
		//alert(rowData);
		showForm(rowData);			/*主表选中事件造成表单的重新填充*/
		useDetailMode();			/*选中会进入详细信息模式*/	
	}
	if(lockFlag){
		$.messager.confirm('确认提示', '有未提交的内容?', confirmBack);
	}
	else{
		confirmBack(true);
	}
}

function lock(reason){/*锁定页面，切换时弹出提示信息*/
	lockFlag=true;
}
function judge(cb){
	
}
function unLock(){
	lockFlag=false;
	$('#tab').tabs("enableTab",1);

}

function dg_add(){/*列表新增按钮事件*/
	if(lockFlag)	return;
	lock("add");
	useAddMode();
}

function dg_edit(){/*列表编辑按钮触发事件*/
	if(lockFlag)	return;
	lock("edit");
	var row=$('#dg').datagrid('getSelected');
	if(row){
		useEditMode();
	}
	else	$.messager.alert('选择提示', '请选择您编辑的数据!',"info");
}

function dg_delete(){/*列表删除按钮触发事件*/
	var confirmBack=function(r){
		if(!r)	return;
		unLock();
		var p=$('#dg').datagrid('getRowIndex',$('#dg').datagrid('getSelected'));
		/*执行服务器请求，完成服务端数据的删除  然后完成前端的删除*/
		if (p == undefined){return}
		var result=doDelete();
		if(result){
			$.messager.alert('提示信息', '数据删除成功!',"info",function(){});
			$('#dg').datagrid('cancelEdit', p)
					.datagrid('deleteRow', p);
			/*删除成功后应该刷新页面  并把下一条选中*/
			var currRows=$('#dg').datagrid('getRows').length;
			if(p>=currRows)	p--;
			if(p>=0)	$('#dg').datagrid('selectRow', p);/*如果已经到末尾则 选中p-1  */
		}
		else{
			$.messager.alert('提示信息', '数据删除失败!',"info",function(){});
		}
	}
	var row=$('#dg').datagrid('getSelected');
	if(row)	$.messager.confirm('确认提示', '您确认要删除这条数据吗?', confirmBack);
	else	$.messager.alert('选择提示', '请选择您要删除的数据!',"info");
}

function dg_refresh(){/*列表刷新按钮事件*/
	var confirmBack=function(r){
		if(!r)	return;
		unLock();
		$('#dg').datagrid('load');

	}
	if(lockFlag){
		$.messager.confirm('确认提示', '有未提交的数据，刷新后将无法保存！', confirmBack);
		return;/*锁定状态不允许切换到搜索面板*/
	}
	else{
		confirmBack(true);
	}
}

function dg_search(){/*列表搜索事件*/
	if(lockFlag)	return;/*锁定状态不允许切换到搜索面板*/
	panelType="search";
	$('#tab').tabs("select",1);
}
function dg_click(index){/*select先于click执行  所以click事件不再执行*/
	
}

function dg_dbl(){/*列表双击事件	双击进入编辑模式*/
	document.getElementById("btn_edit").click();/*双击等同于点击编辑按钮*/
}
function tab_select(title,index){/*选项卡的切换 需要更改按钮的显示*/
	$('#down a').css("display","none");

	if(index==0){/*根据grid的状态来生成按钮  add  edit*/
		panelType="form";
		if(formMode=="add")			$('#btn2_save').css("display","inline-block");/*搜索按钮*/
		if(formMode=="edit")		$('#btn2_edit').css("display","inline-block");/*搜索按钮*/
	}
	else if(index==1){/*查询选项卡  切换到查询页签等同于按钮 search被点击*/
		panelType="search";
		$('#btn2_search').css("display","inline-block");/*搜索按钮*/
	}
}
function useDetailMode(row){
	formMode="detail";
		
	$('#ff2').css("display","none");
	$('#ff1').css("display","block");
	
	var tab = $('#tab').tabs('getTab',0);
	$('#tab').tabs('update', {tab: tab,options: {title: objName+label.detailStr}});
	
	$('#tab').tabs("select",0);

	$('#tab').tabs('enableTab', 0);
}

function useAddMode(){
	formMode="add";
	$('#ff1').css("display","none");
	$('#ff2').css("display","block")
			 .form("clear");;

	var tab = $('#tab').tabs('getTab',0);
	$('#tab').tabs("select",0)
			 .tabs('enableTab', 0)
			 .tabs('disableTab', 1)
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
			 .tabs('disableTab', 1)
			 .tabs("select",0);
	
	form_change("edit");
}

function btn2_save(){/*保存提交事件*/
	var confirmBack=function(r){
		if(!r)	return;
		var result=doSave();
		if(result){
			$.messager.alert('提示信息', '数据新增成功!',"info",function(){
					unLock();
					var rowsNum=$("#dg").datagrid("getRows").length-1;
					$("#dg").datagrid("selectRow",rowsNum);
					dg_click();	
				});
		}
		else{
			$.messager.alert('提示信息', '数据新增失败!',"info",function(){
				});
		}
	}
	
	$.messager.confirm('确认提示', '您确认新增数据吗?', confirmBack);
}

function btn2_update(){/*修改提交事件*/
	var confirmBack=function(r){
		if(!r)	return;
		var result=doUpdate();
		if(result){
			$.messager.alert('提示信息', '数据修改成功!',"info",function(){
					/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
					unLock();
					useDetailMode();			/*选中会进入详细信息模式*/			
	
				});
		}
		else{
			$.messager.alert('提示信息', '数据修改失败!',"info",function(){		
	
				});
		}
	}
	$.messager.confirm('确认提示', '您确认修改数据吗?', confirmBack);
}

function btn2_search(){/*执行查询事件*/
	doSearch();/*执行查询操作*/
	//$.messager.alert('提示信息', '正在为您执行查询，请稍候!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
		//});
}

function btn2_ok(){/*子表更改提交事件*/
	$.messager.alert('提示信息', '从表数据提交事件，请处理!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
		});
}

function lov_init(){}/*绑定值别表*/



function form_change(){}
