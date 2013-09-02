var fs=require("fs-extra");
//console.log("dirName:"+__dirname);
var dir=__dirname+"/../../data/"

function getData(table){
	var path=dir+table+".json";
	var data=[];
	try{
		data=fs.readJsonSync(path);
	}catch(e){
		//console.log("getData error file maybe not exist!");
		//console.log(e);
	}
	return data;
}


function persistence(table,data){
	var path=dir+table+".json";
	//console.log("persist "+path);
	//fs.createFileSync(path);
	fs.writeJsonSync(path,data);
}

function save(p){
	var table=p.table,data=getData(table),pk={};/*获取数据*/
	data.forEach(function(e){
		pk[e.id]=e;/*主键索引*/
	})

	var obj=p.obj;
	if(!obj.id)				return {flag:false,code:401,err:"id未设置"};
	if(pk[obj.id]!=null)	return {flag:false,code:402,err:"id已存在"};
	
	data.push(obj);
	persistence(table,data);
	return {flag:true};
}
function update(p){
	var table=p.table,data=getData(table),pk={};/*获取数据*/
	data.forEach(function(e){
		pk[e.id]=e;/*主键索引*/
	})

	var obj=p.obj;
	if(!obj.id)						return {flag:false,code:401,err:"id未设置"};
	if(pk[obj.id]==null)			return {flag:false,code:402,err:"id不存在"};
	
	var old=pk[obj.id];
	for(var p in obj){
		old[p]=obj[p];
	}
	persistence(table,data);
	return {flag:true};
}
function remove(p){
	var table=p.table,data=getData(table),pk={};/*获取数据*/
	data.forEach(function(e){
		pk[e.id]=e;/*主键索引*/
	})

	var obj=p.obj;
	if(!obj.id)						return {flag:false,code:401,err:"id未设置"};
	if(pk[obj.id]==null)			return {flag:false,code:402,err:"id不存在"};
	
	/*从数组中删除掉改元素*/
	
	var index=data.indexOf(pk[obj.id]);
	data.splice(index,1);
	
	persistence(table,data);
	return {flag:true};
}
function query(p){
	/*表名 过滤条件  映射  统计	 排序*/
	try{
		var table=p.table,
		joins=p.joins,
		filter=p.filter,
		map=p.map,
		gattr=p.gattr,
		group=p.group,
		compare=p.compare,
		pagenum=p.pagenum,
		pagesize=p.pagesize;
		var data=getData(table),result=data,total=data.length;
		//console.log("orgin data:");			console.log(result);
		if(joins)			result=excuteJoin(result,joins);
		//console.log("after joins data:");	console.log(result);

		if(isFun(filter))	result=result.filter(filter);
		//console.log("after filter data:");	console.log(result);
	
		if(isFun(map))		result=result.map(map);	
		if(isFun(group))	result=excuteGroup(result,gattr,group);	
		if(isFun(compare))	result=result.sort(compare);
		//console.log("after sort data:");	console.log(result);

	
		if(pagenum&&pagesize){
			var start=(pagenum-1)*pagesize;
			var end=pagenum*pagesize;
			total=result.length;
			result=result.filter(function(e,i,arr){
					return i>=start&&i<end;
				});
		}
		return {flag:true,total:total,data:result};
	}
	catch(e){
		console.log("dao.query error:");
		console.log(e);
		return {flag:false,err:e};
	}
}

function excuteGroup(data,attr,reduce){/*group 本质上需要一个标的  比如一个map函数  要统计的属性名  b  然后再需要一个reduce函数 对每个小组进行处理  比如max的处理  比如 sum的处理 比如concat的处理  group的三个参数
可否支持多个attr 暂时不考虑 因为reduce函数不容易处理
*/
	var tmp={};
	var result=[];
	data.forEach(function(e){
			var value=e[attr];
			if(!tmp[value])	tmp[value]=[];
			tmp[value].push(e);
		})
	
	for(var p in tmp){
		var obj=tmp[p].reduce(reduce,{});
		//console.log("after redue:");
		//console.log(obj);
		result.push(obj);
	}
	return result;
}
function excuteJoin(data,joins){/*执行连接操作  join全部使用id属性*/
	/*j应该是个数组
			j的元素应该是什么样子呢
			table attr [属性映射  name:depName,需要拿出来的属性]
	*/
	//console.log("excute join!");
	data.forEach(function(e){/*需要id进行索引*/
				for(var i=0;i<joins.length;i++){
					var j=joins[i];
					var d=getData(j.table),pk={};
					//console.log(d);
					d.forEach(function(e){
						//console.log("e.id:"+e.id);
						pk[e.id]=e;/*主键索引*/
					})
					var attr=j.attr;
					var map=j.map;
					var t=pk[e[attr]];
					//console.log("find t map="+map);
					if(t!=null){
						if(map){
							for(var p in map){
								e[map[p]]=t[p];/*增加新表的属性*/
							}
						}
						else{
							for(var p in t){
								e[attr+"_"+p]=t[p];/*增加新表的属性*/
							}
						}
					}
				}
			});
		console.log("excute join back!");

	return data;
}

function isFun(f){
	return typeof(f)=="function";
}

var dao={};
dao.query=query;
dao.save=save;
dao.update=update;
dao.remove=remove;

module.exports=dao;