// JavaScript Document
var dao=require("../../../handler/common/dao.js");
//console.log(dao);
var p={ 
		table:"user",
		obj:{"id":"280"},
	};
var result=dao.save(p);
console.log(result);