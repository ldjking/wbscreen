var x=require("11judge.js");
eval(expose(x,"x"));

var baseURL="http://localhost/";
var sid=1;

function cb(xh,callBack){
	return function(){
		if(xh.readyState==4&&xh.status==200){
			var resultStr=xh.responseText;
			var resultObj=JSON.parse(resultStr);
			callBack(resultObj);
		}
	}
}
function json(file,callback){
	return xh(baseURL+"file/"+file+".json",null,false,callback);
}
function ajax(path,param,post,callback){
	return xh(baseURL+"handler/"+path,param,post,callback);
}
function xh(url,param,post,callback){
	var resultStr,resultObj={},str=encodeURI("p="+JSON.stringify(param)),content=str;	
	//console.log("content:"+content);
	var now=new Date(),nowStr= now.toLocaleTimeString()+now.getMilliseconds();
	
	var xh=new XMLHttpRequest(),method=post?"POST":"GET",asyn=callback?true:false;
	if(!post){
		if(param)	url=url+"?"+str;/*如果有参数*/
		content="";
	}
	xh.open(method, url, asyn);
	xh.setRequestHeader("Content-Length",content.length);
	xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
	xh.send(content);
		
	if(callback)	xh.onreadystatechange=cb(xh,callback);
	else{
		try{
			resultStr=xh.responseText;
			resultObj=JSON.parse(resultStr);/*返回的数据一定要求是json格式*/
		}catch(err){
			resultObj.flag=false;
			resultObj.msg="请检查数据内容！"+resultStr;
		}
		return resultObj;
	}
}

module.exports=mix(x,{
		ajax:ajax,
		json:json
	});
