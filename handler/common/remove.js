module.exports=function(param,sysParam,callback){
	var dao=require("./dao.js");
	result=dao.remove(param);
	
	if(callback)	callback(result);
	else	return result;
}