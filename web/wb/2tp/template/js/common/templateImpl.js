var btnAdd={id:'btn_add',text:'新增',iconCls:'icon-add',handler:btn_add,plain:1},
btnEdit={id:'btn_edit',text:'修改',iconCls:'icon-edit',handler:btn_edit,plain:1},
btnDel={id:'btn_delete',text:'删除',iconCls:'icon-cancel',handler:btn_delete,plain:1},
btnReload={id:'btn_reload',text:'刷新',iconCls:'icon-reload',handler:btn_reload,plain:1},
btnSearch={id:'btn_search',text:'查询',id:"btn_search",iconCls:'icon-search',handler:btn_search,plain:1};

var btn2Save={id:'btn2_save',text:'保存',iconCls:'icon-save',handler:btn2_save},
btn2Update={id:'btn2_update',text:'保存',iconCls:'icon-save',handler:btn2_update},
btn2Search={id:'btn2_search',text:'执行',iconCls:'icon-search',handler:btn2_search},
btn2AddItem={id:'btn2_addItem',text:'新增行',iconCls:'icon-add',handler:btn2_addItem},
btn2EditItem={id:'btn2_editItem',text:'修改行',iconCls:'icon-edit',handler:btn2_editItem},
btn2RmItem={id:'btn2_rmItem',text:'删除行',iconCls:'icon-remove',handler:btn2_rmItem},
btn2Ok={id:'btn2_ok',text:'提交更改',iconCls:'icon-ok',handler:btn2_ok};

var dgDefault={
		toolbar:'#tb',
		onCollapse:dg_collapse,
		onSelect:dg_select,
		singleSelect:true,
		onLoadSuccess:dg_load,
		onDblClickRow:dg_dbl,
		onExpand:dg_expand,
		collapsible:true,
		collapseID:"btn_collapse",
		pagination:true,
		fit:true,
		iconCls:'icon-edit',
		rownumbers:true
	};
var childDefault={
		singleSelect:true,
		onClickRow:child_click,
		onDblClickRow:child_dbl,
		pagination:false,
		fit:true,
		border:false,
		rownumbers:true
	};

function pageLoad(){
	layout();		/*进行布局*/
	initButton();	/*初始化按钮*/
	regKeys();		/*注册快捷键*/
	$("#ff1 input").attr("readonly",1);	/*详细表单的输入框只读*/

	renderGrid();		/*绘制grid  grid绘制完成后触发绘制表单和从表*/
	lov_init();			/*初始化值列表定义  和校验定义*/
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
	for(var i=0;i<btns.length;i++){/*创建按钮元素*/
		var btn=btns[i];/*首次运行时所有按钮都是disable状态*/
		if(document.getElementById(btn.id)==null){
			$("#tb").append('<a href="#" id="'+btn.id+'">"'+btn.text+'"</a>');
			$("#"+btn.id).linkbutton(btn);  
		}
	}
	
	for(var i=0;i<btn2s.length;i++){/*创建按钮元素*/
		var btn=btn2s[i];/*首次运行时所有按钮都是disable状态*/
		if(document.getElementById(btn.id)==null){
			$("#btn2").append('<a href="#" id="'+btn.id+'">"'+btn.text+'"</a>');
			$("#"+btn.id).linkbutton(btn);  
		}
	}
	$("#down a").hide();
}


function renderGrid() {
	dgConf=$.extend({},dgDefault,dgConf);
	
	$("#dg").datagrid(dgConf);
	
	$("#mask").hide();
	$('#top').css("height","auto");/*加载完以后，把top的高度设为自动*/
}

function dg_load(){/*选中第一行*/
	$('#mask').css('display', "none");	/*遮罩隐藏*/
	$('#dg').datagrid('selectRow', 0);	/*选中第一条数据*/
	
	/*修正 dg_reload事件 在pager 分页元素中*/
	var pager=$('#dg').datagrid("getPager");
	//pager.pagination({showRefresh:false});
	
	pager.pagination(dgConf.pagerConf);
}

function lov_init(){}/*绑定值别表*/

