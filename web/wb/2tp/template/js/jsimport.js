//工程名称
var basePath = "";
var DOC=document;
var scripts=DOC.getElementsByTagName("script");

for(var i=0;i<scripts.length;i++){
	var str=scripts[i].outerHTML;
	if(str.indexOf("jsimport.js")>0){
		var src=str.replace(/[\s\S]+?src="([^"]+)[\s\S]+/g,"$1");
		src=src.replace("/jsimport.js","");
		basePath=src;
	}
}
//引用CSS文件
var easyui = basePath + "/easyui/themes/default/easyui.css";
var icon = basePath + "/easyui/themes/icon.css";
var layout = basePath + "/easyui_qdp/themes/layout.css";
//引用js文件
var jquery = basePath + "/easyui/jquery-1.8.0.min.js";
var jeasyui = basePath + "/easyui_qdp/jquery.easyui.min.js";
var lang = basePath + "/easyui/locale/easyui-lang-zh_CN.js";

var qdplib = basePath + "/common/qdplib.js"; //整合后的qdplib 包含了所有common文件
var template = basePath + "/common/template.js"; //模板接口


//写入文件
document.write('<link rel="stylesheet" type="text/css" href="../../../template/js/'+ easyui +'">');
document.write('<link rel="stylesheet" type="text/css" href="../../../template/js/'+ icon +'">');
document.write('<link rel="stylesheet" type="text/css" href="../../../template/js/'+ layout +'">');
document.write('<script type="text/javascript" src="../../../template/js/'+ jquery +'"></script>');
document.write('<script type="text/javascript" src="../../../template/js/'+ jeasyui +'"></script>');
document.write('<script type="text/javascript" src="../../../template/js/'+ lang +'"></script>');/*语言包*/

document.write('<script type="text/javascript" src="../../../template/js/'+ qdplib +'"></script>');
//document.write('<script type="text/javascript" src="../../../template/js/'+ template +'"></script>');

