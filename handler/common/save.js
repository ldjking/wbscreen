module.exports=function(param,sysParam,callback){
	var dao=require("./dao.js");
	result=dao.save(param);
	
	if(callback)	callback(result);
	else	return result;
}