function showForm(row){/*dg 选中事件触发*/
	
	$("#ff1").form("load",row);			
	$("#ff2").form("load",row);			
}
function form_change(type,row){/*当表单从新增模式切换到修改模式时触发该事件*/
	
}
function showChildGrid(){
	/*遍历所有从表定义  将从表逐个呈现*//**/
	var height1=pageHeight-topHeight-downHeight-paddingHeight;/*middleHeight的高度*/
	/*先要给form设置高度*/
	
	for(var i=0;i<childConfs.length;i++){
		childConfs[i]=$.extend({},childDefault,childConfs[i]);/*从表配置参数*/
		$("#dg"+(i+1)).parent().height(height1-29);/*从表表单的高度*/
		childAddNum[i+1]=null;/*重置新增数据条数*/
	}
	
	for(var i=0;i<childConfs.length;i++){
		$("#dg"+(i+1)).datagrid(childConfs[i]);/*从表表单的高度*/
	}
	/*绘制各个从表的内容*/
}


function dg_collapse(){/*收缩后  总是要修改tabs  会触发tab_select事件  
那么前面就需要将panel的selected属性设为true*/
	var panel=$("#tab").tabs("getSelected");	/*先获取selected对象*/
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-dgHeadHeight-downHeight-paddingHeight);
	$("#tab").tabs({fit:true,stopSelect:true});/*tab发生变化了 会触发tab_select事件 */
	$("#dg1Form").height($("#tab").height()-31);

	
	if(panel!=null)	panel.panel({selected:0});
}

