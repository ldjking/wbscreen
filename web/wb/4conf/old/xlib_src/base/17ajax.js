/*xlib.19ajax	服务器交互函数*/
var x={};
var sid=1;

var $callBack=function(xh,callBack){
	if(xh.readyState==4&&xh.status==200){
		var resultStr=xh.responseText;
		var resultObj=$myEval(resultStr);
		callBack(resultObj);
	}
}
var $myEval=function(str){
	if(str==null)	return null;
	if(str=="{}")	return {};
	if(!isStr(str))	return;
	var obj=null;
	try{
		obj=eval("("+str+")");
	}
	catch(e){/*eval发生异常*/
		console.log("eval发生异常"+str);
	}
	return obj;
}


x.$$=function(method,param,post,callback,base_url){
	post=true;
	if(base_url==null){ 
		var url=document.URL;
		if(url.indexOf("http")==0)	base_url="http://localhost/eam/handler/";
		else	base_url="http://localhost/eam/handler/";
	}
	var resultStr;
	var resultObj={};
	var url=base_url+method;
	var paramStr=x.jsonStr(param,false);//参数转换
	var now=new Date();
	var nowStr= now.toLocaleTimeString()+now.getMilliseconds();
	
	var xh=window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
	if(callback!=null){
		if(post){//如果是post请求
			content = "p="+paramStr+"&now="+nowStr+"&t=2";
			
			xh.open("POST", url, true);
			xh.setRequestHeader("Content-Length",content.length);
			xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
			//xh.open("post",url,true);
			xh.send(content);
			xh.onreadystatechange=function(){$callBack(xh,callback);};
			
		}
		else{
			var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
			xh.open("get",url2,true);
			xh.send(null);
			xh.onreadystatechange=function(){$callBack(xh,callback)};
		}
	}
	else{
		try{
			if(post){//如果是post请求
				content = "p="+paramStr+"&now="+nowStr+"&t=2";
				
				xh.open("POST", url, false);
				xh.setRequestHeader("Content-Length",content.length);
				xh.setRequestHeader("CONTENT-TYPE","application/x-www-form-urlencoded");
				//xh.open("post",url,true);
				xh.send(content);
				resultStr=xh.responseText;
			}
			else{
				var url2=url+"?p="+paramStr+"&now="+nowStr+"&t=2";
				xh.open("get",url2,false);
				xh.send(null);
				resultStr=xh.responseText;
			}
		
			resultObj=$myEval(resultStr);
		}catch(e){
			//alert("json解析失败！");
			resultObj.flag=false;
			resultObj.msg="请检查数据内容！"+resultStr;
		}
		return resultObj;
	}
}

return x;
