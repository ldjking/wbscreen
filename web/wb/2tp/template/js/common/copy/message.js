//引用js文件
var otherJS = 'easyui/jquery-1.8.0.min.js';
var otherJS1 = 'easyui/jquery.easyui.min.js';
//引用CSS文件
var css1 = 'js/easyui/themes/default/easyui.css';
var css2 = 'js/easyui/themes/icon.css';
//document.write('<scr' + 'ipt type="text/javascript" src="'+otherJS+'"></scr' + 'ipt>');
//document.write('<scr' + 'ipt type="text/javascript" src="'+otherJS1+'"></scr' + 'ipt>');
//document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+css1+'">');
//document.write('<link rel="stylesheet" type="text/css" href="../../../../../template/js/common/copy/'+css2+'">');

//处理消息体
function processMsg(msginfo){
	var title = msginfo.toString().split(":")[1];
	//title = title.substr(1,title.length-2).replace("\"","");
	//修改提示信息丢失bug walker 2013-06-29
	title = title.replace(new RegExp("\"|}","g"),"");
	return title;
}

function process(msginfo){
	var msginfos = msginfo.toString().split(",");
	var map ={};
	var title = "";
	var msg = "";
	if(msginfos[0].toString().indexOf("Title")!=-1){
		title = processMsg(msginfos[0]);
		msg = processMsg(msginfos[1]);
	}
	else{
		title = processMsg(msginfos[1]);
		msg = processMsg(msginfos[0]);
	}
	map.title = title;
	map.msg = msg;
	return map;
}

//显示普通消息
function showNormalMsg(title,msgContent){
	var map = process(title);
	$.messager.alert(map.title,map.msg);
}
/**
 * 弹出消息提示，不带图标
 * walker
 * 2013-05-16
 * @param msg 包含title和msg
 */
function showNormalMsg(msg){
	msg = process(msg);
	$.messager.alert(msg.title,msg.msg);
}
//显示警告消息
function showWarnMsg(title,msgContent){
	var map = process(title);
	$.messager.alert(map.title,map.msg,'warning');
}
/**
 * 显示警告消息
 * walker
 * 2013-05-16
 * @param msg 包含title和msg
 */
function showWarnMsg(msg){
	msg = process(msg);
	$.messager.alert(msg.title,msg.msg,'warning');
}
//显示info消息
function showInfoMsg(title,msgContent){
	var map = process(title);
	$.messager.alert(map.title,map.msg,'info');
}
/**
 * 显示info消息
 * walker
 * 2013-05-16
 * @param msg 包含title和msg
 */
function showInfoMsg(msg){
	msg = process(msg);
	$.messager.alert(msg.title,msg.msg,'info');
}
//显示错误消息
function showErrorMsg(title,msgContent){
	var map = process(title);
	$.messager.alert(map.title,map.msg,'error');
}
/**
 * 显示错误消息
 * walker
 * 2013-05-16
 * @param msg 包含title和msg
 */
function showErrorMsg(msg){
	msg = process(msg);
	$.messager.alert(msg.title,msg.msg,'error');
}
//显示疑问消息
function showQuestionMsg(title,msgContent){
	var map = process(title);
	$.messager.alert(map.title,map.msg,'question');
}
/**
 * 显示疑问消息
 * walker
 * 2013-05-16
 * @param msg 包含title和msg
 */
function showQuestionMsg(msg){
	msg = process(msg);
	$.messager.alert(msg.title,msg.msg,'question');
}

//显示确认消息，带回调函数-walker
function showConfirmMsg(title,msgContent,callback){
	var map = process(title);
	$.messager.confirm(map.title,map.msg, function(r){
		callback(r);
	});
}
/**
 * 显示确认消息，带回调函数
 * walker
 * 2013-05-16
 * @param msg 包含title和msg
 * @param callback 回调函数名称
 */
function showConfirmMsg(msg,callback){
	msg = process(msg);
	$.messager.confirm(msg.title,msg.msg, function(r){
		callback(r);
	});
}
/**
 * 根据参数弹出消息提示
 * walker
 * 2013-05-16
 * @param title 标题
 * @param msg 内容
 * @param icons 图标名称
 */
function showCommonAlert(title,msg,icons){
	$.messager.confirm(title,msg,icons);
}
/**
 * 弹出指定内容消息提示
 * walker
 * 2013-05-16
 * @param msg 内容
 */
function showCommonInfo(msg){
	$.messager.alert("提示",msg,"info");
}