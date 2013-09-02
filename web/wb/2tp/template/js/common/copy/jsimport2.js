//工程名称
var projectname = "/qdp";
/*to_fix 工程名称不应该固定 应该从url中获取  
	对于工程名称映射成/的项目，将无法识别
*/
try{
	if(pageDefPath)	projectname=pageDefPath;
}catch(e){}
//引用CSS文件
var easyui = projectname + "/js/easyui/themes/default/easyui.css";
var icon = projectname + "/js/easyui/themes/icon.css";
var demo = projectname + "/js/easyui_qdp/demo/demo.css";
//引用js文件
var jquery = projectname + "/js/easyui/jquery-1.8.0.min.js";
var jeasyui = projectname + "/js/easyui_qdp/jquery.easyui.min.js";
var easyloader = projectname + "/js/easyui/locale/easyui-lang-zh_CN.js";
var common = projectname + "/js/common/common.js"; //公共函数
var pageinit = projectname + "/js/common/pageinit.js"; //页面初始化
var jJSON = projectname + "/js/common/jquery.json-2.4.min.js"; //json数据处理
var jMessage = projectname + "/js/common/message.js"; //消息数据处理
var keyMap = projectname + "/js/common/keymap.js"; //消息数据处理

//写入文件
document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+ easyui +'">');
document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+ icon +'">');
document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+ demo +'">');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jquery +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jeasyui +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ easyloader +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ common +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ pageinit +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jJSON +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ jMessage +'"></script>');
document.write('<script type="text/javascript" src="../../../../../template/js/common/copy/'+ keyMap +'"></script>');

