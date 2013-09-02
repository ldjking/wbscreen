module.exports=function(param,sysParam,callback){
	//console.log("handler common/query  param:");
	//console.log(param);
	var dao=require("./dao.js");
	convertParam(param);
	result=dao.query(param);

	if(callback)	callback(result);
	else	return result;
}

function convertParam(p){/*参数转化*/
	/*第一个参数是method   save  update  remove  query
		save  	obj
		update 	id		obj
		remove	id
		query	[最复杂的参数]
				table  joins	filter	map  group  compare  page
		
	*/
	emptyToNull(p);/*对p的空属性转成empty*/
	
	var table=p.table;
	if(typeof(p.joins)=="string")		p.joins=JSON.parse(p.joins);
	if(p.filter) 		p.filter=new Function("e","i","arr",p.filter);
	if(p.map)			p.map=new Function("e","i","arr",p.map);
	if(p.compare)		p.compare=new Function("a","b",p.compare);
	if(p.group)			p.group=new Function("pre","curr",p.group);
}

function emptyToNull(obj){
	for(var p in obj){
		if(isEmpty(obj[p]))	obj[p]=null;
	}
}
function isEmpty(str){
	return str==null||(typeof(str)=="string"&&str.trim()=="");
}