function dg_expand(){
	var panel=$("#tab").tabs("getSelected");
	if(panel!=null)	panel.panel({selected:1});
	
	$('#middle').css("height",pageHeight-topHeight-downHeight-paddingHeight);
	$("#dg1Form").height($("#tab").height()-31);


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
		showChildGrid(rowData);/*子表模式下，重绘子表列表*/
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

function dg_dbl(){/*列表双击事件	双击进入编辑模式*/
	document.getElementById("btn_edit").click();/*双击等同于点击编辑按钮*/
}

function lock(reason){/*锁定页面，切换时弹出提示信息*/
	lockFlag=true;
	/*锁定不能超出范围*/
	var tabs=$("#tab").tabs("tabs");
	var curr=$("#tab").tabs("getTabIndex",$("#tab").tabs("getSelected"));
	
	if(reason=="add"){
		for(var i=0;i<tabs.length;i++){
			if(i==0)	continue;
			$('#tab').tabs("disableTab",i);
		}
	}
	else if(reason=="edit"){
		for(var i=0;i<tabs.length;i++){
			if(i==0)	continue;
			$('#tab').tabs("disableTab",i);
		}
	}
	else if(reason=="child"){
		for(var i=0;i<tabs.length;i++){
			if(i==curr)	continue;
			$('#tab').tabs("disableTab",i);
		}
	}
}

function judge(cb){
	
}
function unLock(){
	lockFlag=false;
	var tabs=$("#tab").tabs("tabs");
	for(var i=0;i<tabs.length;i++){
			$('#tab').tabs("enableTab",i);
		}
}

function btn_add(){/*列表新增按钮事件*/
	if(lockFlag)	return;
	lock("add");
	
	useAddMode();
}

function btn_edit(){/*列表编辑按钮触发事件*/
	if(lockFlag)	return;
	lock("edit");
	var row=$('#dg').datagrid('getSelected');
	if(row){
		useEditMode();
	}
	else	$.messager.alert('选择提示', '请选择您编辑的数据!',"info");
}

function btn_delete(){/*列表删除按钮触发事件*/
	if(lockFlag)	return;

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

function btn_reload(){/*列表刷新按钮事件*/
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

function pager_refresh(){
	//alert("pager refresh!");
	btn_reload();
	return false;
}

function btn_search(){/*列表搜索事件*/
	if(lockFlag)	return;/*锁定状态不允许切换到搜索面板*/
	panelType="search";
	$('#tab').tabs("select",1);
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
	
	var curr=$('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	
	if(curr==1)	$('#tab').tabs("select",0);/*查询模式下切换到详细信息表单*/
	else		$('#tab').tabs("select",curr);

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
	$.messager.alert('提示信息', '正在为您执行查询，请稍候!',"info",function(){
			/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
		});
}

function btn2_ok(){/*子表更改提交事件*/
	var curr=$('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	var dgIndex=curr-1;
	var child=$('#dg'+dgIndex);
	
	var result=doCommit();
	if(result){
		unLock();
		child_endEditing();
		child.datagrid("unselectAll");
		$.messager.alert('提示信息', '从表数据提交成功!',"info",function(){
				/*继续保持在修改模式  更新grid的数据  并让grid继续选中当前编辑对象*/
			});
	}
}

function btn2_addItem(){
	if(!lockFlag)	lock("child");
	var curr=$('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	var dgIndex=curr-1;
	var child=$('#dg'+dgIndex);
	//alert("limit"+childAddLimit[dgIndex]);
	if(childAddLimit[dgIndex]&&childAddNum[dgIndex]>=childAddLimit[dgIndex]){
		//alert("超出新增限制");
		return;
	}
	if(child_endEditing()){/*结束编辑状态成功*/
		var p=child.datagrid('getRowIndex',child.datagrid('getSelected'));
		/*执行服务器请求，完成服务端数据的删除  然后完成前端的删除*/
		if (p == undefined){return}
		child.datagrid('unselectAll');
						
		child.datagrid('insertRow',{index:p+1,row:{}})
				 .datagrid('beginEdit', p+1)
				 .datagrid('selectRow', p+1);
	
		childEditIndex[dgIndex]=p+1;
		if(childAddNum[dgIndex]==null)	childAddNum[dgIndex]=1;
		else	childAddNum[dgIndex]++;
	}
	else{
		child.datagrid('selectRow', childEditIndex[dgIndex]);
	}
}

function btn2_editItem(){	
	if(!lockFlag)	lock("child");
	var curr=$('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	var dgIndex=curr-1;
	var child=$('#dg'+dgIndex);
	
	var index=child.datagrid('getRowIndex', child.datagrid('getSelected'));
	if (childEditIndex[dgIndex] != index){
		if (child_endEditing()){
			child.datagrid('selectRow', index)
					.datagrid('beginEdit', index);
			childEditIndex[dgIndex] = index;
		} else {
			child.datagrid('selectRow', childEditIndex[dgIndex]);
		}
	}
}

function btn2_rmItem(){
	if(!lockFlag)	lock("child");
	var curr=$('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	var dgIndex=curr-1;
	var child=$('#dg'+dgIndex);
	
	var confirmBack=function(r){
		if(!r)	return;
		var p=child.datagrid('getRowIndex',child.datagrid('getSelected'));
	
		if (p == null){return}

		child.datagrid('cancelEdit', p)
			.datagrid('deleteRow', p);
	
		var currRows=child.datagrid('getRows').length;
		if(p>=currRows)	p--;
		if(p>=0)	child.datagrid('selectRow', p);/*如果已经到末尾则 选中p-1  */
	}
	var row=child.datagrid('getSelected');
	if(row)	$.messager.confirm('确认提示', '您确认要删除这条数据吗?', confirmBack);
	else	$.messager.alert('选择提示', '请选择您要删除的数据!',"info");
}


function child_endEditing(){
	var curr=$('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	var dgIndex=curr-1;
	var child=$('#dg'+dgIndex);

	if (childEditIndex[dgIndex] == null){return true}
	var flag=child.datagrid('validateRow',childEditIndex[dgIndex]);
	if(flag){/*如果校验通过 允许结束编辑状态*/
		child.datagrid('endEdit', childEditIndex[dgIndex]);
		childEditIndex[dgIndex] = undefined;
		return true;
	}
	return false;
	
}


function child_click(index){/*从表单击事件  在编辑模式下打开编辑*/
	var curr=$('#tab').tabs('getTabIndex',$('#tab').tabs('getSelected'));
	var dgIndex=curr-1;
	var child=$('#dg'+dgIndex);
	
	if (childEditIndex[dgIndex] != index){
		child_endEditing();
	}
}
function child_dbl(index){/*从表双击事件	双击进入编辑模式*/
	document.getElementById("btn2_editItem").click();/*双击等同于点击编辑按钮*/
}


window.onresize=pageLoad;