var formMode="detail";				/*formMode	页面模式  页面有三种模式 detail add modify*/
var panelType="form";				/*panelType	面板类型  form表单  search 查询  child 从表对象*/
var editIndex = undefined;			/*datagrid 编辑对象的行号*/
var dg1EditIndex = undefined;

var label={};						/*label对象*/

var objName=label.objName;			/*页面管理对象名称*/
var lblDetailStr=label.detailStr;	/*在不同的语种下应该不同*/
var lblAddStr=label.addStr;			/*在不同的语种下应该不同*/
var lblEditStr=label.editStr;		/*在不同的语种下应该不同*/
var pageName=null;					/*根据pageName能够取得按钮定义*/

var pageHeight=0;					/*pageHeight	页面高度*/
var topHeight=366;					/*datagrid高度*/
var dgHeadHeight=28;				/*datagrid 收缩后高度*/
var downHeight=30;					/*底部高度*/
var paddingHeight=11;				/*页面内补丁高度	paddingTop+paddingBottom*/

var gridToolbar = [];				/*按钮定义 */
var dgConf={};					/*dgConf配置信息*/
var dg1Conf={};					/*dg1Conf配置*/
var lockFlag=false;					/*新增和修改状态下有个lockFlag*/

function pageLoad(){}				/*页面加载时执行  	
										step1	布局，及配置初始化  初始化标签
										step2	根据配置初始化操作按钮
										step3	绘制组件 component  包括datagrid和tab
										step4	根据配置启用按钮
										step5	dg 加载完成后 选中第一条 
										step6	展示dg选中数据表单
										step7   展示dg选中数据子表
									*/
function layout() {}				/*页面元素布局  */
function initLabel(){}				/*初始化标签*/
function initConf(){}				/*初始化配置信息*/
function regKeys(){}				/*注册快捷键*/
function component() {}				/*绘制组件*/

function initButton(){}				/*初始化按钮*/
function initBtnDisabled(){}		/*启用按钮*/
function lov_init(){}				/*绑定值列表*/

function form_change(){}			/*form change	*/
function rowChange(row){}			/*dg 	选中事件触发*/



function dg_collapse(){}			/*dg 	收缩事件处理*/
function dg_expand(){}				/*dg	展开事件处理*/
function dg_load(){}				/*dg	加载完成事件处理*/
function dg_select(index, data){}	/*dg	选中事件处理*/
function dg_add(){}					/*dg	新增按钮处理*/
function dg_edit(){}				/*dg	修改按钮处理*/
function dg_delete(){}				/*dg	删除按钮处理*/
function dg_refresh(){}				/*dg	刷新按钮处理*/
function dg_search(){}				/*dg	查询按钮处理*/

function dg_click(index){}			/*dg	单击事件处理*/
function dg_dbl(){}					/*dg	双击事件处理*/

function useDetailMode(row){}		/*dg	进入详细信息模式*/
function useAddMode(){}				/*dg	进入新增模式*/
function useEditMode(){}			/*dg	进入编辑模式*/


function tab_select(title,index){}/*选项卡的切换 需要更改按钮的显示*/

function btn2_addItem(){}			/*新增子表数据*/
function btn2_editItem(){}			/*编辑子表数据*/
function btn2_rmItem(){}			/*删除子表数据*/
function btn2_ok(){}				/*子表修改提交*/

function showChildGrid(){}			/*显示子表内容*/
function dg1_endEditing(){}			/*结束子表的编辑状态*/
function dg1_click(index){}			/*从表单击事件*/
function dg1_dbl(index){}			/*从表双击事件	双击进入编辑模式*/


function btn2_save(){}				/*底部保存按钮*/
function btn2_update(){}			
function btn2_search(){}			

function lock(reasion){}			/*锁定 新增锁定  修改锁定  子表锁定*/
function unlock(){}					/*解锁*/


function doSave(callback){}			/*执行真正的保存操作	由开发人员实现*/
function doUpdate(callback){}		/*执行真正的更新操作	由开发人员实现*/
function doDelete(callback){}		/*执行真正的删除操作	由开发人员实现*/
function doSearch(callback){}		/*执行真正的搜索操作	由开发人员实现*/
function doCommit(){}				/*执行子表提交动作		由开发人员实现*/

