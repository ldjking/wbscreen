//工程名称
var projectname = "/qdp";
try{
	if(pageDefPath)	projectname=pageDefPath;
}catch(e){}
//引用CSS文件
var easyui = projectname + "/js/easyui/themes/default/easyui.css";
var icon = projectname + "/js/easyui/themes/icon.css";
var layout = projectname + "/js/easyui_qdp/themes/layout.css";
//引用js文件
var jquery = projectname + "/js/easyui/jquery-1.8.0.min.js";
var jeasyui = projectname + "/js/easyui_qdp/jquery.easyui.min.js";
var lang = projectname + "/js/easyui/locale/easyui-lang-zh_CN.js";

var common = projectname + "/js/common/common.js"; //公共函数
var pageinit = projectname + "/js/common/pageinit.js"; //页面初始化
var jJSON = projectname + "/js/common/jquery.json-2.4.min.js"; //json数据处理
var jMessage = projectname + "/js/common/message.js"; //消息数据处理
var keyMap = projectname + "/js/common/keymap.js"; //快捷键注册
var qdplib = projectname + "/js/common/qdplib.js"; //整合后的qdplib 包含了所有common文件

//写入文件
document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+ easyui +'">');
document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+ icon +'">');
document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+ demo +'">');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jquery +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jeasyui +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ lang +'"></script>');/*语言包*/
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ qdplib +'"></script>');

/*document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ common +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ pageinit +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jJSON +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jMessage +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ keyMap +'"></script>');*/

